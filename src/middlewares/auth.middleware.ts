import { Request, Response, NextFunction, RequestHandler } from "express";
import { ERROR_MESSAGES, HTTP_STATUS } from "../config/constants";
import { CustomJwtPayload, verifyToken } from "../utils/helpers/jwt.helper";

export interface CustomRequest extends Request {
  user: CustomJwtPayload;
}

//  auth middleware
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["token"];
  if (!token) {
    return res
      .status(HTTP_STATUS.UNAUTHORIZED)
      .json({ success: false, message: ERROR_MESSAGES.UNAUTHORIZED });
  }
  try {
    const decoded = verifyToken(token.toString());
    (req as CustomRequest).user = decoded;
    next();
  } catch (err) {
    return res
      .status(HTTP_STATUS.UNAUTHORIZED)
      .json({ success: false, message: ERROR_MESSAGES.UNAUTHORIZED });
  }
};
