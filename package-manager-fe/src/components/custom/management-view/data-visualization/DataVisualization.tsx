import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import SimpleBarChart from "../../custom-chart/SimpleBarChart";
import SimpleLineChart from "../../custom-chart/SimpleLineChart";
import { SimplePieChart } from "../../custom-chart/SimplePieChart";
import { DateRangePicker } from "../../custom-date-picker/CustomDateRangePicker";
import StatsService from "@/services/StatsService";
import {
  SimpleBarChartProps,
  SimpleLineChartProps,
  SimplePieChartProps,
} from "@/interface/chartInterface";
import BarChartCard from "./bar-chart-card-view/BarChartCard";
import { format } from "date-fns";

export default function DataVisualization() {
  const [lineData, setLineData] = useState<SimpleLineChartProps[]>([]);
  const [barConfiData, setConfiBarData] = useState<SimpleBarChartProps[]>([]);
  const [barPriorityData, setPriorityBarData] = useState<SimpleBarChartProps[]>(
    []
  );
  const [pieData, setPieData] = useState<SimplePieChartProps[]>([]);
  const {
    getLineChartData,
    getBarChartDataByConfiColumn,
    getBarChartDataByPriorityColumn,
    getPieChartDate,
  } = StatsService();
  useEffect(() => {
    getLineChartData().then((res) => {
      setLineData(res);
    });

    getBarChartDataByConfiColumn().then((res) => {
      setConfiBarData(
        res.map((item) => ({
          ...item.barchartProperty,
          date: format(new Date(item.date), "yyyy-MM-dd"),
        }))
      );
    });
    getBarChartDataByPriorityColumn().then((res) => {
      setPriorityBarData(
        res.map((item) => ({
          ...item.barchartProperty,
          date: format(new Date(item.date), "yyyy-MM-dd"),
        }))
      );
    });

    getPieChartDate().then((res) => {
      setPieData(res);
    });
  }, []);

  return (
    <div className="w-full mb-4 rounded-lg min-w-0">
      <div className="h-[400px] bg-primary-foreground p-4 rounded-xl flex-[3]">
        <div className="flex items-center gap-2">
          <DateRangePicker />
        </div>
        {lineData.length > 0 && <SimpleLineChart data={lineData} />}
      </div>

      <div className="flex mt-4 gap-4 min-w-0">
        <div className="w-full h-[360px] bg-primary-foreground p-4 rounded-xl flex-[1]">
          <DateRangePicker />
          {pieData.length > 0 && <SimplePieChart data={pieData} />}
        </div>
        <div className="w-full min-w-0 h-[360px] bg-primary-foreground p-4 rounded-xl flex-[3]">
          <BarChartCard
            keys={["CONFIDENTIAL", "NORMAL"]}
            barData={barConfiData}
          />
        </div>
        <div className="w-full min-w-0 h-[360px] bg-primary-foreground p-4 rounded-xl flex-[3]">
          <BarChartCard
            keys={["NORMAL", "FAST", "URGENT", "VERY_URGENT"]}
            barData={barPriorityData}
          />
        </div>
      </div>
    </div>
  );
}
