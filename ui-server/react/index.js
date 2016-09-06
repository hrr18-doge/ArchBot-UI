var React = require("react")
module.exports = class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('props', this.props)
    return React.createElement('h1', null, 'Hello React Doge');
  }
}