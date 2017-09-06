import _ from 'lodash';
import moment from 'moment';
import config from 'config';
import WeatherDataService from './WeatherDataService';
import SolrServices from './SolrServices';

/**
 * Calculate weather severity using the same formula before in MockSalesDataService.
 * The value of severity is then used to find the day with severity closest to
 * calculated severity. The sales on that day gives a fair prediction of what the sales
 * should be.
 *
 * @param {Number} meanTempToday the forecast mean temp today
 * @param {Number} meanTempAvg avg mean temp from almanac services that day.
 * @param {Number} hi higest temp from almanac service that day.
 * @param {Number} lo lowest temp from almanac services that day.
 * @returns {Number} severity a measure of how severe weather will be.
 */
function calculateSeverity(meanTempToday, meanTempAvg, hi, lo) {
  const range = Math.max(Math.abs((hi - meanTempAvg) / 2), Math.abs((lo - meanTempAvg) / 2));
  const severity = (meanTempToday - meanTempAvg) / range;
  return Math.abs(severity);
}

/**
 * Returns forecast sales for the next 10 days. Note, we can only go as far as
 * 10 days, since weather service can predict weather only for the next 10 days.
 *
 * @param {Object} geocode geocode object containing lat, long
 * @param {Object} itemName should be article name from config/dummyConfig/saleArticle
 * @returns {Array} salesForecast for next 10 days, with a few more accompanying
 * parameters.
 */
async function getForecast(geocode, itemName) {
  try {
    // Dates in format weatherHistory service accepts.
    const startDate = moment().add(1, 'day').format('MMDD');
    const endDate = moment().add(10, 'day').format('MMDD');

    let weatherHistory = await WeatherDataService
      .getWeatherHistory(geocode, { startDate, endDate });
    weatherHistory = await weatherHistory.json();

    // almanac_summaries contains the relevant array
    const almanacSummaries = weatherHistory.almanac_summaries;

    let weatherForecast = await WeatherDataService
      .getWeatherForecast(geocode, 'daily', '10day');
    weatherForecast = await weatherForecast.json();

    const forecasts = weatherForecast.forecasts;
    // The first data is actually the data for today. Only predict for
    // starting from tomorrow.
    forecasts.shift();

    const severityArray = [];
    const resultPromise = [];

    // Collect promises in an array.
    _.forEach(forecasts, (forecast, index) => {
      const meanTempToday = (forecast.day.temp + forecast.night.temp) / 2;
      const severity = calculateSeverity(
        meanTempToday,
        almanacSummaries[index].mean_temp,
        almanacSummaries[index].record_hi,
        almanacSummaries[index].record_lo,
      ).toFixed(4);
      severityArray.push(severity);
      resultPromise.push(SolrServices.searchCollection(
        config.SOLR_CLUSTER_ID,
        {
          articleName: itemName,
          weather_severity: `[${severity} TO 1]`,
        },
        {
          weather_severity: 'asc',
        },
        1,
      ));
    });

    // wait for all promises to resolve.
    let result = await Promise.all(resultPromise);

    // format the return data in desired way.
    result = result.map((item, index) => {
      const meanTempToday =
        (forecasts[index].day.temp + forecasts[index].night.temp) / 2;
      const avgTempHistory = almanacSummaries[index].mean_temp;
      return {
        weather_severity: severityArray[index],
        predicted_sales: item.response.docs[0].salesToday,
        mean_temp_today: meanTempToday,
        avg_temp_history: avgTempHistory,
        avg_sales: item.response.docs[0].avgSalesRate,
      };
    });
    return result;
  } catch (e) {
    throw e;
  }
}

/**
 * This service can be used to get sales forecast for all the products in a given
 * location. So, for example, passing in the geocode and locationName of NewYork
 * will give you sales forecast for all the products sold at NewYork location.
 *
 * Consider NewYork contains 10 articles, and we want to get sales forecast for
 * the next 10 days. We make one api call to Almanac service to get the past
 * weather data for the next 10 days. We make one call to Weather Forecast service
 * to get forecast data for the next 10 days. Now for each day, we calculate
 * weather severity, and then call R&R service to find the document with severity
 * closest to the one we calculated before.
 *
 * Thus, in total, for NewYork in this case, we made total 12 api calls to
 * IBM Services, mostly(10) to R&R service.
 *
 * Note, however, we will cache this for one day to minimize unnecessary calls,
 * as the data wouldn't change in the same day.
 *
 * @param {Object} geocode the geodode info of the place
 * @param {String} locationName location name
 */
async function getForecastAllForOneLocation(geocode, locationName) {
  try {
    // Dates in format weatherHistory service accepts.
    const startDate = moment().add(1, 'day').format('MMDD');
    const endDate = moment().add(10, 'day').format('MMDD');

    // Get weatherhistory data for the above days.
    let weatherHistory = await WeatherDataService
      .getWeatherHistory(geocode, { startDate, endDate });
    weatherHistory = await weatherHistory.json();

    // almanac_summaries contains the relevant array
    const almanacSummaries = weatherHistory.almanac_summaries;

    // Get weather forecast for the next three days.
    let weatherForecast = await WeatherDataService
      .getWeatherForecast(geocode, 'daily', '10day');
    weatherForecast = await weatherForecast.json();
    const forecasts = weatherForecast.forecasts;

    // The first data is actually the data for today. Only predict for
    // starting from tomorrow.
    forecasts.shift();

    const severityArray = [];
    const resultPromise = [];

    // Collect promises in an array.
    _.forEach(forecasts, (forecast, index) => {
      const meanTempToday = (forecast.day.temp + forecast.night.temp) / 2;
      const severity = calculateSeverity(
        meanTempToday,
        almanacSummaries[index].mean_temp,
        almanacSummaries[index].record_hi,
        almanacSummaries[index].record_lo,
      ).toFixed(4);
      severityArray.push(severity);

      const query = {
        weather_severity: `[${severity} TO 100]`,
        location_name: `${locationName.split(' ').join('')}`,
      };

      const group = {
        field: 'groupId',
        limit: '1',
      };

      const sortObject = {
        weather_severity: 'asc',
      };
      resultPromise.push(SolrServices
        .customQuery(process.env.SOLR_CLUSTER_ID, query, group, sortObject));
    });

    // wait for all promises to resolve.
    const result = await Promise.all(resultPromise);

    const normalizedResult = {};
    _.forEach(result, (resultItem, index) => {
      const groupedResult = resultItem.grouped.groupId.groups;
      const items = [];
      _.forEach(groupedResult, (groupedItem) => {
        const doc = groupedItem.doclist.docs[0];
        items.push({
          parentUsed: Object.assign({}, doc),
          predictedSales: doc.salesToday,
          avgSalesRate: doc.avgSalesRate,
          predictedWeatherSeverity: severityArray[index],
        });
      });

      const key = `${moment().add(index + 1, 'day').format('MMDDYYYY')}`;
      normalizedResult[key] = items;
    });
    return normalizedResult;
  } catch (e) {
    throw e;
  }
}

const SalesForecastService = {
  getForecast,
  getForecastAllForOneLocation,
};

export default SalesForecastService;
