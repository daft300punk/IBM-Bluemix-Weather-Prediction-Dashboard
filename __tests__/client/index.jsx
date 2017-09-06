/* eslint-env browser */

import _ from 'lodash';
import PT from 'prop-types';
import React from 'react';
import renderer from 'react-test-renderer';

const SRC = '../../src';
const MODULE = `${SRC}/client`;

document.getElementById = id =>
  (id === 'react-view' ? 'REACT-VIEW' : undefined);

window.CONFIG = {
  ACCOUNTS_APP_CONNECT_URL: 'https://dummy.url',
  COOKIES: {
    MAXAGE: 7,
    SECURE: false,
  },
};

window.ISTATE = 'Initial state of Redux store';

/* Mock of react-redux module */

function MockProvider(props) {
  return (
    <div>
      <h1>Mock react-redux Provider</h1>
      {props.children}
    </div>
  );
}

MockProvider.propTypes = {
  children: PT.node.isRequired,
};

jest.setMock('react-redux', {
  Provider: MockProvider,
});

/* Mock of react-router-dom */

const mockBrowserHistory = 'Mock Browser History';

function MockBrowserRouter(props) {
  return (
    <div>
      <h1>Mock react-router-dom BrowserRouter</h1>
      {props.history}
      {props.children}
    </div>
  );
}

MockBrowserRouter.propTypes = {
  children: PT.node.isRequired,
  history: PT.string.isRequired,
};

jest.setMock('react-router-dom', {
  browserHistory: mockBrowserHistory,
  BrowserRouter: MockBrowserRouter,
});

/* Mock of store factory */

const mockStoreFactory = jest.fn(() => Promise.resolve({
  dispatch: _.noop,
  getState: () => ({}),
}));
jest.setMock(`${SRC}/shared/store-factory`, mockStoreFactory);

/* Some other mocks */

jest.setMock(`${SRC}/shared`, {
  default: () => <div>Application</div>,
});

test('Fails to start with process.env.FRONT_END evaluating false', () => {
  jest.resetModules();
  expect(process.env.FRONT_END).toBeUndefined();
  expect(() => require(MODULE)).toThrow();
});

describe('Properly starts with process.env.FRONT_ENV evaluating true', () => {
  /* NOTE: Before each test a promise is stored into this variable, which will
   * resolve once the page is rendered. */
  let rendered;

  afterAll(() => delete process.env.FRONT_END);

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    process.env.FRONT_END = true;

    let resolve;
    rendered = new Promise((r) => { resolve = r; });
    jest.setMock('react-dom', {
      render: (code, target) => resolve({ code, target }),
    });
  });

  test('Constructs Redux store with proper initial state', () => {
    require(MODULE);
    expect(mockStoreFactory).toHaveBeenCalledWith(undefined, window.ISTATE);
  });

  test('Renders proper code (matching snapshot)', () => {
    require(MODULE);
    return rendered.then(({ code, target }) => {
      expect(target).toBe('REACT-VIEW');
      const app = renderer.create(code).toJSON();
      expect(app).toMatchSnapshot();
    });
  });
});

