import { Request, Response } from "express";
import { loginSchema, registerSchema } from "../validators/auth.validator";
import { handleErrorResponse, handleSuccessResponse } from "../utils/helpers/response.handler";
import { loginService, registerService } from "../services/auth.service";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "../config/constants";

//  register controller
export const register = async (req: Request, res: Response) => {
  try {
    const data = registerSchema.parse(req.body);

    await registerService(data);

    handleSuccessResponse(res, SUCCESS_MESSAGES.REGISTER, HTTP_STATUS.CREATED);
  } catch (error) {
    handleErrorResponse(error, res);
  }
};

//  login controller
export const login = async (req: Request, res: Response) => {
  try {
    const data = loginSchema.parse(req.body);

    const user = await loginService(data);

    handleSuccessResponse(res, SUCCESS_MESSAGES.LOGIN, HTTP_STATUS.OK, { user });
  } catch (error) {
    handleErrorResponse(error, res);
  }
};
