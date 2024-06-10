export interface SimpleLineChartProps {
  id: string;
  color?: string;
  data: { x: string; y: number }[];
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
