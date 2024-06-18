import SimpleBarChart from "@/components/custom/custom-chart/SimpleBarChart";
import { DateRangePicker } from "@/components/custom/custom-date-picker/CustomDateRangePicker";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SimpleBarChartProps } from "@/interface/chartInterface";
import React, { useState } from "react";

export default function BarChartCard({
    keys,
  barData,
}: {
    keys:string[];
  barData: SimpleBarChartProps[];
}) {
  const [barMode, setBarMode] = useState<"stacked" | "grouped">("grouped");
  return (
    <div className="h-full">
      <div className="w-full flex justify-between">
        <DateRangePicker />
        <Tabs defaultValue="grouped" className="w-[200px]">
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
