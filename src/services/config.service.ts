import { config } from "dotenv";
import { LogService } from "./log.service";
import { hasEmptyValues } from "../utils/functions.utils";

config({ path: `.env.${process.env.NODE_ENV}`, debug: true });

/**
 * @name RootConfig
 * @description root configuration type
 */
type RootConfig = {
  serverConfig: {
    port: number;
    host: string;
    allowedOrigins: Array<string>;
    allowedMethods: Array<string>;
  };
  authConfig: {
    jwtSecret: string;
    bcryptRounds: number;
  };
};

/**
 * @name Config
 * @description root configuration type
 */
const Config: RootConfig = {
  serverConfig: {
    port: Number(process.env.PORT),
    host: process.env.HOST as string,
    allowedOrigins: (process.env.ALLOWED_ORIGINS as string).split(","),
    allowedMethods: (process.env.ALLOWED_METHODS as string).split(","),
  },
  authConfig: {
    jwtSecret: process.env.JWT_SECRET as string,
    bcryptRounds: Number(process.env.ROUNDS),
  },
};

if (hasEmptyValues(Config)) {
  LogService.log("error", "Please fill all the required environment variables");
  process.exit(1);
}

export { Config };
