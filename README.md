# next-chartist

A continuation of https://github.com/fraserxu/react-chartist. Feel free to push an update

> Made with create-react-library

[![NPM monthly downloads](https://img.shields.io/npm/dm/next-chartist.svg?style=flat)](https://npmjs.org/package/next-chartist)
[![NPM total downloads](https://img.shields.io/npm/dt/next-chartist.svg?style=flat)](https://npmjs.org/package/next-chartist)

## Install

```bash
npm install --save next-chartist
```

## Usage

```
<link rel="stylesheet" href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css">
<script src="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.js"></script>
```

```jsx
import React, { Component } from 'react'

import NextChartist from 'next-chartist'

class Example extends Component {
  if (data.statistics) {

    var dataChart = {
      labels: ["Name"],
      series: ["James"]
    }

    var options = {
      high: 2500,
      low: 0,
      reverseData: true,
      distributeSeries: true,
      horizontalBars: true,
      chartPadding: {
        right: 50
      },
      axisY: {
        offset: 125,
        onlyInteger: true
      },
      axisX: {
        onlyInteger: true
      }
    }
  }

  render() {
    return (
      <NextChartist
        className={'ct-octave'}
        data={dataChart}
        options={options}
        type={type}
      />
    )
  }
}
```

## License

MIT © [poboisvert](https://github.com/poboisvert)
