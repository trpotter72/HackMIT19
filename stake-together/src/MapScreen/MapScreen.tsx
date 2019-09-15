import React, { useState } from 'react';
import Search from '../Search';
import VirtualizedList from '../VirtualizedList';
import request from 'request';
import GoogleMap from './GoogleMap';

export default function MapScreen(props: any) {
    const [radius, updateRadius] = useState('0')
    const [priceRange, updatePriceRange] = useState('Filter By Price')
    const [bedrooms, updateBedrooms] = useState('Bedrooms')
    const [bathrooms, updateBathrooms] = useState('Bathrooms')

    const onUpdateRadius = (radius: string) => {
        updateRadius(radius);
    }

    const onUpdatePriceRange = (priceRange: string) => {
        updatePriceRange(priceRange);
    }

    const onUpdateBedrooms = (bedrooms: string) => {
        updateBedrooms(bedrooms);
    }

    const onUpdateBathrooms = (bathrooms: string) => {
        updateBathrooms(bathrooms);
    }

    const onSearch = () => {
        let final_radius = 0
        let final_price_range = '-1--1'
        let final_bedrooms = -1
        let final_bathrooms = -1
        if (radius !== 'Search Radius') {
            console.log(radius.substr(0, radius.length - 3))
            final_radius = +radius.substr(0, radius.length - 3)
        }
        console.log(priceRange)
        if (priceRange !== 'Filter By Price') {
            final_price_range = priceRange.replace('&gt;', '>').replace('&lt;', '<')
        }
        if (bedrooms !== 'Bedrooms') {
            final_bedrooms = +bedrooms
        }
        if (bathrooms !== 'Bathrooms') {
            final_bathrooms = +bathrooms
        }
        
        let response = request.get(`http://localhost:5000/houses/?zip_code=${props.zipCode}&radius=${final_radius}&bed=${final_bedrooms}&bath=${final_bathrooms}&price_range=${final_price_range}`, function(error, response, body) {
            console.log(body)
        })
    }
    
    return (
        <div style = {{margin: 'auto'}}>
            <div style = {{paddingTop: '20px', backgroundColor: '#e0e0e0', fontSize: '20px', paddingBottom: '20px'}}>Properties in {props.zipCode}</div>
            <div style={{width: '60%', verticalAlign: 'middle', display: 'inline-block'}}>
                <Search zipCode={props.zipCode} updateSearchText={props.onUpdateZipCode} onSubmit={onSearch}/>
            </div>

            <div style={{width: '60%', verticalAlign: 'middle', display: 'inline-block', paddingLeft: '40px', paddingTop: '20px'}}>
                <select style={{width: '20%', float: 'left', paddingTop: '20px', paddingBottom: '20px'}} name='Search Radius' onChange={e => onUpdateRadius(e.target.selectedOptions[0].innerHTML)}>
                    <option value = "">Search Radius</option>
                    <option value = "1">10 mi</option>
                    <option value = "2">20 mi</option>
                    <option value = "3">50 mi</option>
                    <option value = "4">100 mi</option>
                    <option value = "5">150 mi</option>
                </select>

                <select style={{width: '20%', float: 'left', paddingTop: '20px', paddingBottom: '20px'}} name = "Filter by Price" onChange={e => onUpdatePriceRange(e.target.selectedOptions[0].innerHTML)}>
                    <option value = "">Filter By Price</option>
                    <option value = "1">&#60; $100,000 </option>
                    <option value = "2">$100,000-$200,000</option>
                    <option value = "3">$200,000-$300,000</option>
                    <option value = "4">$300,000-$400,000</option>
                    <option value = "5">&#62; $400,000</option>
                </select>
                <select style={{width: '20%', float: 'left', paddingTop: '20px', paddingBottom: '20px'}} name='Bedrooms' onChange={e => {onUpdateBedrooms(e.target.selectedOptions[0].innerHTML)}}>
                    <option value = "">Bedrooms</option>
                    <option value = "1"> 1 </option>
                    <option value = "2">2</option>
                    <option value = "3">3</option>
                    <option value = "4">4</option>
                    <option value = "5">5+</option>
                </select>
                <select style={{width: '20%', float: 'left', paddingTop: '20px', paddingBottom: '20px'}} name='Bathrooms' onChange={e => {onUpdateBathrooms(e.target.selectedOptions[0].innerHTML)}}>
                    <option value = "">Bathrooms</option>
                    <option value = "1"> 1 </option>
                    <option value = "2">2</option>
                    <option value = "3">3</option>
                    <option value = "4">4</option>
                    <option value = "5">5+</option>
                </select>
            </div>
                
            <GoogleMap style={{width: '50vw', verticalAlign: 'middle', display: 'inline-block', paddingLeft: '40px', paddingTop: '20px', float: 'left'}}></GoogleMap>

            <div style={{float: 'right', width: '400px', paddingRight: '100px'}}>
                <VirtualizedList/>
            </div>
        </div>
    )
}