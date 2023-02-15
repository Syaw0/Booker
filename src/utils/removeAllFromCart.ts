import fakeUserCartPageData from "src/shared/fakeUserCartPageData";

type Response = { status: boolean; msg: string; data?: UserCartPageUpdateData };

const removeAllFromCart = async (): Promise<Response> => {
  const resp = await fetch("");
  return { status: true, msg: "its ok", data: fakeUserCartPageData };
};
export const loaderMsg = "Please wait to server handle your request.";
export default removeAllFromCart;
