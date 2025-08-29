import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../../config/configs";
import { IUser } from "../../models/user.model";

export interface CustomJwtPayload extends JwtPayload {
  id: string;
  email: string;
}

//  generate token
export const generateToken = (user: Partial<IUser>): string => {
  return jwt.sign({ id: user._id, email: user.email }, config.JWT_SECRET, {
    expiresIn: "1h",
  });
};

//  verify token
export const verifyToken = (token: string): CustomJwtPayload => {
  return jwt.verify(token, config.JWT_SECRET) as CustomJwtPayload;
};
