import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './app/app';
import './app/util/dayjs.ext';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
