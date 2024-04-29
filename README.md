# next-chartist

A continuation of https://github.com/fraserxu/react-chartist. Feel free to push an update

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/next-chartist.svg)](https://www.npmjs.com/package/next-chartist) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

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
  render() {
    return (
      <NextChartist
        className={'ct-octave'}
        data={data}
        options={options}
        type={type}
      />
    )
  }
}
```

## License

MIT © [poboisvert](https://github.com/poboisvert)
