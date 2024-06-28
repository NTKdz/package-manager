import { RequestWaybillInterface } from "@/interface/packageInterface";
import { setDepartments } from "@/redux/slices/departmentSlice";
import { setLoading } from "@/redux/slices/loadingSlice";
import { setPackage, setTotal } from "@/redux/slices/packageSlice";
import { RootState } from "@/redux/store";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const baseUrl = "http://localhost:8080/packages";
export default function TableService() {
  const { query } = useSelector((state: RootState) => state.package);
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function getPackageData(query?: any) {
    dispatch(setLoading(true));
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const filteredQuery = Object.fromEntries(
        Object.entries(query).filter(
          ([_, value]) => value !== null && value !== ""
        )
      );

      console.log("filteredQuery", filteredQuery);
      const response = await axios.get(baseUrl + "/query", {
        params: filteredQuery,
      });
      if (response.status === 200) {
        console.log("table", response.data);
        dispatch(setPackage(response.data.data));
        dispatch(setTotal(response.data.total));
      }
    } catch (e) {
      console.log((e as Error).message);
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function getPackageByUserName(userName: string) {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(baseUrl + "/query", {
        params: { username: userName },
      });
      if (response.status === 200) {
        console.log("table", response.data);
        dispatch(setPackage(response.data.data));
        dispatch(setTotal(response.data.total));
      }
    } catch (e) {
      console.log((e as Error).message);
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function requestWaybill(param: RequestWaybillInterface) {
    dispatch(setLoading(true));
    try {
      const response = await axios.post(baseUrl, param);
      console.log(response.status, response.data);
      if (response.status === 201 || response.status === 200) {
        console.log("fdsfds");
        getPackageData(query);
        return response.data;
      } else {
        return Promise.reject(
          new Error(`Unexpected status code: ${response.status}`)
        );
      }
    } catch (e) {
      console.log((e as Error).message);
      return Promise.reject(e);
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function getDepartmentList() {
    try {
      const response = await axios.get(
        "https://uatsuperapp.mbamc.com.vn/chat/api/v1/phoneBook/department/db"
      );
      console.log("department", response.data);
      if (response.status === 200) {
        console.log("department", response.data);
        dispatch(setDepartments(response.data.data));
      }
    } catch (e) {
      console.log((e as Error).message);
    }
  }

  return {
    getPackageData,
    requestWaybill,
    getPackageByUserName,
    getDepartmentList,
  };
}
