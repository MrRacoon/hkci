# hkci

[![dependencies Status](https://david-dm.org/MrRacoon/haskind/status.svg)](https://david-dm.org/MrRacoon/hkci)
[![Build Status](https://travis-ci.org/MrRacoon/hkci.svg?branch=master)](https://travis-ci.org/MrRacoon/hkci)

hkci is a *repl sandbox creation* tool (now).

### Install

```bash
$ npm install -g hkci
$ hkci
```

### Usage

**load a file directly into the repl context**

* `hkci SOME_FILE`
* `hkci index.js`

**load a global package**

* `hkci -g GLOBAL_PKG`
* `hkci --global haskind`

**load a global package and merge into the repl context**

* `hkci --global GLOBAL_PKG --directly`
* `hkci -g haskind -d`

**load a local package** via `require('./node_modules/${NAME}')`

* `hkci -l LOCAL_PKG`
* `hkci --local lodash`

**load the current package** via `require('./package.json').main`

* `hkci -c`
* `hkci --cwd`

### Cli Options

Various options are available, use `hkci -h` for more info.

```shell
$> hkci -h
Usage: hkci [-cdhnv] [-l local] [-g global] [file.js]
node repl creation tool

  -c, --cwd               Load the current directory (using ./package.json).
  -l, --local=PKG_NAME+   Load a module from local node_modules.
  -g, --global=PKG_NAME+  Load a module from global node_modules.
  -d, --directly          Load all modules directly into the repl context.
  -n, --vanilla           Prevents all modules from being loaded. Period.
  -h, --help              Display this help.
  -v, --version           Show version.

Installation: npm install hkci
Respository:  https://github.com/MrRacoon/hkci
```

### File loading

Files can be loaded into the repl using both the command line and through REPL
commands.

`hkci relative/path.js`

Loaded files can then be reloaded using `.reload` or `.r` for short. To load
another file, use `.load [filename]` or `.l [filename]`.

### ~/.hkcirc

You can unlock more features using an *rc* file. options include:

* prompt - change the default prompt
* vim - adds readline-vim support
* bindings - vim keybindings to add to readline
* global - Automatically load the list of global modules

```json
{
    "prompt": "Main> ",
    "vim": true,
    "bindings": {
        "insert": [
          [ "kj", "esc" ]
        ]
    },
    "global": [
      "haskind"
    ]
}
```
## License

[MIT License](http://opensource.org/licenses/MIT)

Copyright &copy; 2016 Erik Sutherland. All rights reserved.
