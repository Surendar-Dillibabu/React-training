import React from 'react';

export default class SignupForm extends React.Component {
  constructor(props){
    super(props);
    this.loginFn = this.loginFn.bind(this);
    this.handleEmailOnChange = this.handleEmailOnChange.bind(this);
    this.handlePasswordOnChange = this.handlePasswordOnChange.bind(this);
    this.state = {
      email : '',
      password : '',  
    }    
  }

  loginFn(){    
    alert("Successfully logged-in.");
  }

  handleEmailOnChange(event){
    this.setState({ email : event.currentTarget.value });
  }

  handlePasswordOnChange(event){
    this.setState({ password : event.currentTarget.value });
  }
  
  render() {
    let enableLoginBtn = this.state.email.length > 0 && this.state.password.length > 0;

    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="email">Email : </label>
              </td>
              <td>
                <input type="text" id="email" value={this.state.email} onChange={this.handleEmailOnChange} />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="password">Password : </label>
              </td>
              <td>
                <input type="text" id="password" value={this.state.password} onChange={this.handlePasswordOnChange} />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <input type="button" disabled={!enableLoginBtn} value="Login" onClick={this.loginFn}/>
              </td>
            </tr>
          </tbody>
        </table>
      </div>  
    );
  }
}