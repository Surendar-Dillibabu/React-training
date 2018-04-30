import React from 'react';
import ReactDOM from 'react-dom';
import './css/App.css';
import Application from './js/components/Application';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import EventMgmtReducer from './js/reducers/EventMgmtReducer';
import axios from 'axios';

function getProcessList() {
  return axios.get('http://localhost:8090/CicoRestServiceExample/event/getProcessList', {
    timeout: 1000,
  });
}

function getEventTypeList() {
  return axios.get('http://localhost:8090/CicoRestServiceExample/event/getEventTypeList', {
    timeout: 1000,
  });
}

function getIssuePriorityList() {
  return axios.get('http://localhost:8090/CicoRestServiceExample/event/getIssuePriorityList', {
    timeout: 1000,
  });
}

axios.all([getProcessList(), getEventTypeList(), getIssuePriorityList()])
.then(axios.spread(function (processList, eventTypeList, issuePriorityList) {
  const initialState = {
    processList : processList.data.eventprocess,
    typeOfEventList : eventTypeList.data.eventtype,
    issuePriorityList : issuePriorityList.data.issuepriority,
    eventListState : {eventList : [], isFetching : false, isFetchError : false},
    addEventState : {addEventRequested : false, addEventError : false},
    modifyEventState : {modifyEventRequested : false, modifyEventError : false}
  }

/*
  const customMiddleWare = store => next => action => {
    console.log('Middleware is triggered :', action);
    console.log(`current store : ${store.getState()}`);
    next(action);
  }
*/

  const store = createStore(EventMgmtReducer, initialState, applyMiddleware(thunk));

  ReactDOM.render((
    <Provider store={store}>
      <Application /> 
    </Provider>)
    , document.getElementById('root'));
  registerServiceWorker();
}));
