var React = require('react');

module.exports = React.createClass({
  render: function() {
    return <div>
      {this.renderList()}
    </div>
  },

  renderList: function() {
    if (this.props.items && Object.keys(this.props.items).length === 0) {
      return <h4>Add a task to get started.</h4>
    } else {
      var items = [];

      for (var key in this.props.items) {
        items.push(
          <li>
            {this.props.items[key].text}
          </li>
        );
      }

      return <ul>{items}</ul>
    }
  }
});
