'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _parser = require('./parser');

var _parser2 = _interopRequireDefault(_parser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (packageJson, haskind, opt) {
  var loadables = (0, _parser2.default)(haskind, opt);

  (0, _keys2.default)(loadables).forEach(function (k) {
    var avail = typeof loadables[k] !== 'undefined' || k === 'undefined';
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
    get: function get() {
      return mergeIntoContext;
    },
    set: function set() {
      return;
    }
  });

  // options
  return repl;

  // ===========================================================================
};

function mergeIntoContext(rep, obj) {
  (0, _keys2.default)(obj).forEach(function (key) {
    rep.context[key] = obj[key];
  });
}