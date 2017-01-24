'use strict';

const opt = require('node-getopt').create([
    ['c' , 'cwd' , 'run hkci in the context of a haskind project'],
    ['V' , 'showVersion', 'show version of current haskind on the prompt'],

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
    ['T' , 'Tuple' , 'preload Data.Tuple'],

    ['h' , 'help' , 'display this help'],
    ['v' , 'version', 'show version']
]).bindHelp().parseSystem();

if (opt.options.version) {
  packageJson = require('../package.json');
  console.log(packageJson.name, packageJson.version) // eslint-disable-line
  return;
}

let packageJson;
let haskind;
if (opt.options.cwd) {
  console.info('loading local haskind:', process.cwd()); // eslint-disable-line
  packageJson = require(process.cwd() + '/package.json');
  if (packageJson.name === 'haskind') {
    haskind = require(process.cwd() + '/index.js');
  }
}

if (!haskind) {
  packageJson = require('haskind/package.json');
  haskind     = require('haskind');
}

module.exports = require('./dist/hkci.js')(packageJson, haskind, opt);
