import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

function Search (onPageChange) {
    return (
        <div>
            <form className="Search" noValidate autoComplete="off" style={{float: 'left', color:'white'}}>
                <TextField
                    id="outlined-with-placeholder"
                    label="Enter Zipcode"
                    //placeholder="Placeholder"
                    className="text"
                    margin="normal"
                    variant="outlined"
                    //color="white"
                />
            </form>
            <Button variant="contained" color="primary" style={{float: 'right', top: '50%', marginTop:'25px', marginLeft:'10px'}} /*onClick={onPageChange(PageEnum.GROUP)}*/>
                Search
            </Button>
        </div>
    );
}

export default Search;