import React from "react";
import './Map.css'
import {Map, GoogleApiWrapper, GoogleAPI} from 'google-maps-react';

class MapContainer extends React.Component<{google: GoogleAPI, style: any}, {}> {
    render() {
        return (
            <div style={{width: '50vw', verticalAlign: 'middle', display: 'inline-block', paddingLeft: '40px', paddingTop: '20px', float: 'left'}}>
                <Map google={this.props.google}>
                </Map>
            </div>
        )
    }
}

export default GoogleApiWrapper({apiKey: 'AIzaSyC7X-p2kmN6spNNIMpApfBIJltahheLKa4'})(MapContainer)