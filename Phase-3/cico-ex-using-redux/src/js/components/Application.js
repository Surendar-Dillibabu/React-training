import React from 'react';
import HeaderComponent from './HeaderComponent';
import MainComponent from '../containers/MainComponent';
import { BrowserRouter } from 'react-router-dom';

class Application extends React.Component {  
  render() {    
    return (
      <BrowserRouter>
        <div>
          <HeaderComponent />
          <MainComponent />        
        </div>
      </BrowserRouter>
    );
  }
}

export default Application;