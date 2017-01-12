import parser from './parser';

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

  let loadables = parser(haskind, opt);

  Object.keys(loadables).forEach(function (k) {
    const avail = typeof(loadables[k]) !== 'undefined' || k === 'undefined';
    console.log('>', avail ? '++' : '--', k); // eslint-disable-line
  });

  var repl = require('repl').start({
    prompt: '[' + packageJson.version + ']' + ' λ > ',
    useColors: true
  });

  const [added, total] = mergeIntoContext(loadables);
  console.log(`(${added}/${total})`); //eslint-disable-line

  // Data, Concurrent, ...
  Object.keys(haskind)
    .forEach(function (key) {
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

  // Prelude
  Object.keys(haskind.Prelude)
    .forEach(function (key) {
      Object.defineProperty(repl.context, key, {
        get: function () { return haskind.Prelude[key]; },
        set: function () { return; }
      });
    });

  // options
  return repl;

  // ===========================================================================

  function mergeIntoContext (obj) {
    var added = 0;
    var total = 0;
    Object.keys(obj)
      .forEach(function (key) {
        total += 1;
        repl.context[key] = obj[key];
        if (repl.context[key]) { added += 1; }
      });
    return [added, total];
  }
};
