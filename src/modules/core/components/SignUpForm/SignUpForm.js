import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import config from '../../../../config'
import Autocomplete from 'react-google-autocomplete';

import {Typography, Container, Box, 
    Button, TextField, FormControlLabel, Radio, RadioGroup} from '@material-ui/core';

import "./SignUpForm.css"
import AuthContext from '../../context/AuthContext';
import TokenService from "../../services/token-service";
import CoreHttpService from '../../services/core-http-service';

export default class SignUpForm extends Component {

    static contextType = AuthContext

    state = {
           user: {
                name: "",
                email: "",
                type: "",
                area: "",
                location: {},
                password: "",
                confirmPass: "",
                // Collector
                phoneNum: "",
                orgName: "",
                address: "",
                hours: "",
                description: "",
            },
            currentPhase: 0,
            error: false
        } 
        
    setPhase = (phase) => {
        this.setState({
            ...this.state,
            currentPhase: (phase)
        })
    }

    handleSetData = async (e) => {
        await this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                [e.target.name]: e.target.value
            }  
        })
    }

    handleSubmitUser = () => {
        const {email, name, password, confirmPass, type} = this.state.user
        const newUser = {
                name: name,
                email: email,
                class: type,
                location: {
                    type: "Point",
                    // Get long lat of area.
                    // Hardcoded values for now.
                    coordinates: [-74.155096, 40.745951],
                },
                password: password,
                password2: confirmPass,
        }
        if (newUser.class.toLowerCase() === "collector") {
            const {phoneNum, orgName, address, hours, description} = this.state.user
            newUser.phone = phoneNum;
            newUser.orgName = orgName;
            newUser.address = address;
            newUser.description = description;
            newUser.hours = hours
        }
        this.postUser(newUser);
    }

    postUser = async (userData) => {
        const newUser = await CoreHttpService.postUser(userData)
        if (!newUser) {
            this.setState({
                ...this.state,
                error: true
            })
        } else {
            TokenService.saveAuthToken(newUser.token);
            TokenService.saveUserId(newUser.user.id);
            this.context.setUser(newUser.user);
            this.setPhase(8)
        }
    }

    handleSetLocation = (location) => {
        const formatted = location.formatted_address
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                area: formatted
            }
        })
    }

    render() {
        const startView = 
        <>
            <Box className="signup-container">
                <Typography variant = "h3" align="center" className="console-header">Welcome</Typography>
                <Typography align="center" variant="h2">Kitabu is a place to donate your gently used children's books.<br/>Each book you donate contributes to a library in rural Africa. <br/>1 Kitabu (1k, or 1,000 books) = 1 library</Typography>
                <div
                    className="form-controls"
                >
                    <Link to="/login" className="link"><Button>Already have an account?</Button></Link>
                    <Button color="secondary" size="large" onClick={() => this.setPhase(1)}>Next</Button>
                </div>
            </Box>
        </>

        const nameView = 
        <Box className="signup-container">
            <Typography variant = "h1" align="center" className="console-header">What is your name?</Typography>
            <TextField id="name" name="name" value={this.state.user.name} label="Name" variant="standard" onChange={(e) => this.handleSetData(e)} />
            <div
                className="form-controls"
            >
                <Button color="secondary" size="large" onClick={
                    () => {
                        this.setPhase(2)
                    }}>Next</Button>
            </div>
        </Box>

         const emailView = 
            <Box className="signup-container">
                <Typography variant = "h2" align="center" className="console-header">You said {this.state.user.name}</Typography>
                <Typography variant = "h1" align="center" className="console-header">Hi, {this.state.user.name}! Where can we reach you?</Typography>
                <TextField id="email" name="email" value={this.state.user.email}  label="E-mail" onChange={(e) => this.handleSetData(e)}  variant="standard" />
                <div className="form-controls">
                    <Button color="secondary" size="large" onClick={() => this.setPhase(1)}>Back</Button>
                    <Button color="secondary" size="large" onClick={() => this.setPhase(3)}>Next</Button>
                </div>
            </Box>

        const locationView = 
        <Box className="signup-container">
            <Typography variant = "h2" align="center" className="console-header">You said {this.state.user.email}</Typography>
            <Typography variant = "h1" align="center" className="console-header">Where are you from?</Typography>
            <Box my={0.5}><Autocomplete
                apiKey={config.gAPI_KEY}
                className="auto-fill-loc"
                onPlaceSelected={(place) => {
                    this.handleSetLocation(place)
                }}
                types={['(regions)']}
            />
            </Box>
        
            <div className="form-controls">
                <Button color="secondary" size="large" onClick={() => this.setPhase(2)}>Back</Button>
                <Button color="secondary" size="large" onClick={() => this.setPhase(4)}>Next</Button>
    
            </div>
        </Box>

        const typeView =  
        <Box className="signup-container">
            <Typography variant = "h2" align="center" className="console-header">You said {this.state.user.area}</Typography>
            <Typography variant = "h1" align="center" className="console-header">Are you a donor, or collector?</Typography>
            <Typography variant = "h2" align="center" className="console-header">Now choose if you would like to donate books, or become a partnered collector (collectors host book drives)</Typography>
            <RadioGroup aria-label = "user-type" defaultValue={this.state.user.type}  row>
            <FormControlLabel
                control={
                <Radio
                    onChange={(e) => this.handleSetData(e)}
                    name="type"
                    value="Donor"
                    color="primary"
                />
                }
                label="I am a donor"
            />
            <FormControlLabel
                control={
                <Radio
                    onChange={(e) => this.handleSetData(e)}
                    name="type"
                    value="Collector"
                    color="primary"
                />
                }
                label="I am a Collector"
            />
            </RadioGroup>
          
            <div className="form-controls">
                <Button color="secondary" size="large" onClick={() => this.setPhase(3)}>Back</Button>
                <Button color="secondary" size="large" onClick={() => (this.state.user.type === "Donor")? (this.setPhase(6)) :( this.setPhase(5))  }>
                    {(this.state.user.type !== "Collector") ? "Almost Done" : "Additional Details"}
                </Button>
            </div>

        </Box>

  
        const additionalInfoView = 
        <Box className="signup-container">
            <Typography variant = "h2" align="center" className="console-header">You said {this.state.user.type}</Typography>
            <Typography variant = "h1" align="center" className="console-header">We just need a few more details...</Typography>
            <Typography variant = "h2" align="center" className="console-header">We collect this information to make it easier for people to find your book drive</Typography>
            <Box mx="auto" w={0.88}>
                <TextField fullWidth id="orgName" value={this.state.user.orgName}  name="orgName" label="Org/Entity Name" variant="standard" onChange={(e) => this.handleSetData(e)} />
                <TextField fullWidth id="address" value={this.state.user.address}  name="address" label="Street Address" variant="standard" onChange={(e) => this.handleSetData(e)} />
                <TextField fullWidth id="area" name="area" label="Location" variant="standard" readOnly value={this.state.user.area} />
                <TextField fullWidth id="phoneNum" value={this.state.user.phoneNum}  name="phoneNum" label="Phone Number" variant="standard" onChange={(e) => this.handleSetData(e)} />
                <Box my={2}>
                    <Typography fullWidth variant="h2" align="center">When are you available for donations?<br/>(E.g. Monday-Friday, 9am-5pm)</Typography>
                    <TextField fullWidth id="hours" value={this.state.user.hours}  name="hours" label="Availability" variant="standard" onChange={(e) => this.handleSetData(e)}/>
                </Box>
                <Box my={2}>
                <Typography variant="h2" align="center">Other important info?<br/>(E.g. Call to coordinate)</Typography>
                <TextField fullWidth id="description" value={this.state.user.description}  name="description" variant="standard" label="Other Info" onChange={(e) => this.handleSetData(e)}  />
                </Box>
            </Box>
            <div className="form-controls">
                <Button color="secondary" size="large" onClick={() => this.setPhase(4)}>Back</Button>
                <Button color="secondary" size="large" onClick={
                    () => {
                        this.setPhase(6)
                    }}>Next</Button>
            </div>
        </Box>

        const passwordView = 
        <>  
            <Box className="signup-container">
                <Typography variant = "h1" align="center" className="console-header">Set a password</Typography>
                <TextField id="password" type="password" name="password" label="Password" variant="standard" onChange={(e) => this.handleSetData(e)} />
                <div className="form-controls">
                    <Button color="secondary" size="large" onClick={() => (this.state.user.type === "Donor" ? this.setPhase(4) :  this.setPhase(5)) }>Back</Button>
                    <Button color="secondary" size="large" onClick={() => this.setPhase(7)}>Next</Button>
                </div>
            </Box>
        </>

        const confirmPasswordView = 
        <>  
            <Box className="signup-container">
                <Typography variant = "h1" align="center" className="console-header">Confirm your Password</Typography>
                <TextField id="confirmPass" value={this.state.user.confirmPass} type="password" name="confirmPass" label="Confirm Password" variant="standard" onChange={(e) => this.handleSetData(e)} />
                <div className="form-controls">
                    <Button color="secondary" size="large" onClick={() => this.setPhase(6)}>Back</Button>
                    <Button color="secondary" size="large" onClick={() => this.handleSubmitUser()} disabled= {this.state.user.password !== this.state.user.confirmPass ? true: false }>Finish</Button>
                </div>
            </Box>
        </>


        const finishedView = 
        <>  
            <Box className="signup-container">
                <Typography variant = "h1" align="center" className="console-header">You're all set!</Typography>
                <div className="form-controls">
                    <Link className="link" to ={(this.state.user.type === "Donor")?  "/donate" : "/partners"}>
                        <Button color="secondary" size="large" >Go to my dashboard</Button>
                    </Link>
                </div>
            </Box>
        </>
        
        let currentView;
        if (this.state.currentPhase === 0) {
            currentView = startView;
        }
        else {
            currentView = this.state.currentPhase === 1 ? nameView
            : this.state.currentPhase === 2 ? emailView
            : this.state.currentPhase === 3 ? locationView
            : this.state.currentPhase === 4 ? typeView
            : this.state.currentPhase === 5 ? additionalInfoView
            : this.state.currentPhase === 6 ? passwordView
            : this.state.currentPhase === 7 ? confirmPasswordView
            : this.state.currentPhase === 8 ? finishedView
            : null
        }
        return (
            <>
                <Container maxWidth="lg">
                    <Box
                        borderRadius="5px"
                        py={2}
                        px={0}
                    >
                        {currentView}  
                    </Box>
                </Container>
            </>
        )
    }
}


