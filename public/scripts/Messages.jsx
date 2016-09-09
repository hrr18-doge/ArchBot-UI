var Message = function(prop){
  return (
    <div className="col-sm-4 pull-left">
      <div className="panel panel-primary">
        <div className="panel-heading">
          { prop.message.user } - { prop.message.timestamp }
        </div>
        <div className="panel-body">
          { prop.message.text }
        </div>
      </div>
    </div>
  )
}

export default Message;