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
  mergeIntoContext(repl, haskind);
  mergeIntoContext(repl, haskind.Prelude);
  mergeIntoContext(repl, loadables);

  // module()
  Object.defineProperty(repl.context, 'module', {
    get: function () { return mergeIntoContext.bind(null, repl); },
    set: function () { return; }
  });

  // options
  return repl;

  // ===========================================================================

};

function mergeIntoContext (rep, obj) {
  Object.keys(obj)
    .forEach(function (key) {
      rep.context[key] = obj[key];
    });
}
