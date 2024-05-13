import React, { Component } from 'react';
import { connect } from 'react-redux';
import './CreateProduct.scss';

import Header from '../../Header';
import Navbar from './Section/navBar';
import BasicInformation from './Section/BasicInformation';
import DetailInformation from './Section/DetailInformation';
import SellInformation from './Section/SellInformation';
import Delivery from './Section/Delivery';
import OtherInformation from './Section/OtherInformation';
import axios from '../../../../axios'

/**
 * Component for creating a new product.
 * Displays forms for basic, detail, sell, delivery, and other information of the product.
 */
class CreateProduct extends Component {
    constructor(props) {
        super(props);
        // Initialize component state
        this.state = {
            selectedCategories: null, // Stores the selected categories
            isCategorySelected: false, // Determines if the user has selected a category or not
            basicData: null,
            detailData: null,
            sellData: null,
            deliveryData: null,
            otherData: null
        };
    }

    handleBasicDataChange = (data) => {
        this.setState({ basicData: data });
    }
    
    handleDetailDataChange = (data) => {
        this.setState({ detailData: data });
    }
    
    handelSellDataChange = (data) => {
        this.setState({ sellData: data });
    }
    
    handleDeliveryDataChange = (data) => {
        this.setState({ deliveryData: data });
    }
    
    handleOtherDataChange = (data) => {
        this.setState({ otherData: data });
    }

    handleSave = async () => {
        const { basicData, detailData, sellData, deliveryData, otherData } = this.state;
    
        if (basicData && detailData && sellData && deliveryData && otherData) {
            const combinedData = {
                ...basicData,
                Detail: detailData,
                ...sellData,
                ...deliveryData,
                ...otherData
            };

            console.log(combinedData)
            try {
                await axios.post('http://localhost:5000/api/v1/products/create-new-product', combinedData, {
                    headers: {
                        'Authorization': localStorage.getItem('accessToken')
                    }
                });
            } catch (error) {
                console.error('Error:', error.response);
            }            
        } else {
            console.error('Missing data from one or more sections.');
        }
    }
    

    /**
     * Handles the selection of categories.
     * @param {Array} selectedCategories - Array of selected categories.
     */
    handleCategorySelect = (selectedCategories) => {
        this.setState({ selectedCategories, isCategorySelected: true });
    }

    render() {
        const { isCategorySelected, selectedCategories } = this.state;

        return (
            <div className='create-product-container'>
                <Header />
                <div className="body-container">
                    <div className="left-content">
                        <Navbar />
                    </div>
                    <div className="right-content">
                        <div className="section">
                            {/* Render BasicInformation component and pass handleCategorySelect function as prop */}
                            <BasicInformation onCategorySelect={this.handleCategorySelect} onBasicDataChange={this.handleBasicDataChange} />
                        </div>
                        {/* Render other sections if a category is selected */}
                        {isCategorySelected ? (
                            <>
                                <div className="section">
                                    {/* Render DetailInformation component and pass selectedCategories as prop */}
                                    <DetailInformation selectedCategories={selectedCategories} onDetailDataChange={this.handleDetailDataChange}/>
                                </div>
                                <div className="section">
                                    {/* Render SellInformation component and pass selectedCategories as prop */}
                                    <SellInformation selectedCategories={selectedCategories} onSellDataChange={this.handelSellDataChange} />
                                </div>
                                <div className="section">
                                    {/* Render Delivery component and pass selectedCategories as prop */}
                                    <Delivery selectedCategories={selectedCategories} onDeliveryDataChange={this.handleDeliveryDataChange} />
                                </div>
                                <div className="section">
                                    {/* Render OtherInformation component and pass selectedCategories as prop */}
                                    <OtherInformation selectedCategories={selectedCategories} onOtherDataChange={this.handleOtherDataChange} />
                                </div>
                                {/* Render buttons for saving and canceling */}
                                <div className="buttons-container">
                                    <button className="cancel-button">Cancel</button>
                                    <button className="save-hide-button">Save & Hide</button>
                                    <button className="save-show-button" onClick={this.handleSave}>Save & Show</button>
                                </div>
                            </>
                        ) : 
                        // Render placeholder sections if no category is selected
                        <>
                            <div className="section">
                                <h2>Detail Informtion</h2>
                                <p>Can be adjusted after selecting a product line.</p>
                            </div>
                            <div className="section">
                                <h2>Sales Information</h2>
                                <p>Can be adjusted after selecting a product line.</p>
                            </div>
                            <div className="section">
                                <h2>Shipping</h2>
                                <p>Can be adjusted after selecting a product line.</p>
                            </div>
                            <div className="section">
                                <h2>Others</h2>
                                <p>Can be adjusted after selecting a product line.</p>
                            </div>
                            {/* Render disabled buttons for saving and canceling */}
                            <div className="buttons-container">
                                <button className="cancel-button" disabled={true}>Cancel</button>
                                <button className="save-hide-button" disabled={true}>Save & Hide</button>
                                <button className="save-show-button" disabled={true}>Save & Show</button>
                            </div>
                        </>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.admin.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct);
