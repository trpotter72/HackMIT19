import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PageEnum from './PageEnum';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontSize: '35px',
  },
}));

export default function ButtonAppBar(props: any) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            
          </IconButton>
          <Typography variant="h6" className={classes.title} onClick={ () => {
            props.onPageChange(PageEnum.HOME);
          }}>
            Stake Together
          </Typography>
          <Button color="inherit" onClick={ () => {
            props.onPageChange(PageEnum.LOGIN);
          }}>Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}