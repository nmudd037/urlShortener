import { useContext, useEffect, useState } from 'react';
import Fade from 'react-reveal';
import { Link } from 'react-scroll';

import AlertContext from '../../context/Alert/AlertContext';
import {
  clearShortenUrl,
  clearShortenUrlErrors,
  getShortenUrl,
  useLink,
} from '../../context/Link/LinkState';
import { isValidHttpUrl, sleep } from '../../utils/utils';
import ShortenerBox from '../ShortenerBox/ShortenerBox';
import Title from '../Title/Title';

const Shortener = () => {
  // Form State
  const initialState = {
    url: '',
  };
  const [originalUrl, setOriginalUrl] = useState(initialState);
  const { url } = originalUrl;

  // Custom Hooks for Link State
  const [linkState, linkDispatch] = useLink();
  const { shortenUrl, isShorten, shortenError } = linkState;

  // Alert Generator
  const { alertGenerator } = useContext(AlertContext);

  const onChange = (e) => setOriginalUrl({ ...originalUrl, [e.target.name]: e.target.value });

  // On Submit Get Shorten URL
  const onSubmit = (e) => {
    e.preventDefault();
    if (!isValidHttpUrl(originalUrl.url)) {
      return alertGenerator('error', 'Please provide a valid URL');
    }
    getShortenUrl(linkDispatch, originalUrl);
  };

  // Remove ShortenBox on click
  const onClick = () => {
    clearShortenUrl(linkDispatch);
    setOriginalUrl(initialState);
  };

  // Clear ShortenBox after 8 minutes
  useEffect(() => {
    const clear = async () => {
      await sleep(8);
      clearShortenUrl(linkDispatch);
      setOriginalUrl((originalUrl) => ({ ...originalUrl, url: '' }));
    };

    if (isShorten) {
      clear();
    }
  }, [isShorten, linkDispatch]);

  // Display Error Messages
  useEffect(() => {
    if (shortenError) {
      alertGenerator('error', shortenError.msg);
      clearShortenUrlErrors(linkDispatch);
    }
  }, [alertGenerator, linkDispatch, shortenError]);

  return (
    <section id="parallax-1" className="hero is-medium">
      <div className="hero-body">
        <div className="container">
          <Fade left duration={1000} delay={500} distance="30px">
            <Title title={'Shorten Your Link'} />

            <form onSubmit={onSubmit}>
              <div className="control">
                <div className="columns">
                  <div className="column is-four-fifths">
                    <input
                      className="input is-hovered"
                      type="text"
                      name="url"
                      id="shortenUrl"
                      value={url}
                      placeholder="Paste your long URL here..."
                      onChange={onChange}
                    />
                  </div>
                  <div className="column has-text-centered">
                    <input
                      className="button is-white is-inverted"
                      type="submit"
                      value="Shorten URL &#9986;"
                    />
                  </div>
                </div>
              </div>
            </form>
          </Fade>
          {
            // Display ShortenerBox only when requested
            isShorten && (
              <Fade left duration={1000} delay={500} distance="30px">
                <ShortenerBox link={shortenUrl} onClick={onClick} />
              </Fade>
            )
          }
        </div>
        <Fade left duration={1000} delay={500} distance="30px">
          <div className="has-text-centered mt-8">
            <Link to="parallax-2" smooth duration={1000}>
              <button className="button is-white is-inverted is-medium">
                Know the Analytics&ensp;<i className="fad fa-chevron-right"></i>
              </button>
            </Link>
          </div>
        </Fade>
      </div>
    </section>
  );
};

export default Shortener;
