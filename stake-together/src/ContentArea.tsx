import React from 'react';
import PageEnum from './PageEnum';
import HomeScreen from './HomeScreen/HomeScreen';
import GroupScreen from './GroupScreen/GroupScreen';
import MapScreen from './MapScreen/MapScreen';
import { useState } from 'react';

function ContentArea() {
    const [pageType, setPageType] = useState(PageEnum.HOME);
    const onPageChange = (pageType: PageEnum) => {
      setPageType(pageType);
    };

    switch (pageType){
        case PageEnum.HOME:
            return(
                <HomeScreen onPageChange={onPageChange}/>
            );
        case PageEnum.GROUP:
            return(
                <GroupScreen onPageChange={onPageChange}/>
            );
        case PageEnum.MAP:
            return(
                <MapScreen onPageChange={onPageChange}/>
            );
        default:
            return(
                <HomeScreen onPageChange={onPageChange}/>
            );
    }
}

export default ContentArea;