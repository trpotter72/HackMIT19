import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import { ListItemIcon } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: 400,
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
    paddingTop: '40px',
  },
}));

function Row(props: any) {
  const { index, style } = props;

  return (
    <ListItem button style={style} key={index}>
      <ListItemText primary={`Investor Name`} secondary={`Investment Amount`}/>
      <ListItemIcon>
        <img src='https://media.gettyimages.com/photos/exterior-of-new-suburban-house-picture-id171246403?s=2048x2048' alt="" style={{float: 'left', height: '30px', paddingTop: '5px', paddingBottom: '5px', paddingLeft: '5px', paddingRight: '5px'}}></img>
      </ListItemIcon>
    </ListItem>
  );
}

Row.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};

export default function VirtualizedList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FixedSizeList height={400} width={400} itemSize={60} itemCount={10}>
        {Row}
      </FixedSizeList>
    </div>
  );
}