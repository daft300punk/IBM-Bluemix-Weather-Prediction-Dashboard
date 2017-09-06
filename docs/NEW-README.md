### Video URL
1. https://youtu.be/2ruQPGi-ljI

### Setting up the environment variables
1. See ```config/default.json```. You may want to set stuff in production.json/development.json, for our purposes, default.json should suffice. You can use my credentials in dev, however note that R&R maybe down/under maintenance, as it was yesterday, although it shouldn't affect us since in dev we use cached response(more on this below).
2. In ```config/default.json``` you should see a description of how you will obtain those credentials.
3. Getting a SOLR_CLUSTER_ID is not trivial. You can read about the various endpoints in detail in
POC-backend.md.
4. Once you create Retrieve and Rank service in IBM Bluemix console, put the the RR_UNAME, RR_PASSWORD in default.json. 
5. Next, we begin by creating a new solr cluster. Make a call to ```/api/solr/createCluster```. This creates a solr cluster, and you should  see info about the same. Note the cluster_id and paste it 
into the config/default.json CLUSTER_ID key. You can pass clusterName and clusterSize as query params. clusterSize is not changeable in free version.
6. Next, make a call to ```/api/solr/uploadSolronfig/:clusterId```. This uploads the ```solr-config.zip``` file present inside config folder.
7. Next, make a solr collection by visiting ```/api/solr/createSolrCollection/:clusterId```. Now, upload the sales data by visiting ```/api/solr/uploadSalesData/:clusterId```. This will generate
mock sales data and upload it on R&R instance.
8. Make sure to read POC-backend.md to get an idea of endpoints implemented in a challenge before.

### Running the app in dev
1. Follow the main README.md file. 

### Description
Following is a brief description of what the spec says vs what is implemented. -
1. Merge POC services into prototype app
    1. All the services have been moved although, they are not directly isomorphic. Read section on Isomorphic services below.
    2. config files / generation of mock data etc moved into config folder.
    3. Readme updated.
2. Update default configuration for generation of mock sales data:
    1. Although entire list could be taken, the weather service api only allows 10 api calls per minute
    in free tier, so I take 10 cities.
    2. Added 10 sale items.
3. Wire the following UI components / functionality to the services
    1. Detailed discussion below.

### Note on lint errors/ui styles
1. Most lint/style issues would have been solved in another challenge.


### Notes on Isomorphic Services
1. The fetch api cannot have urls with credentials, thus the server side services are not isomorphic and can't be called
on the front-end.
2. We create proxy isomorphic services inside ```src/shared/services``` which are very simple services that
just call proper urls on the backend and pass along the data.
3. All non-isomorphic services are available inside ```src/server/services```. The endpoints from previous challenge
are still valid, and so are postman collections.
4. I've only created proxy isomorphic services for the endpoints we would need in the front end, all others may be used for development. The docs from last challenge still hold.
5. See Example usage to add new services from POC endpoints, if required.

### Example - Adding a new service for a POC endpoint.
We should only need the service for fetching sales forecast on the front end. Any new service is unlikely to be required, but an example usage is provided following the same data-fetch example already provided in the starter. Here's how to
do it.

1. Define your isomorphic service inside ```src/shared/services/watson```. All POC related isomorphic services go here.
See the example inside ```src/shared/services/watson/MockSalesDataService.js```. It's a simple service just calling
the proper baceknd url. Nothing complex here.
2. Define your actions inside ```src/shared/actions/mockSalesData.js```. Our case is similar to Data Fetch example already provided.
3. The related reducer is ```src/shared/reducers/mockSalesData.js```. Make sure you use reducer factories. More about it in docs.
4. The related container is ```src/shared/containers/MockSalesData```. This is available at
```/mockSaleData``` route on the front-end for you to see.

