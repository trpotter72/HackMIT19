import React from 'react';
import NavBar from '../NavBar';
import { Box } from '@material-ui/core';
import VirtualizedList from '../VirtualizedList';

class GroupScreen extends React.Component {
    render () {
        return (
            <div style = {{margin: 'auto'}}>
                <NavBar/>

                <div>
                    <div style={{width: '33.33%', float: 'left'}}>Number of Investors</div>
                    <div style={{width: '33.33%', float: 'left'}}>Amount Invested</div>
                    <div style={{width: '33.33%', float: 'left'}}>Amount left to invest</div>
                </div>

                <img></img>

                <div style={{float: 'left', width: '50%', height: '30%'}}>Property Info</div>

                <VirtualizedList/>

            </div>
        )
    }
}

export default GroupScreen;