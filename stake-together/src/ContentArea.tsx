import React from 'react';
import PageEnum from './PageEnum';
import HomeScreen from './HomeScreen/HomeScreen';
import GroupScreen from './GroupScreen/GroupScreen';
import MapScreen from './MapScreen/MapScreen';
import LoginScreen from './LoginScreen';

function ContentArea(props: any) {

    switch (props.pageType){
        case PageEnum.HOME:
            return(
                <HomeScreen onPageChange={props.onPageChange}/>
            );
        case PageEnum.GROUP:
            return(
                <GroupScreen onPageChange={props.onPageChange}/>
            );
        case PageEnum.MAP:
            return(
                <MapScreen onPageChange={props.onPageChange}/>
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