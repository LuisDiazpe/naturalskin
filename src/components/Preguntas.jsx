import { Icon } from './ui';

const FAQ = [
  ['¿Cuál es el horario de atención?', 'Lunes a jueves de 9:00 a. m. a 7:00 p. m. y viernes de 9:00 a. m. a 5:00 p. m. Los domingos atendemos solo con cita previa. Los sábados no atendemos.'],
  ['¿Necesito reservar cita?', 'Te recomendamos reservar por WhatsApp para asegurar tu horario. Los domingos la cita previa es obligatoria.'],
  ['¿Cómo sé qué tratamiento es para mí?', 'En tu primera visita evaluamos tu piel y te recomendamos el tratamiento que más te conviene.'],
  ['¿Cuánto dura una sesión?', 'Depende del tratamiento: [DURACIÓN APROXIMADA].'],
  ['¿Qué medios de pago aceptan?', 'Yape, Plin y efectivo.']
];

export default function Preguntas() {
  return (
    <section id="preguntas" className="section">
      <div className="container faq">
        <div className="sec-head reveal">
          <p className="kick">Preguntas frecuentes</p>
          <h2 className="h2">Lo que más nos <em>preguntan</em></h2>
        </div>
        <div className="faq-list">
          {FAQ.map(([q, a], i) => (
            <details key={q} name="faq" open={i === 0}>
              <summary>{q}<span className="plus"><Icon id="plus" size={16} /></span></summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
