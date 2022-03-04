const path = require("path");

module.exports = {
  mode: "development",
  entry: ["./src/index.js", "./src/formValidation.js", "./src/searchForm.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  watch: false,
  
};
