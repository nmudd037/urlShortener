import axios from 'axios';
import { useContext, useReducer } from 'react';

import {
  ANALYTICS_ERROR,
  CLEAR_ANALYTICS,
  CLEAR_ANALYTICS_ERRORS,
  CLEAR_SHORTEN_URL,
  CLEAR_SHORTENURL_ERRORS,
  GET_ANALYTICS,
  GET_SHORTEN_URL,
  SHORTEN_URL_ERROR,
} from '../types';
import LinkContext from './LinkContext';
import LinkReducer from './LinkReducer';

// Create a custom hook to use the Link context
export const useLink = () => {
  const { state, dispatch } = useContext(LinkContext);
  return [state, dispatch];
};

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// Action creators

// Get Shorten URL
export const getShortenUrl = async (dispatch, url) => {
  try {
    const res = await axios.post('https://urlshortener-mnr.herokuapp.com/api/shorten', url, config);

    dispatch({ type: GET_SHORTEN_URL, payload: res.data.shortenUrl });
  } catch (err) {
    dispatch({ type: SHORTEN_URL_ERROR, payload: err.response.data });
  }
};

// Get Analytics
export const getAnalytics = async (dispatch, analyticsUrl) => {
  try {
    const { url } = analyticsUrl;
    const id = url.split('/')[3];
    if (!id) {
      return dispatch({
        type: ANALYTICS_ERROR,
        payload: { msg: 'Please provide a registered Shortened URL, to get the analytics' },
      });
    }
    const res = await axios.get(`https://urlshortener-mnr.herokuapp.com/api/analytics/${id}`);

    dispatch({ type: GET_ANALYTICS, payload: res.data });
  } catch (err) {
    dispatch({ type: ANALYTICS_ERROR, payload: err.response.data });
  }
};

// Clear Shorten URL
export const clearShortenUrl = (dispatch) => {
  dispatch({ type: CLEAR_SHORTEN_URL });
};

// Clear Analytics
export const clearAnalytics = (dispatch) => {
  dispatch({ type: CLEAR_ANALYTICS });
};

// Clear ShortenUrl Errors
export const clearShortenUrlErrors = (dispatch) => {
  dispatch({ type: CLEAR_SHORTENURL_ERRORS });
};

// Clear ShortenUrl Errors
export const clearAnalyticsErrors = (dispatch) => {
  dispatch({ type: CLEAR_ANALYTICS_ERRORS });
};

const LinkState = (props) => {
  const initialState = {
    shortenUrl: null,
    analytics: null,
    isShorten: null,
    isAnalytics: null,
    shortenError: null,
    analyticsError: null,
  };

  const [state, dispatch] = useReducer(LinkReducer, initialState);

  return (
    <LinkContext.Provider
      value={{
        state: state,
        dispatch,
      }}
    >
      {props.children}
    </LinkContext.Provider>
  );
};

export default LinkState;
