import { address1 } from "src/shared/fakeAddresses";

const deleteAddress = async () => {
  const resp = await fetch("");
  return { status: true, msg: "its ok", data: [address1] };
};
export const loaderMsg = "Please wait to server handle your request.";
export default deleteAddress;
