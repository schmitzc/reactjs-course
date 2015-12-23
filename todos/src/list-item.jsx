var React = require('react');
var Firebase = require('firebase');

var rootUrl = 'https://incandescent-heat-9204.firebaseio.com/';

module.exports = React.createClass({
  getInitialState: function() {
    return {
      text: this.props.item.text,
      done: this.props.item.done,
      textChanged: false
    };
  },

  componentWillMount: function() {
    this.firebase = new Firebase(rootUrl + 'items/' + this.props.item.id);
  },

  render: function() {
    return <div className='input-group'>
      <span className='input-group-addon'>
        <input type='checkbox'
          checked={this.state.done}
          onChange={this.handleDoneChange}
          />
      </span>
      <input type='text'
        className='form-control'
        disabled={this.state.done}
        value={this.state.text}
        onChange={this.handleTextChange}
        />
      <span className='input-group-btn'>
        {this.changesButtons()}
        <button className='btn btn-default' onClick={this.handleDeleteClick}>
          Delete
        </button>
      </span>
    </div>
  },

  changesButtons: function() {
    if (!this.state.textChanged) return null;

    return [
      <button
        className='btn btn-default'
        key='save'
        onClick={this.handleSaveClick}>
        Save
      </button>,
      <button
        className='btn btn-default'
        key='undo'
        onClick={this.handleUndoClick}>
        Undo
      </button>
    ];
  },

  handleDoneChange: function(event) {
    var update = {done: event.target.checked};

    this.setState(update);
    this.firebase.update(update);
  },

  handleTextChange: function(event) {
    this.setState({
      text: event.target.value,
      textChanged: true
    });
  },

  handleSaveClick: function() {
    this.firebase.update({text: this.state.text});
    this.setState({textChanged: false});
  },

  handleUndoClick: function() {
    this.setState({
      text: this.props.item.text,
      textChanged: false
    });
  },

  handleDeleteClick: function() {
    this.firebase.remove();
  }
});
