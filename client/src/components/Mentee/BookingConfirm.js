import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Done from '../../assets/images/Done.svg';
import Meeting from '../../assets/images/MeetingSchedule.svg';

const useStyles = makeStyles((theme) => ({
    imgMentee: {
        maxWidth: '80%'
    },
    imgGrad: {
        maxWidth: '70%'
    }
}));
const Booking = (props) => {
    const { history } = props;
    const classes = useStyles();
    return (
        <Container>

            <Grid container spacing={4}>
                <Grid item container direction="column" spacing={2}>
                    <Grid item>
                        <Typography color="primary" variant="h5">Congratulations, Everything is done</Typography>
                    </Grid>
                    <Grid item>
                        <Typography color="primary" variant="h6">Just relax and wait for the slot</Typography>
                    </Grid>
                    <Grid item>
                        <Typography color="primary" variant="h6">We will send you a confirmation email with the meeting link</Typography>
                    </Grid>
                </Grid>

                <Grid item container spacing={2}>
                    <Grid item sm={2}>
                        <Button variant="contained" color="primary" >Reschedule</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" >Proceed</Button>
                    </Grid>
                </Grid>


                <Grid item container spacing={2}>
                    <Grid item container sm={6} xs={12} >
                        <Grid item>
                            <img alt="complex" src={Done} className={classes.imgMentee} />
                        </Grid>
                    </Grid>

                    <Grid item container sm={6} xs={12} justify="center" alignContent="center">
                        <Grid item   >
                            <img alt="complex" src={Meeting} className={classes.imgGrad} />
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
        </Container>
    )
}
export default Booking;