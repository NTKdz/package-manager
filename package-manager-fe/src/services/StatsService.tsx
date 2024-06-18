import axios from "axios";

const baseUrl = "http://localhost:8080/statistics";
export default function StatsService() {
  async function fetchData(endpoint:string,query?:string, type?:string) {
    try {
      const response = await axios.get(`${baseUrl}${endpoint}`);
      if (response.status === 200) {
        console.log(response.data);
        return response.data;
      } else {
        console.error(`Error: Received status code ${response.status}`);
      }
    } catch (e) {
      console.error(`Error fetching data from ${endpoint}:`, e);
    }
  }

  async function getLineChartData() {
    return await fetchData("/line");
  }

  async function getBarChartDataByConfiColumn() {
    return await fetchData("/bar/confi");
  }

  async function getBarChartDataByPriorityColumn() {
    return await fetchData("/bar/priority");
  }

  async function getPieChartDate() {
    return await fetchData("/pie");
  }

  async function getHighestByDate() {
    return await fetchData("/table/highest-packages");
  }

  async function getHighestByDepByDate() {
    return await fetchData("/table/highest-dep");
  }
  return {
    getLineChartData,
    getBarChartDataByConfiColumn,
    getBarChartDataByPriorityColumn,
    getPieChartDate,
    getHighestByDate,
    getHighestByDepByDate,
  };
}
