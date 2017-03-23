module.exports = function (config) {
  let loaded;
  const { packageJson, haskind, options, loadables, argv, prompt } = config;

  let _prompt = prompt || ' λ > ';
  _prompt = options.showVersion
    ? '[' + packageJson.version + ']' + _prompt
    : _prompt;

  //
  if (options.version) {
    console.log('hkci', require(__dirname + '/../package.json').version); // eslint-disable-line
    console.log(packageJson.name, packageJson.version); // eslint-disable-line
    return {};
  }

  const repl = require('repl')
    .start({ prompt: _prompt, useColors: true });

  // auto load file specified by argv
  if (argv.length) { load(argv[0]); }

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

  // file (re)loading
  repl.defineCommand('r', reload);
  repl.defineCommand('reload', reload);
  repl.defineCommand('l', load);
  repl.defineCommand('load', load);

  // Prelude
  mergeIntoContext(repl, haskind);
  mergeIntoContext(repl, haskind.Prelude);
  mergeIntoContext(repl, loadables);

  // Module loader
  define(repl, 'm', mergeIntoContext.bind(null, repl));
  define(repl, 'module', mergeIntoContext.bind(null, repl));

  return repl;

  function load(file) {
    loaded = file || loaded;
    const lFile = process.cwd() + '/' + file;
    try {
      const f = req(lFile);
      if (typeof f === 'object') {
        mergeIntoContext(repl, f);
        console.log('Ok, modules loaded:', lFile); // eslint-disable-line
        repl.displayPrompt();
      } else {
        console.log('module must export an object'); // eslint-disable-line
      }
    } catch (e) {
      console.log('e', e); // eslint-disable-line
      console.error('Failed, modules loaded: none'); // eslint-disable-line
      repl.displayPrompt();
      return;
    }
  }

  function reload () {
    if (loaded) {
      load(loaded);
      repl.displayPrompt();
    } else {
      console.log('Ok, modules loaded: none'); // eslint-disable-line
      repl.displayPrompt();
    }
  }
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

// Props to: http://stackoverflow.com/a/16060619
function req (module) {
  delete require.cache[require.resolve(module)];
  return require(module);
}
