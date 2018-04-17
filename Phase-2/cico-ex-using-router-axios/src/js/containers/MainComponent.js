import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import EventListPageComponent from '../components/EventListPageComponent';
import EventPageManagement from '../components/EventPageManagement';
import CommonErrorComponent from '../components/CommonErrorComponent';

class MainComponent extends React.Component {
  constructor(props){    
    super(props);    
    this.getInitializeStateData = this.getInitializeStateData.bind(this);
    this.setInitialStates = this.setInitialStates.bind(this);
    this.saveEventDetailsFn = this.saveEventDetailsFn.bind(this);    
    this.modifyEventFn = this.modifyEventFn.bind(this);
    this.modifyEventDetailsFn = this.modifyEventDetailsFn.bind(this);    
    this.getUpdatedEventList = this.getUpdatedEventList.bind(this);
    this.getInitializeStateData();
    this.state = {
      processList : [],
      typeOfEventList : [],
      issuePriorityList : [],
      eventList : []
    };
  }

  getInitializeStateData(){
    axios.all([this.getProcessList(), this.getEventTypeList(), this.getIssuePriorityList(), this.getEventList()])
    .then(axios.spread(function (processList, eventTypeList, issuePriorityList, eventList) {     
      this.setInitialStates(processList, eventTypeList, issuePriorityList, eventList);      
    }.bind(this)));
  }

  setInitialStates(processList, eventTypeList, issuePriorityList, eventList){
    this.setState({
      processList : processList.data.eventprocess,
      typeOfEventList : eventTypeList.data.eventtype,
      issuePriorityList : issuePriorityList.data.issuepriority,
      eventList : eventList.data !== null ? eventList.data.cicoevents : []
    });    
  }

  getUpdatedEventList(){
    this.getEventList().then(function (response) {
      this.setState({
        eventList : response.data.cicoevents,
      });
      this.props.history.push("/eventList");
    }.bind(this));
  }

  getProcessList() {
    return axios.get('http://localhost:8090/CicoRestServiceExample/event/getProcessList', {
      timeout: 1000,
    });
  }

  getEventTypeList() {
    return axios.get('http://localhost:8090/CicoRestServiceExample/event/getEventTypeList', {
      timeout: 1000,
    });
  }

  getIssuePriorityList() {
    return axios.get('http://localhost:8090/CicoRestServiceExample/event/getIssuePriorityList', {
      timeout: 1000,
    });
  }

  getEventList() {
    return axios.get('http://localhost:8090/CicoRestServiceExample/event/getAllEvents', {
      timeout: 1000,
    });
  }

  saveEventDetailsFn(typeOfEvent, observazioneObj, issuePriority, serviceName, eventDesc, impactedProcessesArr){
    var curEventList = this.state.eventList;
    axios.post('http://localhost:8090/CicoRestServiceExample/event/addEvent', {"eventId" : (curEventList.length + 1), "typeOfEvent" : typeOfEvent, 
    "observazione" : observazioneObj, "issuePriority" : issuePriority, "serviceName" : serviceName, 
    "eventDesc" : eventDesc, "impactedProcesses" : impactedProcessesArr}, { timeout: 1000 })
    .then(function (response) {
      // getting the updated event list after adding the new events      
      this.getUpdatedEventList();     
    }.bind(this)).catch(function (error) {
      console.log("Add event error :"+error);
    });    
  }

  modifyEventFn(eventId){
    this.props.history.push("/add-modify-events/"+eventId);
  }

  modifyEventDetailsFn(eventId, typeOfEvent, observazioneValue, issuePriority, serviceName, eventDesc, impactedProcessesArr){   
    // cancelling the request after getting timeout
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    let response = null;

    axios.post('http://localhost:8090/CicoRestServiceExample/event/modifyEvent', {"eventId" : eventId, "typeOfEvent" : typeOfEvent, 
    "observazione" : observazioneValue, "issuePriority" : issuePriority, "serviceName" : serviceName, 
    "eventDesc" : eventDesc, "impactedProcesses" : impactedProcessesArr}, {cancelToken: source.token})
    .then(function (resp) {
      // getting the updated modified event list after modifying the events
      response = resp;
      this.getUpdatedEventList();     
    }.bind(this)).catch(function (thrown) {
      if (axios.isCancel(thrown)) {
        console.log('Request canceled', thrown.message);
      } else {
        // handle error
        console.log("Modify event error :"+thrown);
      }      
    });
    
    setTimeout(() => {
      if (response === null) {
        source.cancel();
      }
    }, 1000);
  }

  render() {
    return(
      <div>
        <Switch>            
          <Route exact path="/" render={() => (
            <Redirect to="/eventList"/>
          )}/>
          <Route exact path="/eventList" render={() => {              
              return <EventListPageComponent data={this.state.eventList} 
                        processlist={this.state.processList} 
                        typeOfEventList={this.state.typeOfEventList}
                        issuePriorityList={this.state.issuePriorityList}                         
                        modifyEventFn={this.modifyEventFn}/>}
          }/>

          <Route path="/add-modify-events" render={() => {              
              return <EventPageManagement 
                        datas={this.state}                                                
                        saveEventDetailsFn={this.saveEventDetailsFn}
                        modifyEventDetailsFn={this.modifyEventDetailsFn}
                      />               
            }
          } />
          <Route exact path= "/invalid-event" render={() => {
              return <CommonErrorComponent errorMsg="The event which you are looking is not exist in the list."/>
            }
          } />
          <Route render={() => {
              return <CommonErrorComponent errorMsg="The page you are looking is not exist."/>
            }
          } />
        </Switch>
      </div>
    );
  }
}

export default withRouter(MainComponent);