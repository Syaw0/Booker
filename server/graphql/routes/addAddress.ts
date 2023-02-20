import addAddressForUser from "../../../db/utils/addAddressForUser";

interface AddAddressType {
  userId: string;
  addressData: any;
}

const addAddress = async (data: AddAddressType) => {
  try {
    const result = await addAddressForUser(data.userId, data.addressData);
    return result;
  } catch (err) {
    console.log(err);
    return { status: false, msg: "Error During Adding Address!" };
  }
};

export default addAddress;
