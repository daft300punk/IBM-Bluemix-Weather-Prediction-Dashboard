import SalesForecastService from '../services/SalesForecastService';

import locations from '../../../config/sales-mock-data/location';

/**
 * Path - /salesForecast/:locationName/:itemName
 *
 * Sends the forecast sales for the next 10 days. The forecast sales
 * is an array containing individual sales object for the 10days.
 *
 * The locationName should uniquely identify one from the dummyLocations
 * array inside config/dummyDataConfig/location.js.
 */
async function getSalesForecast(req, res) {
  try {
    const itemName = req.params.itemName;
    const locationName = req.params.locationName;

    const location = locations.dummyLocations.filter((item) => {
      if (item.name === locationName) return true;
      return false;
    });

    // location array now only has one element after filtering.
    const geocode = location[0].geocode;

    const salesForecast = await SalesForecastService.getForecast(geocode, itemName);
    res.json(salesForecast);
  } catch (e) {
    res.status(520).send('Error retrieving sales forecast.');
  }
}

/**
 * Path - /salesForecast/all
 *
 * This should be used to get sales forecast of all locations/products at once.
 * Note, however it can make alot of api calls. We do cache the results of the
 * calls to this route, so those calls will only be ever made once a day. Still,
 * use this method carefully.
 *
 */
async function getSalesForecastAll(req, res) {
  try {
    const listLocation = locations.dummyLocations;
    const promiseArray = [];

    // Make calls for all locations.
    listLocation.forEach((location) => {
      promiseArray.push(
        SalesForecastService.getForecastAllForOneLocation(location.geocode, location.name),
      );
    });
    const result = await Promise.all(promiseArray);
    const normalizedResult = {};
    listLocation.forEach((location, index) => {
      normalizedResult[location.name] = result[index];
    });
    res.json(normalizedResult);
  } catch (e) {
    res.status(520).send(`Error ${e}`);
  }
}

export default {
  getSalesForecast,
  getSalesForecastAll,
};
