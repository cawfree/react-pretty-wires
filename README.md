# react-pretty-wires
[NoFlo's](https://github.com/noflo/noflo) Prettified wires for React. Display visual relationships with some flare 🔥🔥🔥.

## 🚀 Getting Started

Using [`npm`]():

```bash
npm install --save react-pretty-wires
```

Using [`yarn`]():

```bash
yarn add react-pretty-wires
```

## ✍️ Example

```javascript
import React from 'react';
import PrettyWire from 'react-pretty-wires';

export default () => (
  <PrettyWire
    sourceX={100}
    sourceY={100}
    targetX={500}
    targetY={500}
    arrow
  />
);
```

### ⚛️ React Native
`react-pretty-wires` can also be used with [React Native](https://facebook.github.io/react-native/)! You just need to change your `import` source:

```git
- import PrettyWire from 'react-pretty-wires';
+ import PrettyWire from 'react-pretty-wires/dist/PrettyWire.native';
```

## 📌 Prop Types

Prop                  | Type     | Default                   | Required | Description
--------------------- | -------- | ------------------------- | -------- | -----------
avoidanceRadius|number|100|No|The amount of curvature to apply to tightly wrapped wires.
epsilon|number|0.01|No|The threshold to treat a curve as a straight line.
arrow|bool|false|No|Draw an arrow.
arrowLength|number|12|No|Size of the arrow to draw.
arrowProgression|number|0.5|No|Percentage (0 ... 1) of where along the curve to render the arrow.
color|string|'black'|No|Color of the wire.

## ✌️ License
[MIT](https://opensource.org/licenses/MIT)
