import React from 'react';

class DisplayEventComponent extends React.Component {
  render() {
    var processData = this.props.processlist.filter((obj) => obj.id === Number(this.props.impactedProcesses.filter((obj2) => obj2 === obj.id))).map((resultObj, index) => {
      return index >= 1 ? ', '.concat(resultObj.value) : resultObj.value;
    });    
    var curEventObj = this.props.typeOfEventList.filter((eventObj) => {      
      return Number(eventObj.id) === Number(this.props.typeOfEvent);
    });
    var curIssueObj = this.props.issuePriorityList.filter((issueObj) => {      
      return Number(issueObj.id) === Number(this.props.issuePriority);
    });    
    return (
      <tr>
        <td><input type="radio" name="selectedEventId" value={this.props.eventId} /></td>  
        <td>{curEventObj[0].value}</td>
        <td>{this.props.observazione}</td>
        <td>{curIssueObj[0] !== undefined && curIssueObj[0] !== "" ? curIssueObj[0].value : ''}</td>
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

  modifyEventFunction(){
    var selectedEventObj = document.querySelector('input[name="selectedEventId"]:checked');    
    if(selectedEventObj){
      this.props.modifyEventFn(selectedEventObj.value, this.props.history);      
    } else{
      alert("Please select any event type to modify.");
    }    
  }
  
  render (){
    return (
      <div align="center" id="eventListDivId">
        <h1>Event list page</h1>
        <table className="list-content" border="5px">
          <thead>
            <tr>
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
            {this.props.data.map((object, index) => {              
              return <DisplayEventComponent 
                        key={object.eventId} 
                        {...object} 
                        typeOfEventList={this.props.typeOfEventList}
                        issuePriorityList={this.props.issuePriorityList} 
                        processlist={this.props.processlist}/>
            })}            
          </tbody>
        </table>
        <div style={{paddingTop : "10px"}}>
          <input type="button" value="Modify" style={{marginRight : "16px"}} onClick={this.modifyEventFunction} />          
        </div>
      </div>
    );
  }
}

export default EventListPageComponent;