### Note on reducing api calls
1. The previous salesForecast endpoint ```/salesForecast/:locationName/:itemName```, took one api call for each location each item. This would have meant making 100 api calls for 10 locations and 10 items.
2. The key is forming efficient solr queries. This is not trivial. We use something called grouping. I added a new field to solr config called groupId. It's value is string
```${locationName}**{articleName}```. And then we group our results based on this field.
Thus for one location we now will be making only one api call. Now our calls come down to 10 vs 100 before. See the related controller code - method getSalesForecastAll - ```src/server/controllers/SalesForecastController.js``` and the related service code - line method getForecastAllForOneLocation in ```src/server/services/SalesForecastService.js```.
3. Since, the weather forecast doesn't change every moment of the day, we can cache the result. See, line 88 of ```src/server/server.js```, where we use module apicache to cache all calls made  to endpoint ```/api/salesForecast/all``` for one day. This duration can be chagned.
4. In dev, we further reduce api calls to IBM by using a cached sample response, saved at
```config/sales-forecast-cached.json```. See the related service - ```src/shared/services/watson/SalesForecastService.js```, which calls the real api only in production, that is when USE_DEV_TOOLS is set to false.
5. If you want to see real response in dev, just make a call to ```/api/salesForecast/all``` and inspect the returned json.

### Notes on data returned by new endpoint ```/api/salesForecast/all```
1. The endpoint returns an object of the following form - 
```js 
  {
    locationName1: {
      date1: {
        ...
      },
      date2: {
        ...
      }
      ...
    },
    locationName2: {
      date1: {
        ...
      },
      ...
    }
  }
```
2. locationNames are thus assumed unique.

### Notes on redux state
1. Most of the additions are in state.salesForecast
2. state.salesForecast.items -
This holds the data returned from the service calling backend api, i.e /api/salesForecast/all endpoint.
3. state.salesForecast.salesVolumeAll - this is the sales volume data for all the stores and products combined for a given day. This is used
to render the Sales Volume Graph on the home Dashboard page.
4. state.salesForecast.alerts - when we have all the salesForecast data in state.salesForecast.items, we can filter these to get alerts based on configured specifications. See the function alertsFilter in ```src/shared/utils/filters.js```. We can provide threshold values of gains/losses/severity, which will decide which salesForecast become alerts. Default values have been provided. Note, currently we only have the sales key of an alert being dynamically loaded from api result. All others are hard coded for now. See the mentioned function.
5. state.salesVolumeAllGraphSelectValue: the selected value of dropdown on sales volume graph in the home dashboard page.
6. state.salesVolumeByStoreGraphSelectedValue: the selected value of dropdown on sales volume by store graph, present on the page ```dashboard/suggestions/:id```.

### Notes on filter
1. These are various helper methods that can take raw sales forecast data i.e. state.salesForecast.items and convert it into
forms consumable by different components in the app. See file ```src/shared/utils/filters.js
2. Read more about them in comments.


### Notes on implemented UI functionality
1. The cards on main dashboard screen, i.e. the alerts.
    1. Loaded dynamically from the backend.
    2. Added sale article name, location and date to the card.
    3. Sales % value comes from backend.
    4. Other values are hardcoded.
    5. The relevant state is state.salesForecast.alerts
    6. You may see a lot them now. What qualifies as an alert is configurable using the filter function. As of now, there are more 1000 sales forecast, which are mostly equally distributed. This will not be case with real data. Where we should
    have lesser forecasts qualifying as alerts.
2. Map
    1. The points on map are loaded dynamically. See the related filter, which for now, only takes the alerts for the next day, and generates data suitable to be sent as prop to Graph component. The problem is overlapping points. The number of days is configurable, but more days = more overlap. So, for now I use day = 1, at least until we figure out what to do with overlapping data.
    2. The map on suggestions page shows only the location that has been selected.
    3. Right now, the dropdown button is not working, for the reason in point 1. But since the filter is configureable, this will be easy to do once we figure out what to do with overlapping points.
    4. Although the size of points have been used according to sales % value, it may not be visible because there is negligible differences. See the radius props sent to Circle component inside Map component.
    5. TODO: Do the math related to determining proper radius(so that the points are visible properly) for different domains.
3. Graph
    1. Sales Volume Graph on the home dashboard page shows the sales volume.
    2. The select values work here. See related filter.
    3. TODO: Again, implement the math involved with determining the proper domain to map the data to, so the points/bars render nicely with proper sizing.
    4. The graph in design/prototype was made with combination of 4 graphs - bar, scatter, line and ares. The green transluscent area graph(see design or attached image) covering the line/point graph had to commented out from the main graph because we don't have the value of max and min values of salesVolume for a given day.
4. Timeline present on FullMapView
    1. Not connected. TBD. The problem is right now data doesn't have a time field. All the alerts would stack on top of one another, with no literal side stacking as in design.