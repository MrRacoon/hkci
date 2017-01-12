'use strict';

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _parser = require('./parser');

var _parser2 = _interopRequireDefault(_parser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (opt) {
  var packageJson;

  if (opt.options.version) {
    packageJson = require('../package.json');
    console.log(packageJson.name, packageJson.version); // eslint-disable-line
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
    haskind = require('haskind');
  }

  var loadables = (0, _parser2.default)(haskind, opt);

  (0, _keys2.default)(loadables).forEach(function (k) {
    var avail = typeof loadables[k] !== 'undefined' || k === 'undefined';
    console.log('>', avail ? '++' : '--', k); // eslint-disable-line
  });

  var repl = require('repl').start({
    prompt: '[' + packageJson.version + ']' + ' λ > ',
    useColors: true
  });

  var _mergeIntoContext = mergeIntoContext(loadables),
      _mergeIntoContext2 = (0, _slicedToArray3.default)(_mergeIntoContext, 2),
      added = _mergeIntoContext2[0],
      total = _mergeIntoContext2[1];

  console.log('(' + added + '/' + total + ')'); //eslint-disable-line

  // Data, Concurrent, ...
  (0, _keys2.default)(haskind).forEach(function (key) {
    (0, _defineProperty2.default)(repl.context, key, {
      get: function get() {
        return haskind[key];
      },
      set: function set() {
        return;
      }
    });
  });

  // module()
  Object.defineProperty(repl.context, 'module', {
    get: function get() {
      return mergeIntoContext;
    },
    set: function set() {
      return;
    }
  });

  // Prelude
  (0, _keys2.default)(haskind.Prelude).forEach(function (key) {
    (0, _defineProperty2.default)(repl.context, key, {
      get: function get() {
        return haskind.Prelude[key];
      },
      set: function set() {
        return;
      }
    });
  });

  // options
  return repl;

  // ===========================================================================

  function mergeIntoContext(obj) {
    var added = 0;
    var total = 0;
    (0, _keys2.default)(obj).forEach(function (key) {
      total += 1;
      repl.context[key] = obj[key];
      if (repl.context[key]) {
        added += 1;
      }
    });
    return [added, total];
  }
};