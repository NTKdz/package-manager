import { DataPoint } from "@/interface/chartInterface";
import React from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function SimpleBarChart({ data }: { data: DataPoint[] }) {
  const colors = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#FF66CC",
    "#6699FF",
    "#FF9966",
    "#33CCCC",
    "#99CC00",
    "#FF3300",
    "#CCFF66",
    "#FFCC00",
  ]; // Add more colors as needed

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />

        {Object.keys(data[0]).map((entry, index) => {
          if (entry !== "name") {
            return (
              <Bar
                key={entry}
                dataKey={entry}
                fill={colors[index % colors.length]}
                activeBar={
                  <Rectangle
                    fill={colors[(index + 1) % colors.length]}
                    stroke="blue"
                  />
                }
              />
            );
          }
          return null;
        })}
      </BarChart>
    </ResponsiveContainer>
  );
}
