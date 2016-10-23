const common = {
  //Allows us to import without extensions.
  resolve: {
    extensions:['','.js','.jsx']
  }
}

const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;
module:{
  loaders: [
    test: /\.jsx?$/,
    //Cached for better performance
    //Later we could make the cache directory to a custom place
    //I.e., babel?cacheDirectory=<path>
    loaders:['babel?cacheDirectory'],
    //Parse only our src files. Should at our src directory!
    include: PATHS.src
  ]
}
