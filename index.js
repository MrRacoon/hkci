'use strict';

var opt = require('node-getopt').create([
    ['c' , 'cwd'    , 'run hkci in the context of a haskind project'],
    ['h' , 'help'   , 'display this help'],
    ['v' , 'version', 'show version'],

    ['b' , 'bool'   , 'load Data.Bool'],
    ['e' , 'either' , 'load Data.Either'],
    ['q' , 'eq'     , 'load Data.Eq'],
    ['x' , 'ix'     , 'load Data.Ix'],
    ['l' , 'list'   , 'load Data.List'],
    ['p' , 'map'    , 'load Data.Map'],
    ['y' , 'maybe'  , 'load Data.Maybe'],
    ['s' , 'string' , 'load Data.String'],
    ['o' , 'ord'    , 'load Data.Ord'],
    ['t' , 'tuple'  , 'load Data.Tuple']
]).bindHelp().parseSystem();

module.exports = require('./lib/hkci.js')(opt);
