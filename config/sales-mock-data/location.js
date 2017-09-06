/**
* 1. Each item in locations array should contain latitude and longitude
* 2. timespan should contain starting and end date in shown format
*/
// TODO: Better replace name with placeId.
module.exports = {
  dummyLocations: [
    { geocode: { latitude: '40.7127', longitude: '-74.0059' }, name: 'NewYork' },
    { geocode: { latitude: '34.0522', longitude: '-118.2436' }, name: 'Los Angeles' },
    { geocode: { latitude: '38.9072', longitude: '-77.0369' }, name: 'Washington DC' },
    { geocode: { latitude: '37.7783', longitude: '-122.0369' }, name: 'San Fransisco' },
    { geocode: { latitude: '41.8370', longitude: '-87.6818' }, name: 'Chicago' },
    { geocode: { latitude: '33.5722', longitude: '-112.0880' }, name: 'Phoenix' },
    { geocode: { latitude: '40.0094', longitude: '-75.1333' }, name: 'Philadelphia' },
    { geocode: { latitude: '29.4724', longitude: '-98.5251' }, name: 'San Antonio' },
    { geocode: { latitude: '32.8153', longitude: '-117.1350' }, name: 'San Diego' },
    { geocode: { latitude: '32.7757', longitude: '-96.7967' }, name: 'Dallas' },
  ],
  // mm-dd-yyyy Both dates are inclusive.
  timespan: {
    startDate: '2017-01-01',
    endDate: '2017-02-01',
  },
};
