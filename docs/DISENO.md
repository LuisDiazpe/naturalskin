# Sistema de diseño · Natural Skin

## Concepto

El diseño se inspira en el salón real del negocio: paredes blanco y rosa, piso de madera clara con tonos marrones, plantas con flores fucsia, lila y azuladas, y luces cálidas amarillas. La sensación buscada es **cálida, femenina, tranquila y elegante, sin verse recargada**. Para lograrlo se usan pocos colores y mucho espacio en blanco. El logo es dorado: un monograma "NS" con un perfil de mujer.

## Colores

| Token | Hex | Uso |
|---|---|---|
| `--blanco` | `#FFFBF8` | Fondo general |
| `--rosa-pared` | `#FBEDEA` | Secciones alternas, fondos de iconos, chips |
| `--rosa-medio` | `#F6DEDA` | Franja móvil, placeholders de foto |
| `--borde` | `#F1E2DD` | Bordes de tarjetas y separadores |
| `--borde-fuerte` | `#E7CFC8` | Borde de pestañas inactivas, línea de tiempo |
| `--madera` | `#8A5A3B` | Etiquetas pequeñas, iconos secundarios |
| `--madera-oscura` | `#3B2A21` | Títulos, pestaña activa, bloque de reserva |
| `--texto` | `#5A4234` | Párrafos |
| `--fucsia` | `#B8336A` | **Único acento:** botones, palabra en cursiva de cada título, enlaces de acción |
| `--rosa-claro` | `#F2B9C9` | Acento sobre el fondo oscuro |
| `--dorado` | `#C29B3C` | Solo adornos: ✦ de la franja, aro punteado del sello |
| `--dorado-texto` | `#8C6A1F` | Nombre "Natural Skin" en el menú |
| `--lila-luz` | `#B9A6E0` | Solo manchas difuminadas (`filter: blur`) |
| `--luz-calida` | `#F6D79A` | Solo manchas difuminadas |
| `--abierto` / `--cerrado` | `#3F8F5A` / `#D0587E` | Punto del aviso de horario |

Las secciones alternan fondo `--blanco` y `--rosa-pared`. El bloque de reserva usa `--madera-oscura` con manchas fucsia y amarillas difuminadas.

## Tipografía

Hay dos familias, incluidas en `assets/fonts/`:
- **Cormorant Garamond** (serif elegante), en pesos 500, 500 itálica y 600.
- **Jost** (sans limpia), en pesos 300, 400, 500 y 600.

| Nivel | Fuente | Escritorio | Celular | Notas |
|---|---|---|---|---|
| H1 | Cormorant 500 | `clamp(46px, 6.4vw, 80px)`, interlineado 1.02 | 46px | Solo en la portada |
| H2 | Cormorant 500 | `clamp(36px, 4.4vw, 56px)`, interlineado 1.08 | 38px | **Una palabra en cursiva fucsia** (`<em>`) |
| H3 | Jost 500 | 22px | 19px | Nombres de tratamientos y pasos |
| Etiqueta (`.kick`) | Jost 600 | 12px, mayúsculas, espaciado 0.22em | 11px | Va encima de cada H2, en fucsia |
| Párrafo | Jost 300–400 | 17px, interlineado 1.65 | 16px | |
| Lead | Jost 300 | 18px | 17px | Subtítulo de la portada |
| Botón | Jost 500 | 15px, espaciado 0.04em | 16px | |
| Cita / franja | Cormorant 500 itálica | 28px | 22px | |

## Forma y espaciado

- **Contenedor:** máximo 1200px, márgenes laterales de 24px (20px en celular).
- **Secciones:** 112px de padding vertical en escritorio y 64px en celular.
- **Radios:** tarjetas 28px, tarjetas pequeñas 22px, píldoras 999px. Las fotos destacadas tienen **forma de arco**: `border-radius: 999px 999px 32px 32px`.
- **Sombras:** muy suaves y cálidas, `0 22px 44px -22px rgba(59,42,33,.45)`. Ninguna sombra gris dura.
- Iconos de trazo fino de 1.5–1.8px, en el sprite SVG de `index.html`. Sin emojis.

