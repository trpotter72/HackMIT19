import React from 'react';
import Search from '../Search';

function HomeScreen (onPageChange) {
    return (
        <header className="App-header">
            <div style = {{margin: 'auto'}}>
                <Search onPageChange={onPageChange}/>
            </div>
        </header>
    )
}

export default HomeScreen;