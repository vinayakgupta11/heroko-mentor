import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Button, Typography, Grid, Container, Paper, Avatar, Popper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import { Link } from 'react-router-dom';
import TwitterIcon from '@material-ui/icons/Twitter';
import PublicIcon from '@material-ui/icons/Public';
import InstagramIcon from '@material-ui/icons/Instagram';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CheckCircleSharpIcon from '@material-ui/icons/CheckCircleSharp';
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#F1F9FF'
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    paper: {
        border: '1px solid',
        padding: theme.spacing(1),
        backgroundColor: "#2699FB",
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

const CardDesign = (props) => {
    const theme = useTheme();
    const isTablet = useMediaQuery(theme.breakpoints.down('sm'));
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
    const classes = useStyles();
    const avatarImage = props.name.toUpperCase().split('');
    const Mentortoken = localStorage.getItem('Mentortoken');
    const Menteetoken = localStorage.getItem('Menteetoken');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = useState(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        if (anchorEl) {
            setTimeout(() => {
                setAnchorEl(null);
            }, 2000);
        }
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = (value) => {
        setOpen(false);

    };

    const openPopper = Boolean(anchorEl);
    const bookCall = () => {
        if (Mentortoken) {
            return (
                <React.Fragment>
                    <Grid item >
                        <Button onClick={handleClick} classes={{ containedPrimary: classes.successBtn }} variant="contained" color="primary" >Book a session</Button>
                    </Grid>
                    <Grid item >
                        <Button onClick={handleClick} variant="contained" color="primary" >View Profile</Button>
                    </Grid>
                    <Popper placement="right" open={openPopper} anchorEl={anchorEl}>
                        <div className={classes.paper}>Only Mentee Can Book a Call.</div>
                    </Popper>
                </React.Fragment>
            )
        }
        else if (Menteetoken) {
            return (
                <React.Fragment>
                    <Grid item >
                        <Link to={{
                            pathname: '/auth/mentor-dashboard',
                            state: {
                                id: props.keyId
                            }
                        }} style={{ textDecoration: "none" }}>
                            <Button classes={{ containedPrimary: classes.successBtn }} variant="contained" color="primary" >Book a session</Button>
                        </Link>

                    </Grid>
                    <Grid item >
                        <Link to={{
                            pathname: '/auth/mentor-dashboard',
                            state: {
                                id: props.keyId
                            }
                        }} style={{ textDecoration: "none" }}>
                            <Button variant="contained" color="primary" >View Profile</Button>
                        </Link>
                    </Grid>
                </React.Fragment>
            )
        }
        else {
            return (
                <React.Fragment>
                    <Grid item >
                        <Button onClick={handleClickOpen} classes={{ containedPrimary: classes.successBtn }} variant="contained" color="primary" >Book a session</Button>
                    </Grid>
                    <Grid item >
                        <Button onClick={handleClickOpen} variant="contained" color="primary" >View Profile</Button>
                    </Grid>

                    <Dialog
                        open={open}
                        onClose={handleClose}>
                        <DialogTitle disableTypography style={{ backgroundColor: 'beige' }}>
                            <div style={{ display: 'flex' }}>
                                < CheckCircleSharpIcon color="primary" style={{ width: '2em', height: '3em', paddingRight: '10px' }} />
                                <h2>You Don't Have Access To Book a Call</h2>
                            </div>
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText >
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <h2>Please Register With My-Mentor Or Login With Your Credentials</h2>
                                </div>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <Button onClick={() => handleClose('close')} color="primary" variant='outlined'>
                                Close
                        </Button>
                            <Link to={{
                                pathname: '/mentee-login',
                            }} style={{ textDecoration: "none" }}>
                                <Button onClick={() => handleClose('close')} color="primary" variant='outlined'>
                                    Login
                        </Button>
                            </Link>

                        </DialogActions>
                    </Dialog>
                </React.Fragment>
            )
        }


    }
    return (

        <Container style={{ marginBottom: "40px" }}>
            {isTablet ? (
                <Grid container sm={12} spacing={2}>
                    <Grid container sm={10} xs={12} >
                        <Paper style={{ display: "flex", flexDirection: 'column' }} classes={{ root: classes.root }}>
                            <Container>
                                <Grid item container direction="row" style={{ marginTop: "15px", marginBottom: "15px" }} spacing={1}>
                                    <Grid item sm={2} xs={6}>
                                        <Avatar src="" className={classes.large} >
                                            <Typography color="primary" >{avatarImage[0]}{avatarImage[1]}</Typography>
                                        </Avatar>
                                    </Grid>
                                    <Grid item sm={4} xs={6} style={{ alignSelf: 'center' }}>
                                        <Typography color="primary" variant="h6">{props.name}</Typography>
                                    </Grid>
                                    <Grid item sm={6} xs={12} spacing={4} style={{ alignSelf: 'center' }}>
                                        <Typography color="primary" variant="h6">{props.position}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item container xs={12} sm={12} direction="row" justify="space-between">
                                    <Grid item>
                                        {props.skills && props.skills[0] ? <Typography color="primary" className={classes.borderStyling} >{props.skills[0]}</Typography> : null}
                                    </Grid>
                                    <Grid item>
                                        {props.skills && props.skills[1] ? <Typography color="primary" className={classes.borderStyling} >{props.skills[1]}</Typography> : null}
                                    </Grid>
                                    {!isMobile ? (<Grid item>
                                        {props.skills && props.skills[2] ? <Typography color="primary" className={classes.borderStyling}>{props.skills[2]}</Typography> : null}
                                    </Grid>) : null}
                                </Grid>

                                <Grid item sm={12} style={{ marginTop: '10px' }}>
                                    <Typography color="primary" >{props.bio}</Typography>
                                </Grid>
                                <Grid item container direction="row" style={{ margin: "15px 0 15px 0" }}>
                                    <Grid item container sm={6} xs={12} direction="row" justify="space-between">
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
                                    <Grid container item sm={6} xs={12} className={classes.paymentDir}>
                                        <Typography color="primary" variant="h6">{props.price}/hour</Typography>
                                    </Grid>
                                </Grid>
                            </Container>
                        </Paper>
                    </Grid>

                    <Grid item container xs={12} sm={2} direction="row" justify="center" alignItems="center" spacing={2}>
                        {bookCall()}
                    </Grid>
                </Grid>
            )
                :


                (<Grid container sm={12}>
                    <Grid item sm={2} container justify="flex-end" alignContent="center">
                        <Avatar src="" className={classes.large} >
                            <Typography color="primary" variant="h2">{avatarImage[0]}{avatarImage[1]}</Typography>
                        </Avatar>
                    </Grid>
                    <Grid item sm={6} >
                        <Paper style={{ display: "flex", flexDirection: 'column', minHeight: "200px" }} classes={{ root: classes.root }}>
                            <Container>
                                <Grid item container direction="row" style={{ marginTop: "15px" }}>
                                    <Grid item sm={4} >
                                        <Typography color="primary" variant="h6">{props.name}</Typography>
                                    </Grid>
                                    <Grid item container sm={8} direction="row" justify="space-evenly">
                                        <Grid item>
                                            {props.skills && props.skills[0] ? <Typography color="primary" className={classes.borderStyling}>{props.skills[0]}</Typography> : null}
                                        </Grid>
                                        <Grid item>
                                            {props.skills && props.skills[1] ? <Typography color="primary" className={classes.borderStyling}>{props.skills[1]}</Typography> : null}
                                        </Grid>
                                        <Grid item>
                                            {props.skills && props.skills[2] ? <Typography color="primary" className={classes.borderStyling} >{props.skills[2]}</Typography> : null}
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item sm={12}>
                                    <Typography color="primary" variant="h6">{props.position}</Typography>
                                </Grid>
                                <Grid item sm={12} >
                                    <Typography color="primary" >{props.bio}</Typography>
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
                                    <Grid container item sm={6} justify="flex-end">
                                        <Typography color="primary" variant="h6">{props.price}/hour</Typography>
                                    </Grid>
                                </Grid>
                            </Container>
                        </Paper>
                    </Grid>
                    <Grid item container sm={4} direction="column" justify="center" alignItems="center" spacing={2}>
                        {bookCall()}
                    </Grid>
                </Grid>)}
        </Container>
    )
}
export default CardDesign;