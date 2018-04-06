import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Application from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render( (<BrowserRouter> 
                    <Application /> 
                  </BrowserRouter>)
, document.getElementById('root'));
registerServiceWorker();