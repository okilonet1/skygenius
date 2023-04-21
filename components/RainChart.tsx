"use client";

import { FC } from "react";
import { Card, AreaChart, Title } from "@tremor/react";

interface RainChartProps {
  results: Root;
}

const RainChart: FC<RainChartProps> = ({ results }) => {
  const hourly = results?.hourly.time
    .map((time) =>
      new Date(time).toLocaleString("en-US", {
        hour: "numeric",
        hour12: false,
      })
    )
    .slice(0, 24);

  console.log(hourly);

  const data = hourly.map((hour, index) => ({
    time: Number(hour),
    "Rain (%)": results?.hourly.precipitation_probability[index],
  }));

  const dataFormatter = (number: number) => {
    return `${number}%`;
  };

  return (
    <Card>
      <Title>Chances of Rain</Title>
      <AreaChart
        className="mt-6"
        data={data}
        index="time"
        showLegend
        categories={["Rain (%)"]}
        colors={["blue"]}
        minValue={0}
        maxValue={100}
        valueFormatter={dataFormatter}
        yAxisWidth={40}
      />
    </Card>
  );
};

export default RainChart;
