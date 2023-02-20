import { useDispatch } from "react-redux";
import { updateStates } from "src/store/userCart/userCart";
import updateCartData, { loaderMsg } from "src/utils/updateCardData";
import useFetch from "./useFetch";

const useUpdateCartData = (userId: string) => {
  const [trigger] = useFetch([updateCartData], [loaderMsg]);
  const dispatch = useDispatch();
  const triggerUpdate = async () => {
    const result = await trigger(0, userId);
    if (result.status) {
      dispatch(updateStates(result.data));
    }
  };
  return triggerUpdate;
};

export default useUpdateCartData;
