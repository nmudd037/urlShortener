import './styles/main.scss';

import { Fragment } from 'react';

import Analytics from './components/Analytics/Analytics';
import Footer from './components/Footer/Footer';
import Hero from './components/Hero/Hero';
import Shortener from './components/Shortener/Shortener';
import AlertState from './context/Alert/AlertState';
import LinkState from './context/Link/LinkState';

const App = () => {
  return (
    <Fragment>
      <LinkState>
        <AlertState>
          <Hero />
          <Shortener />
          <Analytics />
          <Footer />
        </AlertState>
      </LinkState>
    </Fragment>
  );
};

export default App;
