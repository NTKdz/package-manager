import { SimpleBarChartProps } from "@/interface/chartInterface";
import { ResponsiveBar } from "@nivo/bar";
import { format } from "date-fns";

export default function SimpleBarChart({
  data,
  keys,
  indexBy,
  fill,
  groupMode,
}: {
  data: SimpleBarChartProps[];
  keys: string[];
  indexBy: string;
  fill?: { id: string; match: { id: string } }[];
  groupMode?: "stacked" | "grouped";
}) {
  const valuesToShow = data.filter((_, i) => i % (Math.round(data.length/6)+1)*2 === 0);
  return (
    <ResponsiveBar
      data={data}
      keys={keys}
      indexBy={indexBy}
      margin={{ top: 20, right: 140, bottom: 70, left: 45 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      groupMode={groupMode}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={fill}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Ngày",
        legendPosition: "middle",
        legendOffset: 32,
        truncateTickAt: 0,
        format: (value) => {
          return valuesToShow.find((vts) => vts.date === value)
            ? format(new Date(value), "yyyy-MM-dd")
            : "";
        },
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legendPosition: "middle",
        legendOffset: -40,
        truncateTickAt: 0,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
    />
  );
}
