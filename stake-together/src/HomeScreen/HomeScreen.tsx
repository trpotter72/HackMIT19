import React from 'react';
import Search from '../Search';
import PageEnum from '../PageEnum';

function HomeScreen (props: any) {
    return (
        <header className="App-header">
            <div style = {{margin: 'auto'}}>
                <Search onPageChange={props.onPageChange}/>
            </div>
        </header>
    )
}

export default HomeScreen;