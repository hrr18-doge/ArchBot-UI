var Search = (props) => {
  var deleteKey = function(e) {
    if (e.keyCode === 8) {
     props.filterFunc();
    }
  };

  return (
    <div>
      <input id="input" type="text" onKeyDown={ deleteKey } onChange={ props.filterFunc } className="form-control" placeholder="search"/>
      <button type="button" onClick={ props.filterFunc } className="btn btn-default btn-space"><span className="glyphicon glyphicon-search"></span></button>
    </div>
  )
}

export default Search;