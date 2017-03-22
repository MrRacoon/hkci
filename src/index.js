import hkci from './hkci';
import parser from './parser';

export default () => {

  const config = require('rc')('hkci', {
    vim: false,
    bindings: {},
    options: {}
  });

  const flags = require('node-getopt').create([
    ['c' , 'cwd' , 'run hkci in the context of a haskind project'],
    ['V' , 'showVersion', 'show version of current haskind on the prompt'],

    ['D' , 'Data' , 'preload Data'],
    ['C' , 'Control' , 'preload Control'],
    ['S' , 'System' , 'preload System'],

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

  let packageJson;
  let haskind;

  const options = {
    ...config.options,
    ...flags.options
  };

  if (options.cwd) {
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

  const loadables = parser(haskind, options);

  const opts = {
    ...config,
    argv: flags.argv,
    options,
    packageJson,
    haskind,
    loadables,
  };

  return hkci(opts);
};
