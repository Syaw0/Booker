const checkMinAndMax = (min: number | string, max: number | string) => {
  if (Number.isNaN(Number(min)) || Number.isNaN(Number(max))) {
    return { status: false, msg: "the max and min most be type of number!" };
  }

  if (Number(min) < 0 || Number(max) < 0) {
    return { status: false, msg: "use Positive Value For Min And Max!" };
  }

  if (Number(min) > 0 && Number(max) == 0) {
    return {
      status: true,
      msg: "its ok",
    };
  }

  if (Number(max) <= Number(min) && min != 0 && max != 0) {
    return { status: false, msg: "the max most greeter than min!" };
  }
  return {
    status: true,
    msg: "its ok",
  };
};
export default checkMinAndMax;
