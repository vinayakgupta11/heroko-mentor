import React, { useState, useEffect } from 'react';
import validator from 'validator';
import axios from "axios";
import { FormControl, TextField, Grid, Container, Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import Students from '../../assets/images/students.png';
import CheckCircleSharpIcon from '@material-ui/icons/CheckCircleSharp';
const Login = (props) => {
    const menteeData = {
        email: '',
        password: '',
        errorEmail: false,
        errorPass: false,
        email_error_text: null,
        password_error_text: null,

    };
    const [formData, setFormData] = useState(menteeData);
    const [EmailData, setEmailData] = useState();
    const [validEmail, setValidEmail] = useState(false);
    const [validPass, setValidPass] = useState(false);
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        HandleButton();
    }, [validEmail, validPass]);

    const HandleButton = () => {
        if (validEmail && validPass)
            setBtnDisabled(false);
    }
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = (value) => {
        setOpen(false);

    };

    const Login = () => {
        const data = {
            email: formData.email,
            password: formData.password
        }
        axios.post('/login/mentee', data)
            .then(function (response) {
                localStorage.setItem('Menteetoken', response.data.token);
                localStorage.setItem('Menteeid', response.data.user_data.id);
                props.history.push('/');
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const RedirectToMentor = () => {
        props.history.push('/mentor-login');
    }


    const handleTextChange = (event) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value
        });
    };

    const handleForgotEmail = (event) => {
        setEmailData(event.target.value);
       
    };
    const ValidatePass = () => {
        if (formData.password === "" || !formData.password) {
            setFormData({
                ...formData,
                password_error_text: null
            });
        } else {
            if (formData.password.length >= 6) {
                setValidPass(true);
                setFormData({
                    ...formData,
                    password_error_text: null,
                    errorPass: false
                });
            } else {
                setFormData({
                    ...formData,
                    password_error_text: "Your password must be at least 6 characters",
                    errorPass: true,
                });
            }
        }
    }

    const ValidateEmail = () => {
        if (formData.email === "") {
            setFormData({
                ...formData,
                email_error_text: null
            });
        } else {
            if (validator.isEmail(formData.email)) {
                setValidEmail(true);
                setFormData({
                    ...formData,
                    email_error_text: null,
                    errorEmail: false
                });
            } else {
                setFormData({
                    ...formData,
                    email_error_text: "Sorry, this is not a valid email",
                    errorEmail: true
                });
            }
        }
    }
    const ForgotPassword = () => {
        const data = {
            email: EmailData,
        }
        
        axios.post('/mentee/send-email', data)
            .then(function (response) {
                
                setOpen(false);
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    return (

        <React.Fragment>
            <Container>
                <Grid container spacing={4}>
                    <Grid item container sm={6} spacing={4} alignItems="center" style={{ alignContent: "center" }}>
                        <Grid item xs={12}>
                            <Typography color="primary" variant="h4">Login as a Mentee</Typography>
                        </Grid>

                        <Grid item xs={12} sm={9}>
                            <FormControl fullWidth margin="normal" variant="filled">
                                <TextField
                                    required
                                    id="email"
                                    label="E-mail"
                                    color="primary"
                                    variant="filled"
                                    helperText={formData.email_error_text}
                                    error={formData.errorEmail}
                                    value={formData.email}
                                    onChange={handleTextChange}
                                    onBlur={ValidateEmail}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <FormControl fullWidth margin="normal" variant="filled">
                                <TextField
                                    required
                                    id="password"
                                    label="Password"
                                    color="primary"
                                    variant="filled"
                                    helperText={formData.password_error_text}
                                    error={formData.errorPass}
                                    value={formData.password}
                                    onChange={handleTextChange}
                                    onBlur={ValidatePass}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item container justify="center" direction="column" sm={9} alignItems="center" spacing={1}>
                            <Grid item   >
                                <Button variant="contained" color="primary" disabled={btnDisabled} onClick={Login}>Login</Button>
                            </Grid>
                            <Grid item   >
                                <Button variant="text" color="primary" onClick={handleClickOpen}>Forgot Password?</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item container sm={6} spacing={2} justify='center' alignContent="center" >

                        <Grid item xs={12} sm={6}>
                            <Typography color="primary" variant="h5">Are You a Mentor?</Typography>
                        </Grid>

                        <Grid item xs={12} sm={9}>
                            <img alt="complex" src={Students} style={{ maxWidth: "75%" }} />
                        </Grid>

                        <Grid item xs={12} sm={6} >
                            <Button variant="text" color="primary" onClick={RedirectToMentor}>Login here</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>

            <Dialog
                open={open}
                onClose={handleClose}>
                <DialogTitle disableTypography style={{ backgroundColor: 'beige' }}>
                    <div style={{ display: 'flex' }}>
                        < CheckCircleSharpIcon color="primary" style={{ width: '2em', height: '3em', paddingRight: '10px' }} />
                        <h2>Enter The Email To Get The Reset Link</h2>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText >
                        <FormControl fullWidth margin="normal" variant="filled">
                            <TextField
                                required
                                id="Forgotemail"
                                label="E-mail"
                                color="primary"
                                variant="filled"
                                value={EmailData}
                                onChange={handleForgotEmail}
                            />
                        </FormControl>
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Button onClick={() => handleClose('close')} color="primary" variant='outlined'>
                        Close
                      </Button>

                    <Button onClick={ForgotPassword} color="primary" variant='outlined'>
                        Send Reset Link
                       </Button>


                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}
export default Login;