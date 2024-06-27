import SimpleBarChart from "@/components/custom/custom-chart/SimpleBarChart";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SimpleBarChartProps } from "@/interface/chartInterface";
import { useState } from "react";

export default function BarChartCard({
  title,
  keys,
  barData,
}: {
  title: string;
  keys: string[];
  barData: SimpleBarChartProps[];
}) {
  const [barMode, setBarMode] = useState<"stacked" | "grouped">("stacked");
  return (
    <div className="h-full">
      <div className="w-full flex justify-between">
        <span className="font-bold">{title}</span>
        <Tabs defaultValue="stacked" className="w-[200px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="grouped"
              onClick={() => {
                setBarMode("grouped");
              }}
            >
              Tách
            </TabsTrigger>
            <TabsTrigger
              value="stacked"
              onClick={() => {
                setBarMode("stacked");
              }}
            >
              Chồng
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <SimpleBarChart
        data={barData}
        keys={keys}
        indexBy={"date"}
        groupMode={barMode}
      />
    </div>
  );
}
