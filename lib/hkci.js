'use strict';

module.exports = function (opt) {
  var packageJson;
  if (opt.options.version) {
    packageJson = require('../package.json');
    console.log(packageJson.name, packageJson.version) // eslint-disable-line
    return;
  }

  var haskind;
  if (opt.options.cwd) {
    console.log('loaded local haskind :', process.cwd()); // eslint-disable-line
    haskind = require(process.cwd() + '/index.js');
    packageJson = require(process.cwd() + '/package.json');
  } else {
    haskind = require('haskind');
    packageJson = require('haskind/package.json');
  }

  var repl = require('repl').start('[' + packageJson.version + ']' + ' λ > ');

  // Data
  Object.defineProperty(repl.context, 'Data', {
    get: function () { return haskind; },
    set: function () { return; }
  });

  // List, Map, Either....
  Object.keys(haskind).forEach(function (key) {
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
  Object.keys(opt.options).forEach(function (o) {
    if (repl.context[o.toUpperCase()]) {
      console.log('preloading: %s', o); // eslint-disable-line
      module(repl.context[o.toUpperCase()]);
    }
  });


  function module(module) {
    var count = 0;
    if (haskind[module]) {
      Object.keys(haskind[module]).forEach(function (key) {
        if (!repl.context[key]) {
          console.log('++ %s', key); // eslint-disable-line
          count += 1;
          Object.defineProperty(repl.context, key, {
            get: function () { return haskind[module][key]; },
            set: function () { return; }
          });
        } else {
          console.log('-- %s', key); // eslint-disable-line
        }
      });
      return count;
    } else {
      console.log('No module %s', module); // eslint-disable-line
      return 0;
    }
  }

  return repl;
};
