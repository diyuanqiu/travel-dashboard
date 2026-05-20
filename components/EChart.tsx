import * as echarts from "echarts";
import type { EChartsOption } from "echarts";
import React, { useEffect, useRef } from "react";

type EChartProps = {
  option: EChartsOption;
};

const EChart = ({ option }: EChartProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chart = echarts.init(container);
    chartRef.current = chart;

    const resizeObserver = new ResizeObserver(() => chart.resize());
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      chart.dispose();
      chartRef.current = null;
    };
  }, []);

  useEffect(() => {
    chartRef.current?.setOption(option);
  }, [option]);

  return (
    <div ref={containerRef} className="w-full h-[320px]" />
  );
};

export default EChart;
