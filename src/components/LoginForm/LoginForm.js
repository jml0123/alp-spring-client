import React, {Component} from 'react';
import Nav from "../../components/Nav";

import {Typography, Container, Box,
    Button, TextField, Input, FormControlLabel} from '@material-ui/core';
    
import TokenService from "../../services/token-service";
import AuthApiService from "../../services/auth-api-service";

import "./LoginForm.css";


export default class LoginForm extends Component {
  state = { error: null };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ error: null });
    const { username, password } = e.target;

    AuthApiService.postLogin({
        username: username.value,
        password: password.value
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
        <Box className="form-container">
                <Typography variant = "h1" align="center" className="console-header">Welcome Back!</Typography>
                <Box mx="auto" w={0.88}>
                    <TextField fullWidth id="email" name="email"  label="E-mail" variant="standard" />
                    <TextField fullWidth id="password" name="password" label="Password" type="password"  variant="standard" />
                </Box>
                <div className="form-controls">
                <Button color="secondary">Login</Button>
                    {this.state.error ? 
                        <Typography variant="h2" color="secondary">{this.state.error}</Typography>
                        : null
                    }
                </div>
        </Box>
    );
  }
}
