var React = require('react');
var ReactFire = require('reactfire');
var Firebase = require('firebase');

var Header = require('./header');
var List = require('./list');

var rootUrl = 'https://incandescent-heat-9204.firebaseio.com/';

var App = React.createClass({
  mixins: [ReactFire],

  getInitialState: function() {
    return {
      items: {}
    };
  },

  componentWillMount: function() {
    this.bindAsObject(new Firebase(rootUrl + 'items/'), 'items');
  },

  render: function() {
    return <div className='row panel panel-default'>
      <div className='col-md-8 col-md-offset-2'>
        <h2 className='text-center'>
          Todo List
        </h2>
        <Header itemsStore={this.firebaseRefs.items} />
        <List items={this.state.items} />
      </div>
    </div>
  }
});

var element = React.createElement(App, {});
React.render(element, document.querySelector('.container'));
