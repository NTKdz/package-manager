import HighestUseTable from "@/components/custom/management-view/statistics-table-view/highest-use-table/HighestUseTable";
import TotalWaybillTable from "@/components/custom/management-view/statistics-table-view/total-waybill-table/TotalWaybillTable";
import React from "react";

export default function StatisticsTableView() {
  return (
    <div className="w-full flex gap-4 mb-4">
      <div className="flex-1">
        <HighestUseTable data={["fadsfas", "df", "","","",""]} />
      </div>
      <div className="flex-1">
        <TotalWaybillTable data={["fadsfas", "df", "","","",""]} />
      </div>
      <div className="flex-1">
        <TotalWaybillTable data={["fadsfas", "df", "","","",""]} />
      </div>
    </div>
  );
}
