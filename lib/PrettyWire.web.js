import React from 'react';

import PrettyWire from './PrettyWire.js';

const Svg = ({ ...extraProps }) => (
  <svg {...extraProps} />
);

const Path = ({ ...extraProps }) => (
  <path {...extraProps } />
);

export default ({ ...extraProps }) => (
  <PrettyWire
    Svg={Svg}
    Path={Path}
    {...extraProps}
  />
);
