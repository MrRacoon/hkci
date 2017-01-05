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

```
 λ > Data.Maybe.Just('haskind')
{ just: 'haskind' }

 λ > foo = [Data.Maybe.Just('haskind'), Data.Maybe.Nothing(), Data.Maybe.Just(3)]
[ { just: 'haskind' }, { nothing: null }, { just: 3 } ]

 λ > Data.Maybe.catMaybes(foo)
[ 'haskind', 3 ]

 λ >
```

To load functions directly into the repl context, call it with `module`

```
 λ > module(Data.Either)
++ Left
++ Right
++ either
++ fromLeft
++ fromRight
++ lefts
++ rights
++ isLeft
++ isRight
++ partitionEithers
(10/10)
10

 λ > Left(1)
{ left: 1 }

 λ > Just('haskind')
{ just: 'haskind' }

 λ > foo = [Just('haskind'), Nothing(), Just(3)]
[ { just: 'haskind' }, { nothing: null }, { just: 3 } ]

 λ > catMaybes(foo)
[ 'haskind', 3 ]

 λ >

```

### Cli Options

Various options are available, use `hkci -h` for more info.

## License

[MIT License](http://opensource.org/licenses/MIT)

Copyright &copy; 2016 Erik Sutherland. All rights reserved.
