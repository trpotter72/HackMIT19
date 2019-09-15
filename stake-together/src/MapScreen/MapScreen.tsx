import React from 'react';
import Search from '../Search';
import PageEnum from '../PageEnum'

function MapScreen (props: any) {
    return (
        <div style = {{margin: 'auto'}}>
            <Search onPageChange={props.onPageChange}/>
        </div>
    )
}

export default MapScreen;