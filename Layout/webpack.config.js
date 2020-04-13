// Webpack uses this to work with directories
const path = require('path');


// This is main configuration object.
// Here you write different options and tell Webpack what to do
module.exports = {

  // Path to your entry point. From this file Webpack will begin his work
  
  entry: ["babel-polyfill", "./controller.js"],
  mode : 'development',
  devServer : {
  open :true
 },

  // Path and filename of your result bundle.
  // Webpack will bundle all JavaScript into this file
  
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["babel-preset-env"]
          }
        }
      }
    ]
  }, 
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/dist',
    filename: 'main.js'
  }
};

 

  // Default mode for Webpack is production.
  // Depending on mode Webpack will apply different things
  // on final bundle. For now we don't need production's JavaScript 
  // minifying and other thing so let's set mode to development
  
