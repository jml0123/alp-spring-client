import React, { Component } from "react";

import { Typography, Box, Button, TextField } from "@material-ui/core";

import TokenService from "../../services/token-service";

import "./LoginForm.css";
import AuthContext from "../../context/AuthContext";

import Alert from "@material-ui/lab/Alert";
import CoreHttpService from "../../services/core-http-service";
import { withRouter } from "react-router-dom";

class LoginForm extends Component {
  state = {
    username: null,
    password: null,
    error: null,
    message: null,
  };

  static contextType = AuthContext;

  handleSetData = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    this.setState({ ...this.state, error: false });
    const { username, password } = this.state;
    const loginStatus = await CoreHttpService.loginUser({
      email: username,
      password: password,
    });
    if (!loginStatus) {
      this.setState({ ...this.state, error: true });
    } else {
      this.context.setUser(loginStatus.user);
      TokenService.saveAuthToken(loginStatus.token);
      TokenService.saveUserId(loginStatus.user._id);
      this.showWelcomeMessage();
      setTimeout(() => this.navigateToConsole(), 1000);
    }
  };

  showWelcomeMessage() {
    this.setState({
      ...this.state,
      message: `Success! Welcome back ${this.context.user.name}!`,
    });
  }

  navigateToConsole() {
    if (!this.context.user) {
      return;
    } else if (this.context.user.class === "Donor") {
      this.props.history.push("/donate");
    } else if (this.context.user.class === "Collector") {
      this.props.history.push("/partners");
    }
  }

  render() {
    return (
      <Box className="form-container">
        <Typography variant="h1" align="center" className="console-header">
          Welcome Back!
        </Typography>
        <Box mx="auto" w={0.88}>
          <TextField
            fullWidth
            id="username"
            name="username"
            label="E-mail"
            variant="standard"
            onChange={(e) => this.handleSetData(e)}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            variant="standard"
            onChange={(e) => this.handleSetData(e)}
          />
        </Box>
        <div className="form-controls">
          {!this.state.message ? (
            <Button color="secondary" onClick={() => this.handleSubmit()}>
              Login
            </Button>
          ) : null}
          {this.state.error ? (
            <Typography variant="h2" color="secondary">
              {this.state.error}
            </Typography>
          ) : null}
          {this.state.message ? (
            <Box
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Alert severity="success">{this.state.message}</Alert>
            </Box>
          ) : null}
        </div>
      </Box>
    );
  }
}

export default withRouter(LoginForm);
