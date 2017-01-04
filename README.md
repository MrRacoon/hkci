# hkci

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

Run  hkci in a valid haskind library folder, whether it be a git repo or a
`node_modules` directory. (Should be run at the root of haskind)
```sh
hkci -c
hkci --cwd

```
