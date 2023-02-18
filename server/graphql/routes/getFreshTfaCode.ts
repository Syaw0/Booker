import setTfaSession from "../../../db/utils/setTfaSession";

interface GetFreshOtpTypes {
  email: string;
}

const getFreshTfaCode = async (data: GetFreshOtpTypes) => {
  try {
    const result = await setTfaSession(data.email);
    return result;
  } catch (err) {
    return { status: false, msg: "Error During Set Fresh Tfa Code!" };
  }
};

export default getFreshTfaCode;
