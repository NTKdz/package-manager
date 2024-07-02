import { SimpleLineChartProps } from "@/interface/chartInterface";
import { ResponsiveLine, Serie } from "@nivo/line";
import { format } from "date-fns";

export default function SimpleLineChart({ data }: { data: SimpleLineChartProps[] }) {
  return (
    <ResponsiveLine
      data={data as Serie[] }
      margin={{ top: 20, right: 140, bottom: 70, left: 50 }}
      xScale={{
        type: 'time',
        format: '%Y-%m-%dT%H:%M:%S.%L%Z',
      }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      xFormat={(value) => {return format(new Date(value), 'yyyy-MM-dd');}}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Ngày",
        legendOffset: 36,
        legendPosition: "middle",
        truncateTickAt: 0,
        format : (value) => {
          return format(new Date(value), 'yyyy-MM-dd');
        }
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Số lượng",
        legendOffset: -40,
        legendPosition: "middle",
        truncateTickAt: 0,
      }}
      colors={{ scheme: "category10" }}
      lineWidth={4}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor", modifiers: [] }}
      pointLabel="data.yFormatted"
      pointLabelYOffset={-12}
      enableTouchCrosshair={true}
      useMesh={true}
    />
  );
}
