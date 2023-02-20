import getAddresses from "../../../db/utils/getAddresses";

const getUpdatedAddresses = async (data: { userId: string }) => {
  try {
    const result = await getAddresses(data.userId);
    return result;
  } catch (err) {
    return {
      status: false,
      msg: "Error During Get Updated Addresses",
    };
  }
};

export default getUpdatedAddresses;
