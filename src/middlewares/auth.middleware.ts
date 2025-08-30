import { Request, Response, NextFunction, RequestHandler } from "express";
import { ERROR_MESSAGES, HTTP_STATUS } from "../config/constants";
import { CustomJwtPayload, verifyToken } from "../utils/helpers/jwt.helper";

export interface CustomRequest extends Request {
  user: CustomJwtPayload;
}

/**
 * Middleware to authenticate requests.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 */
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
