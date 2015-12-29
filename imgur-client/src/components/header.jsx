var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var Link = Router.Link;
var Actions = require('../actions');
var TopicStore = require('../stores/topic-store');

module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(TopicStore, 'onChange')
  ],

  getInitialState: function() {
    return {
      topics: []
    };
  },

  componentWillMount: function() {
    Actions.getTopics();
  },

  render: function() {
    return <nav className='header navbar navbar-default'>
      <div className='container-fluid'>
        <div className='navbar-header'>
          <Link to='/' className='navbar-brand'>
            Imgur Browser
          </Link>
        </div>
        <div className='collapse navbar-collapse'>
          <ul className='nav navbar-nav navbar-right'>
            {this.renderTopics()}
          </ul>
        </div>
      </div>
    </nav>
  },

  renderTopics: function() {
    return this.state.topics.slice(0, 4).map(function(topic) {
      return <li key={topic.id}>
        <Link to={'topics/' + topic.id} activeClassName='active'>
          {topic.name}
        </Link>
      </li>
    });
  },

  onChange: function(event, topics) {
    this.setState({
      topics: topics
    });
  }
});
