import React, { Component } from 'react';
import { connect } from 'react-redux';
import './CreateProduct.scss';

import Header from '../../Header';
import Navbar from './Section/navBar';
import BasicInformation from './Section/BasicInformation';
import DetailInformation from './Section/DetailInformation';
import SellInformation from './Section/SellInformation';
import Delivery from './Section/Delivery';
import OrtherInformation from './Section/OrtherInformation';

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
        };
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
                            <BasicInformation onCategorySelect={this.handleCategorySelect} />
                        </div>
                        {/* Render other sections if a category is selected */}
                        {isCategorySelected ? (
                            <>
                                <div className="section">
                                    {/* Render DetailInformation component and pass selectedCategories as prop */}
                                    <DetailInformation selectedCategories={selectedCategories} />
                                </div>
                                <div className="section">
                                    {/* Render SellInformation component and pass selectedCategories as prop */}
                                    <SellInformation selectedCategories={selectedCategories} />
                                </div>
                                <div className="section">
                                    {/* Render Delivery component and pass selectedCategories as prop */}
                                    <Delivery selectedCategories={selectedCategories} />
                                </div>
                                <div className="section">
                                    {/* Render OrtherInformation component and pass selectedCategories as prop */}
                                    <OrtherInformation selectedCategories={selectedCategories} />
                                </div>
                                {/* Render buttons for saving and canceling */}
                                <div className="buttons-container">
                                    <button className="cancel-button">Hủy</button>
                                    <button className="save-hide-button">Lưu & Ẩn</button>
                                    <button className="save-show-button">Lưu & Hiển thị</button>
                                </div>
                            </>
                        ) : 
                        // Render placeholder sections if no category is selected
                        <>
                            <div className="section">
                                <h2>Thông tin chi tiết</h2>
                                <p>Có thể điều chỉnh sau khi chọn ngành hàng.</p>
                            </div>
                            <div className="section">
                                <h2>Thông tin bán hàng</h2>
                                <p>Có thể điều chỉnh sau khi chọn ngành hàng.</p>
                            </div>
                            <div className="section">
                                <h2>Vận chuyển</h2>
                                <p>Có thể điều chỉnh sau khi chọn ngành hàng.</p>
                            </div>
                            <div className="section">
                                <h2>Thông tin khác</h2>
                                <p>Có thể điều chỉnh sau khi chọn ngành hàng.</p>
                            </div>
                            {/* Render disabled buttons for saving and canceling */}
                            <div className="buttons-container">
                                <button className="cancel-button" disabled={true}>Hủy</button>
                                <button className="save-hide-button" disabled={true}>Lưu & Ẩn</button>
                                <button className="save-show-button" disabled={true}>Lưu & Hiển thị</button>
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
