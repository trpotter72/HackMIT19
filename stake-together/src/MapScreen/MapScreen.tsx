import React from 'react';
import Search from '../Search';
import VirtualizedList from '../VirtualizedList';
import PageEnum from '../PageEnum'

function MapScreen (props: any) {
    return (
        <div style = {{margin: 'auto'}}>
            <Search onPageChange={props.onPageChange}/>

            <div>
                <div style={{width: '20%', float: 'left', paddingTop: '20px', paddingBottom: '20px', backgroundColor: '#90caf9'}}>Search Radius</div>
                <div style={{width: '20%', float: 'left', paddingTop: '20px', paddingBottom: '20px', backgroundColor: '#90caf9'}}>Filter by Price</div>
                <div style={{width: '20%', float: 'left', paddingTop: '20px', paddingBottom: '20px', backgroundColor: '#90caf9'}}>Property Type</div>
                <div style={{width: '20%', float: 'left', paddingTop: '20px', paddingBottom: '20px', backgroundColor: '#90caf9'}}>Bedrooms</div>
                <div style={{width: '20%', float: 'left', paddingTop: '20px', paddingBottom: '20px', backgroundColor: '#90caf9'}}>Bathrooms</div>
            </div>

            <div style={{width: '60%', verticalAlign: 'middle', display: 'inline-block', paddingLeft: '40px', paddingTop: '20px', float: 'left'}}>
                <img src='https://media.gettyimages.com/photos/exterior-of-new-suburban-house-picture-id171246403?s=2048x2048' alt="" style={{float: 'left', width: '620px', paddingTop: '20px', paddingBottom: '50px'}}></img>
            </div>
            
            <div style={{float: 'left', width: '400px'}}>
                <VirtualizedList/>
            </div>

        </div>
    )
}

export default MapScreen;