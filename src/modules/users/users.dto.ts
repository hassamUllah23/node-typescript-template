import { Schema } from "express-validator";

const CreateUserDto: Schema = {
  name: {
    isString: true,
    isLength: {
      options: {
        min: 3,
        max: 50,
      },
    },
  },
  email: {
    isEmail: true,
  },
  password: {
    isStrongPassword: true,
  },
};
const UpdateUserDto: Schema = {
  name: {
    optional: true,
    isString: true,
    isLength: {
      options: {
        min: 3,
        max: 50,
      },
    },
  },
  email: {
    optional: true,
    isEmail: true,
  },
  password: {
    optional: true,
    isStrongPassword: true,
  },
};

export { CreateUserDto, UpdateUserDto };
