import React, { useEffect, useRef, useMemo } from "react";
import { NextChartistProps } from "./types";

// Import chartist - will be bundled with the library
// Chartist is bundled as a dependency, so it will be included in the build
import * as ChartistModule from "chartist";

// Handle client-side only for Next.js SSR compatibility
let Chartist: any = null;
if (typeof window !== "undefined") {
  Chartist = ChartistModule;
}

// Supported chart types in Chartist 1.5
const CHART_TYPES: string[] = ["LineChart", "BarChart", "PieChart"];

const NextChartist: React.FC<NextChartistProps> = ({
  type,
  data,
  className,
  options = {},
  responsiveOptions = [],
  style,
  children,
  listener,
  plugins = [],
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartistInstanceRef = useRef<any>(null);
  const previousTypeRef = useRef<string | null>(null);
  const listenerRefsRef = useRef<{ [event: string]: (data: any) => void }>({});

  // Normalize options and responsiveOptions to handle all Chartist 1.5 parameters
  const normalizedOptions = useMemo(() => {
    if (!options || typeof options !== "object") {
      return {};
    }
    return { ...options };
  }, [options]);

  const normalizedResponsiveOptions = useMemo(() => {
    if (!Array.isArray(responsiveOptions)) {
      return [];
    }
    return [...responsiveOptions];
  }, [responsiveOptions]);

  // Normalize data to handle all Chartist data formats
  const normalizedData = useMemo(() => {
    if (!data || typeof data !== "object") {
      return {};
    }
    return { ...data };
  }, [data]);

  useEffect(() => {
    // Skip SSR - only run on client
    if (typeof window === "undefined" || !chartRef.current) {
      return;
    }

    // Chartist is already imported and bundled, just verify it's available
    if (!Chartist) {
      console.error(
        "Chartist is not available. This should not happen as it's bundled with the library."
      );
      return;
    }

    // Validate chart type
    if (!type || typeof type !== "string") {
      console.error("NextChartist: type prop is required and must be a string");
      return;
    }

    // Check if chart type exists in Chartist
    if (!Chartist || typeof Chartist[type] !== "function") {
      console.error(
        `NextChartist: Chartist.${type} is not available. ` +
          `Supported types: ${CHART_TYPES.join(", ")}`
      );
      return;
    }

    // If type changed, destroy old chart and create new one
    if (previousTypeRef.current !== null && previousTypeRef.current !== type) {
      if (chartistInstanceRef.current) {
        try {
          // Remove all listeners before detaching
          if (listenerRefsRef.current) {
            Object.keys(listenerRefsRef.current).forEach((event) => {
              try {
                chartistInstanceRef.current.off(
                  event,
                  listenerRefsRef.current[event]
                );
              } catch {
                // Ignore errors when removing listeners
              }
            });
            listenerRefsRef.current = {};
          }
          chartistInstanceRef.current.detach();
        } catch {
          // Ignore cleanup errors
        }
        chartistInstanceRef.current = null;
      }
    }
    previousTypeRef.current = type;

    // Update existing chart or create new one
    if (chartistInstanceRef.current) {
      try {
        // Try to update the chart if update method is available
        if (typeof chartistInstanceRef.current.update === "function") {
          chartistInstanceRef.current.update(
            normalizedData,
            normalizedOptions,
            normalizedResponsiveOptions
          );
        } else {
          // If update is not supported, recreate the chart
          try {
            // Remove all listeners before detaching
            if (listenerRefsRef.current) {
              Object.keys(listenerRefsRef.current).forEach((event) => {
                try {
                  chartistInstanceRef.current.off(
                    event,
                    listenerRefsRef.current[event]
                  );
                } catch {
                  // Ignore errors
                }
              });
              listenerRefsRef.current = {};
            }
            chartistInstanceRef.current.detach();
          } catch {
            // Ignore detach errors
          }
          chartistInstanceRef.current = null;
        }
      } catch (updateError) {
        // If update fails, recreate the chart
        console.warn("Chart update failed, recreating chart:", updateError);
        try {
          if (chartistInstanceRef.current) {
            // Remove all listeners before detaching
            if (listenerRefsRef.current) {
              Object.keys(listenerRefsRef.current).forEach((event) => {
                try {
                  chartistInstanceRef.current.off(
                    event,
                    listenerRefsRef.current[event]
                  );
                } catch {
                  // Ignore errors
                }
              });
              listenerRefsRef.current = {};
            }
            chartistInstanceRef.current.detach();
          }
        } catch {
          // Ignore detach errors
        }
        chartistInstanceRef.current = null;
      }
    }

    // Create new chart if needed
    if (!chartistInstanceRef.current && chartRef.current) {
      try {
        // Create chart with all Chartist 1.5 parameters
        const chartOptions = {
          ...normalizedOptions,
        };

        // Apply plugins if provided (Chartist 1.5 supports plugins)
        if (Array.isArray(plugins) && plugins.length > 0) {
          chartOptions.plugins = plugins;
        }

        const newChartist = new Chartist[type](
          chartRef.current,
          normalizedData,
          chartOptions,
          normalizedResponsiveOptions
        );

        chartistInstanceRef.current = newChartist;

        // Attach event listeners if provided (supports all Chartist events)
        if (listener && typeof listener === "object") {
          // Remove previous listeners first
          if (listenerRefsRef.current) {
            Object.keys(listenerRefsRef.current).forEach((event) => {
              try {
                newChartist.off(event, listenerRefsRef.current[event]);
              } catch {
                // Ignore errors
              }
            });
          }
          listenerRefsRef.current = {};

          // Add new listeners
          for (const event in listener) {
            if (
              Object.prototype.hasOwnProperty.call(listener, event) &&
              typeof listener[event] === "function"
            ) {
              try {
                newChartist.on(event, listener[event]);
                listenerRefsRef.current[event] = listener[event];
              } catch (listenerError) {
                console.warn(
                  `Failed to attach listener for event "${event}":`,
                  listenerError
                );
              }
            }
          }
        }
      } catch (err) {
        console.error("Error creating Chartist chart:", err);
      }
    }

    // Cleanup function
    return () => {
      if (chartistInstanceRef.current) {
        try {
          // Remove all listeners before detaching
          if (listenerRefsRef.current) {
            Object.keys(listenerRefsRef.current).forEach((event) => {
              try {
                chartistInstanceRef.current.off(
                  event,
                  listenerRefsRef.current[event]
                );
              } catch {
                // Ignore errors
              }
            });
            listenerRefsRef.current = {};
          }
          chartistInstanceRef.current.detach();
        } catch {
          // Ignore cleanup errors
        }
        chartistInstanceRef.current = null;
      }
    };
  }, [
    type,
    normalizedData,
    normalizedOptions,
    normalizedResponsiveOptions,
    listener,
    plugins,
  ]);

  const childrenWithProps =
    children &&
    React.Children.map(children, (child) =>
      React.cloneElement(child as React.ReactElement, {
        type,
        data,
      })
    );

  return (
    <div
      className={`ct-chart ${className || ""}`}
      ref={chartRef}
      style={{
        minHeight: "300px",
        minWidth: "300px",
        ...style,
      }}
    >
      {childrenWithProps}
    </div>
  );
};

export default NextChartist;
