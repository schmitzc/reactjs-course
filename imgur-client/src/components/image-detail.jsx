var React = require('react');
var Reflux = require('reflux');
var Actions = require('../actions');
var ImageStore = require('../stores/image-store');
var CommentStore = require('../stores/comment-store');
var CommentBox = require('../components/comment-box');

module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(ImageStore, 'onChange'),
    Reflux.listenTo(CommentStore, 'onChange')
  ],

  getInitialState: function() {
    return {
      image: null,
      comments: []
    };
  },

  componentWillMount: function() {
    Actions.getImage(this.props.params.id);
  },

  render: function() {
    return <div>
      {this.state.image ? this.renderContent() : null}
    </div>;
  },

  renderContent: function() {
    return <div className='image-detail'>
      <div className='panel default'>
        <div className='panel-heading'>
          <h4>{this.state.image.title}</h4>
        </div>
        <div className='panel-body'>
          {this.renderImage()}
        </div>
        <div className='panel-footer'>
          <h5>{this.state.image.description}</h5>
        </div>
      </div>
      <h3>Comments</h3>
      {this.renderComments()}
    </div>
  },

  renderImage: function() {
    if (this.state.image.animated) {
      return <video preload='auto' autoPlay='autoplay' loop='loop' webkit-playsinline>
        <source src={this.state.image.mp4} type='video/mp4' />
      </video>
    } else {
      return <img src={this.state.image.link} alt='' />
    }
  },

  renderComments: function() {
    return <CommentBox comments={this.state.comments} />
  },

  onChange: function(event, image) {
    this.setState({
      image: ImageStore.find(this.props.params.id),
      comments: CommentStore.comment
    });
  }
});
