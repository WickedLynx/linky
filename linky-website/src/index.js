import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import thunk from 'redux-thunk';
import reducers from './reducers';
import App from './containers/app';

const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <div id='rootContainer'>
      <App></App>
    </div>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
