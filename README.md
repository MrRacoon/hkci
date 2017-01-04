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
 λ > Maybe.Just('haskind')
{ just: 'haskind' }
 λ > foo = [Maybe.Just('haskind'), Maybe.Nothing(), Maybe.Just(3)]
[ { just: 'haskind' }, { nothing: null }, { just: 3 } ]
 λ > Maybe.catMaybes(foo)
[ 'haskind', 3 ]
 λ >
```

To load functions directly into the repl context, use `module` with an
uppercase module name:

```
 λ > module(EITHER)
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
10
 λ > Left(1)
{ left: 1 }
```

### Cli Options

```
 Usage: node hkci

  -c, --cwd      run hkci in the context of a haskind project
  -h, --help     display this help
  -v, --version  show version
  -b, --bool     load Data.Bool
  -e, --either   load Data.Either
  -q, --eq       load Data.Eq
  -x, --ix       load Data.Ix
  -l, --list     load Data.List
  -p, --map      load Data.Map
  -y, --maybe    load Data.Maybe
  -s, --string   load Data.String
  -o, --ord      load Data.Ord
  -t, --tuple    load Data.Tuple
```
