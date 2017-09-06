/**
 * Demo container for the Mock Sales Data.
 */

import _ from 'lodash';
import React from 'react';
import PT from 'prop-types';
import actions from 'actions/mockSalesData';
import { connect } from 'react-redux';

class MockSalesData extends React.Component {
  componentDidMount() {
    if (!this.props.data && !this.props.loading) this.props.loadData();
  }

  render() {
    if (this.props.data) {
      return <pre>{JSON.stringify(this.props.data, null, 2)}</pre>;
    }
    if (this.props.loading) return <div>Loading...</div>;
    return <div>Initial State: no data, and not loading yet.</div>;
  }
}

export default connect(
  state => state.mock,
  dispatch => ({
    loadData: () => {
      dispatch(actions.mock.dataFetch.fetchDataInit());
      dispatch(actions.mock.dataFetch.fetchDataDone());
    },
  }),
)(MockSalesData);

MockSalesData.defaultProps = {
  data: null,
  loading: false,
  loadData: _.noop,
};

MockSalesData.propTypes = {
  data: PT.arrayOf(PT.shape({})),
  loading: PT.bool,
  loadData: PT.func,
};
