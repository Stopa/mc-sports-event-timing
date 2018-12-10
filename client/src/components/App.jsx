import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import logo from '../logo.svg';
import './App.css';

import WebsocketHandler from '../containers/WebsocketHandler';
import TimesTable from '../containers/TimesTable';

import reducer from '../redux/reducers';

const store = createStore(reducer);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <WebsocketHandler>
          <TimesTable />
        </WebsocketHandler>
      </Provider>
    );
  }
}

export default App;
