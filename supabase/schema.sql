-- =========================================================
-- Natural Skin · Base de datos de citas (Supabase / Postgres)
-- Ejecutar completo en Supabase → SQL Editor → New query → Run.
-- Se puede volver a ejecutar: no duplica datos.
-- =========================================================

create extension if not exists btree_gist with schema extensions;

-- ---------- Personal autorizado a usar el panel ----------
-- Solo los usuarios que estén en esta tabla pueden leer y editar citas.
create table if not exists personal (
  user_id uuid primary key references auth.users on delete cascade,
  nombre  text,
  creado_en timestamptz not null default now()
);

create or replace function es_personal() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from personal where user_id = auth.uid());
$$;
revoke execute on function es_personal() from public, anon;
grant execute on function es_personal() to authenticated;

-- ---------- Servicios ----------
create table if not exists servicios (
  id           bigint generated always as identity primary key,
  categoria    text not null,
  nombre       text not null unique,
  precio       numeric(8,2),                 -- null = precio pendiente
  duracion_min int  not null default 60 check (duracion_min between 5 and 600),
  activo       boolean not null default true,
  orden        int  not null default 0
);

-- ---------- Clientas ----------
create table if not exists clientes (
  id        bigint generated always as identity primary key,
  nombre    text,
  telefono  text not null unique check (telefono ~ '^[0-9]{8,15}$'),  -- con código de país, sin "+": 51987654321
  notas     text,
  creado_en timestamptz not null default now()
);

-- ---------- Horario semanal (0 = domingo … 6 = sábado) ----------
-- abre/cierra en null = no se ofrecen horarios ese día (el panel igual puede agendar a mano).
create table if not exists horario (
  dia    smallint primary key check (dia between 0 and 6),
  abre   time,
  cierra time,
  check ((abre is null) = (cierra is null) and (abre is null or cierra > abre))
);

-- ---------- Bloqueos (vacaciones, almuerzo, feriados…) ----------
create table if not exists bloqueos (
  id     bigint generated always as identity primary key,
  inicio timestamptz not null,
  fin    timestamptz not null check (fin > inicio),
  motivo text
);

-- ---------- Citas ----------
do $$ begin
  create type estado_cita as enum ('pendiente', 'confirmada', 'atendida', 'no_asistio', 'cancelada');
exception when duplicate_object then null; end $$;

create table if not exists citas (
  id                   bigint generated always as identity primary key,
  cliente_id           bigint not null references clientes on delete restrict,
  servicio_id          bigint not null references servicios on delete restrict,
  inicio               timestamptz not null,
  fin                  timestamptz not null check (fin > inicio),
  estado               estado_cita not null default 'pendiente',
  origen               text not null default 'panel' check (origen in ('panel', 'bot')),
  notas                text,
  recordatorio_enviado boolean not null default false,
  creado_en            timestamptz not null default now(),
  -- Una sola cabina: dos citas activas no pueden cruzarse en el tiempo.
  constraint citas_sin_cruce exclude using gist (tstzrange(inicio, fin) with &&)
    where (estado in ('pendiente', 'confirmada'))
);
create index if not exists citas_inicio_idx on citas (inicio);

-- ---------- Seguridad (RLS) ----------
-- Nadie anónimo puede leer nada. El personal tiene acceso completo.
-- El bot usa la service_role key, que no pasa por RLS.
alter table personal  enable row level security;
alter table servicios enable row level security;
alter table clientes  enable row level security;
alter table horario   enable row level security;
alter table bloqueos  enable row level security;
alter table citas     enable row level security;

do $$
declare t text;
begin
  foreach t in array array['servicios', 'clientes', 'horario', 'bloqueos', 'citas'] loop
    execute format('drop policy if exists personal_todo on %I', t);
    execute format('create policy personal_todo on %I for all to authenticated using (es_personal()) with check (es_personal())', t);
  end loop;
end $$;

drop policy if exists personal_se_ve on personal;
create policy personal_se_ve on personal for select to authenticated using (user_id = auth.uid());

-- ---------- Datos iniciales ----------
-- Horario confirmado. Domingo "solo con cita": sin horario automático hasta definirlo.
insert into horario (dia, abre, cierra) values
  (0, null, null),
  (1, '09:00', '19:00'), (2, '09:00', '19:00'), (3, '09:00', '19:00'), (4, '09:00', '19:00'),
  (5, '09:00', '17:00'),
  (6, null, null)
on conflict (dia) do nothing;

