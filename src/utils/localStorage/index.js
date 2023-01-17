export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const setAccessToken = (value) => {
  localStorage.setItem("accessToken", JSON.stringify(value));
};

export const removeAccessToken = () => {
  localStorage.removeItem("accessToken");
};

export const setAuth = (value) => {
  localStorage.setItem("auth", JSON.stringify(value));
};

export const getAuth = () => {
  return localStorage.getItem("auth");
};

export const isAuthenticated = () => {
  return getAccessToken;
};

export const removeAuth = () => {
  localStorage.removeItem("auth")
}