import React from 'react';
import VirtualizedList from '../VirtualizedList';
import Box from '@material-ui/core/Box';

function GroupScreen (props: any) {
    return (
        <div style = {{margin: 'auto'}}>

            <div>
                <div style={{width: '33.33%', float: 'left', paddingTop: '20px', paddingBottom: '20px', backgroundColor: '#90caf9'}}>Amount left to invest</div>
                <div style={{width: '33.33%', float: 'left', paddingTop: '20px', paddingBottom: '20px', backgroundColor: '#90caf9'}}>Amount Invested</div>
                <div style={{width: '33.33%', float: 'left', paddingTop: '20px', paddingBottom: '20px', backgroundColor: '#90caf9'}}>Number of Investors</div>
            </div>

            <div style={{width: '60%', verticalAlign: 'middle', display: 'inline-block', paddingLeft: '40px', paddingTop: '20px', float: 'left'}}>
                <Box style={{float: 'left', height: '250px', width: '600px', textAlign: 'left', backgroundColor: '#e0e0e0', paddingTop: "20px", paddingLeft: "20px"}}>
                    <div style={{height: '12.5%'}}><b>Property Info</b></div>
                    <li style={{margin: '10px'}}>Address: </li>
                    <li style={{margin: '10px'}}>Expected Value: </li>
                    <li style={{margin: '10px'}}>Expected Rent: </li>
                    <li style={{margin: '10px'}}>Square Footage: </li>
                    <li style={{margin: '10px'}}>Bedrooms: </li>
                    <li style={{margin: '10px'}}>Bathrooms: </li>
                </Box>
                <img src='https://media.gettyimages.com/photos/exterior-of-new-suburban-house-picture-id171246403?s=2048x2048' alt="" style={{float: 'left', width: '620px', paddingTop: '20px', paddingBottom: '50px'}}></img>
            </div>
            
            <div style={{float: 'left', width: '400px'}}>
                <VirtualizedList/>
            </div>

        </div>
    )
}

export default GroupScreen;