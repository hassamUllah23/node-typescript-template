import { NextFunction, Request, Response } from "express";
import {
  ValidationChain,
  ValidationError,
  validationResult,
} from "express-validator";
import { LogService } from "../services";
import { RunnableValidationChains } from "express-validator/src/middlewares/schema";
import { StringTransformer } from "../utils/transformers";

type ApiResposne = {
  message: string;
};

interface HttpResponseMethod {
  (): ApiResposne;
}

function sendApiResponseMessage(message: string): ApiResposne {
  return {
    message: message,
  };
}

function sendValidationError(errors: Array<ValidationError>): ApiResposne {
  console.log([...errors]);
  return sendApiResponseMessage(
    errors
      .map(
        (error: any) =>
          new StringTransformer(error.msg).replaceAllOccurrences(
            "value",
            error.path,
          ).value,
      )
      .join(", "),
  );
}

function validationWrapper(_req: Request, res: Response, func: any) {
  const errors = validationResult(_req);
  console.error({ errors });
  if (!errors.isEmpty()) {
    res.status(400).send(sendValidationError(errors.array()));
    return;
  }
  try {
    func();
  } catch (error: any) {
    LogService.log("error", error);
    res
      .status(400)
      .send(
        error.message
          ? sendApiResponseMessage(error.messagege)
          : send500error(),
      );
  }
}

const send500error: HttpResponseMethod = () => {
  return sendApiResponseMessage("Something went wrong");
};

function sendNotFoundError(moduleName: string): ApiResposne {
  return sendApiResponseMessage(`${moduleName} not found`);
}

function sendCreateError(moduleName: string): ApiResposne {
  return sendApiResponseMessage(`Failed to create ${moduleName}`);
}

function sendUpdateError(moduleName: string): ApiResposne {
  return sendApiResponseMessage(`Failed to update ${moduleName}`);
}

function sendDeleteError(moduleName: string): ApiResposne {
  return sendApiResponseMessage(`Failed to delete ${moduleName}`);
}

function sendCreateSuccess(moduleName: string): ApiResposne {
  return sendApiResponseMessage(`${moduleName} created succesfully`);
}
function sendUpdateSuccess(moduleName: string): ApiResposne {
  return sendApiResponseMessage(`${moduleName} updated succesfully`);
}

function sendDeleteSuccess(moduleName: string): ApiResposne {
  return sendApiResponseMessage(`${moduleName} deleted succesfully`);
}

const validateSchema = async (
  validations: RunnableValidationChains<ValidationChain>,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  await Promise.all(validations.map((validation) => validation.run(req)));
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  } else {
    res.status(400).send(sendValidationError(errors.array()));
    return;
  }
};

const ValidationErrors = {
  empty: (properName: string) => {
    return `${properName} cannot be empty`;
  },
  lessThan: (properName: string, minimumLength: number) => {
    return `${properName} cannot be less than ${minimumLength}`;
  },
  greaterThan: (properName: string, maximumLength: number) => {
    return `${properName} cannot be greater than ${maximumLength}`;
  },
  string: (properName: string) => {
    return `${properName} must be a string`;
  },
  number: (properName: string) => {
    return `${properName} must be a number`;
  },
};

export {
  ValidationErrors,
  validateSchema,
  sendApiResponseMessage,
  sendValidationError,
  validationWrapper,
  send500error,
  sendNotFoundError,
  sendCreateError,
  sendUpdateError,
  sendDeleteError,
  sendCreateSuccess,
  sendUpdateSuccess,
  sendDeleteSuccess,
};
