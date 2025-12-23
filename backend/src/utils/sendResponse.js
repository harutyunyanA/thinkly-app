export const sendResponse = (
  res,
  statusCode,
  success,
  message,
  payload = null,
  token = null
) => {
  const response = { success, message };
  if (payload !== null) response.payload = payload;
  if (token !== null) response.token = token;

  return res.status(statusCode).send(response);
};
