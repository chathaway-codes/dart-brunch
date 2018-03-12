# dart-brunch
Adds Dart support to [brunch](http://brunch.io) via pub (the dart package manager).
Simply using dart2js failed to properly link dependencies.

## Caveats

This does not work if the path contains a space.
There seems to be many problems related to spaces on Windows systems in the NodeJS ecosystem, and it would be hard to fix in an app like this.

## Install dart-brunch
```
npm install --save dart-brunch
```

Make sure that pub and dart2js are on your path; please see Dart documentation on how to do this.

## Configuration
Dart has a packing system, so brunch need just to call the recompile of the main entry point of your application. So configure your entry point in the brunch-config.js (or .coffee):

```

plugins: {
  dart: {
    source: "web/dart/",
    output: "priv/static/js/"
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
 - Better documentation
