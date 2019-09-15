import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PageEnum from './PageEnum'

export default function Search(props: any) {
    return (
        <div>
            <form className="Search" noValidate autoComplete="off" style={{float: 'left'}}>
                <TextField
                    id="outlined-with-placeholder"
                    label="Enter Zipcode"
                    className="text"
                    margin="normal"
                    variant="outlined"
                    color="white"
                    inputProps={{style:{backgroundColor: 'white'}}}
                    defaultValue={props.zipCode}
                    onChange={e => {
                        props.updateSearchText(e.target.value)
                    }}
                />
            </form>
            <Button variant="contained" color="primary" style={{float: 'right', top: '50%', marginTop:'25px', marginLeft:'10px'}} onClick={e => props.onSubmit()}>
                Search
            </Button>
        </div>
    );
}