
const opt = require('node-getopt').create([
    ['c' , 'cwd'    , 'run hkci in the context of a haskind project'],
    ['h' , 'help'   , 'display this help'],
    ['v' , 'version', 'show version'],

    ['D' , 'Data'   , 'preload Data'],

    ['b' , 'Bool'   , 'preload Data.Bool'],
    ['E' , 'Either' , 'preload Data.Either'],
    ['e' , 'Eq'     , 'preload Data.Eq'],
    ['x' , 'Ix'     , 'preload Data.Ix'],
    ['l' , 'List'   , 'preload Data.List'],
    ['m' , 'Map'    , 'preload Data.Map'],
    ['M' , 'Maybe'  , 'preload Data.Maybe'],
    ['s' , 'String' , 'preload Data.String'],
    ['o' , 'Ord'    , 'preload Data.Ord'],
    ['T' , 'Tuple'  , 'preload Data.Tuple']
]).bindHelp().parseSystem();

module.exports = require('./lib/hkci.js')(opt);
