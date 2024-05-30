import { DataPoint } from "@/interface/chartInterface";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function SimpleAreaChart({ data }: { data: DataPoint[] }) {
  const colors = [
    "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", 
    "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", 
    "#bcbd22", "#17becf", "#aec7e8", "#ffbb78",
  ];
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
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
          if (entry !== 'name') {
            return <Line key={entry} type="monotone" dataKey={entry} stroke={colors[index % colors.length]} />;
          }
          return null;
        })}
      </LineChart>
    </ResponsiveContainer>
  );
}
