import fetch from 'isomorphic-fetch';
import salesForecastCached from '../../../../config/sales-forecast-cached.json';

const USE_DEV_TOOLS = Boolean(process.env.DEV_TOOLS);

/**
 * This is just a proxy service. We can't call fetch with a url containing
 * credentials. Thus, server side services are not isomorphic and can't be
 * used on the front-end.
 *
 * @returns data The generated mock data.
 */

async function getSalesDataForecast() {
  /**
   * I have saved a sample response from the server in config/sales-forecast-cached.json
   * This should be used in dev to save api calls to IBM services, even though
   * api calls to related route are cached on server as well for one day. But in
   * dev, restarting server constantly will do away with the benefits of server
   * caching.
   */
  if (USE_DEV_TOOLS) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(salesForecastCached), 2000);
    });
  }
  /**
   * To test the real api in dev, you may call localhost:3000/api/salesForecast/all
   * and see if the returned data is like the imported cached json(salesForecastCached).
   */
  return fetch('/api/salesForecast/all');
}

export default {
  getSalesDataForecast,
};
