import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import './assets/base.css';
import 'semantic-ui-css/semantic.min.css';

import App from './components/App/App';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
