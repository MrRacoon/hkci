module.exports = function (config) {
  let loaded;
  const { packageJson, haskind, options, loadables, argv } = config;

  if (options.version) {
    console.log(packageJson.name, packageJson.version); // eslint-disable-line
    return {};
  }

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

  if (argv.length) {
    load(argv[0]);
  }

  repl.defineCommand('r', reload);
  repl.defineCommand('reload', reload);
  repl.defineCommand('l', load);
  repl.defineCommand('load', load);

  // module()
  define(repl, 'module', mergeIntoContext.bind(null, repl));
  define(repl, 'm', mergeIntoContext.bind(null, repl));

  // Prelude
  mergeIntoContext(repl, haskind);
  mergeIntoContext(repl, haskind.Prelude);
  mergeIntoContext(repl, loadables);

  // options
  return repl;

  function load(file) {
    loaded = file || loaded;
    const lFile = process.cwd() + '/' + file;
    try {
      mergeIntoContext(repl, req(lFile));
      console.log('loaded', lFile); // eslint-disable-line
      repl.displayPrompt();
    } catch (e) {
      console.log('e', e); // eslint-disable-line
      console.error('could not load', lFile); // eslint-disable-line
      loaded = null;
      repl.displayPrompt();
      return;
    }
  }

  function reload () {
    if (loaded) {
      load(loaded);
      repl.displayPrompt();
    } else {
      console.log('no file loaded'); // eslint-disable-line
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
