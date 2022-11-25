export const isDevelopment = process.env.NODE_ENV !== "production";

export const getBasename = () => {
  return isDevelopment ? `http://localhost:6565` : "";
};
