import getUserById from "../../../db/utils/getUserById";

interface UpdateUserData {
  userId: string;
}

const updateUserData = async (data: UpdateUserData) => {
  try {
    const result = await getUserById(data.userId);
    return result;
  } catch (err) {
    return { status: false, msg: "Error During Update User Data!" };
  }
};

export default updateUserData;
