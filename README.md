# dart-brunch
Adds Dart support to [brunch](http://brunch.io).

## Install dart-brunch
```
npm install --save dart-brunch
```

## Configuration
Dart has a packing system, so brunch need just to call the recompile of the main entry point of your application. So configure your entry point in the brunch-config.js (or .coffee):

```

plugins: {
  dart: {
    dart_path: "c:\\tools\\dart-sdk\\bin\\dart2js.bat", //yes, yes... I'm using Windows 10
    source: "web/dart/main.dart",
    output: "priv/static/js/main.js"
  }
}

```

## Tips
The dart2js compiler is terribly slow, so It's more efficient call it after the compilation (That is why this plugin uses the onCompile hook). If you want to use a watch in your dart files, just add a watch:

```
watched: [
  "web/dart"
]
```

## Roadmap
 - Tests on linux (ubuntu)
 - Automatic get dart_path
 - Better documentation

