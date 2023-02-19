import { useDispatch } from "react-redux";
import { replaceAddresses } from "src/store/userAddresses/userAddresses";
import getUpdatedAddresses, { loaderMsg } from "src/utils/getUpdatedAddress";
import useFetch from "./useFetch";

const useUpdateAddresses = (userId: string) => {
  const [trigger] = useFetch([getUpdatedAddresses], [loaderMsg]);
  const dispatch = useDispatch();
  const triggerUpdate = async () => {
    const result = await trigger(0, userId);
    if (result.status) {
      dispatch(replaceAddresses(result.data));
    }
  };
  return triggerUpdate;
};

export default useUpdateAddresses;
