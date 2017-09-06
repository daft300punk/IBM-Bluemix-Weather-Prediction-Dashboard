/**
 * Routes of various examples of using various staff
 * available in this App code.
 */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import CssModules from 'components/examples/CssModules';
import FontsTest from 'components/examples/FontsTest';
import SvgLoading from 'components/examples/SvgLoading';
import Themr from 'components/examples/Themr';
import MockSalesData from 'containers/MockSalesData';

import DataFetch from './DataFetch';

export default function Examples() {
  return (
    <Switch>
      <Route path="*/css-modules" component={CssModules} />
      <Route path="*/data-fetch" component={DataFetch} />
      <Route path="*/fonts-test" component={FontsTest} />
      <Route path="*/svg-loading" component={SvgLoading} />
      <Route path="*/themr" component={Themr} />
      <Route path="*/mockSalesData" component={MockSalesData} />
    </Switch>
  );
}