-- Lista de servicios y precios de la dueña (15/10/2026).
-- duracion_min = 60 por defecto hasta que la dueña confirme cuánto dura cada uno.
insert into servicios (categoria, nombre, precio, orden) values
  ('Limpiezas',    'Hidrofacial 7 en 1 · Premium',                   180, 10),
  ('Limpiezas',    'Limpieza facial profunda + radiofrecuencia',     199, 11),
  ('Limpiezas',    'Limpieza facial + fototerapia + PRP',            200, 12),
  ('Limpiezas',    'Facial punta de diamante',                       199, 13),
  ('Limpiezas',    'Limpieza facial hidratante',                      99, 14),
  ('Faciales',     'HIFU 25D MAX · Rostro completo + papada',        350, 20),
  ('Faciales',     'HIFU 25D MAX · Rostro + PRP',                    400, 21),
  ('Faciales',     'HIFU 25D MAX · Eyes',                            250, 22),
  ('Faciales',     'Armonización facial con ácido hialurónico',      450, 23),
  ('Regenerativos','Plasma rico en plaquetas + máscara hidratante',  150, 30),
  ('Regenerativos','PRP + Dermapen',                                 150, 31),
  ('Regenerativos','PRP + exosomas + Dermapen',                      450, 32),
  ('Regenerativos','PDRN + Dermapen',                                400, 33),
  ('Regenerativos','PRP capilar',                                   null, 34),
  ('Corporales',   'HIFU 25D MAX · Corporal (abdomen / cintura)',    400, 40),
  ('Corporales',   'Hidrolipoclasia (3 sesiones)',                   350, 41),
  ('Corporales',   'Levantamiento de glúteos con peptonas',          350, 42),
  ('Sueroterapia', 'Plasma + vitamina B12',                          159, 50),
  ('Sueroterapia', 'Cóctel de vida + vitamina B12',                  180, 51),
  ('Sueroterapia', 'Cóctel anti aging',                              180, 52),
  ('Sueroterapia', 'Vitamina C',                                     160, 53)
on conflict (nombre) do nothing;

-- ---------- Tiempo real: el panel se actualiza solo cuando el bot agenda ----------
do $$ begin
  alter publication supabase_realtime add table citas;
exception when duplicate_object then null; end $$;

-- ---------- Cola de avisos por WhatsApp (ver avisos.sql) ----------
-- El panel (o el trigger) crea los avisos y el bot los envía.
create table if not exists avisos (
  id         bigint generated always as identity primary key,
  cita_id    bigint not null references citas on delete cascade,
  tipo       text not null check (tipo in ('confirmacion', 'reprogramacion', 'recordatorio')),
  creado_en  timestamptz not null default now(),
  enviado_en timestamptz,
  via        text check (via in ('bot', 'manual')),
  error      text
);
create index if not exists avisos_pendientes_idx on avisos (creado_en) where enviado_en is null;
create index if not exists avisos_cita_idx on avisos (cita_id);

alter table avisos enable row level security;
drop policy if exists personal_todo on avisos;
create policy personal_todo on avisos for all to authenticated using (es_personal()) with check (es_personal());

-- Al cambiar la fecha u hora de una cita activa, se encola un aviso de reprogramación.
-- Si había otro sin enviar para la misma cita, se reemplaza (solo vale el último horario).
create or replace function avisar_reprogramacion() returns trigger
language plpgsql set search_path = public as $$
begin
  if new.inicio is distinct from old.inicio and new.estado in ('pendiente', 'confirmada') then
    delete from avisos where cita_id = new.id and tipo = 'reprogramacion' and enviado_en is null;
    insert into avisos (cita_id, tipo) values (new.id, 'reprogramacion');
  end if;
  return new;
end $$;

drop trigger if exists citas_avisar_reprogramacion on citas;
create trigger citas_avisar_reprogramacion
  after update of inicio on citas
  for each row execute function avisar_reprogramacion();

-- ---------- Estado del bot de WhatsApp (una sola fila, la actualiza el bot cada minuto) ----------
create table if not exists bot_estado (
  id           smallint primary key default 1 check (id = 1),
  conectado    boolean not null default false,
  numero       text,
  ultima_senal timestamptz
);
insert into bot_estado (id) values (1) on conflict do nothing;
alter table bot_estado enable row level security;
drop policy if exists personal_lee on bot_estado;
create policy personal_lee on bot_estado for select to authenticated using (es_personal());

do $$ begin alter publication supabase_realtime add table avisos;     exception when duplicate_object then null; end $$;
do $$ begin alter publication supabase_realtime add table bot_estado; exception when duplicate_object then null; end $$;
