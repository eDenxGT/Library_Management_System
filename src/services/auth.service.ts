import { LoginDTO, RegisterDTO } from "../validators/auth.validator";
import User from "../models/user.model";
import { bcryptHelper } from "../utils/helpers/bcrypt.helper";
import { AppError } from "../utils/app.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../config/constants";
import { IUserRegisterResponse } from "../types/user.types";
import { generateToken } from "../utils/helpers/jwt.helper";

/**
 * Registers a new user.
 *
 * @param data - User data to register
 * @returns The registered user
 */
export const registerService = async (data: RegisterDTO) => {
  const { username, email, password } = data;
  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new AppError(
      ERROR_MESSAGES.USER_ALREADY_EXISTS,
      HTTP_STATUS.CONFLICT
    );
  }

  const hashedPassword = await bcryptHelper.hashPassword(password);

  await User.create({
    username,
    email,
    password: hashedPassword,
  });

  return;
};

/**
 * Logs in a user.
 *
 * @param data - User login data
 * @returns The logged-in user
 */
export const loginService = async (data: LoginDTO): Promise<IUserRegisterResponse> => {
  const { email, password } = data;

  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(ERROR_MESSAGES.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
  }

  const isPasswordValid = await bcryptHelper.comparePassword(
    password,
    user.password
  );

  if (!isPasswordValid) {
    throw new AppError(
      ERROR_MESSAGES.INVALID_CREDENTIALS,
      HTTP_STATUS.UNAUTHORIZED
    );
  }

  const token = generateToken(user);

  return {
    id: user._id.toString(),
    username: user.username,
    email: user.email,
    token,
  };
};
