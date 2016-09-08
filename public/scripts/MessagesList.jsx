//Messages list
import Message from './Messages.jsx';

var MessagesList = (messages) => (
  <div className = "message-list">
    {messages.data.map(function(message){
      return <Message key={message.key} message={message}/>
    })}
  </div>
)

export default MessagesList;