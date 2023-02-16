const updateUserData = async () => {
  const resp = await fetch("");
  return {
    status: true,
    msg: "its ok",
    data: {
      cartNumber: 0,
      email: "",
      profileUrl: "",
      userId: "",
      wishlist: [],
    },
  };
};
export const loaderMsg = "Please wait to server handle your request.";
export default updateUserData;
