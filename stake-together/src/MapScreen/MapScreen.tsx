import React, { useState } from 'react';
import Search from '../Search';
import VirtualizedList from '../VirtualizedList';
import PageEnum from '../PageEnum';
import GoogleMap from './GoogleMap';

export default function MapScreen(props: any) {
    const [radius, updateRadius] = useState(0)
    const [priceRange, updatePriceRange] = useState("")
    const [bedrooms, updateBedrooms] = useState(0)
    const [bathrooms, updateBathrooms] = useState(0)

    const onUpdateRadius = (radius: number) => {
        updateRadius(radius);
    }

    const onUpdatePriceRange = (priceRange: string) => {
        updatePriceRange(priceRange);
    }

    const onUpdateBedrooms = (bedrooms: number) => {
        updateBedrooms(bedrooms);
    }

    const onUpdateBathrooms = (bathrooms: number) => {
        updateBathrooms(bathrooms);
    }

    const onSearch = () => {
        
    }
    
    return (
        <div style = {{margin: 'auto'}}>
            <div style = {{paddingTop: '20px', backgroundColor: '#e0e0e0', fontSize: '20px', paddingBottom: '20px'}}>Properties in {props.zipCode}</div>
            <div style={{width: '60%', verticalAlign: 'middle', display: 'inline-block'}}>
                <Search zipCode={props.zipCode} updateSearchText={props.onUpdateZipCode} onSubmit={onSearch}/>
            </div>

            <div style={{width: '60%', verticalAlign: 'middle', display: 'inline-block', paddingLeft: '40px', paddingTop: '20px'}}>
                <select style={{width: '20%', float: 'left', paddingTop: '20px', paddingBottom: '20px'}} name='Search Radius' onChange={e => onUpdateRadius(+e.target.selectedOptions[0].innerHTML)}>
                    <option value = "">Search Radius</option>
                    <option value = "1">10 mi</option>
                    <option value = "2">20 mi</option>
                    <option value = "3">50 mi</option>
                    <option value = "4">100 mi</option>
                    <option value = "5">150 mi</option>
                </select>

                <select style={{width: '20%', float: 'left', paddingTop: '20px', paddingBottom: '20px'}} name = "Filter by Price" onChange={e => onUpdatePriceRange(e.target.selectedOptions[0].innerHTML)}>
                    <option value = "">Filter By Price</option>
                    <option value = "1"> &#60; $1,000 </option>
                    <option value = "2">$1,000-$5,000</option>
                    <option value = "3">$5,000-$10,000</option>
                    <option value = "4">$10,000-$20,000</option>
                    <option value = "5">&#62; $20,000</option>
                </select>
                <select style={{width: '20%', float: 'left', paddingTop: '20px', paddingBottom: '20px'}} name='Bedrooms' onChange={e => {onUpdateBedrooms(+e.target.selectedOptions[0].innerHTML)}}>
                    <option value = "">Bedrooms</option>
                    <option value = "1"> 1 </option>
                    <option value = "2">2</option>
                    <option value = "3">3</option>
                    <option value = "4">4</option>
                    <option value = "5">5+</option>
                </select>
                <select style={{width: '20%', float: 'left', paddingTop: '20px', paddingBottom: '20px'}} name='Bathrooms' onChange={e => {onUpdateBathrooms(+e.target.selectedOptions[0].innerHTML)}}>
                    <option value = "">Bathrooms</option>
                    <option value = "1"> 1 </option>
                    <option value = "2">2</option>
                    <option value = "3">3</option>
                    <option value = "4">4</option>
                    <option value = "5">5+</option>
                </select>
            </div>
              
            <div style={{float: 'left', width: '50%'}}>
                <GoogleMap style={{width: '50%', verticalAlign: 'middle', display: 'inline-block', paddingLeft: '40px', paddingTop: '20px', float: 'left'}}></GoogleMap>
            </div>

            <div style={{float: 'right', width: '400px', paddingRight: '100px'}}>
                <VirtualizedList/>
            </div>
        </div>
    )
}