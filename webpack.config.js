const path = require("path");

module.exports = {
  mode: "production",
  entry: ["./src/index.js", "./src/formValidation.js", "./src/searchForm.js","./src/detailsForm.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  watch: false,
  module:{
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  }
  
};
