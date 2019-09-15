import React from 'react';
import Search from '../Search';
import '../App.css';
import PageEnum from '../PageEnum';

function HomeScreen (props: any) {
    return (
        <div className="Splash">
            <header className="App-header">
                <div style = {{margin: 'auto'}}>
                    <Search onPageChange={props.onPageChange} updateSearchText={props.onUpdateZipCode} zipCode={""} onSubmit={() => {props.onPageChange(PageEnum.MAP)}}/>
                </div>
            </header>
        </div>

    )
}

export default HomeScreen;