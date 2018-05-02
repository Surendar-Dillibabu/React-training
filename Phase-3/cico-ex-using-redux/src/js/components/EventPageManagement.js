import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import AddModifyEventPageComponent from '../containers/AddModifyEventPageComponent';
import { connect } from 'react-redux';

class EventPageManagement extends React.Component {

  render() {  
    return (
      <div>    
        <Route path="/add-modify-events/:eventId" component={({ match, history }) => {
          let selectedArrIndex = this.props.eventList.findIndex((obj) => {
            return Number(obj.eventId) === Number(match.params.eventId);
          });                
          let selectedEventList = this.props.eventList[selectedArrIndex];
          return (this.props.eventList !== undefined && this.props.eventList.length > 0 &&
                  selectedEventList === undefined) ? 
                    <Redirect to="/invalid-event"/> : 
                    <AddModifyEventPageComponent title="Modify event page" selectedEventList={selectedEventList}/>
          }
        } />
        <Route exact path={this.props.match.path} render={() => {
            return <AddModifyEventPageComponent title="Add event page" />
          }
        }/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    eventList : state.eventListState.eventList
  }
}

export default connect(mapStateToProps)(withRouter(EventPageManagement));