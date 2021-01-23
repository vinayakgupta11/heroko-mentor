import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import mentee from '../../assets/images/Home-1.svg'
import SelectMentor from '../../assets/images/mentee.jpg'
import Grads from '../../assets/images/college_grads.png'
import MentorList from '../../assets/images/Mentor-list.png'
import Calender from '../../assets/images/Calender.svg'
import Students from '../../assets/images/students.png'
import TikTok from '../../assets/images/tik-tok.jpg'
import Google from '../../assets/images/google.jpg'
import Fb from '../../assets/images/facebook.png'
import PayPal from '../../assets/images/pay-pal.png'
const useStyles = makeStyles((theme) => ({
    imgMentee: {
        maxWidth: '100%',
        maxHeight: '100%',
    },
    imgGrad: {
        maxWidth: '70%',
        maxHeight: '100%',
    },
    GridSpacingPb: {
        paddingBottom: 0
    },

    GridSpacingPt: {
        paddingTop: 0
    },
    imgFb:{
       maxWidth:'50%'
    }
}));
const Home = (props) => {
    const { history } = props;
    const classes = useStyles();
    const handleButtonClick = (pageUrl) => {
        history.push(pageUrl)
    }
    return (
        <Container>

            <Grid container spacing={4}>
                <Grid container item spacing={2}>
                    <Grid item container sm={4} xs={12} direction="column" spacing={3}>
                        <Grid item>
                            <Typography color="primary" variant="h4">Find Your Mentor</Typography>
                        </Grid>
                        <Grid item>
                            <Typography color="primary" variant="h6">Connect  with them, learn from them</Typography>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" onClick={() => handleButtonClick('/find-mentor')}>Find My Mentor</Button>
                        </Grid>
                    </Grid>

                    <Grid item container sm={4} xs={12} direction="column">
                        <Grid item>
                            <img alt="complex" src={mentee} className={classes.imgMentee} />
                        </Grid>
                    </Grid>

                    <Grid item container sm={4} xs={12} direction="column" alignItems="center">
                        <Grid item   >
                            <img alt="complex" src={Grads} className={classes.imgGrad} />
                        </Grid>
                    </Grid>
                </Grid>




                <Grid item xs={12} style={{ paddingBottom: "0" }}>
                    <Typography color="primary" variant="h4">Your Mentors</Typography>
                </Grid>

                <Grid item xs={12} style={{ paddingBottom: "0" }} >
                    <img alt="complex" src={MentorList} className={classes.imgMentee} />
                </Grid>

                <Grid item container justify="center" style={{ paddingTop: "0" }}>
                    <Grid item  >
                        <Button variant="contained" color="primary"  onClick={() => handleButtonClick('/find-mentor')}>Find My Mentor</Button>
                    </Grid>
                </Grid>



                <Grid item xs={12}>
                    <Typography color="primary" variant="h4">How it Works</Typography>
                </Grid>






                <Grid container item spacing={4}>
                    <Grid item container sm={4} xs={12} direction="column" spacing={1}>
                        <Grid item>
                            <Typography color="primary" variant="h6">Explore our curated list of mentors</Typography>
                        </Grid>
                        <Grid item>
                            <Typography color="primary" >Explore our curated list of mentors who can guide what you need</Typography>
                        </Grid>
                        <Grid item>
                            <Typography color="primary" >My Mentors</Typography>
                        </Grid>
                        <Grid item alignItems="center">
                            <img alt="complex" src={SelectMentor} className={classes.imgMentee} />
                        </Grid>
                    </Grid>

                    <Grid item container sm={4} xs={12} direction="column" spacing={1}>
                        <Grid item>
                            <Typography color="primary" variant="h6">Select a Mentor and Connect</Typography>
                        </Grid>
                        <Grid item>
                            <Typography color="primary" >Book a slot with a mentor based on your requirement</Typography>
                        </Grid>
                        <Grid item alignItems="center">
                            <img alt="complex" src={Calender} className={classes.imgMentee} />
                        </Grid>

                    </Grid>

                    <Grid item container sm={4} xs={12} direction="column" spacing={1}>
                        <Grid item>
                            <Typography color="primary" variant="h6">Enkoy the session</Typography>
                        </Grid>
                        <Grid item>
                            <Typography color="primary" >Join a session with your mentor and enjoy the learnings</Typography>
                        </Grid>
                        <Grid item alignItems="center">
                            <img alt="complex" src={Students} className={classes.imgMentee} />
                        </Grid>
                    </Grid>
                </Grid>



                <Grid item xs={12} style={{ paddingBottom: "0" }}>
                    <Typography color="primary" variant="h4">Your Mentors Works at:</Typography>
                </Grid>

                <Grid item xs={12} style={{ paddingTop: "0" }}>
                    <Typography color="primary" >Get Mentored by Industry Experts</Typography>
                </Grid>




                <Grid container item spacing={2}>
                    <Grid item container sm={3} xs={12} direction="column" alignItems="center">
                        <Grid item   >
                            <img alt="complex" src={Fb} className={classes.imgFb} />
                        </Grid>
                    </Grid>

                    <Grid item container sm={3} xs={12} direction="column">
                        <Grid item>
                            <img alt="complex" src={PayPal} className={classes.imgGrad} />
                        </Grid>
                    </Grid>

                    <Grid item container sm={3} xs={12} direction="column" alignItems="center">
                        <Grid item   >
                            <img alt="complex" src={Google} className={classes.imgFb} />
                        </Grid>
                    </Grid>

                    <Grid item container sm={3} xs={12} direction="column" alignItems="center">
                        <Grid item   >
                            <img alt="complex" src={TikTok} className={classes.imgGrad} />
                        </Grid>
                    </Grid>
                </Grid>


            </Grid>
        </Container>
    )
}
export default Home;