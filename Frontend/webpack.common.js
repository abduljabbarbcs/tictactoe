const path = require('path');
module.exports = {
  resolve: {
    alias: {
      Components: path.resolve(__dirname, './components')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/react'],
            plugins: ["@babel/plugin-transform-runtime"]
          }
        }
      },
    ]
  }
}