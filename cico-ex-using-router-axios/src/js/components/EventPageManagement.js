import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import AddModifyEventPageComponent from '../containers/AddModifyEventPageComponent';

class EventPageManagement extends React.Component {

  render() {  
    return (
      <div>    
        <Route path="/add-modify-events/:eventId" component={({ match, history }) => {          
          let selectedArrIndex = this.props.datas.eventList.findIndex((obj) => {
            return Number(obj.eventId) === Number(match.params.eventId);
          });                
          let selectedEventList = this.props.datas.eventList[selectedArrIndex];
          return (this.props.datas.eventList !== undefined && this.props.datas.eventList.length > 0 &&
                  selectedEventList === undefined) ? 
                    <Redirect to="/invalid-event"/> : 
                    <AddModifyEventPageComponent 
                      title="Modify event page" 
                      typeOfEventList={this.props.datas.typeOfEventList} 
                      issuePriorityList={this.props.datas.issuePriorityList} 
                      processlist={this.props.datas.processList}                       
                      selectedEventList={selectedEventList} 
                      modifyEventDetailsFn={this.props.modifyEventDetailsFn}/>
          }
        } />
        <Route exact path={this.props.match.path} render={() => {
          return <AddModifyEventPageComponent 
                    title="Add event page" 
                    typeOfEventList={this.props.datas.typeOfEventList} 
                    issuePriorityList={this.props.datas.issuePriorityList}
                    processlist={this.props.datas.processList}                     
                    saveEventDetailsFn={this.props.saveEventDetailsFn}/>
          }
        }/>
      </div>
    );
  }
}

export default withRouter(EventPageManagement);