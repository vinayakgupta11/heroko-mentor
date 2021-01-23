import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import {
    FormControl, TextField, Button, Typography, Grid, Container, Avatar, IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
} from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from "@material-ui/pickers";
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import DateFnsUtils from '@date-io/date-fns';
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#F1F9FF'
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
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
const MentorProfile = (props) => {
    const classes = useStyles();
    const menteeData = {
        jobTitle: '',
        category: '',
        pricePerSession: '',
        bio: '',
        company: '',
        tags: '',
        experience: '',
        graduatedAt: '',
        mobileNumber: '',
        timeDate: ''
    };

    useEffect(() => {
        getMentorData();
    }, []);
    const timedateData = {
        TimeDate: null,
    };
    const [selectedDate, handleDateChange] = useState([timedateData]);
    const [formData, setFormData] = useState(menteeData);
    const MenteeReq = () => {
        props.history.push('/mentee-req');
    }
    const handleTextChange = (event) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value
        });
    };

    const addDateTimePicker = () => {
        const selectedDateCopy = JSON.parse(JSON.stringify(selectedDate));
        selectedDateCopy.push({
            TimeDate: null
        });
        handleDateChange(selectedDateCopy);
    };
    const deleteDateTimePicker = (e, index) => {
        const selectedDateCopy = JSON.parse(JSON.stringify(selectedDate));
        selectedDateCopy.splice(index, 1);
        handleDateChange(selectedDateCopy);
    };
    const onDateTimeChange = (e, index) => {
        const selectedDateCopy = JSON.parse(JSON.stringify(selectedDate));
        selectedDateCopy[index].TimeDate = e;
        handleDateChange(selectedDateCopy);
    }
    const getMentorData = () => {
        const id = localStorage.getItem('Mentorid');
        const token = localStorage.getItem('Mentortoken')
        const headers = {
            'Content-Type': 'application/json',
            'token': token
        };
        axios.get('/mentor/' + id, {
            headers: headers
        })
            .then(function (response) {
               
                const menteeData = {
                    jobTitle: response.data.user_data.job_title,
                    category: response.data.user_data.category,
                    pricePerSession: response.data.user_data.price,
                    bio: response.data.user_data.bio,
                    company: response.data.user_data.company,
                    tags: response.data.user_data.tags.toString(),
                    experience: response.data.user_data.experience,
                    graduatedAt: response.data.user_data.college,
                    mobileNumber: response.data.user_data.mobile_number,
                };
                handleDateChange(response.data.user_data.date_time);
                setFormData(menteeData);

            })
            .catch(function (error) {
                console.log(error);
            });

    }
    const submitData = () => {
        const tagData = formData.tags.split(',');
        const data = {
            job_title: formData.jobTitle,
            company: formData.company,
            category: formData.category,
            tags: tagData,
            price: formData.pricePerSession,
            experience: formData.experience,
            college: formData.graduatedAt,
            bio: formData.bio,
            mobile_number: formData.mobileNumber,
            profile_picture: "",
            linkedin: "",
            date_time: (selectedDate),
        }

      
        const id = localStorage.getItem('Mentorid');
        const token= localStorage.getItem('Mentortoken');
        const headers = {
            'Content-Type': 'application/json',
            'id': id,
            'token': token
        };


        axios.post('/mentor/update', data, {
            headers: headers
        })
            .then(function (response) {
               
                props.history.push('/mentee-req');
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const renderDateTimePicker = () => {
        return selectedDate.map((Seldate, id) => {
            return (
                <ListItem disableGutters key={`${Seldate}-${id}`} >
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDateTimePicker
                            variant="inline"
                            ampm={false}
                            label="Select Slot"
                            value={Seldate.TimeDate}
                            onChange={e => onDateTimeChange(e, id)}
                            onError={console.log}
                            disablePast
                            format="yyyy/MM/dd HH:mm"
                        />
                    </MuiPickersUtilsProvider>

                    {id === 0 ? (<ListItemSecondaryAction >
                        <IconButton edge="end" onClick={addDateTimePicker}>
                            <AddIcon color="primary" />
                        </IconButton>
                    </ListItemSecondaryAction>) : null}

                    {id !== 0 ? (<ListItemSecondaryAction >
                        <IconButton edge="end" onClick={e => deleteDateTimePicker(e, id)} >
                            <DeleteIcon color="primary" />
                        </IconButton>
                    </ListItemSecondaryAction>) : null}
                </ListItem>
            )

        });
    };

    return (

        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography color="primary" >Your Profile</Typography>
                </Grid>
                <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={6} sm={1}>
                        <Avatar alt="Remy Sharp" src="/home/manish/Desktop/projectTester/src/assets/images/facebook.png" className={classes.large} />
                    </Grid>
                    <Grid item xs={6} sm={2}>
                        <Button variant="contained" color="primary" >Upload Picture</Button>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Button variant="contained" color="primary" >Import From LinkedIn</Button>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <Button variant="contained" color="primary" onClick={MenteeReq}>Check Mentee Request</Button>
                    </Grid>
                </Grid>
                <Grid item container spacing={2} sm={6}>
                    <Grid item xs={12} sm={9}>
                        <FormControl fullWidth margin="normal" variant="outlined">
                            <TextField
                                required
                                id="jobTitle"
                                label="Job Title"
                                color="primary"
                                variant="outlined"
                                value={formData.jobTitle}
                                onChange={handleTextChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <FormControl fullWidth margin="normal" variant="outlined">
                            <TextField
                                required
                                id="category"
                                label="Category"
                                color="primary"
                                variant="outlined"
                                value={formData.category}
                                onChange={handleTextChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <FormControl fullWidth margin="normal" variant="outlined">
                            <TextField
                                required
                                id="pricePerSession"
                                label="Price per Session"
                                color="primary"
                                variant="outlined"
                                value={formData.pricePerSession}
                                onChange={handleTextChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <FormControl fullWidth margin="normal" variant="outlined">
                            <TextField
                                id="bio"
                                label="Bio*"
                                multiline
                                rows={4}
                                variant="outlined"
                                value={formData.bio}
                                onChange={handleTextChange}
                            />
                        </FormControl>
                    </Grid>

                </Grid>
                <Grid item container sm={6} spacing={2}>
                    <Grid item xs={12} sm={9}>
                        <FormControl fullWidth margin="normal" variant="outlined">
                            <TextField
                                required
                                id="company"
                                label="Company"
                                color="primary"
                                variant="outlined"
                                value={formData.company}
                                onChange={handleTextChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <FormControl fullWidth margin="normal" variant="outlined">
                            <TextField
                                required
                                id="experience"
                                label="experience"
                                color="primary"
                                variant="outlined"
                                value={formData.experience}
                                onChange={handleTextChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <FormControl fullWidth margin="normal" variant="outlined">
                            <TextField
                                required
                                id="tags"
                                label="Tags"
                                color="primary"
                                variant="outlined"
                                value={formData.tags}
                                onChange={handleTextChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <FormControl fullWidth margin="normal" variant="outlined">
                            <TextField
                                required
                                id="graduatedAt"
                                label="Graduated At"
                                color="primary"
                                variant="outlined"
                                value={formData.graduatedAt}
                                onChange={handleTextChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <FormControl fullWidth margin="normal" variant="outlined">
                            <TextField
                                required
                                id="mobileNumber"
                                label="Mobile Number"
                                color="primary"
                                variant="outlined"
                                value={formData.mobileNumber}
                                onChange={handleTextChange}
                            />
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid item container justify="center" alignContent="center">
                    <List style={{ display: "contents" }}>{renderDateTimePicker()}</List>
                </Grid>


                <Grid item container justify="center" alignItems="center" sm={12}>
                    <Grid item xs={4} sm={3} >
                        <Button variant="contained" color="primary">Edit</Button>
                    </Grid>
                    <Grid item xs={4} sm={3} >
                        <Button variant="contained" color="primary" onClick={submitData} >Submit</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}
export default MentorProfile;

