import React from 'react';
import HeaderComponent from './HeaderComponent';
import MainComponent from './MainComponent';

class Application extends React.Component {  
  render() {    
    return (
      <div>
        <HeaderComponent />
        <MainComponent />        
      </div>
    );
  }
}

export default Application;
