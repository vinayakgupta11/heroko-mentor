import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import MentorSignup from './components/Mentor/SignUp';
import MentorLogin from './components/Mentor/Login';
import MenteeSignup from './components/Mentee/SignUp';
import MenteeLogin from './components/Mentee/Login';
import FindMentor from './components/Find-My-Mentor/FindMentor';
import Home from './components/Home/Home';
import MentorProfile from './components/Mentor/Profile';
import Dashboard from './components/Mentor/Dashboard';
import MenteeReq from './components/Mentee/Request'
import BookingSlot from './components/Mentee/BookingConfirm';
import MenteeReset from './components/Mentee/ResetPassword';
import MentorReset from './components/Mentor/ResetPassword';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


const App = (props) => {

  const [open, setOpen] = useState(false);
  const [messageKey, setMessageKey] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleShowMessage = (text, type) => {
    setMessageKey(new Date().getTime());

    if (text === 'Error undefined: undefined') {
      setMessageText('You do not have permission to access this App');
      setMessageType(type);
      setOpen(true);
    } else {
      setMessageText(text);
      setMessageType(type);
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  let routes = (

    <Switch>
      <Route path="/mentor-register" render={(props) => (<MentorSignup {...props} onMessage={handleShowMessage} />)} />
      <Route path="/mentee-register" render={(props) => (<MenteeSignup {...props} onMessage={handleShowMessage} />)} />
      <Route path="/mentee-login" render={(props) => (<MenteeLogin {...props} onMessage={handleShowMessage} />)} />
      <Route path="/mentor-login" exact render={(props) => (<MentorLogin {...props} onMessage={handleShowMessage} />)} />
      <Route path="/mentor-profile" render={(props) => (<MentorProfile {...props} onMessage={handleShowMessage} />)} />
      <Route path="/book-slot" component={BookingSlot} />
      <Route path="/auth/mentor-dashboard" component={Dashboard} />
      <Route path="/mentee-req"  render={(props) => (<MenteeReq {...props} onMessage={handleShowMessage} />)} />
      <Redirect exact from="/find-mentor" to="/find-mentor/all" />
      <Route path="/find-mentor/:page?" exact component={FindMentor} />
      <Route path="/resetpassword/mentee/:resetToken?" render={(props) => (<MenteeReset {...props} onMessage={handleShowMessage} />)} />
      <Route path="/resetpassword/mentor/:resetToken?" render={(props) => (<MentorReset {...props} onMessage={handleShowMessage} />)} />
      <Route path="/" exact component={Home} />
      <Redirect to="/" />

    </Switch>

  );
  return (
    <React.Fragment>

      <Layout >
        <Snackbar key={messageKey} open={open} autoHideDuration={6000} onClose={handleClose}>
          <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity={messageType}>
            {messageText}
          </MuiAlert>
        </Snackbar>
        {routes}
      </Layout>
    </React.Fragment>

  );
}

export default App;
