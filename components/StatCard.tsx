import { FC } from "react";
import { Card, Color, Metric, Text } from "@tremor/react";

interface StatCardProps {
  title: string;
  metric: string;
  color?: Color;
}

const StatCard: FC<StatCardProps> = ({ title, metric, color }) => {
  return (
    <Card decorationColor={color} decoration="top">
      <Text>{title}</Text>
      <Metric color={color}>{metric}</Metric>
    </Card>
  );
};

export default StatCard;
