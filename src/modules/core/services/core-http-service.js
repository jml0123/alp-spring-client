import axios from "axios";
import config from "../../../config";
export default class CoreHttpService {
  static rootUrl = config.API_ENDPOINT;

  static async getUserData(userId) {
    try {
      const res = await axios.get(`${this.rootUrl}/users/user/${userId}`);
      return res.data;
    } catch (err) {
      return;
    }
  }

  static async postUser(newUser) {
    try {
      const res = await axios.post(`${this.rootUrl}/users/register`, newUser);
      return res.data;
    } catch (err) {
      return;
    }
  }

  static async loginUser({ email, password }) {
    const credentials = { email, password };
    try {
      const res = await axios.post(`${this.rootUrl}/users/login`, credentials);
      return res.data;
    } catch (err) {
      return;
    }
  }
}
