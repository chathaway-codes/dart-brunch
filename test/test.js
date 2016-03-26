global.expect = require('chai').expect;
global.Plugin = require('../index.js');
var g = new global.Plugin({
  origin: "test/main.dart",
  output: "tmp/main.js"
});

g.onCompile();