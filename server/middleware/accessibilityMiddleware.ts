import { NextFunction, Request, Response } from "express";
import checkLoggedUserAccess from "../utils/checkLoggedUserAccess";
import checkGuestUserAccess from "../utils/checkGuestUserAccess";
import checkSession from "../../db/utils/checkSession";

const accessibilityMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await checkSession(req.cookies);

  if (!result.status) {
    if (checkGuestUserAccess(req.originalUrl)) {
      return res.redirect("/");
    }
  } else if (result.status) {
    if (checkLoggedUserAccess(req.originalUrl)) {
      return res.redirect("/");
    }
  }

  next();
};

export default accessibilityMiddleware;
