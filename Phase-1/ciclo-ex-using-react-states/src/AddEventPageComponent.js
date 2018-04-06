import React from 'react';

class ProcessComponent extends React.Component {
  render(){    
    return(    
      <div>
        <input type="checkbox" 
           name="impactedProcesses" 
           value={this.props.id} 
           defaultChecked={this.props.selectedProcesses !== undefined ? 
           (this.props.selectedProcesses.filter((obj) => { return obj === this.props.id; }).length > 0 ? true : false) : false}/>
        <label>{this.props.value}</label><br/>      
      </div>
    );
  }
}

class AddEventPageComponent extends React.Component {
  constructor(props){
    super(props);    
    this.addOrModifyEventFn = this.addOrModifyEventFn.bind(this);
    this.backBtnFn = this.backBtnFn.bind(this);
  }

  addOrModifyEventFn(){
    var typeOfEvent = document.getElementById('typeOfEvent');
    if(typeOfEvent === undefined || typeOfEvent.value === "-1"){
      alert("Please select the event type");
      return false;
    }

    var observazioneObj = document.querySelector('input[name="observazione"]:checked');
    if(!observazioneObj){
      alert("Please select the observazione");
      return false;
    }

    var issuePriority = document.getElementById('issuePriority');
    if(observazioneObj.value === "N" && (issuePriority === undefined || issuePriority.value === "-1")){
      alert("Please select the issue priority");
      return false;
    } else{
      issuePriority = issuePriority.value;  
    }

    var serviceName = document.getElementById('serviceName');
    if(serviceName === undefined || serviceName.value === ""){
      alert("Please provide the service name");
      return false;
    }

    var impactedProcessesObj = document.querySelector('input[name="impactedProcesses"]:checked');
    if(!impactedProcessesObj){
      alert("Please select any of the process list");
      return false;
    }

    var eventDesc = document.getElementById('eventDesc').value;
    var checkboxes = document.getElementsByName('impactedProcesses');
    var vals = [];
    for (var i=0, n=checkboxes.length;i<n;i++)  {
      if (checkboxes[i].checked)  {
        vals.push(Number(checkboxes[i].value));
      }
    }

    if(this.props.selectedEventList !== undefined){
      this.props.modifyEventDetailsFn(this.props.selectedEventList.eventId, 
                                      typeOfEvent.value, 
                                      observazioneObj.value, 
                                      issuePriority, 
                                      serviceName.value, 
                                      eventDesc, 
                                      vals, 
                                      this.props.history);     
    } else{
      this.props.saveEventDetailsFn(typeOfEvent.value, 
                                    observazioneObj.value, 
                                    issuePriority, 
                                    serviceName.value, 
                                    eventDesc, 
                                    vals, 
                                    this.props.history);     
    }    
  }

  backBtnFn(){
    this.props.history.goBack();
  }

  render() {    
    return (
      <div align="center" id="addEventDivId">
        <h1>Add event page</h1>
        <table className="add-content">
          <tbody>
            <tr>
              <td>
                <label htmlFor="typeOfEvent">Type of event</label>
              </td>
              <td>
                <select name="typeOfEvent" id="typeOfEvent" defaultValue={this.props.selectedEventList !== undefined ? this.props.selectedEventList.typeOfEvent : ''}>
                  <option value="-1">----Please select----</option>
                  {this.props.typeOfEventList.map((obj, index) => {
                    return <option key={obj.id} value={obj.id}>{obj.value}</option>;                 
                  })};                  
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <label>Observazione</label>
              </td>
              <td>                
                <input type="radio" id="observazioneYes" 
                    name="observazione" value="Y" 
                    defaultChecked={this.props.selectedEventList !== undefined ? (this.props.selectedEventList.observazione === 'Y' ? true : false) : false}/>
                <label>Yes</label>
                <input type="radio" id="observazioneNo" 
                    name="observazione" value="N" 
                    defaultChecked={this.props.selectedEventList !== undefined ? (this.props.selectedEventList.observazione === 'N' ? true : false) : false}/>
                <label>No</label>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="issuePriority">Issue priority</label>
              </td>
              <td>
                <select name="issuePriority" id="issuePriority" style={{width: '48%'}} defaultValue={this.props.selectedEventList !== undefined ? this.props.selectedEventList.issuePriority : ''}>
                  <option value="-1">----Please select----</option>
                  {this.props.issuePriorityList.map((obj, index) => {
                    return <option key={obj.id} value={obj.id}>{obj.value}</option>
                  })}                                 
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="serviceName">Service name</label>
              </td>
              <td>
                <input type="text" style={{width: '47%'}} id="serviceName" defaultValue={this.props.selectedEventList !== undefined ? this.props.selectedEventList.serviceName : ''} name="serviceName" />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="eventDesc">Event description</label>
              </td>
              <td>
                <textarea id="eventDesc" name="eventDesc" rows="5" cols="50" defaultValue={this.props.selectedEventList !== undefined ? this.props.selectedEventList.eventDesc : ''}/>
              </td>
            </tr>
            <tr>
              <td>
                <label>Process / sub-process list impacted</label>  
              </td>
              <td>
                {this.props.processlist.map((obj, index) => {
                  return <ProcessComponent key={obj.id} {...obj} selectedProcesses={this.props.selectedEventList !== undefined ? this.props.selectedEventList.impactedProcesses : undefined}/>
                })}
              </td>             
            </tr>
            <tr>
              <td>                
                <input type="button" style={{float: 'left'}} value="Back" onClick={this.backBtnFn}/>
              </td>
              <td>                
                <input type="button" style={{float: 'right'}} value="Save details" onClick={this.addOrModifyEventFn}/>
              </td>
            </tr>
          </tbody>
        </table>        
      </div>  
    );
  }
}

export default AddEventPageComponent;