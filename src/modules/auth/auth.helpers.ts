import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Config } from "../../services";

async function encryptPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, +Config.authConfig.bcryptRounds);
}

async function decodeToken(token: string) {
  const decoded: any = jwt.decode(token);
  return decoded.data;
}

async function verifyPassword(
  password: string,
  encrypted: string
): Promise<boolean> {
  return (await bcrypt.compare(password, encrypted)) ? true : false;
}

async function generateToken(data: object) {
  return jwt.sign({ data }, Config.authConfig.jwtSecret, {
    expiresIn: "1d",
  });
}

export { generateToken, decodeToken, encryptPassword, verifyPassword };
