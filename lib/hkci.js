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

  var repl = require('repl').start({
    prompt: '[' + packageJson.version + ']' + ' λ > ',
    useColors: true
  });

  // Data, Concurrent, ...
  Object.keys(haskind).forEach(function (key) {
    Object.defineProperty(repl.context, key, {
      get: function () { return haskind[key]; },
      set: function () { return; }
    });
  });

  // module()
  Object.defineProperty(repl.context, 'module', {
    get: function () { return mergeIntoContext; },
    set: function () { return; }
  });

  // preLoad
  Object.keys(opt.options).forEach(function (o) {
    console.log('attempting:', o); // eslint-disable-line
    if (haskind.Data[o]) {
      console.log('preloading:', o); // eslint-disable-line
      mergeIntoContext(haskind.Data[o]);
    } else {
      console.log('missing:', o); // eslint-disable-line
    }
  });

  return repl;

  // ===========================================================================

  function mergeIntoContext (obj) {
    var added = [];
    var total = 0;
    Object.keys(obj).forEach(function (key) {
      total += 1;
      repl.context[key] = obj[key];
      if (repl.context[key]) {
        added.push(key);
        console.log('++ %s', key); // eslint-disable-line
      } else {
        console.log('-- %s', key); // eslint-disable-line
      }
    });
    console.log('(%s/%s) ', added.length, total); // eslint-disable-line
    return added;
  }
};
