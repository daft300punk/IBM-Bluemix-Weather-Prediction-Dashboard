import fetch from 'isomorphic-fetch';

/**
 * This is just a proxy service. We can't call fetch with a url containing
 * credentials. Thus, server side services are not isomorphic and can't be
 * used on the front-end.
 *
 * @returns data The generated mock data.
 */

async function generateSalesData() {
  const data = await fetch('/api/mockData');
  return data;
}

export default {
  generateSalesData,
};
