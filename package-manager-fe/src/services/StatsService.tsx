import axios from "axios";

const baseUrl = "http://localhost:8080/statistics";
export default function StatsService() {
  async function fetchData(
    endpoint: string,
    query?: { start: string; end: string }
  ) {
    try {
      const response = await axios.get(`${baseUrl}${endpoint}`, {
        params: query,
      });
      if (response.status === 200) {
        return response.data;
      } else {
        console.error(`Error: Received status code ${response.status}`);
      }
    } catch (e) {
      console.error(`Error fetching data from ${endpoint}:`, e);
    }
  }

  async function getLineChartData(start: string, end: string) {
    console.log("start", start, "end", end);
    return await fetchData("/line", { start: start, end: end });
  }

  async function getBarChartDataByConfiColumn(start: string, end: string) {
    return await fetchData("/bar/confi", { start: start, end: end });
  }

  async function getBarChartDataByPriorityColumn(start: string, end: string) {
    return await fetchData("/bar/priority", { start: start, end: end });
  }

  async function getPieChartDate(start: string, end: string) {
    return await fetchData("/pie", { start: start, end: end });
  }

  async function getHighestByDate() {
    return await fetchData("/table/highest-packages");
  }

  async function getHighestByDepByDate() {
    return await fetchData("/table/highest-dep");
  }

  async function getUserCount(start: string, end: string) {
    return await fetchData("/table/user-count", { start: start, end: end });
  }
  return {
    getLineChartData,
    getBarChartDataByConfiColumn,
    getBarChartDataByPriorityColumn,
    getPieChartDate,
    getHighestByDate,
    getHighestByDepByDate,
    getUserCount,
  };
}
