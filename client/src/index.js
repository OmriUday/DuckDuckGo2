import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import App from './App';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import fetchDataReducer from './store/reducers/fetchDataReducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const store = createStore(fetchDataReducer, applyMiddleware(thunk));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
