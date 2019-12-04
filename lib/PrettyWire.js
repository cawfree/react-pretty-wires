// Absolutely all credit to this sick algorithm goes to NoFlo:
// https://github.com/flowhub/the-graph/blob/master/the-graph/the-graph-edge.js

import React from 'react';
import PropTypes from 'prop-types';

const findPointOnCubicBezier = (p, sx, sy, c1x, c1y, c2x, c2y, ex, ey) => {
  const op = 1 - p;
  const g1x = sx * p + c1x * op;
  const g1y = sy * p + c1y * op;
  const g2x = c1x * p + c2x * op;
  const g2y = c1y * p + c2y * op;
  const g3x = c2x * p + ex * op;
  const g3y = c2y * p + ey * op;
  const b1x = g1x * p + g2x * op;
  const b1y = g1y * p + g2y * op;
  const b2x = g2x * p + g3x * op;
  const b2y = g2y * p + g3y * op;
  const x = b1x * p + b2x * op;
  const y = b1y * p + b2y * op;
  return [x, y];    
};

const findLinePoint = (x, y, m, b, offset, flip) => {
  const x1 = x + offset/Math.sqrt(1 + m*m);
  return [
    x1,
    Math.abs(m) === Infinity ? y + (flip || 1) * offset : (m * x1) + b,
  ];
};

const perpendicular = function (x, y, oldM, l) {
  var m = -1 / oldM;
  var b = y - m * x;
  var point1 = findLinePoint(x, y, m, b, l * 0.5);
  var point2 = findLinePoint(x, y, m, b, l * -0.5);
  return [point1, point2];
};

const getArrowPath = (epsilon, arrowProgression, sourceX, sourceY, c1X, c1Y, c2X, c2Y, targetX, targetY, arrowLength) => {

  var center = findPointOnCubicBezier(arrowProgression, sourceX, sourceY, c1X, c1Y, c2X, c2Y, targetX, targetY);

  const plus = getShiftedPoint(epsilon, arrowProgression, sourceX, sourceY, c1X, c1Y, c2X, c2Y, targetX, targetY);
  const minus = getShiftedPoint(-epsilon, arrowProgression, sourceX, sourceY, c1X, c1Y, c2X, c2Y, targetX, targetY);

  const m = 1 * (plus[1] - minus[1]) / (plus[0] - minus[0]);
  const b = center[1] - (m * center[0]);
  
  const len = (plus[0] > minus[0]) ? arrowLength *= -1 : arrowLength;

  center = findLinePoint(center[0], center[1], m, b, -1 * len / 2);

  const flip = plus[1] > minus[1] ? -1 : 1;

  const points = [
    ...perpendicular(center[0], center[1], m, len * 0.9),
    findLinePoint(center[0], center[1], m, b, len, flip),
  ];
  return `M ${points[0][0]} ${points[0][1]} L ${points[1][0]} ${points[1][1]} L ${points[2][0]} ${points[2][1]}`;
};

const getPath = (sourceX, sourceY, c1X, c1Y, c2X, c2Y, targetX, targetY) => `M ${sourceX} ${sourceY} C ${c1X} ${c1Y} ${c2X} ${c2Y} ${targetX} ${targetY}`;

const getShiftedPoint = (epsilon, arrowProg, sourceX, sourceY, c1X, c1Y, c2X, c2Y, targetX, targetY) => findPointOnCubicBezier(arrowProg + epsilon, sourceX, sourceY, c1X, c1Y, c2X, c2Y, targetX, targetY);

const PrettyWire = ({ Svg, Path, sourceX, sourceY, targetX, targetY, avoidanceRadius, epsilon, arrow, arrowLength, arrowProgression, color, ...extraProps }) => {
  const width = Math.abs(targetX - sourceX);
  const height = Math.abs(targetY - sourceY);
  var c1X, c1Y, c2X, c2Y;
  if (targetX < sourceX) {
    const fac = (sourceX - targetX) * 0.5;
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
  return (
    <Svg
      style={{
        overflow: 'visible',
      }}
      width={width}
      height={height}
    >
      <Path
        d={getPath(sourceX, sourceY, c1X, c1Y, c2X, c2Y, targetX, targetY)}
        stroke={color}
        fill="none"
      />
      {(!!arrow) && (
        <Path
          d={getArrowPath(epsilon, arrowProgression, sourceX, sourceY, c1X, c1Y, c2X, c2Y, targetX, targetY, arrowLength)}
          fill={color}
        />
      )} 
    </Svg>
  );
};

PrettyWire.propTypes = {
  Svg: PropTypes.elementType.isRequired,
  Path: PropTypes.elementType.isRequired,
  avoidanceRadius: PropTypes.number,
  epsilon: PropTypes.number,
  arrow: PropTypes.bool,
  arrowLength: PropTypes.number,
  arrowProgression: PropTypes.number,
  color: PropTypes.string,
};

PrettyWire.defaultProps = {
  avoidanceRadius: 100,
  epsilon: 0.01,
  arrow: false,
  arrowLength: 12,
  arrowProgression: 0.5,
  color: 'black',
};

export default PrettyWire;
