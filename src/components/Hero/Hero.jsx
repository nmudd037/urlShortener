import Fade from 'react-reveal';
import { Link } from 'react-scroll';

const Hero = () => {
  return (
    <section className="hero is-medium" id="hero">
      <div className="hero-body">
        <div className="container">
          <Fade left duration={1000} delay={500} distance="30px">
            <h1 className="title is-1">URL SHORTENER</h1>
            <h2 className="subtitle">
              A URL shortener is a simple tool that takes a long URL and turns it into whatever URL
              you would like it to be.
            </h2>
            <Link to="parallax-1" smooth duration={1000}>
              <button className="button is-white is-medium is-inverted">
                Try it!&ensp;<i className="fad fa-chevron-right"></i>
              </button>
            </Link>
          </Fade>
        </div>
      </div>
    </section>
  );
};

export default Hero;
