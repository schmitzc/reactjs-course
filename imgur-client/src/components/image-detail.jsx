var React = require('react');
var Reflux = require('reflux');
var Actions = require('../actions')
var ImageStore = require('../stores/image-store');

module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(ImageStore, 'onChange')
  ],

  getInitialState: function() {
    return {
      image: null
    };
  },

  componentWillMount: function() {
    Actions.getImage(this.props.params.id);
  },

  render: function() {
    return <div>
      {this.state.image}
    </div>;
  },

  onChange: function(event, image) {
    this.setState({
      image: ImageStore.find(this.props.params.id)
    });
  }
});
