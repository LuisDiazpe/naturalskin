-- =========================================================
-- Natural Skin · Cola de avisos por WhatsApp (reprogramaciones)
-- Pegar completo en Supabase → SQL Editor → New query → Run.
-- Se puede volver a ejecutar sin problemas.
-- =========================================================

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
