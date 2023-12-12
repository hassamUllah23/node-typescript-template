import { Schema } from "express-validator";

const LoginDto: Schema = {
  email: {
    isString: true,
    isEmail: true,
    isLength: { options: { min: 8, max: 100 } },
    trim: true,
  },
};

export { LoginDto };
