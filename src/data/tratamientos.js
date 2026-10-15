// Tratamientos por categoría. `precio: null` muestra "Desde [PRECIO]".
// Los precios con valor vienen de las notas de la dueña (docs/notas-duena/): no cambiarlos sin pedido.
export const CATEGORIAS = [
  {
    id: 'limpiezas',
    nombre: 'Limpiezas',
    foto: 'FOTO 2',
    chip: 'Limpiezas',
    items: [
      { nombre: 'Limpieza Premium', desc: 'Retira impurezas y células muertas, y termina con luz LED: azul para calmar la piel o roja para estimular el colágeno.', msg: 'Hola, quiero reservar una Limpieza Premium' },
      { nombre: 'Limpieza profunda de cutis', desc: 'Extracción de puntos negros e impurezas para una piel limpia, fresca y respirable.', msg: 'Hola, quiero reservar una Limpieza profunda de cutis' },
      { nombre: 'Hydrafacial®', desc: 'Limpia, exfolia e hidrata en una sola sesión, sin tiempo de recuperación.', msg: 'Hola, quiero reservar un Hydrafacial' },
      { nombre: 'Limpieza bactericida', desc: 'Pensada para pieles con brotes: limpia en profundidad y ayuda a controlar las bacterias.', msg: 'Hola, quiero reservar una Limpieza bactericida' },
      { nombre: 'Limpieza Elixir', desc: '[DESCRIPCIÓN DEL TRATAMIENTO]', msg: 'Hola, quiero reservar una Limpieza Elixir' },
      { nombre: 'Limpieza profunda para hombres', desc: 'Adaptada a la piel masculina, más gruesa y con mayor producción de grasa.', msg: 'Hola, quiero reservar una Limpieza profunda para hombres' }
    ]
  },
  {
    id: 'faciales',
    nombre: 'Faciales',
    foto: 'FOTO 3',
    chip: 'Faciales',
    items: [
      { nombre: 'HIFU 25D MAX · Rostro', chip: 'Estrella', hot: true, desc: 'Tres tecnologías en un solo tratamiento: levanta, reafirma y define.', lista: ['HIFU · lifting profundo', 'Radiofrecuencia · reafirma y tensa', 'EMS · tonifica y define'], precio: { monto: 'S/ 380', nota: 'Rostro + papada' }, msg: 'Hola, quiero reservar HIFU 25D MAX para rostro' },
      { nombre: 'Hidraglow', chip: 'Pack', desc: 'Limpieza profunda y microneedling para una piel hidratada y luminosa.', lista: ['Limpieza facial profunda', 'Microneedling con activos'], precio: { monto: 'S/ 250' }, msg: 'Hola, quiero reservar el pack Hidraglow' },
      { nombre: 'Renovación Celular', chip: 'Pack', desc: 'Renueva tu piel con limpiezas profundas y microneedling con plasma rico en plaquetas.', lista: ['3 sesiones de limpieza facial profunda', 'Microneedling con PRP'], precio: { monto: 'S/ 450' }, msg: 'Hola, quiero reservar el pack Renovación Celular' },
      { nombre: 'Armonización Facial Deluxe', chip: 'Pack', desc: 'Afina y define los rasgos de tu rostro.', lista: ['5 sesiones de afinamiento facial', '3 aplicaciones de enzimas'], precio: { monto: 'S/ 700' }, msg: 'Hola, quiero reservar la Armonización Facial Deluxe' },
      { nombre: 'Botox · 1 zona o full face', desc: 'Suaviza las líneas de expresión de frente, entrecejo y patas de gallo.', msg: 'Hola, quiero información sobre Botox' },
      { nombre: 'Nabota · 1 zona o full face', desc: 'Toxina botulínica que relaja las arrugas de expresión con un resultado natural.', msg: 'Hola, quiero información sobre Nabota' },
      { nombre: 'Plasma rico en plaquetas', desc: 'Usa los factores de crecimiento de tu propia sangre para mejorar la calidad de la piel.', msg: 'Hola, quiero información sobre Plasma rico en plaquetas' },
      { nombre: 'NCTF® 135 HA', desc: 'Mesoterapia con ácido hialurónico y vitaminas que hidrata y revitaliza la piel.', msg: 'Hola, quiero información sobre NCTF 135 HA' }
    ]
  },
  {
    id: 'corporales',
    nombre: 'Corporales',
    foto: 'FOTO 4',
    chip: 'Corporales',
    items: [
      { nombre: 'HIFU 25D MAX Body', chip: 'Corporal', desc: 'Activa y define la grasa localizada de abdomen y cintura con una remodelación corporal focalizada.', lista: ['Reduce la grasa localizada', 'Reafirma la piel', 'Tratamiento no invasivo'], msg: 'Hola, quiero información sobre HIFU 25D MAX Body' },
      { nombre: 'HIFU 25D en Brazos', chip: 'Pack', desc: 'Brazos más firmes y definidos: mejora la flacidez y el contorno, y estimula el colágeno y la elastina.', listaLabel: 'El pack incluye', lista: ['HIFU', 'Carboxiterapia', 'Ondas rusas'], precio: { monto: 'S/ 200' }, msg: 'Hola, quiero reservar HIFU 25D en Brazos' },
      { nombre: 'Levantamiento de glúteos con peptonas', chip: 'Pack', desc: 'Resalta, tonifica y reafirma tus glúteos con aumento y tonificación localizada.', listaLabel: 'El pack incluye', lista: ['10 aplicaciones de peptonas', 'Ondas rusas', 'Vacumterapia', 'Carboxiterapia'], precio: { monto: 'S/ 380' }, msg: 'Hola, quiero reservar el Levantamiento de glúteos con peptonas' },
      { nombre: 'Hidrolipoclasia enzimática', chip: 'Pack', desc: 'Modela tu figura sin cirugía: reduce medidas de abdomen y ataca la grasa localizada más resistente.', listaLabel: 'El pack incluye', lista: ['Inyección enzimática', 'Carboxiterapia', 'Ultracavitación'], precio: { monto: 'S/ 300', nota: '3 sesiones' }, msg: 'Hola, quiero reservar la Hidrolipoclasia enzimática' },
      { nombre: 'Astrodome', desc: '[DESCRIPCIÓN DEL TRATAMIENTO]', msg: 'Hola, quiero información sobre Astrodome' }
    ]
  },
  {
    id: 'depilacion',
    nombre: 'Depilación láser',
    foto: 'FOTO 5',
    chip: 'Láser',
    items: [
      { nombre: 'Axilas', desc: 'Reduce el vello de forma progresiva, sesión a sesión.', msg: 'Hola, quiero reservar depilación láser de axilas' },
      { nombre: 'Bikini brasilero', desc: 'Depilación completa de la zona íntima con láser.', msg: 'Hola, quiero reservar depilación láser bikini brasilero' },
      { nombre: 'Otras zonas', desc: '[ZONAS DISPONIBLES: piernas, rostro, espalda…]', msg: 'Hola, quiero información sobre depilación láser' }
    ]
  },
  {
    id: 'sueroterapia',
    nombre: 'Sueroterapia',
    foto: 'FOTO 6',
    chip: 'Sueroterapia',
    items: [
      { nombre: 'Sueroterapia', desc: 'Sueros con vitaminas y minerales aplicados por personal de salud. [TIPOS DE SUERO]', msg: 'Hola, quiero información sobre sueroterapia' }
    ]
  }
];

export const MARQUEE = ['HIFU 25D MAX', 'Hidraglow', 'Armonización facial', 'Hidrolipoclasia', 'Glúteos con peptonas', 'Depilación láser', 'Sueroterapia'];
