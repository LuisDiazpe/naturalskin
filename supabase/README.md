# Supabase · configuración inicial

Proyecto: `https://emnnaonzcnoancjofmom.supabase.co`

1. **Crear las tablas:** Supabase → SQL Editor → New query → pega todo `schema.sql` → Run. Se puede volver a ejecutar sin duplicar datos.
2. **Crear tu usuario:** Authentication → Users → Add user → Create new user (correo + contraseña, marca "Auto Confirm User").
3. **Darle acceso al panel** (SQL Editor, cambia el correo):
   ```sql
   insert into personal (user_id, nombre)
   select id, 'Luis' from auth.users where email = 'tu-correo@ejemplo.com';
   ```
4. **Cerrar el registro público:** Authentication → Sign In / Providers → desactiva "Allow new users to sign up". Así nadie más puede crearse una cuenta.

## Claves

- `VITE_SUPABASE_URL` y `VITE_SUPABASE_PUBLISHABLE_KEY` (en `/.env`) son **públicas**: van en el navegador. La seguridad la dan las reglas RLS de `schema.sql`.
- La **service_role / secret key** es secreta: solo para el bot, en `bot/.env` (no se sube a GitHub). Nunca la pegues en el chat ni en el código.
