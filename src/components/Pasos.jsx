const PASOS = [
  ['Reserva', 'Escríbenos por WhatsApp y elige el día y la hora que te acomoden.'],
  ['Evaluamos tu piel', 'Conversamos sobre lo que buscas y revisamos tu tipo de piel.'],
  ['Tu tratamiento', 'Lo realizamos con calma y te damos indicaciones para cuidarte en casa.']
];

export default function Pasos() {
  return (
    <section className="section">
      <div className="container">
        <div className="sec-head reveal">
          <p className="kick">Tu visita</p>
          <h2 className="h2">Así de <em>simple</em></h2>
        </div>
        <ol className="steps">
          {PASOS.map(([t, d], i) => (
            <li key={t} className="step reveal"><span className="step-num">{`0${i + 1}`}</span><div><h3 className="h3">{t}</h3><p>{d}</p></div></li>
          ))}
        </ol>
      </div>
    </section>
  );
}
