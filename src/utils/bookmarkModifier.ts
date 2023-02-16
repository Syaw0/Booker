import { fakeUser } from "src/shared/fakeUser";

const bookmarkModifier = async () => {
  const resp = await fetch("");
  return { status: true, msg: "its ok", data: { ...fakeUser } };
};
export const loaderMsg = "Please wait to server handle your request.";
export default bookmarkModifier;
