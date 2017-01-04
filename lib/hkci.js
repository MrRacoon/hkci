'use strict';

const opt = require('node-getopt').create([
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

let packageJson;
if (opt.options.version) {
    packageJson = require('../package.json');
    console.log(packageJson.name, packageJson.version)
    return;
}

var haskind;
if (opt.options.cwd) {
    console.log('loaded local haskind :', process.cwd());
    haskind = require(process.cwd() + '/index.js');
    packageJson = require(process.cwd() + '/package.json');
} else {
    haskind = require('haskind');
    packageJson = require('haskind/package.json');
}

const repl = require('repl').start('[' + packageJson.version + ']' + ' λ > ');

// Data
Object.defineProperty(repl.context, 'Data', {
    get: function () { return haskind; },
    set: function () { return; }
});

// List, Map, Either....
Object.keys(haskind).forEach((key) => {
  repl.context[key.toUpperCase()] = key;
  Object.defineProperty(repl.context, key, {
      get: function () { return haskind[key]; },
      set: function () { return; }
  });
});

// module()
Object.defineProperty(repl.context, 'module', {
  set: function () { return; },
  get: function () { return module; }
});

// preLoad
Object.keys(opt.options).forEach((o) => {
  if (repl.context[o.toUpperCase()]) {
    console.log('preloading: %s', o);
    module(repl.context[o.toUpperCase()]);
  }
});


function module(module) {
  let count = 0;
  if (haskind[module]) {
    Object.keys(haskind[module]).forEach((key) => {
      if (!repl.context[key]) {
        console.log('++ %s', key);
        count += 1;
        Object.defineProperty(repl.context, key, {
          get: function () { return haskind[module][key]; },
          set: function () { return; }
        });
      } else {
        console.log('-- %s', key);
      }
    });
    return count;
  } else {
    console.log('No module %s', module);
    return 0;
  }
}

module.exports = repl;
