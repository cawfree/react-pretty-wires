import React from 'react';
import { Svg, Path } from 'react-native-svg';

import PrettyWire from './PrettyWire.js';

export default ({ ...extraProps }) => (
  <PrettyWire
    Svg={Svg}
    Path={Path}
    {...extraProps}
  />
);
