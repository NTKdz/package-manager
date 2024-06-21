import axios from "axios";

const baseUrl = "http://localhost:8080/upload";
export default function UploadService() {
  async function fetchData(
    endpoint: string,
    query?: { start: string; end: string }
  ) {
    try {
      const response = await axios.get(`${baseUrl}${endpoint}`, {
        responseType: "blob",
        params: query,
      });

      if (response.status === 200) {
        console.log("Data fetched successfully");
        const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const link = document.createElement("a");
        const url = window.URL.createObjectURL(blob);
        link.href = url;
        link.download = "filename.xlsx"; 
        link.target = "_blank";  
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        console.log(response);
        return response;
        
      } else {
        console.error(`Error: Received status code ${response.status}`);
      }
    } catch (e) {
      console.error(`Error fetching data from ${endpoint}:`, e);
    }
  }
  async function exportExcelFile() {
    fetchData("/export-to-excel");
  }
  return { exportExcelFile };
}