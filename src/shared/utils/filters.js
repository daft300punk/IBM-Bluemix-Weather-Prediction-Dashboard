/* eslint-disable guard-for-in, no-restricted-syntax */

/**
 * This contins various helper methods to filter data in a way sutiable for
 * different areas of dashboard. The main source of data would be remain to
 * be state.salesForecast.items. We may filter this to get results required  in different
 * sections of the dashboard.
 */

import moment from 'moment';
/**
 * This is responsible for making raw sales forecast data suitable
 * for the alerts section of main dashboard. Pass in state.salesForecast.items to this
 * method and it will return an array of alerts to be used in the main dashboard page's
 * alerts section.
 *
 * Note, we can configure the default value of threshold sales loss/gain percentage above
 * which it will become an alert.
 *
 * @param {array} salesForecastRaw data of the form state.salesForecast.items from which
 * we will extract alerts.
 */
function alertsFilter(
  salesForecastRaw,
  thresholdGain = 24,
  thresholdLoss = 24,
  severityThreshold = 27,
) {
  let filteredData = [];
  for (const locationKey in salesForecastRaw) {
    const locationObject = salesForecastRaw[locationKey];
    for (const dayKey in locationObject) {
      const items = locationObject[dayKey];
      items.forEach((item) => {
        const salesChange =
          ((item.predictedSales - item.avgSalesRate) /
          (item.avgSalesRate)) * 100;

        // For negative changes
        if (salesChange < 0) {
          if (Math.abs(salesChange) < thresholdLoss) {
            // As value is below threshold, don't put it in filteredData
            return;
          }
        }
        if (salesChange >= 0) {
          if (salesChange < thresholdGain) {
            // As value is below threshold, don't put it in filteredData
            return;
          }
        }

        // Now, we can put the value in filteredData, as it satisfies the condition
        // being an alert specified by threshold values.
        const sales = {
          increasing: salesChange > 0,
          isSevere: Math.abs(salesChange) > severityThreshold,
          value: `${Math.abs(salesChange).toFixed(0)}%`,
        };

        // Hard code values that are not coming from api, at least for now.
        const costs = {
          increasing: Math.random() > 0.5,
          value: `${(Math.random() * 10).toFixed(0)}%`,
          isSevere: Math.random() > 0.5,
        };
        const acmeKpi = {
          increasing: Math.random() > 0.5,
          value: `${(Math.random() * 10).toFixed(0)}%`,
          isSevere: Math.random() > 0.5,
        };
        const impacts = [
          'Location 1',
          'Product 001',
          'Product 002',
        ];
        const suggestions = [
          {
            title: 'Rearrange stock from nearby regions',
            text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto',
            sales: {
              increasing: Math.random() > 0.5,
              isSevere: Math.random() > 0.5,
              value: '5.9%',
            },
            costs: {
              increasing: Math.random() > 0.5,
              isSevere: Math.random() > 0.5,
              value: '2.9%',
            },
            acmeKpi: {
              increasing: Math.random() > 0.5,
              isSevere: Math.random() > 0.5,
              value: '3.2%',
            },
          },
          {
            title: 'Promoting substitute products.',
            text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto',
            sales: {
              increasing: Math.random() > 0.5,
              isSevere: Math.random() > 0.5,
              value: '5.9%',
            },
            costs: {
              increasing: Math.random() > 0.5,
              isSevere: Math.random() > 0.5,
              value: '2.9%',
            },
            acmeKpi: {
              increasing: Math.random() > 0.5,
              isSevere: Math.random() > 0.5,
              value: '3.2%',
            },
          },
        ];
        filteredData.push({
          chance: '60%',
          title: `${item.parentUsed.articleName}`,
          cause: 'Cause',
          effect: 'Effect',
          detailsText: 'Issue details lorem ipsum dolor sit amet consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor.',
          location: locationKey,
          sales,
          costs,
          acmeKpi,
          impacts,
          suggestions,
          date: dayKey,
          salesToday: item.predictedSales,
          avgSalesRate: item.avgSalesRate,
          weatherSeverity: item.predictedWeatherSeverity,
          coordinates: item.parentUsed.location_coord,
        });
      });
    }
  }
  filteredData.sort((alert1, alert2) => {
    const date1 = moment(alert1.date, 'MMDDYYYY').format('ll');
    const date2 = moment(alert2.date, 'MMDDYYYY').format('ll');
    if (moment(date2).isSame(date1)) return 0;
    if (moment(date2).isAfter(date1)) return -1;
    return 1;
  });
  filteredData = filteredData.map((data, i) => Object.assign(data, { id: `${i + 1}` }));
  return filteredData;
}

