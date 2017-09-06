# IBM COGNITIVE - WEATHER SALES PERFORMANCE ANALYTICS
1. Refer ```docs/NEW-README.md``` for setting up things related to IBM watson on POC backend.

# Isomorphic ReactJS App

### UI Prototype Design
1. Imgur album - http://imgur.com/a/PZImp
![1](http://i.imgur.com/jalS2vh.png)
![2](http://i.imgur.com/DtaNS7Q.png)
![3](http://i.imgur.com/FrIvSmC.png)
### Deployment and Execution

1.  You should have NodeJS 6.10.0 (other recent versions should also work fine);

2.  Install dependencies with one of the following commands:
    -   `$ npm install` Installs all dependencies. Recommended for local development;
    -   `$ npm install --production` Installs only production dependencies. These include all you need to run linters & unit tests, to build & run production version of the App. Does not include additional development tools.

3.  Run linters and unit tests with following commands:
    -   `$ npm run lint:js` Runs ESLint (AirBnB style);
    -   `$ npm run lint:scss` Runs Stylelint (standard Stylelint style);
    -   `$ npm run lint` Runs both ESLint and Stylelint;
    -   `$ npm run jest` Runs unit tests;
    -   `$ npm run jest -- -u` Runs unit test with update of component snapshots;
    -   `$ npm test` Runs ESLint, Stylelint and unit tests.

4.  Set environment variables:
    -   `PORT` Specifies the port to run the App at. Defaults to 3000;
    -   `NODE_ENV` Specifies the environment to use. Should be either `development` either `production`. Defaults to `production`. Environments are defined in the
    `config/` directory.

5.  To rebuild the App's frontend (initially, it is automatically build as a part of the install step) run one of (the result of build will be output into `/build` folder in both cases):
    -   `$ npm run build` To rebuild production frontend;
    -   `$ npm run build:dev` This command should only be used to test whether development build of the front end works. You don't have to execute this command to run development version of the App (the server will automatically build frontend in memory anyway). You can't successfully execute this command without installing dev dependencies.

6. To run the App use:
    -   `$ npm start` To run the App in normal mode. The frontend will be served from `/build` folder.
    -   `$ npm run dev` To run the App with development tools. In this case the frontend is build in memory by server and uses dev tools like redux-devtools. This demands dev dependencies installed at the firts step.

Development dependencies include StyleFMT. You can execute `$ npm run fix:styles` to automatically correct you stylesheets to comply with Stylelint rules (but it can fail for some rules).
To automatically correct js files, you can use `npm run fix:js`.

### Configuration for *logentries.com*

We use [https://logentries.com](https://logentries.com) to track the logs. Log Entries API token should be provided via the `LOG_ENTRIES_TOKEN` environment variable, which will override the default values set in `/config/default.json` (sample account for local setup testing), and in `/config/production.json` (empty token) - with empty token Log Entries will not be used.

### Development Notes
-   [**Why Reducer Factories and How to Use Them?**](docs/why-reducer-factories-and-how-to-use-them.md)

### Current Status

*Note:* Server-side rendering is supported. It means, if you go to `/src/server/App.jsx` and remove the line `<_script type="application/javascript" src="/bundle.js"></script>`, which loads JS bundle in the page, when you start the App and load any page, you'll still see a properly rendered page (without any interactivity). It means that loading of JS bundle and initialization of ReactJS do not block the proper rendering of the page.

*Setup of this App is not finished yet. Here is a brief summary of current configuration and problems found on the way.*

This App already contains:
- A high-level draft of isomorphic App structure;
- A dummy client App;
- Autoprefixer;
- Babel with latest JS support both client- and server-side;
- ESLint (AirBnB style);
- Express server;
- Font loading (Roboto fonts are included into the repo);
- Hot Module Replacement for JS code and SCSS styles in dev environment;
- Isomorphic fetch;
- Loading of .svg assets as ReactJS components with babel-plugin-inline-react-svg
- Node-Config;
- React;
- React CSS Modules (via Babel plugin);
- [react-css-themr](https://github.com/javivelasco/react-css-themr);
- React Router;
- Redux with Flux Standard Actions, redux-promise middleware, support of server-side rendering, and DevTools for dev environment;
- SCSS support;
- CSS support for third party modules;
- StyleFMT;
- Stylelint for scss (standard Stylelint style);
- Unit testing with Jest;
- Various examples;
- Webpack;

Pending low-priority stuff (these are important, but can be added along the way):
- Webpack Dashboard (https://github.com/FormidableLabs/webpack-dashboard);

### Deployment to IBM Bluemix

**Prerequisites**

- [Bluemix account](https://console.ng.bluemix.net/registration/)
- [Cloud Foundry CLI](https://github.com/cloudfoundry/cli#downloads)

**Deployment steps**

1. Go to https://console.eu-gb.bluemix.net
2. Click Create app
3. Pick 'SDK for Node.js' in the 'Cloud Foundry Apps' section
4. Pick any free App name and click Create
5. Edit the manifest.yml file, by changing the `name` and `host` to your app name
6. Login to your Bluemix account: `cf login` if you haven't already
7. Push your app to Bluemix: `cf push`

**Note: Instance memory size**

The app can be deployed on an instance with 1024M of memory (set in the manifest.yml
file). With instances with smaller amount of memory, an error causes the deployment
to fail ('Staging failed: Exited with status 223 (out of memory)').
Note that the app keeps running normally when decreasing the amount of memory after deployment.
