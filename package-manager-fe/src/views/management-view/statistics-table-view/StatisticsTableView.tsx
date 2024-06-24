import HighestUseTable from "@/components/custom/management-view/statistics-table-view/highest-use-table/HighestUseTable";
import HighestByDepByDate from "@/components/custom/management-view/statistics-table-view/highest-by-dep-by-date/HighestByDepByDate";
import StatsService from "@/services/StatsService";
import { useEffect, useState } from "react";
import { DateRangePicker } from "@/components/custom/custom-date-picker/CustomDateRangePicker";
import { SimplePieChart } from "@/components/custom/custom-chart/SimplePieChart";
import { SimplePieChartProps } from "@/interface/chartInterface";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import UserCountTable from "@/components/custom/management-view/statistics-table-view/user-count-table/UserCountTable";

export default function StatisticsTableView() {
  const [highestData, setHighestData] = useState([]);
  const [highestByDepByDate, setHighestByDepByDate] = useState([]);
  const [userCount, setUserCount] = useState({ date: "", count: 0 });
  const { getHighestByDate, getHighestByDepByDate, getUserCount } =
    StatsService();
  const [pieData, setPieData] = useState<SimplePieChartProps[]>([]);
  const { getPieChartDate } = StatsService();
  const { dateQuery } = useSelector((state: RootState) => state.package);
  useEffect(() => {
    if (dateQuery.end !== "" || dateQuery.start !== "") {
      getPieChartDate(dateQuery.start, dateQuery.end).then((res) => {
        console.log("pieData", res);
        setPieData(res);
      });
      getUserCount(dateQuery.start, dateQuery.end).then((res) => {
        console.log("user-count", res);
        setUserCount(res);
      });
      getHighestByDepByDate(dateQuery.start, dateQuery.end).then((res) => {
        console.log("dsads", res);
        setHighestByDepByDate(res);
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateQuery]);

  useEffect(() => {
    getHighestByDate().then((res) => {
      console.log("dsads", res);
      setHighestData(res);
    });
  }, []);
  return (
    <div className="w-full flex gap-4 mb-4 justify-start">
      <div className="w-full h-[372px] bg-primary-foreground p-4 rounded-xl flex-[1]">
        {pieData && pieData.length > 0 && <SimplePieChart data={pieData} />}
      </div>
      <div className="w-[400px]">
        <HighestUseTable data={highestData} />
      </div>
      <div className="w-[400px]">
        <HighestByDepByDate data={highestByDepByDate} />
      </div>
      <div className="w-[400px]">
        <UserCountTable data={userCount} />
      </div>
    </div>
  );
}