/**
 * Sales Volume of Different Stores on a given day
 */
function salesVolumeByStore(salesForecastRaw, locationName) {
  if (!salesForecastRaw || !locationName) {
    return {};
  }
  const salesVolume = {};

  const days = salesForecastRaw[locationName];
  for (const dayKey in days) {
    const items = days[dayKey];
    items.forEach((item) => {
      if (salesVolume[dayKey] !== undefined) {
        salesVolume[dayKey].avgSalesRate += item.avgSalesRate;
        salesVolume[dayKey].predictedSales += item.predictedSales;
      } else {
        salesVolume[dayKey] = {
          avgSalesRate: item.avgSalesRate,
          predictedSales: item.predictedSales,
        };
      }
    });
  }

  return salesVolume;
}

/**
 * Sales Volume of all store, all products for a given day.
 */
function salesVolumeAll(salesForecastRaw) {
  const salesVolume = {};

  for (const locationKey in salesForecastRaw) {
    const locationObject = salesForecastRaw[locationKey];
    for (const dayKey in locationObject) {
      const items = locationObject[dayKey];
      items.forEach((item) => {
        if (salesVolume[dayKey] !== undefined) {
          salesVolume[dayKey].avgSalesRate += item.avgSalesRate;
          salesVolume[dayKey].predictedSales += item.predictedSales;
        } else {
          salesVolume[dayKey] = {
            avgSalesRate: item.avgSalesRate,
            predictedSales: item.predictedSales,
          };
        }
      });
    }
  }

  return salesVolume;
}

/**
 * This returns data suitable for plotting on graph.
 * @param {object} salesVolumeAllData
 * @param {number} days
 */
function salesVolumeAllGraph(salesVolumeAllData, days = 7) {
  if (!salesVolumeAllData) return {};
  const barData = [];
  // const areaData = [];
  const lineData = [];
  const scatterData = [];
  const keys = Object.keys(salesVolumeAllData);
  const incrementValue = days <= 8 ? 1 : parseInt(days / 7, 10) + 1;
  if (keys.length) {
    for (let i = 0; i < days; i += incrementValue) {
      barData.push({
        x: keys[i].substring(0, 4),
        y: salesVolumeAllData[keys[i]].predictedSales / 1000000,
      });
      scatterData.push({
        x: keys[i].substring(0, 4),
        y: salesVolumeAllData[keys[i]].predictedSales / 1000000,
      });
      lineData.push({
        x: keys[i].substring(0, 4),
        y: salesVolumeAllData[keys[i]].predictedSales / 1000000,
      });
    }
    if (incrementValue !== 1) {
      barData.push({
        x: keys[days - 1].substring(0, 4),
        y: salesVolumeAllData[keys[days - 1]].predictedSales / 1000000,
      });
      scatterData.push({
        x: keys[days - 1].substring(0, 4),
        y: salesVolumeAllData[keys[days - 1]].predictedSales / 1000000,
      });
      lineData.push({
        x: keys[days - 1].substring(0, 4),
        y: salesVolumeAllData[keys[days - 1]].predictedSales / 1000000,
      });
    }
  }
  return {
    barData,
    scatterData,
    lineData,
  };
}

/**
 * This returns data suitable to be plotted on map. Right now keep days = 1. The problem
 * here is overlapping data points. Unless we have a solution for that, only days=1
 * makes sense since more days would only add overlapping coordinates.
 * @param {array} alerts
 * @param {number} days
 */
function mapCoordinateFromAlerts(alerts, days = 1) {
  if (!alerts || !alerts.length) return [];
  const mapCoordinates = [];
  alerts.forEach((alert) => {
    const dayNow = moment(alert.date, 'MMDDYYYY');
    const day1 = moment(alerts[0].date, 'MMDDYYY');
    const diff = dayNow.diff(day1, 'days');
    if (diff - 730485 < days) {
      const coordinates = alert.coordinates.split(', ');
      const value = alert.sales.value.substring(
        0,
        alert.sales.value.length - 1,
      );
      let color;
      if (alert.sales.increasing) {
        color = 'green';
      } else if (alert.sales.isSevere) {
        color = 'red';
      } else {
        color = 'tangerine';
      }
      mapCoordinates.push({
        center: {
          lat: parseFloat(coordinates[0]),
          lng: parseFloat(coordinates[1]),
        },
        radius: parseInt(value, 10) * 3000,
        id: alert.id,
        fillColor: color,
      });
    }
  });
  return mapCoordinates;
}

export default {
  alertsFilter,
  salesVolumeAll,
  salesVolumeAllGraph,
  salesVolumeByStore,
  mapCoordinateFromAlerts,
};
