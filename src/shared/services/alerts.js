import data from './alertsMockData';


const getAlerts = () => new Promise((resolve) => {
  setTimeout(() => resolve(data), 1000);
});

export default {
  getAlerts,
};
