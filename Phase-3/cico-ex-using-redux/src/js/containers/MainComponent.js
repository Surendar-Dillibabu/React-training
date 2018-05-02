import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import EventListPageComponent from '../components/EventListPageComponent';
import EventPageManagement from '../components/EventPageManagement';
import CommonErrorComponent from '../components/CommonErrorComponent';

class MainComponent extends React.Component {

  render() {    
    return(
      <div>
        <Switch>
          <Route exact path="/" render={() => (
            <Redirect to="/eventList"/>
          )}/>
          <Route exact path="/eventList" component={EventListPageComponent}/>

          <Route path="/add-modify-events" component={EventPageManagement} />
          
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