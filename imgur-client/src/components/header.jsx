var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

module.exports = React.createClass({
  render: function() {
    return <nav className='navbar navbar-default'>
      <div className='container-fluid'>
        <div className='navbar-header'>
          <Link to='/' className='navbar-brand'>
            Imgur Browser
          </Link>
        </div>
        <div className='collapse navbar-collapse'>
          <ul className='nav navbar-nav navbar-right'>
            <li><a href='#'>Topic #1</a></li>
          </ul>
        </div>
      </div>
    </nav>
  }
});
