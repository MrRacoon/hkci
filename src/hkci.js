import parser from './parser';

module.exports = function (packageJson, haskind, opt) {
  let loadables = parser(haskind, opt);

  Object.keys(loadables).forEach(function (k) {
    const avail = typeof(loadables[k]) !== 'undefined' || k === 'undefined';
    console.log('>', avail ? '++' : '--', k); // eslint-disable-line
  });

  var repl = require('repl').start({
    prompt: '[' + packageJson.version + ']' + ' λ > ',
    useColors: true
  });

  // Prelude
  mergeIntoContext(haskind);
  mergeIntoContext(haskind.Prelude);
  mergeIntoContext(loadables);

  // module()
  Object.defineProperty(repl.context, 'module', {
    get: function () { return mergeIntoContext; },
    set: function () { return; }
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
