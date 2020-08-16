import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Nav from "../../components/Nav";

import {Typography, Container, Box,
    Button, TextField, Input, FormControlLabel} from '@material-ui/core';
    
import TokenService from "../../services/token-service";
import AuthApiService from "../../services/auth-api-service";

import "./LoginForm.css";
import AuthContext from '../../AuthContext';

import Alert from '@material-ui/lab/Alert';


export default class LoginForm extends Component {
  state = { 
    username: null,
    password: null,
    error: null,
    message: null,
  };

  static contextType = AuthContext

  handleSetData = async (e) => {
    await this.setState({
        ...this.state,
        [e.target.name]: e.target.value
 
    })
}

  handleSubmit = (e) => {
    this.setState({ ...this.state, error: null });
    const { username, password } = this.state;
    AuthApiService.postLogin({
        email: username,
        password: password
     })
      .then((res) => {
        this.context.setUser(res.user)
        TokenService.saveAuthToken(res.token);
        TokenService.saveUserId(res.user._id);
        this.setState({
          ...this.state,
          message: `Success! Welcome back ${this.context.user.name}!`
        })
        // Redirect to appropriate console (collector or donor)
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

render() {
    return (
        <Box className="form-container">
                <Typography variant = "h1" align="center" className="console-header">Welcome Back!</Typography>
                <Box mx="auto" w={0.88}>
                    <TextField fullWidth id="username" name="username"  label="E-mail" variant="standard" onChange={e => this.handleSetData(e)}/>
                    <TextField fullWidth id="password" name="password" label="Password" type="password"  variant="standard" onChange={e => this.handleSetData(e)} />
                </Box>
                <div className="form-controls">
                {(!this.state.message)? <Button color="secondary" onClick={() => this.handleSubmit()}>Login</Button> : null}
                    {this.state.error ? 
                        <Typography variant="h2" color="secondary">{this.state.error}</Typography>
                        : null
                    }
                    {this.state.message ?
                          <Box flexDirection="column" alignItems="center" justifyContent="center">
                         <Alert severity="success">{this.state.message}</Alert> 
                         <Link to={(this.context.user.class === "donor" ? "/donate" : "/partners")}><Button color="secondary" onClick={() => this.handleSubmit()}>Go To Dashboard</Button></Link> 
                          </Box> : null
                    }
                </div>
        </Box>
    );
  }
}
