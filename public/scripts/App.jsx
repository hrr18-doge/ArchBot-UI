import React from 'react';
import ReactDOM from 'react-dom';
import MessageList from './MessagesList.jsx';
import Messages from './Messages.jsx';
import Search from './Search.jsx';

// bootstrap components are imported from react-bootstrap module
// https://react-bootstrap.github.io/components.html
import { Jumbotron } from 'react-bootstrap';

// create an instance of bootstrap module and fill it with stuff
// bsClass is used for CSS classes
// bsStyle can be used for bootstrap styles
const jumbotronInstance = (
  <Jumbotron>
    <span>
      <h1 className="row text-center jumbo">
        <img src="/images/fancyDoge.png"/>
        Such Dashboard Wow
        <img src="/images/fancyDoge.png"/>
      </h1>
    </span>
  </Jumbotron>
)

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasData: false,
      data: [],
      unfilteredData: []
    };

  }

  filterFunction() {
    if (this.state.data.length > this.state.unfilteredData.length) {
      this.state.unfilteredData = this.state.data.slice(0)
    }
    this.setState({ data: this.state.unfilteredData })
    var input = document.getElementById('input').value;
    var filtered = [];
    this.state.unfilteredData.forEach(function(el) {
      if (el.text.includes(input)) {
        filtered.push(el)
      }
    })
    this.setState({ data: filtered })
  }

  refreshFunction() {
    var self = this;
    fetch("/api/messages/", { method: "GET" })
      .then((response) =>  response.json())
      .then((data) => {
        console.log(data);
        self.setState({ data: data });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {
    ReactDOM.render(<Search filterFunc={ this.filterFunction.bind(this) }/>, document.getElementById('form'))
    var self = this;
    fetch("/api/messages/", { method: "GET" })
      .then((response) =>  response.json())
      .then((data) => {
        console.log(data);
        self.setState({ data: data });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // The bootstrap component instance can be added via handlebars inside of the render return
  render(data) {
    if (this.state.data){
      return (
        <div>
          { jumbotronInstance }
          <h1>&nbsp;&nbsp;Messages</h1>
          <MessageList data = { this.state.data } refreshFunction = { this.refreshFunction.bind(this) }/>
        </div>
      );
    }
    return (<div>no data!</div>)
  }
}

module.exports = App;






