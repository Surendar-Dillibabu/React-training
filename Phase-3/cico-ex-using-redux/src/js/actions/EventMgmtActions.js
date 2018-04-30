import * as EventMgmtActionTypes from '../actiontypes/EventMgmtActionTypes';
import axios from 'axios';

export const addEventRequestAction = () => {
  return {
    type: EventMgmtActionTypes.ADD_EVENT_REQUEST_INITIATED,
    addEventRequested: true,
  }
}

export const addEventErrorAction = () => {
  return {
    type: EventMgmtActionTypes.ADD_EVENT_REQUEST_ERROR,    
    addEventError: true
  }
}

export const addEventResponseAction = () => {
  return {
    type: EventMgmtActionTypes.ADD_EVENT_REQUEST_COMPLETED,    
    addEventRequested: false,    
  }
}

export const modifyEventRequestAction = () => {
  return {
    type: EventMgmtActionTypes.MODIFY_EVENT_REQUEST_INITIATED,
    modifyEventRequested: true
  }
}

export const modifyEventErrorAction = () => {
  return {
    type: EventMgmtActionTypes.MODIFY_EVENT_REQUEST_ERROR,
    modifyEventRequested: false,
    modifyEventError: true
  }
}

export const modifyEventResponseAction = () => {
  return {
    type: EventMgmtActionTypes.MODIFY_EVENT_REQUEST_COMPLETED,
    modifyEventRequested: false
  }
}

const getEventListRequestAction = () => {
  return {
    type: EventMgmtActionTypes.GET_EVENT_LIST_REQUEST_INITIATED,
    isFetching: true
  }
}

const getEventListErrorAction = () => {
  return {
    type: EventMgmtActionTypes.GET_EVENT_LIST_REQUEST_ERROR,
    isFetching: false,
    isFetchError: true
  }
}


const getEventListResponseAction = (responseData) => {
  return {
    type: EventMgmtActionTypes.GET_EVENT_LIST_REQUEST_COMPLETED,
    isFetching: false,
    responseData
  }
}

export const getEventListDetailsAction = () => {
  return function getEventDetailsFromServer(dispatch) {

    dispatch(getEventListRequestAction());
    return axios.get('http://localhost:8090/CicoRestServiceExample/event/getAllEvents', { timeout: 1000 })
    .then(function (response) {
      // dispatching the action to mention that the event api request action is completed by passing the response      
      return dispatch(getEventListResponseAction(response.data));
    }).catch(error => {      
      dispatch(getEventListErrorAction());
    });
  }
}

export const addEventDetailsAction = (eventId, typeOfEvent, observazioneValue, issuePriority, serviceName, eventDesc, impactedProcessesArr) => {
  return function saveEventInServer(dispatch) {

    dispatch(addEventRequestAction());
    return axios.post('http://localhost:8090/CicoRestServiceExample/event/addEvent', {"eventId" : eventId, "typeOfEvent" : typeOfEvent, 
      "observazione" : observazioneValue, "issuePriority" : issuePriority, "serviceName" : serviceName, 
      "eventDesc" : eventDesc, "impactedProcesses" : impactedProcessesArr}, { timeout: 1000 })
    .then(function (response) {
      // dispatching the action to mention that the event add action is completed
      return dispatch(addEventResponseAction());      
    }).catch(error => {
      dispatch(addEventErrorAction());
    });
  }
}

export const modifyEventDetailsAction = (eventId, typeOfEvent, observazioneValue, issuePriority, serviceName, eventDesc, impactedProcessesArr) => {
  return function modifyEventInServer(dispatch) {

    dispatch(modifyEventRequestAction());
    return axios.post('http://localhost:8090/CicoRestServiceExample/event/modifyEvent', {"eventId" : eventId, "typeOfEvent" : typeOfEvent, 
      "observazione" : observazioneValue, "issuePriority" : issuePriority, "serviceName" : serviceName, 
      "eventDesc" : eventDesc, "impactedProcesses" : impactedProcessesArr}, { timeout: 1000 })
    .then(function (response) {
      // dispatching the action to mention that the event modify action is completed
      return dispatch(modifyEventResponseAction());      
    }).catch(error => {
      dispatch(modifyEventErrorAction());
    });
  }
}

export default getEventListDetailsAction;