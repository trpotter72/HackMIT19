import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PageEnum from './PageEnum'

class Search extends React.Component<{onPageChange: (p: PageEnum) => any, initialValue: string, updateSearchText: (s: string) => any, onSubmit: () => void}, {val: string}> {
    constructor(props: any) {
        super(props)
        this.state = {
            val: this.props.initialValue
        }
    }

    render() {
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
                        value={this.state.val}
                        onChange={e => {
                            this.props.updateSearchText(e.target.value)
                            this.setState({
                                val: e.target.value
                            })
                        }}
                    />
                </form>
                <Button variant="contained" color="primary" style={{float: 'right', top: '50%', marginTop:'25px', marginLeft:'10px'}} onClick={e => this.props.onSubmit()}>
                    Search
                </Button>
            </div>
        );
    }
}

export default Search;