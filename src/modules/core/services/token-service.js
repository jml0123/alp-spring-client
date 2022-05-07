import config from "../../../config";

const TokenService = {
  saveAuthToken(token) {
    window.localStorage.setItem(config.TOKEN_KEY, token);
  },
  saveUserId(user_id) {
    window.localStorage.setItem(config.USER_ID, user_id);
  },
  getAuthToken() {
    return window.localStorage.getItem(config.TOKEN_KEY);
  },
  getUserId() {
    return window.localStorage.getItem(config.USER_ID);
  },
  clearAuthToken() {
    window.localStorage.removeItem(config.TOKEN_KEY);
  },
  clearUserId() {
    window.localStorage.removeItem(config.USER_ID);
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken();
  },
  makeBasicAuthToken(name, password) {
    return window.btoa(`${name}:${password}`);
  },
};

export default TokenService;
