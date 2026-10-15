# Pendientes

## Datos que esperamos de la dueña

Cuando lleguen las respuestas, reemplaza los marcadores `[…]`.

**Recibido el 14/10/2026** (notas a mano): HIFU 25D MAX rostro, Hidraglow, Renovación Celular, Armonización Facial Deluxe, HIFU 25D MAX Body, HIFU 25D en Brazos, Levantamiento de glúteos con peptonas e Hidrolipoclasia enzimática, con sus precios. Ya están en la web (ver `CONTENIDO.md`).

**Falta de lo recibido:**
- Precio del **HIFU 25D MAX Body**.
- Confirmar la ortografía de **"Hidraglow"** y **"Renovación Celular"** (letra a mano).
- ¿Los precios son por sesión o por el pack completo? ¿Son de promoción o fijos?
- ¿Siguen vigentes los tratamientos de la lista anterior que no salieron en las notas (limpiezas, Botox, Nabota, plasma, NCTF, Astrodome, depilación láser, sueroterapia)? Si alguno no se ofrece, hay que borrar su tarjeta.

1. **Precios** de cada tratamiento (precio "desde"). Si Botox y Nabota cambian de precio entre 1 zona y full face, los dos. ¿Hay promociones o paquetes?
2. **Limpieza Elixir:** qué incluye y para qué tipo de piel es.
3. **Astrodome:** qué es, cómo funciona y qué resultado busca. ¿Hay otros tratamientos corporales?
4. **Depilación láser:** qué zonas atienden y si también atienden a hombres.
5. **Sueroterapia:** qué tipos de suero tienen y quién los aplica.
6. **Equipos y marcas:**
   - ¿El Hydrafacial es el equipo original? Si no → "Hidratación facial profunda".
   - ¿El NCTF® 135 HA es el producto de Filorga? Si no → "Mesoterapia facial con ácido hialurónico".
   - ~~¿El HIFU es Ultralift?~~ Resuelto: su equipo es el HIFU 25D MAX.
   - ¿Con qué marcas de productos trabajan? (para "Productos [MARCAS]")
7. **Contacto:** dirección con distrito y referencia, WhatsApp, teléfono fijo y correo.
8. **Preguntas frecuentes:** duración aproximada de las sesiones y medios de pago.
9. **Médico:** ¿los inyectables (Botox, Nabota, plasma) los aplica un médico? Nombre y CMP. En Perú solo los puede aplicar un médico. Mostrarlo da confianza: se puede agregar una línea "Tratamientos inyectables aplicados por el Dr./Dra. [NOMBRE] · CMP [N.º]" en la pestaña Faciales.

Descartado por ahora: fotos de antes y después y reseñas, porque el negocio es nuevo.

## Tareas técnicas abiertas

- [ ] Reemplazar los placeholders de foto `.ph` por las fotos reales en WebP cuando el negocio las tome (ver el mapa de fotos en `DISENO.md`).
- [ ] Configurar `CONFIG.whatsapp` y `CONFIG.telefono` en `js/main.js`.
- [ ] Completar el `<title>`, la meta descripción, Open Graph y el JSON-LD con el distrito y la dirección reales. Al publicar, poner URLs absolutas en `og:image`.
- [ ] Generar una imagen Open Graph de 1200×630 (logo sobre fondo rosa) para cuando compartan el enlace por WhatsApp.
- [ ] Agregar un mapa de Google Maps (iframe con `loading="lazy"`) o un botón "Cómo llegar" en el footer cuando haya dirección.
- [ ] Revisar si corresponde un **Libro de Reclamaciones virtual** (Indecopi) y un enlace a la política de privacidad.
- [ ] Publicar: hosting estático gratuito (Netlify, Vercel, Cloudflare Pages o GitHub Pages) y dominio propio (.com o .pe).
- [ ] Revisar Lighthouse (rendimiento, accesibilidad y SEO de 90 o más) en celular.
- [ ] Futuro: sección de resultados y reseñas cuando haya clientas que den permiso, y enlaces a redes sociales cuando existan.
