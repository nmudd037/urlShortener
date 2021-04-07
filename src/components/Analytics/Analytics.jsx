import { useContext, useEffect, useState } from 'react';
import Fade from 'react-reveal';

import AlertContext from '../../context/Alert/AlertContext';
import {
  clearAnalytics,
  clearAnalyticsErrors,
  getAnalytics,
  useLink,
} from '../../context/Link/LinkState';
import { isValidHttpUrl, sleep } from '../../utils/utils';
import AnalyticsBox from '../AnalyticsBox/AnalyticsBox';
import Title from '../Title/Title';

const Analytics = () => {
  // Form State
  const initialState = {
    url: '',
  };
  const [analyticslUrl, setAnalyticslUrl] = useState(initialState);
  const { url } = analyticslUrl;

  // Custom Hooks for Link State
  const [linkState, linkDispatch] = useLink();
  const { analytics, isAnalytics, analyticsError } = linkState;

  // Alert Generator
  const { alertGenerator } = useContext(AlertContext);

  const onChange = (e) => setAnalyticslUrl({ ...analyticslUrl, [e.target.name]: e.target.value });

  // On Submit Get Analytics
  const onSubmit = (e) => {
    e.preventDefault();
    if (!isValidHttpUrl(analyticslUrl.url)) {
      return alertGenerator('error', 'Please provide a valid URL');
    }
    getAnalytics(linkDispatch, analyticslUrl);
  };

  // Remove AnalyticsBox on click
  const onClick = () => {
    clearAnalytics(linkDispatch);
    setAnalyticslUrl(initialState);
  };

  // Clear AnalyticsBox after 8 minutes
  useEffect(() => {
    const clear = async () => {
      await sleep(8);
      clearAnalytics(linkDispatch);
      setAnalyticslUrl((analyticsUrl) => ({ ...analyticsUrl, url: '' }));
    };

    if (isAnalytics) {
      clear();
    }
  }, [isAnalytics, linkDispatch]);

  // Display Error Messages
  useEffect(() => {
    if (analyticsError) {
      alertGenerator('error', analyticsError.msg);
      clearAnalyticsErrors(linkDispatch);
    }
  }, [alertGenerator, linkDispatch, analyticsError]);

  return (
    <section id="parallax-2" className="hero is-medium">
      <div className="hero-body">
        <div className="container">
          <Fade left duration={1000} delay={500} distance="30px">
            <Title title={'Know Your Link Analytics'} />

            <form onSubmit={onSubmit}>
              <div className="control">
                <div className="columns">
                  <div className="column is-four-fifths">
                    <input
                      className="input is-hovered"
                      type="text"
                      name="url"
                      id="analyticsUrl"
                      value={url}
                      placeholder="Paste your shortened URL here..."
                      onChange={onChange}
                    />
                  </div>
                  <div className="column has-text-centered">
                    <input
                      className="button is-white is-inverted"
                      type="submit"
                      value="Check Analytics &#9881;"
                    />
                  </div>
                </div>
              </div>
            </form>
          </Fade>
          {
            // Display AnalyticsBox only when requested
            isAnalytics && (
              <Fade left duration={1000} delay={500} distance="30px">
                <AnalyticsBox
                  timestamp={analytics.timestamp}
                  visitors={analytics.visitors}
                  onClick={onClick}
                />
              </Fade>
            )
          }
        </div>
      </div>
    </section>
  );
};

export default Analytics;
