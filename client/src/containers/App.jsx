import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import TimingPage from './TimingPage';

import reducer from '../redux/reducers';

const store = createStore(
  reducer,
  applyMiddleware(thunk),
);

export default function App() {
  return (
    <Provider store={store}>
      <TimingPage />
    </Provider>
  );
}
