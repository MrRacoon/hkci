'use strict';

const opt = require('node-getopt').create([
    ['c' , 'cwd'    , 'run hkci in the context of a haskind project'],
    ['h' , 'help'   , 'display this help'],
    ['v' , 'version', 'show version']
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
Object.keys(haskind).forEach((key) => {
  Object.defineProperty(repl.context, key, {
      get: function () { return haskind[key]; },
      set: function () { return; }
  });
});

repl.context.BOOL   = 'Bool';
repl.context.EITHER = 'Either';
repl.context.EQ     = 'Eq';
repl.context.LIST   = 'List';
repl.context.MAP    = 'Map';
repl.context.MAYBE  = 'Maybe';
repl.context.ORD    = 'Ord';
repl.context.STRING = 'String';
repl.context.TUPLE  = 'Tuple';

Object.defineProperty(repl.context, 'module', {
  set: function () { return; },
  get: function () {
    return function (module) {
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
  }
});
