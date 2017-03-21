'use strict';

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (config) {
  var packageJson = config.packageJson,
      haskind = config.haskind,
      options = config.options,
      loadables = config.loadables;


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