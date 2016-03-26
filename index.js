(function () {

  var exec = require('child_process').exec;
  var path = require('path');

  module.exports = DartCompiler = (function () {

    DartCompiler.prototype.brunchPlugin = true;

    function DartCompiler(config) {
      if(!config) {
        config = {};
      }

      if(config.hasOwnProperty("plugins")) {
        config = config.plugins.dart;
      }

      this.config = {
        "dart_path": config.dart_path || "c:\\tools\\dart-sdk\\bin\\dart2js.bat",
        "path": config.path || config.origin || config.source || "main.dart",
        "output": config.output || "main.js",
        "minify": false,
        "checked": false,
        "packageRoot": null,
        "verbose": false,
        "serverSide": false,
        "signatuesOnly": false,
        "analyzeOnly": false,
        "analyzeAll": false,
        "terse": false,
        "supressWarning": false,
        "supressHints": false
      }
    }

    DartCompiler.prototype.onCompile = function (params, callback) {
      console.log("Compiling Dart...");

      if(typeof callback !== "function") {
        callback = function(p) {  };
      }

      try {
        var cfg = this.config;
        var error = null;

        var cmd = cfg.dart_path + " " + path.join.apply(null, [ path.resolve(path.dirname()), cfg.path ]);
        if(cfg.output !== "") {
          cmd += " -o " + path.join.apply(null, [path.resolve(path.dirname()),  cfg.output ]);
        }

        exec(cmd, function (err, _stdout, _stderr) {
          if (err) {
            console.log(err);
            callback(err);
            return;
          }

          console.log("Dart Compiled!!");
          callback();
        });
      }
      catch (err) {
        error = err.stack;
      }
      finally {
        if(error) {
          callback(error);
          console.log(error);
          return;
        }
      }
    };
    return DartCompiler;
  })();
}).call(this);
