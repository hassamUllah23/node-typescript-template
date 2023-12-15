import { Schema, checkSchema } from "express-validator";
import { ValidationErrors, validateSchema } from "../http.helpers";
import { Request, Response, NextFunction } from "express";

let id = "id",
  oldPassword = "oldPassword",
  newPassword = "newPassword";
const changePasswordValidator = async (
  _req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const changePasswordValidationSchema: Schema = {
    [id]: {
      isString: {
        errorMessage: ValidationErrors.string(id),
      },
      notEmpty: {
        errorMessage: ValidationErrors.empty(id),
      },
    },
    [oldPassword]: {
      isString: {
        errorMessage: ValidationErrors.string(oldPassword),
      },
      notEmpty: {
        errorMessage: ValidationErrors.empty(oldPassword),
      },
    },
    [newPassword]: {
      isString: {
        errorMessage: ValidationErrors.string(newPassword),
      },
      notEmpty: {
        errorMessage: ValidationErrors.empty(newPassword),
      },
    },
  };

  const validations = checkSchema(changePasswordValidationSchema, ["body"]);
  await validateSchema(validations, _req, _res, next);
};

export { changePasswordValidator };
