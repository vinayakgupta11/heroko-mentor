import React from "react";
import Classes from './Footer.module.css';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({

  ColorTextSec: {
      color: "#b3b3b3"
  },
 
}));
const FooterPage = (props) => {
  const classes = useStyles();
  return (
    <Grid container className={Classes.Footer} >
      <Grid item container direction="column" sm={3} xs={12} spacing={2}>
        <Grid item>
          <Typography>
            Contact us
         </Typography>
        </Grid>

        <Typography>
          +44 345676903
         </Typography>
        <Typography>
          MyMentor@gmail.com
         </Typography>
      </Grid>

      <Grid item container sm={3} xs={12} direction="column" spacing={1} >
        <Grid item>
          <Typography>
            Customer Service
         </Typography>
        </Grid>
        <Grid item direction="column">
          <ul className={Classes.NavigationItems}>
            <li className={Classes.NavigationItem}><Link to="/" >Contact Us</Link></li>
            <li className={Classes.NavigationItem}><Link to="/" >Booking & Payment</Link></li>
            <li className={Classes.NavigationItem}> <Link to="/">Refund Policy</Link></li>
            <li className={Classes.NavigationItem}><Link to="/" >Faq</Link></li>
          </ul>
        </Grid>
      </Grid>

      <Grid item container sm={3} xs={12} direction="column" spacing={1} >
        <Grid item>
          <Typography>
            Information
         </Typography>
        </Grid>
        <Grid item direction="column">
          <ul className={Classes.NavigationItems}>
            <li className={Classes.NavigationItem}><Link to="/" >About MyMentor</Link></li>
            <li className={Classes.NavigationItem}><Link to="/" >Work With Us</Link></li>
            <li className={Classes.NavigationItem}> <Link to="/">Privacy Policy</Link></li>
            <li className={Classes.NavigationItem}><Link to="/" >Terms & Conditions</Link></li>
          </ul>
        </Grid>
      </Grid>

      <Grid item container direction="column" sm={3} xs={12} spacing={2}>
        <Grid item>
          <Typography>
            Subscribe To MyMentor Via E-mail
         </Typography>
        </Grid>
        <Grid item>
          <Typography color="primary" classes={{colorPrimary: classes.ColorTextSec }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
         </Typography>
        </Grid>
        <Grid item container direction="row" sm={9}  spacing={2}>
          <Grid item sm={9}>
            <TextField label="Email" variant="outlined" size="small" />
          </Grid>
          <Grid item sm={3}>
           <Button variant='contained'>Subscribe</Button>
          </Grid>
        </Grid>


      </Grid>

    </Grid>

  );
}

export default FooterPage;