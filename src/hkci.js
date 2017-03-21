module.exports = function (config) {
  const { packageJson, haskind, options, loadables } = config;

  Object.keys(loadables).forEach(function (k) {
    const avail = typeof(loadables[k]) !== 'undefined' || k === 'undefined';
    console.log('>', avail ? '++' : '--', k); // eslint-disable-line
  });

  const prompt = options.showVersion
    ? '[' + packageJson.version + ']' + ' λ > '
    : ' λ > ';

  const repl = require('repl').start({
    prompt,
    useColors: true
  });

  // add vim if configured
  if (config.vim) {
    // apply bindings from the config
    const vim = require('readline-vim')(repl.rli).map;
    Object.keys(config.bindings).map(k => {
      config.bindings[k].map(([pre, pst]) => {
        vim[k](pre, pst);
      });
    });
  }

  // module()
  define(repl, 'module', mergeIntoContext.bind(null, repl));
  define(repl, 'm', mergeIntoContext.bind(null, repl));

  // Prelude
  mergeIntoContext(repl, haskind);
  mergeIntoContext(repl, haskind.Prelude);
  mergeIntoContext(repl, loadables);

  // options
  return repl;

};

function define(repl, name, val) {
  Object.defineProperty(repl.context, name, {
    get: function () { return val; },
    set: function () { return; }
  });
}

function mergeIntoContext (repl, obj) {
  let loaded = [];
  Object.keys(obj)
    .forEach(function (key) {
      repl.context[key] = obj[key];
      if (repl.context[key]) loaded.push(key);
    });
  return loaded;
}
