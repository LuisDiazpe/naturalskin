// Tratamientos por categoría. `precio: null` muestra "Desde [PRECIO]".
// Lista y precios de la dueña (lista de servicios y precios, 15/10/2026): no cambiarlos sin pedido.
export const CATEGORIAS = [
  {
    id: 'limpiezas',
    nombre: 'Limpiezas',
    foto: 'FOTO 2',
    chip: 'Limpiezas',
    items: [
      { nombre: 'Hidrofacial 7 en 1 · Premium', chip: 'Premium', desc: 'Hidrodermoabrasión que limpia en profundidad, oxigena e hidrata la piel. Resultados visibles desde la primera sesión.', lista: ['Hidrodermoabrasión', 'Oxígeno con activos', 'Radiofrecuencia y EMS', 'Ultrasonido', 'Martillo frío-calor', 'Spray de oxígeno'], precio: { monto: 'S/ 180' }, msg: 'Hola, quiero reservar el Hidrofacial 7 en 1 Premium' },
      { nombre: 'Limpieza facial profunda + radiofrecuencia', desc: 'Limpieza facial profunda que termina con radiofrecuencia.', precio: { monto: 'S/ 199' }, msg: 'Hola, quiero reservar una Limpieza facial profunda + radiofrecuencia' },
      { nombre: 'Limpieza facial + fototerapia + PRP', desc: 'Limpieza facial combinada con fototerapia y plasma rico en plaquetas.', precio: { monto: 'S/ 200' }, msg: 'Hola, quiero reservar una Limpieza facial + fototerapia + PRP' },
      { nombre: 'Facial punta de diamante', desc: 'Facial con punta de diamante.', precio: { monto: 'S/ 199' }, msg: 'Hola, quiero reservar un Facial punta de diamante' },
      { nombre: 'Limpieza facial hidratante', desc: 'Limpieza facial con hidratación.', precio: { monto: 'S/ 99' }, msg: 'Hola, quiero reservar una Limpieza facial hidratante' }
    ]
  },
  {
    id: 'faciales',
    nombre: 'Faciales',
    foto: 'FOTO 3',
    chip: 'Faciales',
    items: [
      { nombre: 'HIFU 25D MAX · Rostro', chip: 'Estrella', hot: true, desc: 'Efecto lifting sin cirugía: eleva las cejas, define el óvalo facial, reduce la papada y suaviza las líneas de expresión.', lista: ['HIFU · lifting profundo', 'Radiofrecuencia · reafirma', 'EMS · tonifica y define', 'Ultrasonido focalizado · modela'], precio: { monto: 'S/ 350', nota: 'Rostro completo + papada' }, msg: 'Hola, quiero reservar HIFU 25D MAX para rostro' },
      { nombre: 'HIFU 25D MAX · Rostro + PRP', chip: 'HIFU', desc: 'HIFU 25D MAX en rostro combinado con plasma rico en plaquetas.', precio: { monto: 'S/ 400' }, msg: 'Hola, quiero reservar HIFU 25D MAX rostro + PRP' },
      { nombre: 'HIFU 25D MAX · Eyes', chip: 'HIFU', desc: 'HIFU 25D MAX enfocado en la zona de los ojos.', precio: { monto: 'S/ 250' }, msg: 'Hola, quiero reservar HIFU 25D MAX Eyes' },
      { nombre: 'Armonización facial con ácido hialurónico', desc: 'Armonización facial con ácido hialurónico.', precio: { monto: 'S/ 450' }, msg: 'Hola, quiero información sobre la armonización facial con ácido hialurónico' }
    ]
  },
  {
    id: 'regenerativos',
    nombre: 'Regenerativos',
    foto: 'FOTO 3',
    chip: 'Regenerativo',
    items: [
      { nombre: 'Plasma rico en plaquetas + máscara hidratante', desc: 'Usa los factores de crecimiento de tu propia sangre para mejorar la calidad de la piel, y termina con una máscara hidratante.', precio: { monto: 'S/ 150' }, msg: 'Hola, quiero reservar Plasma rico en plaquetas + máscara hidratante' },
      { nombre: 'PRP + Dermapen', desc: 'Plasma rico en plaquetas aplicado con Dermapen.', precio: { monto: 'S/ 150' }, msg: 'Hola, quiero reservar PRP + Dermapen' },
      { nombre: 'PRP + exosomas + Dermapen', desc: 'Plasma rico en plaquetas y exosomas aplicados con Dermapen.', precio: { monto: 'S/ 450' }, msg: 'Hola, quiero reservar PRP + exosomas + Dermapen' },
      { nombre: 'PDRN + Dermapen', desc: 'PDRN aplicado con Dermapen.', precio: { monto: 'S/ 400' }, msg: 'Hola, quiero reservar PDRN + Dermapen' },
      { nombre: 'PRP capilar', desc: 'Plasma rico en plaquetas aplicado en el cuero cabelludo.', msg: 'Hola, quiero información sobre PRP capilar' }
    ]
  },
  {
    id: 'corporales',
    nombre: 'Corporales',
    foto: 'FOTO 4',
    chip: 'Corporales',
    items: [
      { nombre: 'HIFU 25D MAX · Corporal', chip: 'HIFU', desc: 'Reduce la flacidez, reafirma y modela abdomen y cintura sin cirugía.', lista: ['Abdomen', 'Cintura'], precio: { monto: 'S/ 400' }, msg: 'Hola, quiero reservar HIFU 25D MAX corporal' },
      { nombre: 'Hidrolipoclasia', desc: 'Modela tu figura sin cirugía: reduce medidas de abdomen y ataca la grasa localizada más resistente.', precio: { monto: 'S/ 350', nota: '3 sesiones' }, msg: 'Hola, quiero reservar la Hidrolipoclasia' },
      { nombre: 'Levantamiento de glúteos con peptonas', desc: 'Resalta, tonifica y reafirma tus glúteos con aumento y tonificación localizada.', precio: { monto: 'S/ 350' }, msg: 'Hola, quiero reservar el Levantamiento de glúteos con peptonas' }
    ]
  },
  {
    id: 'sueroterapia',
    nombre: 'Sueroterapia',
    foto: 'FOTO 6',
    chip: 'Sueroterapia',
    items: [
      { nombre: 'Plasma + vitamina B12', desc: 'Suero con plasma y vitamina B12.', precio: { monto: 'S/ 159' }, msg: 'Hola, quiero información sobre Plasma + vitamina B12' },
      { nombre: 'Cóctel de vida + vitamina B12', desc: 'Cóctel de vida con vitamina B12.', precio: { monto: 'S/ 180' }, msg: 'Hola, quiero información sobre el Cóctel de vida + vitamina B12' },
      { nombre: 'Cóctel anti aging', desc: 'Cóctel antienvejecimiento.', precio: { monto: 'S/ 180' }, msg: 'Hola, quiero información sobre el Cóctel anti aging' },
      { nombre: 'Vitamina C', desc: 'Suero de vitamina C.', precio: { monto: 'S/ 160' }, msg: 'Hola, quiero información sobre el suero de Vitamina C' }
    ]
  }
];

export const MARQUEE = ['HIFU 25D MAX', 'Hidrofacial 7 en 1', 'Punta de diamante', 'Plasma rico en plaquetas', 'Ácido hialurónico', 'Hidrolipoclasia', 'Glúteos con peptonas', 'Sueroterapia'];
