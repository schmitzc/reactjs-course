var React = require('react');
var Thumbnail = require('./thumbnail');

module.exports = React.createClass({
  render: function() {
    var list = this.props.thumbnailData.map(function(thumbnailProps) {
      return <div className="col-md-4">
        <Thumbnail {...thumbnailProps} />
      </div>
    });

    return <div>
      {list}
    </div>
  }
});
