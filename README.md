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

**load a global package**

`hkci -g global_pkg`
`hkci --global haskind`

**load a local package** via `require('./node_modules/${NAME}')`

`hkci -l LOCAL_PKG`
`hkci --local lodash`

**load the current package** via `require('./package.json').main`

`hkci -c`
`hkci --cwd`

### Cli Options

Various options are available, use `hkci -h` for more info.

```shell
Usage: node hkci

    -c, --cwd               load the current directory (using ./package.json)
    -l, --local=PKG_NAME+   load a module from local node_modules
    -g, --global=PKG_NAME+  load a module from global node_modules
    -d, --directly          load all modules directly into the repl context
    -h, --help              display this help
    -v, --version           show version
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
