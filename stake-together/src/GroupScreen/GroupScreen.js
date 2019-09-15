import React from 'react';
import VirtualizedList from '../VirtualizedList';
import Box from '@material-ui/core/Box';

function GroupScreen (onPageChange) {
    return (
        <div style = {{margin: 'auto'}}>

            <div>
                <div style={{width: '33.33%', float: 'left', paddingTop: '20px', paddingBottom: '20px', backgroundColor: '#90caf9'}}>Number of Investors</div>
                <div style={{width: '33.33%', float: 'left', paddingTop: '20px', paddingBottom: '20px', backgroundColor: '#90caf9'}}>Amount Invested</div>
                <div style={{width: '33.33%', float: 'left', paddingTop: '20px', paddingBottom: '20px', backgroundColor: '#90caf9'}}>Amount left to invest</div>
            </div>

            <div style={{width: '60%', verticalAlign: 'middle', display: 'inline-block', paddingLeft: '40px', paddingTop: '20px', float: 'left'}}>
                <Box style={{float: 'left', height: '50%', width: '600px', textAlign: 'left', backgroundColor: '#e0e0e0'}}>
                    <div style={{height: '12.5%'}}>Property Info</div>
                    <li>Address: </li>
                    <li>Expected Value: </li>
                    <li>Expected Rent: </li>
                    <li>Square Footage: </li>
                    <li>Bedrooms: </li>
                    <li>Bathrooms: </li>
                </Box>
                <img src='https://media.gettyimages.com/photos/exterior-of-new-suburban-house-picture-id171246403?s=2048x2048' alt="" style={{float: 'left', height: '30%', width: '600px', paddingTop: '20px'}}></img>
            </div>
            
            <VirtualizedList/>

        </div>
    )
}

export default GroupScreen;