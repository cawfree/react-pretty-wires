"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var findPointOnCubicBezier = function findPointOnCubicBezier(p, sx, sy, c1x, c1y, c2x, c2y, ex, ey) {
  var op = 1 - p;
  var g1x = sx * p + c1x * op;
  var g1y = sy * p + c1y * op;
  var g2x = c1x * p + c2x * op;
  var g2y = c1y * p + c2y * op;
  var g3x = c2x * p + ex * op;
  var g3y = c2y * p + ey * op;
  var b1x = g1x * p + g2x * op;
  var b1y = g1y * p + g2y * op;
  var b2x = g2x * p + g3x * op;
  var b2y = g2y * p + g3y * op;
  var x = b1x * p + b2x * op;
  var y = b1y * p + b2y * op;
  return [x, y];
};

var findLinePoint = function findLinePoint(x, y, m, b, offset, flip) {
  var x1 = x + offset / Math.sqrt(1 + m * m);
  return [x1, Math.abs(m) === Infinity ? y + (flip || 1) * offset : m * x1 + b];
};

var perpendicular = function perpendicular(x, y, oldM, l) {
  var m = -1 / oldM;
  var b = y - m * x;
  var point1 = findLinePoint(x, y, m, b, l * 0.5);
  var point2 = findLinePoint(x, y, m, b, l * -0.5);
  return [point1, point2];
};

var getArrowPath = function getArrowPath(epsilon, arrowProgression, sourceX, sourceY, c1X, c1Y, c2X, c2Y, targetX, targetY, arrowLength) {
  var center = findPointOnCubicBezier(arrowProgression, sourceX, sourceY, c1X, c1Y, c2X, c2Y, targetX, targetY);
  var plus = getShiftedPoint(epsilon, arrowProgression, sourceX, sourceY, c1X, c1Y, c2X, c2Y, targetX, targetY);
  var minus = getShiftedPoint(-epsilon, arrowProgression, sourceX, sourceY, c1X, c1Y, c2X, c2Y, targetX, targetY);
  var m = 1 * (plus[1] - minus[1]) / (plus[0] - minus[0]);
  var b = center[1] - m * center[0];
  var len = plus[0] > minus[0] ? arrowLength *= -1 : arrowLength;
  center = findLinePoint(center[0], center[1], m, b, -1 * len / 2);
  var flip = plus[1] > minus[1] ? -1 : 1;
  var points = [].concat(_toConsumableArray(perpendicular(center[0], center[1], m, len * 0.9)), [findLinePoint(center[0], center[1], m, b, len, flip)]);
  return "M ".concat(points[0][0], " ").concat(points[0][1], " L ").concat(points[1][0], " ").concat(points[1][1], " L ").concat(points[2][0], " ").concat(points[2][1]);
};

var getPath = function getPath(sourceX, sourceY, c1X, c1Y, c2X, c2Y, targetX, targetY) {
  return "M ".concat(sourceX, " ").concat(sourceY, " C ").concat(c1X, " ").concat(c1Y, " ").concat(c2X, " ").concat(c2Y, " ").concat(targetX, " ").concat(targetY);
};

var getShiftedPoint = function getShiftedPoint(epsilon, arrowProg, sourceX, sourceY, c1X, c1Y, c2X, c2Y, targetX, targetY) {
  return findPointOnCubicBezier(arrowProg + epsilon, sourceX, sourceY, c1X, c1Y, c2X, c2Y, targetX, targetY);
};

var PrettyWire = function PrettyWire(_ref) {
  var Svg = _ref.Svg,
      Path = _ref.Path,
      sourceX = _ref.sourceX,
      sourceY = _ref.sourceY,
      targetX = _ref.targetX,
      targetY = _ref.targetY,
      avoidanceRadius = _ref.avoidanceRadius,
      epsilon = _ref.epsilon,
      arrow = _ref.arrow,
      arrowLength = _ref.arrowLength,
      arrowProgression = _ref.arrowProgression,
      color = _ref.color,
      extraProps = _objectWithoutProperties(_ref, ["Svg", "Path", "sourceX", "sourceY", "targetX", "targetY", "avoidanceRadius", "epsilon", "arrow", "arrowLength", "arrowProgression", "color"]);

  var width = Math.abs(targetX - sourceX);
  var height = Math.abs(targetY - sourceY);
  var c1X, c1Y, c2X, c2Y;

  if (targetX < sourceX) {
    var fac = (sourceX - targetX) * 0.5;

    if (height < avoidanceRadius * 0.5) {
      c1X = sourceX + fac;
      c1Y = sourceY - fac;
      c2X = targetX - fac;
      c2Y = targetY - fac;
    } else {
      c1X = sourceX + fac;
      c1Y = sourceY + (targetY > sourceY ? fac : -fac);
      c2X = targetX - fac;
      c2Y = targetY + (targetY > sourceY ? -fac : fac);
    }
  } else {
    c1X = sourceX + width * 0.5;
    c1Y = sourceY;
    c2X = c1X;
    c2Y = targetY;
  }

  return _react["default"].createElement(Svg, {
    style: {
      overflow: 'visible'
    },
    width: width,
    height: height
  }, _react["default"].createElement(Path, {
    d: getPath(sourceX, sourceY, c1X, c1Y, c2X, c2Y, targetX, targetY),
    stroke: color,
    fill: "none"
  }), !!arrow && _react["default"].createElement(Path, {
    d: getArrowPath(epsilon, arrowProgression, sourceX, sourceY, c1X, c1Y, c2X, c2Y, targetX, targetY, arrowLength),
    fill: color
  }));
};

PrettyWire.propTypes = {
  Svg: _propTypes["default"].elementType.isRequired,
  Path: _propTypes["default"].elementType.isRequired,
  avoidanceRadius: _propTypes["default"].number,
  epsilon: _propTypes["default"].number,
  arrow: _propTypes["default"].bool,
  arrowLength: _propTypes["default"].number,
  arrowProgression: _propTypes["default"].number,
  color: _propTypes["default"].string
};
PrettyWire.defaultProps = {
  avoidanceRadius: 100,
  epsilon: 0.01,
  arrow: false,
  arrowLength: 12,
  arrowProgression: 0.2,
  color: 'black'
};
var _default = PrettyWire;
exports["default"] = _default;