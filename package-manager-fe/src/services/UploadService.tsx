import axios from "axios";

const baseUrl = "http://localhost:8080/upload";
export default function UploadService() {
  async function fetchData(
    endpoint: string,
    query?: { startDate?: string; endDate?: string }
  ) {
    try {
      const response = await axios.get(`${baseUrl}${endpoint}`, {
        params: query,
        responseType: "blob",
      });

      if (response.status === 200) {
        alert("Dữ liệu đã được xuất thành công");
        console.log("Data fetched successfully");
        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
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

  async function importExcelFile(file: File) {
    if (
      !file ||
      file.type !==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      console.error("Invalid file type. Please upload an Excel file (.xlsx).");
      alert("Sai định dạng, xin vui lòng đăng tải tệp dạng (.xlsx).");
      return;
    }
    const formData = new FormData();
    formData.append("file", file, file.name);
    try {
      const response = await axios.post(`${baseUrl}/import-excel`, formData);
      if (response.status === 200) {
        alert("Dữ liệu đã được nhập thành công");
      } else {
        alert("Dữ liệu nhập không thành công. Vui lòng thử lại.");
        console.error(`Error: Received status code ${response.status}`);
      }
    } catch (e) {
      console.error(`Error importing file:`, e);
    }
  }
  async function exportExcelFile(start: string, end: string) {
    const query: { startDate?: string; endDate?: string } = {};
    if (start) query.startDate = start;
    if (end) query.endDate = end;

    fetchData("/export-to-excel", query);
  }
  return { exportExcelFile, importExcelFile };
}
