# NextChartist Examples

This folder contains example applications demonstrating how to use NextChartist in your React or Next.js projects.

## Getting Started

### Installation

```bash
cd example
npm install
```

### Running the Example

```bash
npm run dev
```

The example application will open at `http://localhost:3000`

### Building for Production

```bash
npm run build
npm run preview
```

## Examples Included

1. **Line Chart** - Multi-series line chart with responsive options
2. **Bar Chart** - Stacked bar chart with custom axis formatting
3. **Pie Chart** - Pie chart with percentage labels
4. **useChartist Hook** - Example of using the `useChartist` hook to manage chart state

## Features Demonstrated

- Basic chart rendering
- Custom options and styling
- Responsive chart configurations
- Using the `useChartist` hook
- TypeScript integration
- Multiple chart types (Line, Bar, Pie)

## Chartist CSS

Make sure to include the Chartist CSS in your project. In this example, it's included via CDN in `index.html`:

```html
<link
  rel="stylesheet"
  href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css"
/>
```

Alternatively, you can install it via npm:

```bash
npm install chartist
```

And import it in your code:

```typescript
import 'chartist/dist/chartist.min.css'
```

## Learn More

For more information about NextChartist, visit the [main README](../README.md).

