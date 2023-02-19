import deleteAddressById from "../../../db/utils/deleteAddressById";

const deleteAddress = async (data: { addressId: string }) => {
  try {
    const result = await deleteAddressById(data.addressId);
    return result;
  } catch (err) {
    console.log(err);
    return { status: false, msg: "Error During Delete Address" };
  }
};

export default deleteAddress;
