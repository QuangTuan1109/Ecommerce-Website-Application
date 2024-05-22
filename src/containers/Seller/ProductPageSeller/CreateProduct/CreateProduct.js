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
import CustomPopup from '../../../../components/CustomPopup'
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
            otherData: null,
            popupType: '',
            onConfirm: null
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

            try {
                if (combinedData.Image.length < 3) {
                    this.showPopup('Products must have at least 3 images', 'error', this.handleFailure);
                } else if (combinedData.Video === null) {
                    this.showPopup('Products must have a video', 'error', this.handleFailure);
                } else if (!combinedData.Name) {
                    this.showPopup('Product name has not been entered', 'error', this.handleFailure);
                } else if (!combinedData.Description) {
                    this.showPopup('The description has not been entered', 'error', this.handleFailure);
                } else if (combinedData.Category === null) {
                    this.showPopup('The category has not been entered', 'error', this.handleFailure);
                } else if (!combinedData.Detail) {
                    this.showPopup('Detail information section has not been entered', 'error', this.handleFailure);
                } else if (sellData.Classify === null && sellData.Quantity === '' && sellData.Price === '' && sellData.Discount === null) {
                    this.showPopup('Detail information section has not been entered', 'error', this.handleFailure);
                } else if (deliveryData.Weight === '' && deliveryData.Width === '' && deliveryData.Length === '' && deliveryData.Height === '' && deliveryData.deliveryFee === null) {
                    this.showPopup('Delivery information section has not been entered', 'error', this.handleFailure);
                } else if (otherData.SKU === '') {
                    this.showPopup('Other information section has not been entered', 'error', this.handleFailure);
                } else {
                    await axios.post('http://localhost:5000/api/v1/products/create-new-product', combinedData, {
                        headers: {
                            'Authorization': localStorage.getItem('accessToken')
                        }
                    });
                    this.showPopup('Product saved successfully!', 'successful', this.handleSuccess);
                }
            } catch (error) {
                this.showPopup('Failed to save product.', 'error', this.handleFailure);
            }
        } else {
            this.showPopup('Please complete all sections before saving.', 'error', this.handleFailure);
        }
    }

    /**
     * Handles the selection of categories.
     * @param {Array} selectedCategories - Array of selected categories.
     */
    handleCategorySelect = (selectedCategories) => {
        this.setState({ selectedCategories, isCategorySelected: true });
    }

    handleCancel = () => {
        const { basicData, detailData, sellData, deliveryData, otherData } = this.state;
        const hasData = basicData || detailData || sellData || deliveryData || otherData;

        if (!hasData) {
            this.props.history.goBack();
        } else {
            this.showPopup('Are you sure you want to cancel?', 'confirm', this.confirmCancel);
        }
    }

    handleSuccess = () => {
        this.closePopup();
        this.props.history.push('/all-product');
    }

    handleFailure = () => {
        this.closePopup();
    }

    confirmCancel = () => {
        this.closePopup();
        this.props.history.goBack();
    }

    showPopup = (message, type, onConfirm = null) => {
        this.setState({
            popupVisible: true,
            popupMessage: message,
            popupType: type,
            onConfirm: onConfirm
        });
    }

    closePopup = () => {
        this.setState({
            popupVisible: false,
            popupMessage: '',
            popupType: '',
            onConfirm: null
        });
    }

    render() {
        const { isCategorySelected, selectedCategories, popupVisible, popupMessage, popupType, onConfirm } = this.state;

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
                                    <DetailInformation selectedCategories={selectedCategories} onDetailDataChange={this.handleDetailDataChange} />
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
                                    <button className="cancel-button" onClick={this.handleCancel}>Cancel</button>
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
                                    <button className="cancel-button" onClick={this.handleCancel}>Cancel</button>
                                    <button className="save-hide-button" disabled={true}>Save & Hide</button>
                                    <button className="save-show-button" disabled={true}>Save & Show</button>
                                </div>
                            </>
                        }
                        {popupVisible && (
                            <CustomPopup
                                message={popupMessage}
                                type={popupType}
                                onClose={this.closePopup}
                                onConfirm={onConfirm}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.seller.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct);
