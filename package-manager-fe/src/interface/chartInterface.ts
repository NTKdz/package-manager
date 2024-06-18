export interface SimpleLineChartProps {
  id: string;
  color?: string;
  data: { x: Date; y: number }[];
}

export interface SimplePieChartProps {
  id: string;
  label: string;
  value: number;
  color?: string;
}

export interface SimpleBarChartProps {
  [key: string]: number | string;
}
