import HighestUseTable from "@/components/custom/management-view/statistics-table-view/highest-use-table/HighestUseTable";
import TotalWaybillTable from "@/components/custom/management-view/statistics-table-view/total-waybill-table/TotalWaybillTable";
import StatsService from "@/services/StatsService";
import { useEffect, useState } from "react";

export default function StatisticsTableView() {
  const [highestData, setHighestData] = useState([]);
  const [totalWaybillData, setTotalWaybillData] = useState([]);
  const [totalWaybillByDateData, setTotalWaybillByDateData] = useState([]);
  const { getHighestByDate } = StatsService();
  useEffect(() => {
    getHighestByDate().then((res) => {
      console.log(res);
      setHighestData(res);
    });
  }, []);
  return (
    <div className="w-full flex gap-4 mb-4">
      <div className="flex-1">
        <HighestUseTable data={highestData} />
      </div>
      <div className="flex-1">
        <TotalWaybillTable data={["fadsfas", "df", "", "", "", ""]} />
      </div>
      <div className="flex-1">
        <TotalWaybillTable data={["fadsfas", "df", "", "", "", ""]} />
      </div>
    </div>
  );
}