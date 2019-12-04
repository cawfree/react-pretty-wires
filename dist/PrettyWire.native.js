"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNativeSvg = require("react-native-svg");

var _PrettyWire = _interopRequireDefault(require("./PrettyWire.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var _default = function _default(_ref) {
  var extraProps = _extends({}, _ref);

  return _react["default"].createElement(_PrettyWire["default"], _extends({
    Svg: _reactNativeSvg.Svg,
    Path: _reactNativeSvg.Path
  }, extraProps));
};

exports["default"] = _default;
