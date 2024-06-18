import axios from "axios";

const baseUrl = "http://localhost:8080/statistics";
export default function StatsService() {
  async function getLineChartData() {
    try {
      const response = await axios.get(baseUrl + "/line");
      if (response.status === 200) {
        console.log(response.data);
        return response.data;
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function getBarChartDataByConfiColumn() {
    try {
      const response = await axios.get(baseUrl + "/bar/confi");
      if (response.status === 200) {
        console.log(response.data);
        return response.data;
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function getBarChartDataByPriorityColumn() {
    try {
        const response = await axios.get(baseUrl + "/bar/priority");
        if (response.status === 200) {
            console.log(response.data);
            return response.data;
        }
    } catch (e) {
      console.log(e);
    }
  }

  async function getPieChartDate() {
    try {
      const response = await axios.get(baseUrl + "/pie");
      if (response.status === 200) {
        console.log(response.data);
        return response.data;
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function getHighestByDate() {
    try {
      const response = await axios.get(baseUrl + "/table/hightest-packages");
      if (response.status === 200) {
        console.log(response.data);
        return response.data;
      }
    } catch (e) {
      console.log(e);
    }
  }
  return { getLineChartData, getBarChartDataByConfiColumn,getBarChartDataByPriorityColumn, getPieChartDate,getHighestByDate };
}
