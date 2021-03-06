var React = require('react');
var ListItem = require('./list-item');

module.exports = React.createClass({
  render: function() {
    if (!this.props.items) {
      return <h4>Add a task to get started.</h4>
    } else {
      var items = [];

      for (var key in this.props.items) {
        var item = this.props.items[key];
        item.id = key;

        items.push(
          <ListItem
            item={item}
            key={key}
          />
        );
      }

      return <div>{items}</div>
    }
  }
});
