import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class Search extends React.Component {
    render () {
        return (
            <div style = {{margin: 'auto'}}>
                <form className="Search" noValidate autoComplete="off" style={{float: 'left'}}>
                    <TextField
                        id="outlined-with-placeholder"
                        label="With placeholder"
                        placeholder="Placeholder"
                        className="text"
                        margin="normal"
                        variant="outlined"
                    />
                </form>
                <Button variant="contained" color="primary" style={{float: 'right', top: '50%'}}>
                    Search
                </Button>
            </div>
        )
    }
}

export default Search;