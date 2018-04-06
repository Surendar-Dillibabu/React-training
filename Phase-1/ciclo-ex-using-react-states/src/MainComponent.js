import React from 'react';
import { Switch, Route } from 'react-router-dom';
import EventListPageComponent from './EventListPageComponent';
import AddEventPageComponent from './AddEventPageComponent';
import data from './initial-data.json';

const Home = () => {
  return (
    <div>
      <h1>Welcome to event management</h1>
    </div>
  );
}

export default class MainComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      eventList : data["initial-event-list"],
      processList : data["process-list"],
      typeOfEventList : data["typeOfEventList"],
      issuePriorityList : data["issuePriorityList"],
    }
    this.saveEventDetailsFn = this.saveEventDetailsFn.bind(this);    
    this.modifyEventFn = this.modifyEventFn.bind(this);
    this.modifyEventDetailsFn = this.modifyEventDetailsFn.bind(this);
  }

  saveEventDetailsFn(typeOfEvent, observazioneObj, issuePriority, serviceName, eventDesc, impactedProcessesArr, history){    
    var curEventList = this.state.eventList;
    var newEventObj = {"eventId" : (curEventList.length + 1), "typeOfEvent" : typeOfEvent, 
    "observazione" : observazioneObj, "issuePriority" : issuePriority, "serviceName" : serviceName, 
    "eventDesc" : eventDesc, "impactedProcesses" : impactedProcessesArr};    
    curEventList.push(newEventObj);    
    this.setState({eventList : curEventList});
    history.push("/eventList");
  }

  modifyEventFn(eventId, history){    
    history.push("/modifyEvent/"+eventId);
  }

  modifyEventDetailsFn(eventId, typeOfEvent, observazioneValue, issuePriority, serviceName, eventDesc, impactedProcessesArr, history){        
    let selectedArrIndex = this.state.eventList.findIndex((obj) => {                
      return obj.eventId === Number(eventId);
    });              
    let selectedEventList = this.state.eventList[selectedArrIndex]; 
    selectedEventList.eventId = eventId;
    selectedEventList.typeOfEvent = typeOfEvent;
    selectedEventList.observazione = observazioneValue;
    selectedEventList.issuePriority = issuePriority;
    selectedEventList.serviceName = serviceName;
    selectedEventList.eventDesc = eventDesc;
    selectedEventList.impactedProcesses = impactedProcessesArr;    
    this.state.eventList.splice(selectedArrIndex, 1, selectedEventList); 
    history.push("/eventList");
  }

  render() {    
    return(
      <div>
        <Switch>
          <Route exact path="/" component={(Home)} />
          <Route path="/eventList" render={({history}) => {              
              return <EventListPageComponent data={this.state.eventList} 
                        processlist={this.state.processList} 
                        typeOfEventList={this.state.typeOfEventList}
                        issuePriorityList={this.state.issuePriorityList} 
                        history={history} 
                        modifyEventFn={this.modifyEventFn}/>}
          }/>

          <Route exact path="/addEvent" render={({history}) => {              
              return <AddEventPageComponent 
                        typeOfEventList={this.state.typeOfEventList} 
                        issuePriorityList={this.state.issuePriorityList}
                        processlist={this.state.processList} 
                        history={history} 
                        saveEventDetailsFn={this.saveEventDetailsFn}/>
            }
          } />

          <Route path="/modifyEvent/:eventId" render={({history, match}) => {
              let selectedArrIndex = this.state.eventList.findIndex((obj) => {                
                return obj.eventId === Number(match.params.eventId);
              });              
              let selectedEventList = this.state.eventList[selectedArrIndex];              
              return <AddEventPageComponent 
                        typeOfEventList={this.state.typeOfEventList} 
                        issuePriorityList={this.state.issuePriorityList} 
                        processlist={this.state.processList} 
                        history={history} 
                        selectedEventList={selectedEventList} 
                        modifyEventDetailsFn={this.modifyEventDetailsFn}/>
            }
          } />
        </Switch>
      </div>
    );
  }
}