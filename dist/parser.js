'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parser = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parser = exports.parser = function parser(haskind, opt) {
  var res = {};
  (0, _keys2.default)(opt.options).forEach(function (o) {
    switch (o) {
      case 'Control':
      case 'Data':
      case 'System':
        res = (0, _assign2.default)({}, res, haskind[o]);
        break;
      case 'Bool':
      case 'Either':
      case 'Enum':
      case 'Eq':
      case 'Function':
      case 'Ix':
      case 'List':
      case 'Map':
      case 'Maybe':
      case 'Ord':
      case 'String':
      case 'Tuple':
        res = (0, _assign2.default)({}, res, haskind.Data[o]);
        break;
      default:
        break;
    }
  });

  return res;
};

exports.default = parser;