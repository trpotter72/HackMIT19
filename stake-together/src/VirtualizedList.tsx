import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import { ListItemIcon } from '@material-ui/core';
import PageEnum from './PageEnum';
import Button from '@material-ui/core/Button'

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
  const addresses = props.addressData;
  let listItems = [];
  if (addresses){
    listItems = addresses.map((element : any) =>
      <ListItem button key={element.address}>
        <ListItemText primary={element.address} secondary={element.price}/>
        <ListItemIcon>
          <img src={props.image} alt="" style={{float: 'left', height: '30px', paddingTop: '5px', paddingBottom: '5px', paddingLeft: '5px', paddingRight: '5px'}}></img>
        </ListItemIcon>
      </ListItem>
    );
  }
  else {
    for (let i = 0; i < 10; i++){
      listItems.push(<ListItem button key={"Address"}>
        <ListItemText primary={"Address"} secondary={"Price"}/>
        <ListItemIcon>
          <img src="https://amp.businessinsider.com/images/5bdc87448c35ab6a120935eb-1334-1001.jpg" alt="" style={{float: 'left', height: '30px', paddingTop: '5px', paddingBottom: '5px', paddingLeft: '5px', paddingRight: '5px'}}></img>
        </ListItemIcon>
      </ListItem>)
    }
  }
  return (
    listItems
  );
}

export default function VirtualizedList(props: any) {
  const classes = useStyles();

  return (
    <div className={classes.root} onClick={ () =>{
      props.onPageChange(PageEnum.GROUP);
    }}>
      <FixedSizeList height={400} width={400} itemSize={60} itemCount={10}>
        {Row}
      </FixedSizeList>
    </div>
  );
}