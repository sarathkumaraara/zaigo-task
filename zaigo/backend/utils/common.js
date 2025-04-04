import Response from "./Response.js";
import { internalError } from "./responseMessageHelper.js";

/** Required Fields Check */
export function checkRequiredFields(data, requiredFields) {
  return requiredFields.every((field) => data[field]);
}

/** Required Fields Check Some */
export function checkSomeRequiredFields(data, requiredFields) {
  return requiredFields.some((field) => data[field]);
}

export function sendResponse(response, statusCode, message, data) {
  const responseData = new Response(message, data)
  response.status(statusCode).send(responseData)
}

export function sendInternalErrorResponse(resp, data) {
    return sendResponse(resp, 500, internalError(), data)
}

export const isObjectEmpty = (data = {}) => {
  return Object.keys(data).length === 0;
};

/* To check the array is empty */
export const isArrayEmpty = (data) => {
  return !!(Array.isArray(data) && data.length === 0);
};