import config from "../../../config";

const TokenService = {
  saveAuthToken(token) {
    window.localStorage.setItem(config.AUTH_TOKEN, token);
  },
  saveUserId(user_id) {
    window.localStorage.setItem(config.USER_ID, user_id);
  },
  getAuthToken() {
    return window.localStorage.getItem(config.AUTH_TOKEN);
  },
  getUserId() {
    return window.localStorage.getItem(config.USER_ID);
  },
  clearAuthToken() {
    window.localStorage.removeItem(config.AUTH_TOKEN);
  },
  clearUserId() {
    window.localStorage.removeItem(config.USER_ID);
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken();
  },
};

export default TokenService;
