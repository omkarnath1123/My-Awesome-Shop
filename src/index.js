import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore , combineReducers } from 'redux';
import counterReducer from './Containers/store/reducers/counter';
import resultsReducer from './Containers/store/reducers/result';
import { Provider } from 'react-redux';

const rootReducer = combineReducers({
    ctr : counterReducer,
    res : resultsReducer
});

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
