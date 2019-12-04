"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _PrettyWire = _interopRequireDefault(require("./PrettyWire.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Svg = function Svg(_ref) {
  var extraProps = _extends({}, _ref);

  return _react["default"].createElement("svg", extraProps);
};

var Path = function Path(_ref2) {
  var extraProps = _extends({}, _ref2);

  return _react["default"].createElement("path", extraProps);
};

var _default = function _default(_ref3) {
  var extraProps = _extends({}, _ref3);

  return _react["default"].createElement(_PrettyWire["default"], _extends({
    Svg: Svg,
    Path: Path
  }, extraProps));
};

exports["default"] = _default;