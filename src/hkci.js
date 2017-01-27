import parser from './parser';

module.exports = function (packageJson, haskind, opt) {
  let loadables = parser(haskind, opt);

  Object.keys(loadables).forEach(function (k) {
    const avail = typeof(loadables[k]) !== 'undefined' || k === 'undefined';
    console.log('>', avail ? '++' : '--', k); // eslint-disable-line
  });

  var prompt = opt.options.showVersion
    ? '[' + packageJson.version + ']' + ' λ > '
    : ' λ > ';

  var repl = require('repl').start({
    prompt,
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

  // m()
  Object.defineProperty(repl.context, 'm', {
    get: function () { return mergeIntoContext.bind(null, repl); },
    set: function () { return; }
  });

  // options
  return repl;

  // ===========================================================================

};

function mergeIntoContext (rep, obj) {
  let loaded = [];
  Object.keys(obj)
    .forEach(function (key) {
      rep.context[key] = obj[key];
      if (rep.context[key]) loaded.push(key);
    });
  return loaded;
}
