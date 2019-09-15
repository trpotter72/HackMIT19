import React, { useState } from 'react';
import PageEnum from './PageEnum';
import HomeScreen from './HomeScreen/HomeScreen';
import GroupScreen from './GroupScreen/GroupScreen';
import MapScreen from './MapScreen/MapScreen';
import LoginScreen from './LoginScreen';

function ContentArea(props: any) {
    const [zipCode, setZipCode] = useState(66049);
    const onUpdateZipCode = (zipCode: number) => {
      setZipCode(zipCode);
    };

    switch (props.pageType){
        case PageEnum.HOME:
            return(
                <HomeScreen onPageChange={props.onPageChange} onUpdateZipCode={onUpdateZipCode}/>
            );
        case PageEnum.GROUP:
            return(
                <GroupScreen onPageChange={props.onPageChange}/>
            );
        case PageEnum.MAP:
            return(
                <MapScreen onPageChange={props.onPageChange} zipCode={zipCode}/>
            );
        case PageEnum.LOGIN:
            return(
                <LoginScreen onPageChange={props.onPageChange}/>
            );
        default:
            return(
                <HomeScreen onPageChange={props.onPageChange}/>
            );
    }
}

export default ContentArea;