import {
  SimpleBarChartProps,
  SimpleLineChartProps
} from "@/interface/chartInterface";
import { RootState } from "@/redux/store";
import StatsService from "@/services/StatsService";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SimpleLineChart from "../../custom-chart/SimpleLineChart";
import { DateRangePicker } from "../../custom-date-picker/CustomDateRangePicker";
import BarChartCard from "./bar-chart-card-view/BarChartCard";

export default function DataVisualization() {
  const { dateQuery } = useSelector((state: RootState) => state.package);
  const [lineData, setLineData] = useState<SimpleLineChartProps[]>([]);
  const [barConfiData, setConfiBarData] = useState<SimpleBarChartProps[]>([]);
  const [barPriorityData, setPriorityBarData] = useState<SimpleBarChartProps[]>(
    []
  );
  const {
    getLineChartData,
    getBarChartDataByConfiColumn,
    getBarChartDataByPriorityColumn,
  } = StatsService();
  useEffect(() => {
    if (dateQuery.end !== "" || dateQuery.start !== "") {
      getLineChartData(dateQuery.start, dateQuery.end).then((res) => {
        setLineData(res);
      });

      getBarChartDataByConfiColumn(dateQuery.start, dateQuery.end).then(
        (res) => {
          setConfiBarData(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            res?.map((item: { barchartProperty: any; date: string | number | Date; }) => ({
              ...item.barchartProperty,
              date: format(new Date(item.date), "yyyy-MM-dd"),
            }))
          );
        }
      );
      getBarChartDataByPriorityColumn(dateQuery.start, dateQuery.end).then(
        (res) => {
          setPriorityBarData(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            res?.map((item: { barchartProperty: any; date: string | number | Date; }) => ({
              ...item.barchartProperty,
              date: format(new Date(item.date), "yyyy-MM-dd"),
            }))
          );
        }
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateQuery.start, dateQuery.end]);

  return (
    <div className="w-full mb-4 rounded-lg min-w-0">
      <div className="h-[400px] bg-primary-foreground p-4 rounded-xl flex-[3]">
        <div className="flex items-center justify-between gap-2">
          <span className="font-bold">Thống kê theo phòng ban</span>
          <DateRangePicker />
        </div>
        {lineData && lineData.length > 0 && <SimpleLineChart data={lineData} />}
      </div>

      <div className="flex md:flex-row flex-col mt-4 gap-4 min-w-0">
        <div className="w-full min-w-0 h-[360px] bg-primary-foreground p-4 rounded-xl flex-[3]">
          {barConfiData && barConfiData.length > 0 && (
            <BarChartCard
              title="Thống kê theo độ mật"
              keys={["MAT", "BINH_THUONG"]}
              barData={barConfiData}
            />
          )}
        </div>
        <div className="w-full min-w-0 h-[360px] bg-primary-foreground p-4 rounded-xl flex-[3]">
          {barPriorityData && barPriorityData.length > 0 && (
            <BarChartCard
              title="Thống kê theo mức độ ưu tiên"
              keys={["BINH_THUONG", "HOA_TOC", "KHAN", "THUONG_KHAN"]}
              barData={barPriorityData}
            />
          )}
        </div>
      </div>
    </div>
  );
}
