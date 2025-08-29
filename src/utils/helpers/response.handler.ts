import { ZodError } from "zod";
import { Response } from "express";
import { AppError } from "../app.error";

export const handleZodError = (err: ZodError) => {
  return err.issues.reduce((acc, e) => {
    acc[e.path.join(".")] = e.message;
    return acc;
  }, {} as Record<string, string>);
};

export const handleErrorResponse = (err: unknown, res: Response) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      errors: handleZodError(err),
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};

export const handleSuccessResponse = (
  res: Response,
  message: string,
  statusCode: number,
  data?: any
) => {
  const response: any = {
    success: true,
    message,
  };

  if (data && Object.keys(data).length > 0) {
    response.data = data;
  }

  return res.status(statusCode).json(response);
};
