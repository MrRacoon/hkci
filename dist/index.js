'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _hkci = require('./hkci');

var _hkci2 = _interopRequireDefault(_hkci);

var _parser = require('./parser');

var _parser2 = _interopRequireDefault(_parser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {

  var config = require('rc')('hkci', {
    vim: false,
    bindings: {},
    options: {}
  });

  var flags = require('node-getopt').create([['c', 'cwd', 'run hkci in the context of a haskind project'], ['V', 'showVersion', 'show version of current haskind on the prompt'], ['D', 'Data', 'preload Data'], ['C', 'Control', 'preload Data'], ['S', 'System', 'preload Data'], ['b', 'Bool', 'preload Data.Bool'], ['E', 'Either', 'preload Data.Either'], ['e', 'Enum', 'preload Data.Enum'], ['e', 'Eq', 'preload Data.Eq'], ['f', 'Function', 'preload Data.Function'], ['x', 'Ix', 'preload Data.Ix'], ['l', 'List', 'preload Data.List'], ['m', 'Map', 'preload Data.Map'], ['M', 'Maybe', 'preload Data.Maybe'], ['o', 'Ord', 'preload Data.Ord'], ['s', 'String', 'preload Data.String'], ['T', 'Tuple', 'preload Data.Tuple'], ['h', 'help', 'display this help'], ['v', 'version', 'show version']]).bindHelp().parseSystem();

  var packageJson = void 0;
  var haskind = void 0;

  var options = (0, _extends3.default)({}, config.options, flags.options);

  if (options.cwd) {
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

  if (options.version) {
    console.log(packageJson.name, packageJson.version); // eslint-disable-line
    return {};
  }

  var loadables = (0, _parser2.default)(haskind, options);

  var opts = (0, _extends3.default)({}, config, {
    options: options,
    packageJson: packageJson,
    haskind: haskind,
    loadables: loadables
  });

  return (0, _hkci2.default)(opts);
};