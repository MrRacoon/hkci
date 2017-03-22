'use strict';

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (config) {
  var loaded = void 0;
  var packageJson = config.packageJson,
      haskind = config.haskind,
      options = config.options,
      loadables = config.loadables,
      argv = config.argv;


  if (options.version) {
    console.log(packageJson.name, packageJson.version); // eslint-disable-line
    return {};
  }

  (0, _keys2.default)(loadables).forEach(function (k) {
    var avail = typeof loadables[k] !== 'undefined' || k === 'undefined';
    console.log('>', avail ? '++' : '--', k); // eslint-disable-line
  });

  var prompt = options.showVersion ? '[' + packageJson.version + ']' + ' λ > ' : ' λ > ';

  var repl = require('repl').start({
    prompt: prompt,
    useColors: true
  });

  // add vim if configured
  if (config.vim) {
    // apply bindings from the config
    var vim = require('readline-vim')(repl.rli).map;
    (0, _keys2.default)(config.bindings).map(function (k) {
      config.bindings[k].map(function (_ref) {
        var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
            pre = _ref2[0],
            pst = _ref2[1];

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
    var lFile = process.cwd() + '/' + file;
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

  function reload() {
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
  (0, _defineProperty2.default)(repl.context, name, {
    get: function get() {
      return val;
    },
    set: function set() {
      return;
    }
  });
}

function mergeIntoContext(repl, obj) {
  var loaded = [];
  (0, _keys2.default)(obj).forEach(function (key) {
    repl.context[key] = obj[key];
    if (repl.context[key]) loaded.push(key);
  });
  return loaded;
}

// Props to: http://stackoverflow.com/a/16060619
function req(module) {
  delete require.cache[require.resolve(module)];
  return require(module);
}