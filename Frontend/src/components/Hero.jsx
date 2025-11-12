import React, { useEffect, useRef, useState } from 'react';
import '../CSS/hero.css';
import imagen from '..//assets/LOGO BLANCO.png';

const Hero = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  

  return (
    <section ref={sectionRef} className={visible ? 'visible' : ''}>
  <div className="hero-top">
    <div className="textos">
      <h1>Escuela Municipal</h1>
      <h2>Juan Gregorio de Jesús Díaz</h2>
    </div>
    <div className="imagen">
      <img src={imagen} alt="Escuela" />
    </div>
  </div>

  <div className="hero-bottom">
    <h2>Nuestra escuela</h2>
    <h3>
      La Escuela Municipal Gregorio de Jesús Díaz de BRS nació del sueño de brindar educación pública de calidad a nuestra comunidad, con valores de inclusión, respeto y compromiso.
    </h3>
    <h3>
      Con el compromiso de docentes, directivos y vecinos, la escuela ha ido construyendo su identidad a lo largo de los años, fortaleciendo vínculos y generando espacios de participación activa.
    </h3>
    <h2>
      Hoy seguimos creciendo, incorporando nuevas tecnologías, proyectos culturales y espacios de formación...
    </h2>
  </div>
</section>

  );
};

export default Hero;

