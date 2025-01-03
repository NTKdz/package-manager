import { SimplePieChart } from "@/components/custom/custom-chart/SimplePieChart";
import HighestByDepByDate from "@/components/custom/management-view/statistics-table-view/highest-by-dep-by-date/HighestByDepByDate";
import HighestUseTable from "@/components/custom/management-view/statistics-table-view/highest-use-table/HighestUseTable";
import UserCountTable from "@/components/custom/management-view/statistics-table-view/user-count-table/UserCountTable";
import { SimplePieChartProps } from "@/interface/chartInterface";
import { RootState } from "@/redux/store";
import StatsService from "@/services/StatsService";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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
        setPieData(res);
      });
      getUserCount(dateQuery.start, dateQuery.end).then((res) => {
        setUserCount(res);
      });
      getHighestByDepByDate(dateQuery.start, dateQuery.end).then((res) => {
        setHighestByDepByDate(res);
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateQuery]);

  useEffect(() => {
    getHighestByDate().then((res) => {
      setHighestData(res);
    });
  }, []);
  return (
    <div className="w-full flex flex-col xl:flex-row gap-4 mb-4 justify-start">
      <div className="xl:w-[600px] h-[372px] bg-primary-foreground p-4 rounded-xl w-full">
        {pieData && pieData.length > 0 && <SimplePieChart data={pieData} />}
      </div>
      <div className="xl:w-[400px]  w-full">
        <HighestUseTable data={highestData} />
      </div>
      <div className="xl:w-[400px]  w-full">
        <HighestByDepByDate data={highestByDepByDate} />
      </div>
      <div className="xl:w-[400px]  w-full">
        <UserCountTable data={userCount} />
      </div>
    </div>
  );
}
