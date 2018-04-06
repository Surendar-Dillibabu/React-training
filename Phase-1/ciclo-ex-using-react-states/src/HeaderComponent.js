import React from 'react';
import { Link } from 'react-router-dom';

export default class HeaderComponent extends React.Component {

  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/eventList'>Event list</Link>
          </li>
          <li>
            <Link to='/addEvent/'>Add event</Link>
          </li>
        </ul>
      </div>
    );
  }
}