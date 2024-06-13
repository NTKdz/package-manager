import { RequestWaybillInterface } from "@/interface/packageInterface";
import { setLoading } from "@/redux/slices/loadingSlice";
import { setPackage } from "@/redux/slices/packageSlice";
import axios from "axios";
import { useDispatch } from "react-redux";

const baseUrl = "http://localhost:8080/packages";
export default function TableService() {
  const dispatch = useDispatch();

  async function getPackageData() {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(baseUrl);
      if (response.status === 200) {
        console.log(response.data);
        dispatch(setPackage(response.data));
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
      const response = await axios.get(`${baseUrl}/user/${userName}`);
      if (response.status === 200) {
        console.log(response.data);
        dispatch(setPackage(response.data));
      }
    } catch (e) {
      console.log((e as Error).message);
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function requestWaybill(param: RequestWaybillInterface) {
    dispatch(setLoading(true));
    console.log(param);
    try {
      const response = await axios.post(baseUrl, param);
      if (response.status === 200) {
        console.log(response.data);
      }
    } catch (e) {
      console.log((e as Error).message);
    } finally {
      dispatch(setLoading(false));
    }
  }

  return { getPackageData, requestWaybill, getPackageByUserName };
}
