# hkci

[![dependencies Status](https://david-dm.org/MrRacoon/haskind/status.svg)](https://david-dm.org/MrRacoon/hkci)
[![Build Status](https://travis-ci.org/MrRacoon/hkci.svg?branch=master)](https://travis-ci.org/MrRacoon/hkci)

Command line interpreter for [haskind](https://github.com/MrRacoon/haskind).

This tool is used to explore the haskind library. haskind modules are loaded in
the repl for you from the get go!

### install

```bash
$ npm install -g hkci
$ hkci
```

### Usage

Functions can be found in their appropriate module. To load functions directly
into the repl context, call it with `module()`.

```
 λ > Data.Maybe.Just('haskind')
{ just: 'haskind' }

 λ > module(Data.Maybe)
[ 'Just',
  'Nothing',
  'maybe',
  'isJust',
  'isNothing',
  'fromJust',
  'fromMaybe',
  'listToMaybe',
  'maybeToList',
  'catMaybes',
  'mapMaybe' ]

 λ > foo = [Just('haskind'), Nothing(), Just(3)]
[ { just: 'haskind' }, { nothing: null }, { just: 3 } ]

 λ > Data.Maybe.catMaybes(foo)
[ 'haskind', 3 ]
```

### Cli Options

Various options are available, use `hkci -h` for more info.

## License

[MIT License](http://opensource.org/licenses/MIT)

Copyright &copy; 2016 Erik Sutherland. All rights reserved.
