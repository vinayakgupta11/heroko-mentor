import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Button, Typography, Grid, Container, Paper, Avatar } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import PublicIcon from '@material-ui/icons/Public';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Loader from '../../hoc/Loader';
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

const Dashboard = (props) => {
    const [loading, setLoading] = useState(true);
    let FinalDateTime = [];
    const MentorId = props.location.state.id;
    const Mentortoken = localStorage.getItem('Mentortoken');
    const Menteetoken = localStorage.getItem('Menteetoken');
    const MenteeId = localStorage.getItem('Menteeid')
    const theme = useTheme();
    const isTablet = useMediaQuery(theme.breakpoints.down('sm'));
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
    const classes = useStyles();

    useEffect(() => {
        getMentorData();
    }, []);
    const [MentorData, setMentorData] = useState();
    const [CallData, setCallData] = useState();
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
    const getMentorData = () => {
        let headers;
        if (Menteetoken) {
            headers = {
                'Content-Type': 'application/json',
                'token': Menteetoken
            };
        }
        else if (Mentortoken) {
            headers = {
                'Content-Type': 'application/json',
                'token': Mentortoken
            };
        }
        axios.get('/mentor/' + MentorId, {
            headers: headers
        })
            .then(function (response) {
              
                const avatarImage = response.data.user_data.name.toUpperCase().split('');
                let bookedSlotsFinal = [];
                let TotalSlotsFinal=[];
                for (let i = 0; i < response.data.booked_slot.length; i++) {
                    const check = (response.data.booked_slot[i].dates_time);
                   let str = check.replace('"', '');
                    str = str.replace('"', '');
                    bookedSlotsFinal.push(str);
                }
                for (let i = 0; i < response.data.user_data.date_time.length; i++) {

                    const check = (response.data.user_data.date_time[i]);
                    let str = check.substring(check.indexOf(':') + 1);
                    str = str.replace('}', '');
                    str = str.replace('"', '');
                    str = str.replace('"', '');
                    TotalSlotsFinal.push(str);
                }
                var filteredslots = TotalSlotsFinal.filter((word) => !bookedSlotsFinal.includes(word));
               
                for (let i = 0; i < filteredslots.length; i++) {
                   let str = new Date(filteredslots[i])
                    let yr = str.getFullYear();
                    let mn = str.getMonth();
                    let dt = str.getDate();
                    let hr = str.getHours();
                    let min = str.getMinutes();
                    FinalDateTime.push({ year: yr, month: mn + 1, date: dt, hour: hr, min: min, databaseDate: str, status: false });
                }

                const mentorData = {
                    name: capitalize(response.data.user_data.name),
                    jobTitle: response.data.user_data.job_title,
                    bio: response.data.user_data.bio,
                    company: response.data.user_data.company,
                    tags: response.data.user_data.tags,
                    dateTime: FinalDateTime,
                    image: avatarImage
                };
                setMentorData(mentorData)
                setLoading(false);
               

            })
            .catch(function (error) {
                console.log(error);
            });

    }
    const onSelectSlot = (event, index, id) => {
        const calldata = {
            mentor_id: MentorId,
            mentee_id: MenteeId,
            dates_time: JSON.stringify(index.databaseDate),
            booking_status: "pending"
        }
      
        const dataSlot = { ...MentorData };
        for (let i = 0; i < dataSlot.dateTime.length; i++) {
            if (i !== id) {
                dataSlot.dateTime[i].status = false;
            }
        }
        dataSlot.dateTime[id].status = true;
        setMentorData(dataSlot);
        setCallData(calldata);
    }
    const SlotBooked = () => {
      
        let headers;
        if (Menteetoken) {
            headers = {
                'Content-Type': 'application/json',
                'token': Menteetoken
            };
        }
        else if (Mentortoken) {
            headers = {
                'Content-Type': 'application/json',
                'token': Mentortoken
            };
        }

        axios.post('/call', CallData, {
            headers: headers
        })
            .then(function (response) {
               
                props.history.push('/book-slot');

            })
            .catch(function (error) {
                console.log(error);
            });
    }


    const renderSlots = () => {
        return MentorData.dateTime.map((date, id) => {
            if (date.min.toString().length === 1) {
                return (
                    <Grid item style={{ cursor: 'pointer' }}>
                        <Button
                            disabled={date.status}
                            color="primary"
                            onClick={e => onSelectSlot(e, date, id)}
                            className={classes.borderStyling} >
                            {date.year}/{date.month}/{date.date}-{'   '}{date.hour}:0{date.min} - {(date.hour) + 1}:0{date.min}</Button>
                    </Grid>
                )
            }
            else if (date.min.toString().length !== 1) {
                return (
                    <Grid item style={{ cursor: 'pointer' }}>
                        <Button
                            disabled={date.status}
                            onClick={e => onSelectSlot(e, date, id)}
                            color="primary" className={classes.borderStyling} >{date.year}/{date.month}/{date.date}-{'   '}{date.hour}:{date.min} - {(date.hour) + 1}:{date.min}</ Button>
                    </Grid>
                )
            }
        });
    };


    return (
        loading ? <Loader/> :  (<Container style={{ marginBottom: "40px" }}>
        {isTablet ? (
            <Grid container sm={12} spacing={2}>
                <Grid container sm={12} xs={12} >
                    <Paper style={{ display: "flex", flexDirection: 'column' }} classes={{ root: classes.root }}>
                        <Container>
                            <Grid item container direction="row" style={{ marginTop: "15px", marginBottom: "15px" }} spacing={1}>
                                <Grid item sm={2} xs={6}>
                                    <Avatar src="" className={classes.large} >
                                        <Typography color="primary" >{MentorData.image[0]}{MentorData.image[1]}</Typography>
                                    </Avatar>
                                </Grid>
                                <Grid item sm={4} xs={6} style={{ alignSelf: 'center' }}>
                                    <Typography color="primary" variant="h6">{MentorData.name}</Typography>
                                </Grid>
                                <Grid item sm={6} xs={12} spacing={4} style={{ alignSelf: 'center' }}>
                                    <Typography color="primary" variant="h6">{MentorData.jobTitle} At {MentorData.company}</Typography>
                                </Grid>
                            </Grid>
                            <Grid item container xs={12} sm={12} direction="row" justify="space-between">
                                <Grid item>
                                    {MentorData.tags && MentorData.tags[0] ? <Typography color="primary" className={classes.borderStyling}>{MentorData.tags[0]}</Typography> : null}
                                </Grid>
                                <Grid item>
                                    {MentorData.tags && MentorData.tags[1] ? <Typography color="primary" className={classes.borderStyling}>{MentorData.tags[1]}</Typography> : null}
                                </Grid>
                                {!isMobile ? (<Grid item>
                                    {MentorData.tags && MentorData.tags[2] ? <Typography color="primary" className={classes.borderStyling}>{MentorData.tags[2]}</Typography> : null}
                                </Grid>) : null}
                            </Grid>

                            <Grid item sm={12} style={{ marginTop: '10px' }}>
                                <Typography color="primary" >{MentorData.bio}</Typography>
                            </Grid>
                            <Grid item container direction="row" style={{ margin: "15px 0 15px 0" }}>
                                <Grid item container sm={8} xs={12} direction="row" justify="space-between">
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
                                    <Grid item>
                                        <LinkedInIcon />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item sm={12} style={{ marginTop: '30px' }}>
                                <Typography color="primary" variant="h6" >Slots Available</Typography>
                            </Grid>
                            <Grid item container sm={12} direction="row" spacing={2} style={{ marginBottom: '30px', marginTop: "10px" }}>
                                <Grid item container sm={12} justify="space-between" spacing={2}>
                                    {renderSlots()}
                                </Grid>
                                <Grid item sm={12} style={{ paddingLeft: "10%" }}>
                                    <Button variant="contained" color="primary" onClick={SlotBooked}>Book</Button>
                                </Grid>
                            </Grid>
                        </Container>
                    </Paper>
                </Grid>
            </Grid>
        )
            :


            (<Grid container sm={12} justify="center">
                <Grid item sm={2} container justify="flex-end" alignContent="center">
                    <Avatar src="" className={classes.large} >
                        <Typography color="primary" variant="h2">{MentorData.image[0]}{MentorData.image[1]}</Typography>
                    </Avatar>
                </Grid>
                <Grid item sm={8} >
                    <Paper style={{ display: "flex", flexDirection: 'column' }} classes={{ root: classes.root }}>
                        <Container>
                            <Grid item container direction="row" style={{ marginTop: "15px" }}>
                                <Grid item sm={4} >
                                    <Typography color="primary" variant="h6">{MentorData.name}</Typography>
                                </Grid>
                                <Grid item container sm={8} direction="row" justify="space-evenly">
                                    <Grid item>
                                        {MentorData.tags && MentorData.tags[0] ? <Typography color="primary" className={classes.borderStyling}>{MentorData.tags[0]}</Typography> : null}
                                    </Grid>
                                    <Grid item>
                                        {MentorData.tags && MentorData.tags[1] ? <Typography color="primary" className={classes.borderStyling}>{MentorData.tags[1]}</Typography> : null}
                                    </Grid>
                                    <Grid item>
                                        {MentorData.tags && MentorData.tags[2] ? <Typography color="primary" className={classes.borderStyling}>{MentorData.tags[2]}</Typography> : null}
                                    </Grid>

                                </Grid>
                            </Grid>

                            <Grid item sm={12}>
                                <Typography color="primary" variant="h6">{MentorData.jobTitle} At {MentorData.company}</Typography>
                            </Grid>
                            <Grid item sm={12} >
                                <Typography color="primary" >{MentorData.bio}</Typography>
                            </Grid>
                            <Grid item container direction="row" style={{ margin: "15px 0 15px 0" }}>
                                <Grid item container sm={8} xs={6} direction="row" justify="space-between">
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
                                    <Grid item>
                                        <LinkedInIcon />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item sm={12} style={{ marginTop: '30px' }}>
                                <Typography color="primary" variant="h6" >Slots Available</Typography>
                            </Grid>


                            <Grid item container sm={12} direction="row" style={{ marginBottom: '30px', marginTop: "10px" }}>
                                <Grid item container sm={8} justify="space-between" spacing={2}>
                                    {renderSlots()}
                                </Grid>
                                <Grid item sm={4} style={{ paddingLeft: "10%" }}>
                                    <Button variant="contained" color="primary" onClick={SlotBooked}>Book</Button>
                                </Grid>
                            </Grid>
                        </Container>
                    </Paper>
                </Grid>
            </Grid>)}
    </Container>)

    )
}
export default Dashboard;