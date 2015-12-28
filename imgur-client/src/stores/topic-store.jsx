var Reflux = require('reflux');
var Api = require('../utils/api');

module.exports = Reflux.createStore({
  getTopics: function() {
    return Api.get('topics/defaults')
      .then(function(json) {
        this.topics = json.data;
      }.bind(this));
  }
});