## Componentes

- **Botón principal** (`.btn-primary`): fondo fucsia y texto blanco. Al pasar el mouse sube 3px y aparece una sombra.
- **Botón secundario** (`.btn-ghost`): borde de 1px en madera oscura. Al pasar el mouse se rellena de madera oscura.
- **Pestañas** (`.tab`): píldoras blancas con un contador. La activa se rellena de madera oscura. Siguen el patrón ARIA tabs y se navegan con las flechas del teclado.
- **Tarjeta de tratamiento** (`.t-card`): foto redonda de 96px, chip ("Pack", "Estrella" o la categoría), título, descripción, lista opcional con checks fucsia (`.t-list`, con la etiqueta `.t-list-label` "El pack incluye"), y un pie con el precio (`.price`: "S/ 380" en Cormorant 28px más una nota pequeña opcional, por ejemplo "3 sesiones") o "Desde [PRECIO]", junto al enlace "Reservar →", que abre WhatsApp con un mensaje según el tratamiento. La variante `.t-card-hot` (borde dorado y chip fucsia "Estrella") se usa solo para el HIFU 25D MAX.
- **Sello del logo** (`.seal`): disco blanco con el monograma, un aro dorado punteado que gira y una ligera flotación.
- **Tarjeta flotante** y **píldora oscura**: adornos sobre la foto de portada.
- **Acordeón FAQ**: `<details name="faq">`, que en navegadores modernos deja abierta solo una pregunta a la vez. El "+" gira hasta formar "×".
- **Aviso de horario** (`[data-status]`): punto de color más texto, calculado con la hora de Lima.
- **Barra fija inferior** (solo celular): botón "Reservar por WhatsApp" y botón redondo de llamada.

## Estructura de la página

1. **Header fijo** con fondo blanco translúcido y desenfoque. Lleva el monograma, el nombre en dorado, el menú (Tratamientos · Nosotros · Por qué elegirnos · Preguntas) y el botón "Reservar cita". En celular cambia a menú hamburguesa.
2. **Portada:** etiqueta, H1 "Tu piel, en su versión más *natural*", subtítulo, dos botones y tres checks. A la derecha, la foto en arco con manchas de luz, el sello del logo y las tarjetas flotantes.
3. **Franja móvil:** nombres de tratamientos que se desplazan en bucle, separados por ✦ dorados.
3b. **Tratamiento estrella** (`#hifu`): tarjeta grande rosada con la foto en arco y una etiqueta flotante de precio (S/ 380 · rostro + papada). Lleva el título "HIFU 25D MAX: 3 tecnologías en *1 tratamiento*", las 3 tecnologías como lista numerada (círculos de madera oscura unidos por una línea), chips "Sin cirugía" y "Sin tiempo de recuperación", y el botón de reserva. En celular se apila: foto arriba y texto abajo.
4. **Tratamientos** (`#tratamientos`): 5 pestañas (Limpiezas 6 · Faciales 5 · Corporales 1 · Depilación láser 3 · Sueroterapia 1) y una cuadrícula de tarjetas. Cierra con la nota "¿No sabes cuál elegir? Agenda una evaluación".
5. **Nuestro espacio** (`#espacio`, fondo rosa): galería de 3 fotos (una alta en arco) junto al texto y 3 beneficios con icono.
6. **Tu visita:** 3 pasos numerados 01, 02 y 03.
7. **Recién abrimos** (`#compromiso`, fondo rosa): 3 promesas y el bloque "Sé una de nuestras *primeras clientas*", con espacio para una promoción de apertura. Esta sección **reemplaza a la de reseñas y antes/después**, que se agregará cuando haya clientas que den permiso.
8. **Preguntas frecuentes** (`#preguntas`): 5 preguntas.
9. **Reservar** (`#reservar`): bloque oscuro con el logo, el título, el aviso de horario y los botones de WhatsApp y llamada.
10. **Footer:** logo completo, dirección, horario, aviso "Abierto ahora" y contacto. **No hay redes sociales todavía.**

## Animaciones

Todas se desactivan con `prefers-reduced-motion: reduce`.

