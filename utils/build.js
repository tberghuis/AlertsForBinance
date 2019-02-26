var webpack = require("webpack"),
    config = require("../webpack.config");

console.log('config.chromeExtensionBoilerplate',config.chromeExtensionBoilerplate);

delete config.chromeExtensionBoilerplate;

webpack(
  config,
  function (err) { if (err) throw err; }
);
