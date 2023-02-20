import { useDispatch } from "react-redux";
import { replaceUserData } from "src/store/book/bookStore";
import updateUserData, { loaderMsg } from "src/utils/updateUserData";
import useFetch from "./useFetch";

const useUpdateUserData = (userId: string) => {
  const [trigger] = useFetch([updateUserData], [loaderMsg]);
  const dispatch = useDispatch();
  const triggerUpdate = async () => {
    const result = await trigger(0, userId);
    if (result.status) {
      dispatch(replaceUserData(result.data));
    }
  };
  return triggerUpdate;
};

export default useUpdateUserData;
