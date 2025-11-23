import React, { useState, useCallback } from "react";
import NextChartist from "../components/NextChartist";
import {
  ChartType,
  ChartistData,
  ChartistOptions,
  UseChartistReturn,
  NextChartistProps,
} from "../components/types";

const useChartist = (
  initialType: ChartType,
  initialData: ChartistData,
  initialOptions?: ChartistOptions
): UseChartistReturn => {
  const [chartType, setChartType] = useState<ChartType>(initialType);
  const [chartData, setChartData] = useState<ChartistData>(initialData);
  const [chartOptions, setChartOptions] = useState<ChartistOptions>(
    initialOptions || {}
  );
  const [additionalProps, setAdditionalProps] = useState<
    Partial<NextChartistProps>
  >({});

  const updateChart = useCallback(
    (data: ChartistData, options?: ChartistOptions) => {
      setChartData(data);
      if (options) {
        setChartOptions(options);
      }
    },
    []
  );

  const destroyChart = useCallback(() => {
    // Chart destruction is handled by NextChartist's useEffect cleanup
    // This function can be used to reset state if needed
    setChartData({});
    setChartOptions({});
  }, []);

  const ChartComponent = (
    <NextChartist
      type={chartType}
      data={chartData}
      options={chartOptions}
      {...additionalProps}
    />
  );

  return { ChartComponent, updateChart, destroyChart };
};

export default useChartist;
