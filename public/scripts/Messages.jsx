var Message = function(prop){
  var getUser = function (e){
    var username = e.target.text;
    prop.getOneUser(username);
  };

  return (
    <div className="col-sm-4 pull-left">
      <div className="panel panel-primary">
        <div className="panel-heading"><a onClick={ getUser }>{ prop.message.user } </a>- { prop.message.timestamp }</div>
        <div className="panel-body">
          { prop.message.text }
        </div>
      </div>
    </div>
  )
}

export default Message;