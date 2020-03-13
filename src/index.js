import React from 'react';
import ReactDOM from 'react-dom';

import qs from "qs";

import App from './App';

const DEFAULT_URL = "http://localhost:3000";

const url = qs.parse(window?.location?.search?.slice(1))?.url;
const pathname = !!window?.location?.pathname?.slice(1) ? window.location.pathname.slice(1) : null;

ReactDOM.render(<App url={ url ?? pathname ?? DEFAULT_URL} />, document.getElementById('root'));