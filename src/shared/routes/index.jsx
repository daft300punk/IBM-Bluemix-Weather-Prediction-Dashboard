/**
 * The top-level routing of the App.
 */
import 'isomorphic-fetch';
import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import Content from 'components/examples/Content';
import DashboardContainer from 'containers/Dashboard';
import SuggestionDashboardContainer from 'containers/SuggestionDashboard';
import FullMapViewContainer from 'containers/FullMapView';
import Error404 from 'components/Error404';

/* TODO: As we move towards production deploy, we should add a guard which
 * will prevent addition of /examples routes into production build. */
import Examples from './examples';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Content} />
      <Route exact path="/examples" component={Content} />
      <Route path="/examples" component={Examples} />
      <Route path="/dashboard" exact component={DashboardContainer} />
      <Route path="/dashboard/suggestions/:alertId" component={SuggestionDashboardContainer} />
      <Route path="/dashboard/map" component={FullMapViewContainer} />
      <Route component={Error404} />
    </Switch>
  );
}

export default withRouter(Routes);
