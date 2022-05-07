import config from "../../../config";

const AuthApiService = {
  postLogin({email, password}) {
    return fetch(`${config.API_ENDPOINT}/users/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
};

export default AuthApiService;
