import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import SimpleBarChart from "../custom-chart/SimpleBarChart";
import SimpleLineChart from "../custom-chart/SimpleLineChart";
import { SimplePieChart } from "../custom-chart/SimplePieChart";
import { DateRangePicker } from "../custom-date-picker/CustomDateRangePicker";
import { barData, data1, pieData } from "./data";

export default function DataVisualization() {
  const [barMode, setBarMode] = useState<"stacked" | "grouped">("grouped");
  return (
    <div className="w-full mb-4 rounded-lg min-w-0">
      <div className="h-[400px] bg-primary-foreground p-4 rounded-md flex-[3]">
        <div className="flex items-center gap-2">
          <DateRangePicker />
        </div>
        <SimpleLineChart data={data1} />
      </div>

      <div className="flex mt-4 gap-4 min-w-0">
        <div className="w-full h-[360px] bg-primary-foreground p-4 rounded-md flex-[2]">
          <DateRangePicker />
          <SimplePieChart data={pieData} />
        </div>
        <div className="w-full min-w-0 h-[360px] bg-primary-foreground p-4 rounded-md flex-[3]">
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
            keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
            indexBy={"country"}
            groupMode={barMode}
          />
        </div>
      </div>
    </div>
  );
}
