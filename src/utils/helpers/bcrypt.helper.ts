import bcrypt from "bcryptjs";

//  hash password
const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

//  compare password
const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

//  bcrypt helper export
export const bcryptHelper = {
  hashPassword,
  comparePassword,
};
