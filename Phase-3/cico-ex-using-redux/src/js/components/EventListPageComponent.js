import React from 'react';
import { withRouter } from 'react-router-dom';
import { getEventListDetailsAction } from '../actions/EventMgmtActions';
import { connect } from 'react-redux';

class DisplayEventComponent extends React.Component {  
  render() {
    var processData = this.props.processlist.filter((obj) => Number(obj.processId) === Number(this.props.impactedProcesses.filter((obj2) => Number(obj2) === Number(obj.processId)))).map((resultObj, index) => {
      return index >= 1 ? ', '.concat(resultObj.processValue) : resultObj.processValue;
    });      
    var curEventObj = this.props.typeOfEventList.filter((eventObj) => {
      return Number(eventObj.eventTypeId) === Number(this.props.typeOfEvent);
    });    
    var curIssueObj = this.props.issuePriorityList.filter((issueObj) => {      
      return Number(issueObj.priorityId) === Number(this.props.issuePriority);
    });    
    return (
      <tr>
        <td><input type="radio" name="selectedEventId" value={this.props.eventId} /></td>  
        <td>{curEventObj[0].eventType}</td>
        <td>{this.props.observazione}</td>
        <td>{curIssueObj[0] !== undefined && curIssueObj[0] !== "" ? curIssueObj[0].priorityValue : ''}</td>
        <td>{this.props.serviceName}</td>
        <td>{this.props.eventDesc}</td>
        <td>{processData}</td>
      </tr>
    );
  }
}

class EventListPageComponent extends React.Component {
  constructor(props){    
    super(props);    
    this.modifyEventFunction = this.modifyEventFunction.bind(this);    
  }

  componentWillMount(){
   this.props.getEventDetailsFn(); 
  }

  modifyEventFunction(){
    var selectedEventObj = document.querySelector('input[name="selectedEventId"]:checked');    
    if(selectedEventObj){
      this.props.history.push("/add-modify-events/"+selectedEventObj.value);
    } else{
      alert("Please select any event type to modify.");
    }    
  }
  
  render (){

    return (
      <div className="cntr" id="eventListDivId">
        <h1>Event list page</h1>
        {
          this.props.eventListState.isFetching ?
          (
            <div>Loading. Please wait...</div>
          )
          :
          this.props.eventListState.isFetchError ?
          (
            <div>Something happened in the backend. Please try after sometime...</div>
          )
          :
          this.props.eventListState.eventList.length > 0 ?
          (
            <div>              
              <table className="list-content" border="5px">
                <thead>
                  <tr className="bld">
                    <td></td>
                    <td>Type of event</td>
                    <td>Observazione</td>
                    <td>Issue priority</td>
                    <td>Service name</td>
                    <td>Event description</td>
                    <td>Process / sub-process list impacted</td>
                  </tr>
                </thead>
                <tbody>
                  {this.props.eventListState.eventList.map((object, index) => {
                    return <DisplayEventComponent 
                              key={object.eventId} 
                              {...object} 
                              typeOfEventList={this.props.typeOfEventList}
                              issuePriorityList={this.props.issuePriorityList} 
                              processlist={this.props.processList}/>
                  })}
                </tbody>
              </table>
              <div className="pd-top">
                <input type="button" value="Modify" className="mrg-rgt" onClick={this.modifyEventFunction} />          
              </div> 
            </div>
          )
          :
          (
            <div>No events present in the server.</div>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = dispatch => {
  return {
    getEventDetailsFn : () => {
      return dispatch(getEventListDetailsAction());
    }    
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EventListPageComponent));