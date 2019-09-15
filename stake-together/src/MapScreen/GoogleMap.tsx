import React from "react";
import {Map, GoogleApiWrapper, GoogleAPI} from 'google-maps-react';

class MapContainer extends React.Component<{google: GoogleAPI, style: any}, {}> {
    render() {
        return (
            <div style={this.props.style}>
                <Map 
                    google={this.props.google}>
                </Map>
            </div>
        )
    }
}

export default GoogleApiWrapper({apiKey: 'AIzaSyC7X-p2kmN6spNNIMpApfBIJltahheLKa4'})(MapContainer)