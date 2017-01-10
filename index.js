
const opt = require('node-getopt').create([
    ['c' , 'cwd' , 'run hkci in the context of a haskind project'],
    ['h' , 'help' , 'display this help'],
    ['v' , 'version', 'show version'],

    ['D' , 'Data' , 'preload Data'],
    ['C' , 'Control' , 'preload Data'],
    ['S' , 'System' , 'preload Data'],

    ['b' , 'Bool' , 'preload Data.Bool'],
    ['E' , 'Either' , 'preload Data.Either'],
    ['e' , 'Enum' , 'preload Data.Enum'],
    ['e' , 'Eq' , 'preload Data.Eq'],
    ['f' , 'Function', 'preload Data.Function'],
    ['x' , 'Ix' , 'preload Data.Ix'],
    ['l' , 'List' , 'preload Data.List'],
    ['m' , 'Map' , 'preload Data.Map'],
    ['M' , 'Maybe' , 'preload Data.Maybe'],
    ['o' , 'Ord' , 'preload Data.Ord'],
    ['s' , 'String' , 'preload Data.String'],
    ['T' , 'Tuple' , 'preload Data.Tuple']
]).bindHelp().parseSystem();

module.exports = require('./lib/hkci.js')(opt);
