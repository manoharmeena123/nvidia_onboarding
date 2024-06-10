import _ from "lodash";

export const isAnyValueFilled = (obj: object | null | undefined): boolean => {
  if (!obj || _.isEmpty(obj)) return false;
  return Object.values(obj).some((value) => !_.isEmpty(value));
};
