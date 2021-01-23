import React, { useState } from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import { FormControl, TextField, Grid, Container, Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';

const Reset = (props) => {
    let { resetToken } = useParams()
   
    const menteeData = {
        password: '',
        confirmPassword: '',
    };
    const [EmailData, setEmailData] = useState(menteeData);
    const [open, setOpen] = useState(false);
    const handleClose = (value) => {
        setOpen(false);
    };

    const handleTextChange = (event) => {
        setEmailData({
            ...EmailData,
            [event.target.id]: event.target.value
        });
    };

    const ResetPassword = () => {
        setOpen(true);
        const data = {
            password: EmailData.password,
        }
        let headers = {
            'Content-Type': 'application/json',
            'token': resetToken
        };
      
        axios.post('/mentor/reset-password', data, {
            headers: headers
        })
            .then(function (response) {
              
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const RedirectToLogin = () => {
        props.history.push('/mentor-login')
    }
    return (

        <React.Fragment>
            <Container style={{ minHeight: "409px" }}>
                <Grid container spacing={4} justify="center">
                    <Grid item container sm={6} spacing={4} alignItems="center" style={{ alignContent: "center" }}>
                        <Grid item xs={12}>
                            <Typography color="primary" variant="h4">Reset Mentee Password</Typography>
                        </Grid>

                        <Grid item xs={12} sm={9}>
                            <FormControl fullWidth margin="normal" variant="filled">
                                <TextField
                                    required
                                    id="password"
                                    label="Password"
                                    color="primary"
                                    variant="filled"
                                    value={EmailData.password}
                                    onChange={handleTextChange}

                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <FormControl fullWidth margin="normal" variant="filled">
                                <TextField
                                    required
                                    id="confirmPassword"
                                    label="Confirm Password"
                                    color="primary"
                                    variant="filled"
                                    value={EmailData.confirmPassword}
                                    onChange={handleTextChange}

                                />
                            </FormControl>
                        </Grid>

                        <Grid item container justify="center" direction="column" sm={9} alignItems="center" spacing={1}>
                            <Grid item   >
                                <Button variant="contained" onClick={ResetPassword} color="primary" >Reset</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>

            <Dialog
                open={open}
                onClose={handleClose}>
                <DialogContent>
                    <DialogContentText >
                        <div style={{ display: 'flex' }}>

                            <h2>Your Password Has Been Reset</h2>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Button onClick={() => handleClose('close')} color="primary" variant='outlined'>
                        Close
                      </Button>

                    <Button onClick={RedirectToLogin} color="primary" variant='outlined'>
                        Login
                       </Button>


                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}
export default Reset;