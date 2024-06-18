import HighestUseTable from "@/components/custom/management-view/statistics-table-view/highest-use-table/HighestUseTable";
import HighestByDepByDate from "@/components/custom/management-view/statistics-table-view/highest-by-dep-by-date/HighestByDepByDate";
import StatsService from "@/services/StatsService";
import { useEffect, useState } from "react";

export default function StatisticsTableView() {
  const [highestData, setHighestData] = useState([]);
  const [highestByDepByDate, setHighestByDepByDate] = useState([]);
  const { getHighestByDate,getHighestByDepByDate } = StatsService();
  useEffect(() => {
    getHighestByDate().then((res) => {
      console.log("dsads",res);
      setHighestData(res);
    });

    getHighestByDepByDate().then((res) => {
      console.log("dsads",res);
      setHighestByDepByDate(res);
    });
  }, []);
  return (
    <div className="w-full flex gap-4 mb-4 justify-end">
      <div className="w-[400px]">
        <HighestUseTable data={highestData} />
      </div>
      <div className="w-[400px]">
        <HighestByDepByDate data={highestByDepByDate} />
      </div>
    </div>
  );
}
