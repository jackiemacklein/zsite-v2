export const TOKEN_API = "TOKEN_API";
export const CLIENT_ID = "CLIENT_ID";
export const SITE_ID = "SITE_ID";
export const USER_NAME = "USER_NAME";
export const USER_ID = "USER_ID";
export const USER_EMAIL = "USER_EMAIL";

export const isAuthenticated = () => localStorage.getItem(TOKEN_API) !== null;
export const getToken = () => localStorage.getItem(TOKEN_API);

export const login = (token, id, email, client_id, site_id, name) => {
  localStorage.setItem(TOKEN_API, token);
  localStorage.setItem(CLIENT_ID, client_id);
  localStorage.setItem(SITE_ID, site_id);
  localStorage.setItem(USER_NAME, name);
  localStorage.setItem(USER_ID, id);
  localStorage.setItem(USER_EMAIL, email);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_API);
  localStorage.removeItem(CLIENT_ID);
  localStorage.removeItem(SITE_ID);
  localStorage.removeItem(USER_NAME);
  localStorage.removeItem(USER_ID);
  localStorage.removeItem(USER_EMAIL);
};
