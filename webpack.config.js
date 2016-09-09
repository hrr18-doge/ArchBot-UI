var webpack = require('webpack');
module.exports = {
  entry: __dirname + "/public/scripts/Index.jsx",
  output: {
    path: __dirname + "/public/build",
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: "babel",
      exclude: /node_modules/
    }]
  },
  plugins: [
    new webpack.ProvidePlugin({
      "React": "react",
    }),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
