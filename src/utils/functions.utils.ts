type ApiResposne = {
    message: string;
  };
  
  function sendApiResponseMessage(message: string): ApiResposne {
    return {
      message: message,
    };
  }
  
  function send500error(): ApiResposne {
    return {
      message: "Something went wrong",
    };
  }
  
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

  function logDuration(func:any){
    console.time(func.name)
    func()
    console.timeEnd(func.name)
  }

  function hasEmptyValues(data: Record<string, any>): boolean {
    const checkEmpty = (value: any): boolean => {
      if (typeof value === "object" && value !== null) {
        return hasEmptyValues(value);
      }
      return (
        value === undefined ||
        value === null ||
        value === 0 ||
        value === "" ||
        Number.isNaN(value) ||
        (Array.isArray(value) && value.length === 0)
      );
    };
  
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const element = data[key];
        if (checkEmpty(element)) {
          return true;
        }
      }
    }
  
    return false;
  }
  
  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  
  
  export {
    sendApiResponseMessage,
    send500error,
    sendNotFoundError,
    sendCreateError,
    sendDeleteError,
    sendUpdateError,
    sendCreateSuccess,
    sendUpdateSuccess,
    sendDeleteSuccess,
    logDuration,
    hasEmptyValues,
    sleep
  };
  