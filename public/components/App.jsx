module.exports = class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      test: 'And we\'re off!'
    }
  }
  // get some methods going

  render(){
    return (
      <div>
        <Retrieved/>
      </div>
    )
  }
}
