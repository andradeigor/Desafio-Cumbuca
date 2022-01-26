import bcrypt from "bcrypt";

export default {
  async encrypt(password: string) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    return hashedPassword;
  },
  async decript(password: string, hashedPassword: string) {
    const login = bcrypt.compare(password, hashedPassword);
    return login;
  },
};
