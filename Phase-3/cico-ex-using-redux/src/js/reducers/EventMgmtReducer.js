import * as EventMgmtActionTypes from '../actiontypes/EventMgmtActionTypes';

export default function eventMgmtReducer(state, action) {
  switch(action.type) {
    case EventMgmtActionTypes.ADD_EVENT_REQUEST_INITIATED:
      return {...state, addEventState: { ...state.addEventState, addEventRequested : action.addEventRequested } }

    case EventMgmtActionTypes.ADD_EVENT_REQUEST_ERROR:
      return {...state, addEventState: { addEventRequested : action.addEventRequested, addEventError : action.addEventError } }

    case EventMgmtActionTypes.ADD_EVENT_REQUEST_COMPLETED:
      return {...state, addEventState: {...state.addEventState, addEventRequested : action.addEventRequested } }

    case EventMgmtActionTypes.MODIFY_EVENT_REQUEST_INITIATED:
      return {...state, modifyEventState: {...state.modifyEventState, modifyEventRequested : action.modifyEventRequested }}

    case EventMgmtActionTypes.MODIFY_EVENT_REQUEST_ERROR:
      return {...state, modifyEventState: {modifyEventRequested : action.modifyEventRequested, modifyEventError: action.modifyEventError }}

    case EventMgmtActionTypes.MODIFY_EVENT_REQUEST_COMPLETED:
      return {...state, modifyEventState: {...state.modifyEventState, modifyEventRequested : action.modifyEventRequested }}

    case EventMgmtActionTypes.GET_EVENT_LIST_REQUEST_INITIATED:      
      return {...state, eventListState: {...state.eventListState, isFetching: action.isFetching }}

    case EventMgmtActionTypes.GET_EVENT_LIST_REQUEST_ERROR:      
      return {...state, eventListState: {...state.eventListState, isFetching: action.isFetching, isFetchError: action.isFetchError }}

    case EventMgmtActionTypes.GET_EVENT_LIST_REQUEST_COMPLETED:      
      let updatedEventList = action.responseData != null ? action.responseData.cicoevents : state.eventListState.eventList;      
      return {...state, eventListState: {...state.eventListState, isFetching: action.isFetching, eventList : updatedEventList }}

    default:
      return state;
  }
}