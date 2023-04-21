"use client";

import { FC } from "react";
import { Card, AreaChart, Title } from "@tremor/react";

interface HumidityChartProps {
  results: Root;
}

const HumidityChart: FC<HumidityChartProps> = ({ results }) => {
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
    "Humidity (%)": results?.hourly.relativehumidity_2m[index],
  }));

  const dataFormatter = (number: number) => {
    return `${number}%`;
  };
  return (
    <Card>
      <Title>Humidity Levels</Title>
      <AreaChart
        className="mt-6"
        data={data}
        index="time"
        showLegend
        categories={["Humidity (%)"]}
        colors={["teal"]}
        minValue={0}
        maxValue={100}
        valueFormatter={dataFormatter}
        yAxisWidth={40}
      />
    </Card>
  );
};

export default HumidityChart;
