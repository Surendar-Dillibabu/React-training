import React from 'react';
import { Link } from 'react-router-dom';

export default class HeaderComponent extends React.Component {

  render() {
    return (
      <div>
        <ul>         
          <li>
            <Link to='/eventList'>Event list</Link>
          </li>
          <li>
            <Link to='/add-modify-events'>Add event</Link>
          </li>
        </ul>
      </div>
    );
  }
}