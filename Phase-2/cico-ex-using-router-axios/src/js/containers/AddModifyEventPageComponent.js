import React from 'react';
import { withRouter } from 'react-router-dom';

class ProcessComponent extends React.Component {
  render(){    
    return(    
      <div>
        <input type="checkbox" 
           name="impactedProcesses" 
           value={this.props.processId} 
           checked={this.props.selectedProcesses.length > 0 ? 
           (this.props.selectedProcesses.filter((obj) => { return Number(obj) === Number(this.props.processId); }).length > 0 ? true : false) : false} onChange={this.props.onChangeFn}/>
        <label>{this.props.processValue}</label><br/>      
      </div>
    );
  }
}

class AddModifyEventPageComponent extends React.Component {
  constructor(props){
    super(props);    
    this.addOrModifyEventFn = this.addOrModifyEventFn.bind(this);
    this.backBtnFn = this.backBtnFn.bind(this);
    this.onChangeOfFormFields = this.onChangeOfFormFields.bind(this);
  
    if(this.props.selectedEventList !== undefined){
      this.state = {
        typeOfEvent : this.props.selectedEventList.typeOfEvent,
        observazione : this.props.selectedEventList.observazione,
        issuePriority : this.props.selectedEventList.issuePriority,
        serviceName : this.props.selectedEventList.serviceName,
        eventDesc : this.props.selectedEventList.eventDesc,
        impactedProcesses : this.props.selectedEventList.impactedProcesses
      };
    } else{
      this.state = {
        typeOfEvent : "-1",
        observazione : '',
        issuePriority : "-1",
        serviceName : '',
        eventDesc : '',
        impactedProcesses : []
      };
    }
  }

  addOrModifyEventFn(){
    var typeOfEvent = this.state.typeOfEvent;
    if(typeOfEvent === "-1"){
      alert("Please select the event type");
      return false;
    }

    var observazione = this.state.observazione;
    if(observazione === ''){
      alert("Please select the observazione");
      return false;
    }

    var issuePriority = this.state.issuePriority;
    if(observazione === "N" && issuePriority === "-1"){
      alert("Please select the issue priority");
      return false;
    }

    var serviceName = this.state.serviceName;
    if(serviceName === ""){
      alert("Please provide the service name");
      return false;
    }

    var impactedProcesses = this.state.impactedProcesses;    
    if(impactedProcesses.length <= 0){
      alert("Please select any of the process list");
      return false;
    }

    var eventDesc = this.state.eventDesc;    

    if(this.props.selectedEventList !== undefined){
      this.props.modifyEventDetailsFn(this.props.selectedEventList.eventId, 
                                      typeOfEvent, 
                                      observazione, 
                                      issuePriority, 
                                      serviceName, 
                                      eventDesc, 
                                      impactedProcesses);     
    } else{
      this.props.saveEventDetailsFn(typeOfEvent, 
                                    observazione, 
                                    issuePriority, 
                                    serviceName, 
                                    eventDesc, 
                                    impactedProcesses);     
    }    
  }

  onChangeOfFormFields(event){    
    let inputName = event.currentTarget.name;
    let inputValue = event.currentTarget.value;
    if(inputName === 'observazione'){
      inputValue = event.target.checked ? event.target.value : '';
    }else if(inputName === 'impactedProcesses'){
      var checkboxes = document.getElementsByName('impactedProcesses');
      var vals = [];
      for (var i=0, n=checkboxes.length;i<n;i++)  {
        if (checkboxes[i].checked)  {
          vals.push(Number(checkboxes[i].value));
        }
      }
      inputValue = vals;
    }
    
    this.setState({
      [inputName] : inputValue,
    });
  }

  backBtnFn(){
    this.props.history.goBack();
  }

  render() {
    return (
      <div align="center" id="addEventDivId">
        <h1>{this.props.title}</h1>
        <table className="add-content">
          <tbody>
            <tr>
              <td>
                <label htmlFor="typeOfEvent">Type of event</label>
              </td>
              <td>
                <select name="typeOfEvent" id="typeOfEvent" value={this.state.typeOfEvent} onChange={this.onChangeOfFormFields}>
                  <option value="-1">----Please select----</option>
                  {this.props.typeOfEventList.map((obj, index) => {
                    return <option key={obj.eventTypeId} value={obj.eventTypeId}>{obj.eventType}</option>;                 
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
                    checked={this.state.observazione === 'Y' ? true : false} onChange={this.onChangeOfFormFields} />
                <label>Yes</label>
                <input type="radio" id="observazioneNo" 
                    name="observazione" value="N" 
                    checked={this.state.observazione === 'N' ? true : false} onChange={this.onChangeOfFormFields} />
                <label>No</label>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="issuePriority">Issue priority</label>
              </td>
              <td>
                <select name="issuePriority" id="issuePriority" className="width-48" value={this.state.issuePriority} onChange={this.onChangeOfFormFields}>
                  <option value="-1">----Please select----</option>
                  {this.props.issuePriorityList.map((obj, index) => {
                    return <option key={obj.priorityId} value={obj.priorityId}>{obj.priorityValue}</option>
                  })}                                 
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="serviceName">Service name</label>
              </td>
              <td>
                <input type="text" className="width-47" id="serviceName" value={this.state.serviceName} name="serviceName" onChange={this.onChangeOfFormFields} />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="eventDesc">Event description</label>
              </td>
              <td>
                <textarea id="eventDesc" name="eventDesc" rows="5" cols="50" value={this.state.eventDesc} onChange={this.onChangeOfFormFields} />
              </td>
            </tr>
            <tr>
              <td>
                <label>Process / sub-process list impacted</label>  
              </td>
              <td>
                {this.props.processlist.map((obj, index) => {
                  return <ProcessComponent key={obj.processId} {...obj} selectedProcesses={this.state.impactedProcesses} onChangeFn={this.onChangeOfFormFields}/>
                })}
              </td>             
            </tr>
            <tr>
              <td>                
                <input type="button" className="flt-lft" value="Cancel" onClick={this.backBtnFn}/>
              </td>
              <td>                
                <input type="button" className="flt-rgt" value="Save details" onClick={this.addOrModifyEventFn}/>
              </td>
            </tr>
          </tbody>
        </table>        
      </div>  
    );
  }
}

export default withRouter(AddModifyEventPageComponent);