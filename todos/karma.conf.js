module.exports = function(config) {
  config.set({
    frameworks: ['browserify', 'jasmine'],

    files: [
      'node_modules/phantomjs-polyfill/bind-polyfill.js',
      'spec/**/*.spec.js'
    ],

    preprocessors: {
      'node_modules/phantomjs-polyfill/bind-polyfill.js': ['browserify'],
      'spec/**/*.spec.js': ['browserify']
    },

    browserify: {
      debug: true,
      transform: ['reactify'],
      extensions: ['.jsx']
    },

    reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    singleRun: true,

    browsers: ['PhantomJS']
  });
};
