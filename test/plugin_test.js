describe('Plugin', function () {
  var plugin;
  var fs = require('fs');
  var output = "tmp/main.js";

  beforeEach(function () {
    plugin = new Plugin({
      source: "test/main.dart",
      output: output
    });
    if(fs.existsSync(output)) {
      fs.unlinkSync(output)
    }
  });

  it('should be an object', function () {
    expect(plugin).to.be.ok;
  });

  it('should has #compile method', function () {
    expect(plugin.onCompile).to.be.an.instanceof(Function);
  });

  it('should compile and produce valid result', function (done) {
    this.timeout(10000); //dart2js is terribly slow
    plugin.onCompile(null, function () {
      expect(fs.existsSync(output)).to.be.true;
      done();
    });
  });

  it('should return error', function (done) {
    this.timeout(10000); //dart2js is terribly slow
    var plugin_with_error = new Plugin({
      path: "test/ma122in.dart",
      output: output
    });
    plugin_with_error.onCompile(null, function (error, data) {
      expect(error != null).to.be.true;
      done();
    });
  });
})
;