module.exports = function (init) {
  let loaded;
  const { config, argv, options, loadables } = init;

  if (options.version) {
    console.log('hkci', require(__dirname + '/../package.json').version); // eslint-disable-line
    process.exit(0);
  }

  const repl = require('repl')
    .start({
      prompt : config.prompt || ' λ > ',
      useColors : true,
    });

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

  // File load
  repl.defineCommand('l', load);
  repl.defineCommand('load', load);

  // File reload
  repl.defineCommand('r', reload);
  repl.defineCommand('reload', reload);

  // Quit out
  repl.defineCommand('q', quit);
  repl.defineCommand('quit', quit);

  // auto-merged modules
  mergeIntoContext(repl, loadables);

  if (options.directly) {
    Object.keys(loadables).map(k => {
      mergeIntoContext(repl, loadables[k]);
    });
  }

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
  Object.keys(obj).forEach(
    function addToContext(key) {
      repl.context[key] = obj[key];
    }
  );
}

// Props to: http://stackoverflow.com/a/16060619
function req (module) {
  delete require.cache[require.resolve(module)];
  return require(module);
}

function quit () {
  console.log('Leaving HKCI'); // eslint-disable-line
  process.exit(0);
}
