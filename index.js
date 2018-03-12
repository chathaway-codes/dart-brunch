(function () {

  const {spawn} = require('child_process');
  var cwd = require('process').cwd;
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
        "dart_path": config.dart_path || "pub",
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

        const inputFile = cfg.path;
        var arguments = ["build"]
        if(cfg.output !== "") {
          const outputFile = path.join.apply(null, [path.resolve(cwd()),  cfg.output ]);
          console.log(outputFile);
          arguments.push("-o");
          arguments.push(outputFile);
        }

        const pub = spawn(cfg.dart_path, arguments, {shell: true, cwd: inputFile});

        pub.stdout.on('data', (data) => {
          console.log(`stdout: ${data}`);
        });

        pub.stderr.on('data', (data) => {
          console.log(`stderr: ${data}`);
        });

        pub.on('close', (code) => {
          if (code !== 0) {
            const err = "Program exited with code " + code;
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
