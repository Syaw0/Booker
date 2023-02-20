import { SHA256 } from "crypto-js";
import { Response } from "express";

const setLoginSessionCookie = async (email: string, res: Response) => {
  try {
    res.cookie("session", SHA256(email).toString(), {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    return { status: true, msg: "Set Login Session Cookie Successfully!" };
  } catch (err) {
    return { status: false, msg: "Error During Set Login Session Cookie!" };
  }
};

export default setLoginSessionCookie;
