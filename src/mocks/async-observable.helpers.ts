import { defer } from "rxjs";

export const asyncError = (errorObject: any) => {
  return defer(() => Promise.reject(errorObject));
};
