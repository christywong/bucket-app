//TODO add Hot Reloading, or just make add a watcher
const path = require('path');
const validate = require('webpack-validator');
const PATHS = {
  app: path.join(__dirname, 'src'),
  build : path.join(__dirname, 'public/js')
};

const config = {
  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: '[name].js'
  },
  resolve: {
    extensions:['','.js','.jsx']
  },
  module:{
    loaders: [{
      test: /\.jsx?$/,
      //Cached for better performance
      //Later we could make the cache directory to a custom place
      //I.e., babel?cacheDirectory=<path>
      loaders:['babel?cacheDirectory'],
      //Parse only our src files. Should at our src directory!
      include: PATHS.src
    }
    ]
  }
};

module.exports = config;
