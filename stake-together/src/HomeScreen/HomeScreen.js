import React from 'react';
import Search from '../Search';

function HomeScreen (onPageChange) {
    return (
        <div style = {{margin: 'auto'}}>
            <Search onPageChange={onPageChange}/>
        </div>
    )
}

export default HomeScreen;