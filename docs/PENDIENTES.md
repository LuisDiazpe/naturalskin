# Pendientes

## Datos que esperamos de la dueña

Cuando lleguen las respuestas, reemplaza los marcadores `[…]`.

**Recibido el 15/10/2026** (Excel): lista completa de servicios y precios, descripción del Hidrofacial 7 en 1 y del HIFU 25D MAX, dirección (Av. José Pardo 1101, Miraflores), celular/WhatsApp 921 460 505 y medios de pago (Yape, Plin, efectivo). Ya está en la web. Este catálogo reemplaza al anterior.

**Falta:**
1. **Descripciones** de cada servicio (qué hace y para quién es), sobre todo: punta de diamante, PDRN, exosomas, cóctel de vida, cóctel anti aging, sueros.
2. **Precio del PRP capilar.**
3. ¿Los precios son por sesión? ¿Son fijos o de promoción? ¿El HIFU corporal es por zona (abdomen o cintura) o ambas?
4. **Referencia** de la dirección (piso, local, frente a…) y **correo**.
5. **Duración aproximada** de las sesiones (pregunta frecuente).
6. ¿Con qué **marcas de productos** trabajan? (para "Productos [MARCAS]" en la portada).
7. **Médico:** PRP, ácido hialurónico, peptonas, hidrolipoclasia y sueros son procedimientos médicos; en Perú los debe aplicar un médico. Nombre y CMP para mostrar "Tratamientos aplicados por el Dr./Dra. [NOMBRE] · CMP [N.º]".
8. ¿Hay promoción de apertura? Si no, se borra esa línea del bloque "primeras clientas".

Descartado por ahora: fotos de antes y después y reseñas, porque el negocio es nuevo.

## Tareas técnicas abiertas

- [ ] Reemplazar los placeholders de foto `.ph` por las fotos reales en WebP cuando el negocio las tome (ver el mapa de fotos en `DISENO.md`).
- [x] Configurar `CONFIG.whatsapp` y `CONFIG.telefono` en `src/config.js`.
- [x] Completar el `<title>`, la meta descripción y el JSON-LD con el distrito y la dirección reales. Al publicar, poner URLs absolutas en `og:image`.
- [ ] Generar una imagen Open Graph de 1200×630 (logo sobre fondo rosa) para cuando compartan el enlace por WhatsApp.
- [ ] Agregar un mapa de Google Maps (iframe con `loading="lazy"`) o un botón "Cómo llegar" en el footer cuando haya dirección.
- [ ] Revisar si corresponde un **Libro de Reclamaciones virtual** (Indecopi) y un enlace a la política de privacidad.
- [ ] Publicar: hoy hay una vista previa en GitHub Pages (https://luisdiazpe.github.io/naturalskin/). Falta el hosting definitivo y el dominio propio (.com o .pe).
- [ ] **Siguiente fase:** sistema de reservas de citas (agenda visible para el negocio) y bot de WhatsApp que responda consultas y agende citas.
- [ ] Revisar Lighthouse (rendimiento, accesibilidad y SEO de 90 o más) en celular.
- [ ] Futuro: sección de resultados y reseñas cuando haya clientas que den permiso, y enlaces a redes sociales cuando existan.
