"use client";

import { FC } from "react";
import { Card, AreaChart, Title } from "@tremor/react";

interface TempChartProps {
  results: Root;
}

const TempChart: FC<TempChartProps> = ({ results }) => {
  const hourly = results?.hourly.time
    .map((time) =>
      new Date(time).toLocaleString("en-US", {
        hour: "numeric",
        hour12: false,
      })
    )
    .slice(0, 24);

  const data = hourly.map((hour, index) => ({
    time: Number(hour),
    "UV Index": results?.hourly.uv_index[index],
    "Temperature (°C)": results?.hourly.temperature_2m[index],
  }));

  const dataFormatter = (number: number) => {
    return `${number}`;
  };

  return (
    <Card>
      <Title>Temperate & UV Index</Title>
      <AreaChart
        className="mt-6"
        data={data}
        index="time"
        showLegend
        categories={["Temperature (°C)", "UV Index"]}
        colors={["yellow", "rose"]}
        minValue={0}
        valueFormatter={dataFormatter}
        yAxisWidth={40}
      />
    </Card>
  );
};

export default TempChart;
