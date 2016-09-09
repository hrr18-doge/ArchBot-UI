import Message from './Messages.jsx';

var MessagesList = (messages) => {

  var refresh = function() {
    messages.refreshFunction();
  };

  var divStyle = {
    margin: "20px",
    padding: "5px"
  };

  return (
    <div className="message-list">
      <button style={ divStyle } className="btn btn-primary btn-lg" onClick={ refresh }>
        Refresh
      </button>
      <div>
      { messages.data.map(function(message) {
        return <Message key={ message.key } message={ message }/>
      }) }
      </div>
    </div>
  )
}

export default MessagesList;