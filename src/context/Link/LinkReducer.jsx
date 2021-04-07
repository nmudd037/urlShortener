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

export default (state, action) => {
  switch (action.type) {
    case GET_SHORTEN_URL:
      return {
        ...state,
        shortenUrl: action.payload,
        isShorten: true,
      };
    case GET_ANALYTICS:
      return {
        ...state,
        analytics: action.payload,
        isAnalytics: true,
      };
    case CLEAR_SHORTEN_URL:
      return {
        ...state,
        shortenUrl: null,
        isShorten: false,
      };
    case CLEAR_ANALYTICS:
      return {
        ...state,
        analytics: null,
        isAnalytics: false,
      };
    case SHORTEN_URL_ERROR:
      return { ...state, shortenError: action.payload };
    case ANALYTICS_ERROR:
      return { ...state, analyticsError: action.payload };
    case CLEAR_SHORTENURL_ERRORS:
      return { ...state, shortenError: null };
    case CLEAR_ANALYTICS_ERRORS:
      return { ...state, analyticsError: null };
    default:
      throw new Error(`Unsupported type of: ${action.type}`);
  }
};
