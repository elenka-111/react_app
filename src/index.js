import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from'react-redux';
import store, { history } from './store';
import { ConnectedRouter } from 'connected-react-router';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import Main from './components/Main';

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Main />
        </ConnectedRouter>
    </Provider>,
  document.getElementById('root')
);

