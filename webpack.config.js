module.exports = {
  entry: {
    'bundle': './src/index.js',
    'test-bundle': './src/test-bundle.js'
  },
  output: {
    filename: '[name].js',
    path: './dist'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
}