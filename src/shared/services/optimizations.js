import data from './optimizationsMockData';


const getOptimizations = () => new Promise((resolve) => {
  setTimeout(() => resolve(data), 1000);
});

export default {
  getOptimizations,
};
