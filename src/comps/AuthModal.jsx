import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import Progressbar from './Progressbar';
import { projectAuth } from '../firebase/config';


function AuthModal({ user, setCurrentUser }) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [opensignin, setSignInOpen] = useState(false);
  //   set states for username,mail and pass
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let errors = false;


  // states for utility
  const [eventfired, setEventFired] = useState(false);

  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setCurrentUser(authUser);
      } else {
        setCurrentUser(null);
      }

    });

    return () => unsub();

  }, [user, setCurrentUser]);

  // clean states
  const resetStates = () => {
    setUsername("");
    setEmail("");
    setPassword("");
  }


  // signup function
  const signUp = (e) => {
    e.preventDefault();
    //  username validation
    if (username.length < 1 || password.length < 1 || email.length < 1) {
      alert('must have a userName,mail and password');
    }
    else {
      setEventFired(true);
      setTimeout(() => {
        projectAuth.createUserWithEmailAndPassword(email, password)
          .then(authUser => {
            return authUser.user.updateProfile({
              displayName: username,
            });
          })
          .catch(error => {
            alert(error.message);
            errors = true;
          });
      }, 1000);

      setTimeout(() => {
        if (errors) {
          setOpen(true);
          errors = false;
        } else {
          setOpen(false);
          alert('Successfully logged In');
          resetStates();
        }
      }, 2000)

    }


  }
  //log in function
  const logIn = (e) => {
    e.preventDefault();
    setEventFired(true);
    //  timeout for the progressbar
    setTimeout(() => {
      projectAuth.signInWithEmailAndPassword(email, password)
        .then(() => alert("Successfully Logged In!"))
        .catch(error => alert(error.message));
      setSignInOpen(false);
      resetStates();
    }, 1000)


  }




  return (
    <div className="auth-modals">
      {user ? (<Button onClick={() => projectAuth.signOut()}>Log out</Button>)
        : (
          <div>
            <Button onClick={() => setSignInOpen(true)}>Log In</Button>
            <Button onClick={() => setOpen(true)}>Register</Button>
          </div>

        )
      }

      {/* regModal */}
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setEventFired(false);
          resetStates();
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="form-signup">
            <center>
              <img
                className="site-header-logo"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="insta-logo" />
            </center>
            <Input
              placeholder='username'
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder='email'
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder='password'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}

            />
            <Button
              type='submit'
              variant='contained'
              color='secondary'
              onClick={signUp}
              style={{ width: '100px', margin: '20px auto' }}
            >Sign Up
                        </Button>
          </form>
          {eventfired && <Progressbar fired={eventfired} setEventFired={setEventFired} />}
        </div>
      </Modal>

      {/* login modal */}
      <Modal
        open={opensignin}
        onClose={() => {
          setSignInOpen(false);
          setEventFired(false);
          resetStates();
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="form-signup">
            <center>
              <img
                className="site-header-logo"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="insta-logo" />

            </center>
            <Input
              placeholder='email'
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder='password'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}

            />
            <Button
              type='submit'
              variant='contained'
              color='secondary'
              onClick={logIn}
              style={{ width: '100px', margin: '20px auto' }}
            >Log In
                        </Button>
          </form>
          {eventfired && <Progressbar fired={eventfired} setEventFired={setEventFired} />}
        </div>
      </Modal>

    </div>
  );
}






// modal stylings
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    fontFamily: 'Cairo',
    outline: 'none',
  },
}));



export default AuthModal;