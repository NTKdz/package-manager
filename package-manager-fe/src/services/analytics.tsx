import { setLoading } from "@/redux/slices/loadingSlice";
import { useDispatch } from "react-redux";

export default function Analytics() {
  const dispatch = useDispatch();
  async function getPackageData() {
    dispatch(setLoading(true));
    try {
      const response = [];
    } catch (e) {
      console.log((e as Error).message);
    } finally {
      dispatch(setLoading(false));
    }
  }
  return { getPackageData };
}
