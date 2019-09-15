import React from 'react';
import Search from '../Search';
import VirtualizedList from '../VirtualizedList';
import PageEnum from '../PageEnum';
import GoogleMap from './GoogleMap';

class MapScreen extends React.Component<{onPageChange: (p: PageEnum) => any, zipCode: string}, {updateSearchText: (s: string) => void, zip: string, radius: string, priceRange: string, bedrooms: number, bathrooms: number}> {
    constructor(props: any) {
        super(props)
        this.state = {
            updateSearchText: this.updateSearchText,
            zip: this.props.zipCode,
            radius: "",
            priceRange: "",
            bedrooms: 0,
            bathrooms: 0
        }
    }

    updateSearchText = (s: string) => {
        this.setState({
            zip: s
        })
    }

    onSearch = () => {
        
    }

    render() {
        return (
            <div style = {{margin: 'auto'}}>
                <div style={{width: '60%', verticalAlign: 'middle', display: 'inline-block'}}>
                    <Search onPageChange={this.props.onPageChange} initialValue={this.props.zipCode} updateSearchText={this.state.updateSearchText} onSubmit={this.onSearch}/>
                </div>
    
                <div style={{width: '60%', verticalAlign: 'middle', display: 'inline-block', paddingLeft: '40px', paddingTop: '20px'}}>
                    <select style={{width: '20%', float: 'left', paddingTop: '20px', paddingBottom: '20px'}} name='Search Radius' onChange={e => {this.setState({radius: e.target.selectedOptions[0].innerHTML})}}>
                        <option value = "">Search Radius</option>
                        <option value = "1">10 mi</option>
                        <option value = "2">20 mi</option>
                        <option value = "3">50 mi</option>
                        <option value = "4">100 mi</option>
                        <option value = "5">150 mi</option>
                    </select>
    
                    <select style={{width: '20%', float: 'left', paddingTop: '20px', paddingBottom: '20px'}} name = "Filter by Price" onChange={e => {this.setState({priceRange: e.target.selectedOptions[0].innerHTML})}}>
                        <option value = "">Filter By Price</option>
                        <option value = "1"> &#60; $1,000 </option>
                        <option value = "2">$1,000-$5,000</option>
                        <option value = "3">$5,000-$10,000</option>
                        <option value = "4">$10,000-$20,000</option>
                        <option value = "5">&#62; $20,000</option>
                    </select>
                    <select style={{width: '20%', float: 'left', paddingTop: '20px', paddingBottom: '20px'}} name='Bedrooms' onChange={e => {this.setState({bedrooms: +e.target.selectedOptions[0].innerHTML})}}>
                        <option value = "">Bedrooms</option>
                        <option value = "1"> 1 </option>
                        <option value = "2">2</option>
                        <option value = "3">3</option>
                        <option value = "4">4</option>
                        <option value = "5">5+</option>
                    </select>
                    <select style={{width: '20%', float: 'left', paddingTop: '20px', paddingBottom: '20px'}} name='Bathrooms' onChange={e => {this.setState({bathrooms: +e.target.selectedOptions[0].innerHTML})}}>
                        <option value = "">Bathrooms</option>
                        <option value = "1"> 1 </option>
                        <option value = "2">2</option>
                        <option value = "3">3</option>
                        <option value = "4">4</option>
                        <option value = "5">5+</option>
                    </select>
                </div>
                    
                <GoogleMap style={{width: '60vw', verticalAlign: 'middle', display: 'inline-block', paddingLeft: '40px', paddingTop: '20px', float: 'left'}}></GoogleMap>

                <div style={{float: 'right', width: '400px', paddingRight: '100px'}}>
                    <VirtualizedList/>
                </div>
            </div>
        )
    }
}

export default MapScreen;