import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      teamCode: '',
      password: ''
    };
  }

  teamcodeHandler(event) {
    this.setState({ teamCode: event.target.value});
  }

  passwordHandler(event) {
    this.setState({ password: event.target.value })
  }

  loginHandler() {
    //setState on successful login
    var headers = new Headers({
      'Content-Type': 'application/json'
    })
    var bodyObj = {
      teamCode: this.state.teamCode,
      password: this.state.password
    }
    var self = this;
    fetch("/api/login/", { method: "POST", headers: headers,  body: JSON.stringify(bodyObj) })
      .then((response) =>  response.json())
      .then((data) => {
        console.log(data);
        self.setState({ auth: data.auth });
        })
      .catch((error) => {
        console.error(error);
      });
  }

  componentWillUpdate(nextProps, nextState) {
    // this will check what has been updated and will see if auth has been set to true, then render app msgs.
    if (nextState.auth === true) {
      console.log('auth state has been updated', nextState)
      ReactDOM.render(<App teamCode={this.state.teamCode}/>, document.getElementById('DogeBotApp'));
    }
  }

  render() {
    if (this.state.auth) {
      // user has logged in, rendering without login form.
      return <div></div>
    } else {
      // user has not logged in yet
      return (
        <div>
          <div className="jumbotron">
            <div className="container">
              <h1>Welcome to ArchBot</h1>
              <h2>A simple UI for slackbots</h2>
            </div>
          </div>
          <div className="login panel col-sm-4 col-sm-offset-4">
            <div className="panel-heading">
              <h3>Login</h3>
            </div>
            <div className="panel-body">
              <label>Team Code: </label>
              <input onChange={this.teamcodeHandler.bind(this)} placeholder="Enter Team Code"/>
            </div>
            <div className="panel-body">
              <label>Password: </label>
              <input onChange={this.passwordHandler.bind(this)} placeholder="Enter Password"/>
              <button onClick={this.loginHandler.bind(this)}>Login</button>
            </div>
          </div>
          <div className="container" style={style.demo}>
            <p>
              Typically you should be setting up your slackbot to provide you with your
              team code and password, but for now try this test login for size.
            </p>
            <img src="/resources/demo.png"/>
          </div>
        </div>
      )
    }
  }
}

var style = {
  demo: {
    display: 'inline-block',
    opacity: 0.7
  }
}

module.exports = Login;
