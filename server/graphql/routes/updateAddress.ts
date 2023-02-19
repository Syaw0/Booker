import updatingAddress from "../../../db/utils/updatingAddress";

const updateAddress = async (data: { addressData: any }) => {
  try {
    const result = await updatingAddress(data.addressData);

    return result;
  } catch (err) {
    return { status: false, msg: "Error During Update Address!" };
  }
};

export default updateAddress;
