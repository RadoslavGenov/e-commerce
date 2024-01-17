export const SALT_ROUNDS = 10;
const bcrypt = require('bcrypt');

export const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(password, salt);

    return hash;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const compareHash = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};
