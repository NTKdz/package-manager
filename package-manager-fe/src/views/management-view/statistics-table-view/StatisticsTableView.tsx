import HighestUseTable from "@/components/custom/management-view/statistics-table-view/highest-use-table/HighestUseTable";
import HighestByDepByDate from "@/components/custom/management-view/statistics-table-view/highest-by-dep-by-date/HighestByDepByDate";
import StatsService from "@/services/StatsService";
import { useEffect, useState } from "react";
import { DateRangePicker } from "@/components/custom/custom-date-picker/CustomDateRangePicker";
import { SimplePieChart } from "@/components/custom/custom-chart/SimplePieChart";
import { SimplePieChartProps } from "@/interface/chartInterface";

export default function StatisticsTableView() {
  const [highestData, setHighestData] = useState([]);
  const [highestByDepByDate, setHighestByDepByDate] = useState([]);
  const { getHighestByDate, getHighestByDepByDate } = StatsService();
  const [pieData, setPieData] = useState<SimplePieChartProps[]>([]);
  const { getPieChartDate } = StatsService();
  useEffect(() => {
    getPieChartDate().then((res) => {
      setPieData(res);
    });
  }, []);

  useEffect(() => {
    getHighestByDate().then((res) => {
      console.log("dsads", res);
      setHighestData(res);
    });

    getHighestByDepByDate().then((res) => {
      console.log("dsads", res);
      setHighestByDepByDate(res);
    });
  }, []);
  return (
    <div className="w-full flex gap-4 mb-4 justify-start">
      <div className="w-full h-[372px] bg-primary-foreground p-4 rounded-xl flex-[1]">
        <DateRangePicker />
        {pieData && pieData.length > 0 && <SimplePieChart data={pieData} />}
      </div>
      <div className="w-[400px]">
        <HighestUseTable data={highestData} />
      </div>
      <div className="w-[400px]">
        <HighestByDepByDate data={highestByDepByDate} />
      </div>
      <div className="w-[400px]">
        <HighestUseTable data={highestData} />
      </div>
    </div>
  );
}