| Animación | Dónde | Detalle |
|---|---|---|
| Entrada en cascada | Portada | Clases `.in-1` a `.in-5`: suben 28px y aparecen, con 0.12s de diferencia entre cada una |
| Aparición al hacer scroll | Bloques con `.reveal` | `IntersectionObserver` agrega `.is-visible` |
| Manchas que flotan | Fondos | `drift`, 12–15s en bucle, muy lento |
| Sello flotante con aro que gira | Portada | `float` de 7s y `spin` de 18s |
| Franja móvil | Bajo la portada | `marquee` de 32s, lineal |
| Tarjetas en cascada | Al cambiar de pestaña | Retraso de `--i × 70ms` |
| Tarjetas que se elevan | Hover en escritorio | Suben 8px y la foto se agranda ×1.06 |
| Flecha que empuja | "Desliza para ver más" (celular) | `nudge` |

Curva de animación base: `cubic-bezier(.2,.7,.2,1)`.

## Comportamiento en celular (≤ 768px)

- Menú hamburguesa que despliega enlaces grandes en Cormorant de 26px y el botón de reserva.
- Portada: primero el texto, con los botones a todo el ancho. Los checks se ven como chips rosados. La foto en arco va debajo, con el sello a la derecha.
- Tratamientos: las pestañas se deslizan en horizontal y las tarjetas se deslizan con *scroll snap* (268px de ancho, foto arriba de 160px de alto). Aparece el aviso "Desliza para ver más →".
- Nuestro espacio: primero el texto y después la galería.
- Pasos: línea de tiempo vertical con números en círculos.
- Promesas: tarjetas horizontales con el icono a la izquierda.
- **Barra fija inferior** de reserva. El `body` tiene `padding-bottom` para que la barra no tape el contenido.

## Mapa de fotos (las toma el negocio en su salón)

De día, con luz natural y las luces cálidas encendidas. Las fotos con rostro necesitan **autorización escrita** de la persona.

| # | Sección | Qué fotografiar | Formato |
|---|---|---|---|
| 1 | Portada (arco) | Rostro con piel luminosa, de perfil o en tres cuartos, con la pared rosa de fondo | Vertical 4:5 · 1200×1500 |
| 2 | Limpiezas | Manos con guantes limpiando el rostro, o la luz LED sobre la piel | Cuadrada 800×800 |
| 3 | Faciales | Aplicación en la frente o los pómulos, o el equipo HIFU en uso | Cuadrada 800×800 |
| 4 | Corporales | El equipo Astrodome o una sesión corporal, sin mostrar el rostro | Cuadrada 800×800 |
| 5 | Depilación láser | Cabezal del láser sobre la piel de un brazo o una pierna | Cuadrada 800×800 |
| 6 | Sueroterapia | Sillón y suero preparado, en ambiente cálido | Cuadrada 800×800 |
| 7 | Nuestro espacio (alta, en arco) | Sala completa: paredes blanco y rosa, piso de madera, camilla, luces cálidas | Vertical 3:4 · 1200×1600 |
| 8 | Nuestro espacio | Plantas con flores fucsia, lila o azuladas junto a una luz amarilla | Cuadrada 800×800 |
| 9 | Nuestro espacio | Detalle: camilla preparada o productos ordenados | Cuadrada 800×800 |
| 10 | Tratamiento estrella (arco) | El equipo HIFU 25D MAX en uso sobre el rostro o la mandíbula | Vertical 4:5 · 1200×1500 |
| — | Más adelante | Antes y después: mismo ángulo, misma luz y misma distancia | Vertical 4:5 |

## Logo

En `assets/img/`:
- `logo-original.png`: el archivo original, con fondo blanco.
- `logo-natural-skin.png`: el logo completo con fondo **transparente**. Se usa en el footer.
- `logo-monograma.png` y `logo-monograma-160.png`: solo el círculo "NS", transparente. Se usa en el header, el sello de la portada, el bloque "primeras clientas" y el bloque de reserva.
- `favicon-32.png`, `favicon-180.png` y `favicon-512.png`.

Para un resultado aún más nítido, conviene pedir al diseñador del logo una versión **SVG** o un PNG transparente en alta resolución.
