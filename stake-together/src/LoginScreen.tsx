import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Stake Together
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide(props: any) {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const onEmailChange = (email: string) => {
      setEmail(email);
  }
  const [password, setPassword] = useState('');
  const onPasswordChange = (password: string) => {
      setPassword(password);
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onBlur={ (e) => {
                  onEmailChange(e.target.value);
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onBlur={ (e) => {
                  onPasswordChange(e.target.value);
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Grid container>
              <Grid item xs>
                <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                style={{width: '80%'}}
                onClick={ () => {
                    let xhr = new XMLHttpRequest();
                    console.log("hello");
                    xhr.addEventListener('load', () => {
                        console.log(xhr.responseText);
                    })
                    xhr.open('POST', 'http://staketogether.org/users/add_user');
                    xhr.send(JSON.stringify({ username: {email}, password: {password}}));
                }}
                >
                Register
                </Button>
              </Grid>
              <Grid item xs>
                <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                style={{width: '80%'}}
                onClick={ () => {
                    let xhr = new XMLHttpRequest();
                    console.log("hello");
                    xhr.addEventListener('load', () => {
                        console.log(xhr.responseText);
                    })
                    xhr.open('POST', 'http://staketogether.org/users/check_password');
                    xhr.send(JSON.stringify({ username: {email}, password: {password}}));
                }}
                >
                Sign In
                </Button>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}