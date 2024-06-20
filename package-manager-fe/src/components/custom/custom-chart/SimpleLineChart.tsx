import { SimpleLineChartProps } from "@/interface/chartInterface";
import { ResponsiveLine, Serie } from "@nivo/line";
import { format } from "date-fns";

export default function SimpleLineChart({ data }: { data: SimpleLineChartProps[] }) {
  const colors = [
    "#1f77b4",
    "#ff7f0e",
    "#2ca02c",
    "#d62728",
    "#9467bd",
    "#8c564b",
    "#e377c2",
    "#7f7f7f",
    "#bcbd22",
    "#17becf",
    "#aec7e8",
    "#ffbb78",
  ];
  return (
    <ResponsiveLine
      data={data as Serie[] }
      margin={{ top: 20, right: 110, bottom: 70, left: 50 }}
      xScale={{
        type: 'time',
        format: '%Y-%m-%d',
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
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
}
