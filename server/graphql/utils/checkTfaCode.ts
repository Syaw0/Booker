interface CheckTfaCodeTypes {
  email: string;
  tfaCode: string | number;
}

const checkTfaCode = (data: CheckTfaCodeTypes) => {
  return {
    status: false,
    msg: "",
  };
};
export default checkTfaCode;
