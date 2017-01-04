'use strict';

const opt = require('node-getopt').create([
    ['c' , 'cwd'    , 'run hkci in the context of a haskind project'],
    ['h' , 'help'   , 'display this help'],
    ['v' , 'version', 'show version']
]).bindHelp().parseSystem();

if (opt.options.version) {
    const packageJson = require('../package.json');
    console.log(packageJson.name, packageJson.version)
    return;
}

var haskind;
if (opt.options.cwd) {
    console.log('in :', process.cwd());
    haskind = require(process.cwd() + '/index.js');
} else {
    haskind = require('haskind');
}

const repl = require('repl').start(' λ > ');
Object.keys(haskind).forEach((key) => {
  Object.defineProperty(repl.context, key, {
      get: function () { return haskind[key]; },
      set: function () { return; }
  });
});
