import Fade from 'react-reveal';
import { Link } from 'react-scroll';

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="content has-text-centered">
        <Fade bottom duration={1000} delay={500} distance="30px">
          <p>
            <Link to="hero" smooth duration={1000}>
              <i className="fad fa-chevron-up"></i>
            </Link>
          </p>
          <p>
            <a href="https://bulma.io">
              <img
                src="https://bulma.io/images/made-with-bulma.png"
                alt="Made with Bulma"
                width="128"
                height="24"
              />
            </a>
          </p>
          <p>
            &copy; {new Date().getFullYear()}. Template developed by{' '}
            <a href="https://github.com/nmudd037" target="_blank" rel="noopener noreferrer">
              MNR
            </a>
            .
          </p>
        </Fade>
      </div>
    </footer>
  );
};

export default Footer;
