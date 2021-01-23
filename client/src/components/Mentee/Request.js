import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, Grid, Container, Dialog, Paper, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import PublicIcon from '@material-ui/icons/Public';
import InstagramIcon from '@material-ui/icons/Instagram';
import CheckCircleSharpIcon from '@material-ui/icons/CheckCircleSharp';
import axios from "axios";
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#F1F9FF'
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {


        [theme.breakpoints.down('sm')]: {
            width: theme.spacing(8),
            height: theme.spacing(8),
        },
        width: theme.spacing(25),
        height: theme.spacing(25),


    },
    successBtn: {
        backgroundColor: '#4caf50',
    },
    paymentDir: {
        justifyContent: 'flex-end',
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center'
        },
    },
    borderStyling: {
        borderWidth: '1px',
        borderStyle: 'inset',
        padding: '3px',
        backgroundColor: '#FFFFFF'
    }
}));

const MenteeReq = (props) => {
    const Mentortoken = localStorage.getItem('Mentortoken');
    const MentorId = localStorage.getItem("Mentorid");
    let headers = {
        'Content-Type': 'application/json',
        'token': Mentortoken
    };
    const classes = useStyles();
    const [SlotData, setSlotData] = useState();
    const [open, setOpen] = useState(false);
    const [slot, setSlot] = useState(false);
    useEffect(() => {
        getMenteeData();
    }, [slot]);
    const getMenteeData = () => {
        axios.get('/mentorinfo/' + MentorId, {
            headers: headers
        })
            .then(function (response) {
                if (response.data.length === 0) {
                    handleClickOpen();
                }
                else {
                    let data = [];
                    for (let i = 0; i < response.data.length; i++) {
                        let dateTime = response.data[i].call_time;
                        let eventdate = response.data[i].call_time;
                        eventdate = eventdate.replace('"', '');
                        eventdate = eventdate.replace('"', '');
                        dateTime = dateTime.replace('"', '');
                        dateTime = dateTime.replace('"', '');
                        dateTime = new Date(dateTime)
                        let mn = dateTime.getMonth();
                        let dt = dateTime.getDate();
                        let hr = dateTime.getHours();
                        let min = dateTime.getMinutes();
                        data.push({
                            callId: response.data[i].call_id,
                            DateTime: { month: mn + 1, date: dt, hour: hr, min: min },
                            name: capitalize(response.data[i].mentee_name),
                            mentorEmail: response.data[i].mentor_email,
                            menteeEmail: response.data[i].mentee_email,
                            eventDate: eventdate,
                            mentorName: capitalize(response.data[i].mentor_name),

                        });
                    }
                    setSlotData(data);
                }

            })
            .catch(function (error) {
                console.log(error);
            });

    }
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = (value) => {
        setOpen(false);
        props.history.push('/');
    };

    const onAcceptReq = (event, callId) => {
        let eventSlots = SlotData.filter(function (e) {
            return e.callId === callId;
        });

        axios.get('/menteeRequest/' + callId, {
            headers: headers
        })
            .then(function (response) {
                setSlot(!slot);
                let data = {
                    date: eventSlots[0].eventDate,
                    mentor_name: eventSlots[0].mentorName,
                    mentee_name: eventSlots[0].name,
                    mentor_email: eventSlots[0].mentorEmail,
                    mentee_email: eventSlots[0].menteeEmail
                }
                axios.post('/events', data).then(function (res) {
                }).catch(function(error){
                    console.log('err', error);
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const renderReq = () => {
        if (SlotData) {
            return SlotData.map((data, id) => {
                return (
                    <Grid container sm={12} justify="center" spacing={6}>
                        <Grid item sm={6} >
                            <Paper style={{ display: "flex", flexDirection: 'column' }} classes={{ root: classes.root }}>
                                <Container>
                                    <Grid item container direction="row" style={{ marginTop: "15px" }} justify="space-between">
                                        <Grid item sm={4} >
                                            <Typography color="primary" variant="h6">{data.name}</Typography>
                                        </Grid>
                                        <Grid item>
                                            {data.DateTime.min.toString().length === 1 ? (<Typography color="primary" className={classes.borderStyling}> {data.DateTime.date}/{data.DateTime.month}-{'   '}{data.DateTime.hour}:0{data.DateTime.min}</Typography>) :
                                                (<Typography color="primary" className={classes.borderStyling}>{data.DateTime.date}/{data.DateTime.month}-{'   '}{data.DateTime.hour}:{data.DateTime.min}</Typography>)}

                                        </Grid>
                                    </Grid>
                                    <Grid item sm={12}>
                                        <Typography color="primary" variant="h6">Student</Typography>
                                    </Grid>
                                    <Grid item sm={12} >
                                        <Typography color="primary" >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Typography>
                                    </Grid>
                                    <Grid item container direction="row" style={{ margin: "15px 0 15px 0" }}>
                                        <Grid item container sm={6} xs={6} direction="row" justify="space-between">
                                            <Grid item>
                                                <InstagramIcon />
                                            </Grid>
                                            <Grid item>
                                                <FacebookIcon />
                                            </Grid>
                                            <Grid item>
                                                <TwitterIcon />
                                            </Grid>
                                            <Grid item>
                                                <PublicIcon />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Container>
                            </Paper>
                        </Grid>
                        <Grid item container sm={4} direction="column" justify="center" alignItems="center" spacing={2}>
                            <Grid item >
                                <Button classes={{ containedPrimary: classes.successBtn }} variant="contained" color="primary" onClick={e => onAcceptReq(e, data.callId)}>Accept</Button>
                            </Grid>
                            <Grid item >
                                <Button variant="contained" color="primary" >Ask to reschedule</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                )

            });
        }
    };

    return (
        <React.Fragment>
            <Container style={{ marginBottom: "40px", minHeight: "357px" }}>
                {renderReq()}
            </Container>

            <Dialog
                open={open}
                onClose={handleClose}>
                <DialogTitle disableTypography style={{ backgroundColor: 'beige' }}>
                    <div style={{ display: 'flex' }}>
                        < CheckCircleSharpIcon color="primary" style={{ width: '2em', height: '3em', paddingRight: '10px' }} />
                        <h2>You Don't Have Any Active Mentee Request</h2>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText >
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <h2>Please Wait till someone book's a seesion with you</h2>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button onClick={() => handleClose('close')} color="primary" variant='outlined'>
                        Close
                        </Button>

                </DialogActions>
            </Dialog>
        </React.Fragment>





    )
}
export default MenteeReq;