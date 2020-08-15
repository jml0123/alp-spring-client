import React, {Component} from 'react';
import Nav from "../../components/Nav";

import TokenService from "../../services/token-service";
import AuthApiService from "../../services/auth-api-service";

export default class LoginForm extends Component {
  state = { error: null };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ error: null });
    const { username, password } = e.target;

    AuthApiService.postLogin({
      username: username.value,
      password: password.value,
    })
      .then((res) => {
        username.value = "";
        password.value = "";
        TokenService.saveAuthToken(res.authToken);

        this.handleLoginSuccess("dashboard");
        // Redirect to appropriate console (collector or donor)
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  handleLoginSuccess = (path) => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || `/${path}`;
    history.push(destination);
  };

  render() {
    return (
      <>
       
      </>
    );
  }
}
