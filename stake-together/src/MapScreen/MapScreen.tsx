import React from 'react';
import Search from '../Search';
import VirtualizedList from '../VirtualizedList';

function MapScreen (props: any) {
    return (
        <div style = {{margin: 'auto'}}>
            <div style={{width: '60%', verticalAlign: 'middle', display: 'inline-block'}}>
                <Search onPageChange={props.onPageChange}/>
            </div>

            <div style={{width: '60%', verticalAlign: 'middle', display: 'inline-block', paddingLeft: '40px', paddingTop: '20px'}}>
                <select style={{width: '20%', float: 'left', paddingTop: '20px', paddingBottom: '20px'}} name='Search Radius'>
                    <option value = "">Search Radius</option>
                    <option value = "1">10 mi</option>
                    <option value = "2">20 mi</option>
                    <option value = "3">50 mi</option>
                    <option value = "4">100 mi</option>
                    <option value = "5">150 mi</option>
                </select>

                <select style={{width: '20%', float: 'left', paddingTop: '20px', paddingBottom: '20px'}} name = "Filter by Price">
                    <option value = "">Filter By Price</option>
                    <option value = "1"> &#60; $1,000 </option>
                    <option value = "2">$1,000-$5,000</option>
                    <option value = "3">$5,000-$10,000</option>
                    <option value = "4">$10,000-$20,000</option>
                    <option value = "5">&#62; $20,000</option>
                </select>
                <select style={{width: '20%', float: 'left', paddingTop: '20px', paddingBottom: '20px'}} name='Property Type'>
                    <option value = "">Property Type</option>
                    <option value = "1"> House </option>
                    <option value = "2">Rental</option>
                    <option value = "3">Apartment</option>
                </select>
                <select style={{width: '20%', float: 'left', paddingTop: '20px', paddingBottom: '20px'}} name='Bedrooms'>
                    <option value = "">Bedrooms</option>
                    <option value = "1"> 1 </option>
                    <option value = "2">2</option>
                    <option value = "3">3</option>
                    <option value = "4">4</option>
                    <option value = "5">5</option>
                </select>
                <select style={{width: '20%', float: 'left', paddingTop: '20px', paddingBottom: '20px'}} name='Bathrooms'>
                    <option value = "">Bathrooms</option>
                    <option value = "1"> 1 </option>
                    <option value = "2">2</option>
                    <option value = "3">3</option>
                    <option value = "4">4</option>
                    <option value = "5">5</option>
                </select>
            </div>

            <div style={{width: '60%', verticalAlign: 'middle', display: 'inline-block', paddingLeft: '40px', paddingTop: '20px', float: 'left'}}>
                
            </div>
            
            <div style={{float: 'right', width: '400px', paddingRight: '100px'}}>
                <VirtualizedList/>
            </div>

        </div>
    )
}

export default MapScreen;