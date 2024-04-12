import React, { Component } from 'react';
import { connect } from 'react-redux';
import './CreateProduct.scss';

import Header from '../../Header'
import Navbar from './Section/navBar'
import BasicInformation from './Section/BasicInformation'
import DetailInformation from './Section/DetailInformation'
import SellInformation from './Section/SellInformation'
import Delivery from './Section/Delivery'
import OrtherInformation from './Section/OrtherInformation'

class CreateProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // các trạng thái khác của component
            selectedCategories: null, // lưu trữ ngành hàng đã chọn
            isCategorySelected: false, // xác định xem người dùng đã chọn ngành hàng hay chưa
        };
    }

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
                            <BasicInformation onCategorySelect={this.handleCategorySelect} />
                        </div>
                        {isCategorySelected ? (
                            <>
                                <div className="section">
                                    <DetailInformation selectedCategories={selectedCategories} />
                                </div>
                                <div className="section">
                                    <SellInformation selectedCategories={selectedCategories} />
                                </div>
                                <div className="section">
                                    <Delivery selectedCategories={selectedCategories} />
                                </div>
                                <div className="section">
                                    <OrtherInformation selectedCategories={selectedCategories} />
                                </div>
                                <div className="buttons-container">
                                    <button className="cancel-button">Hủy</button>
                                    <button className="save-hide-button">Lưu & Ẩn</button>
                                    <button className="save-show-button">Lưu & Hiển thị</button>
                                </div>
                            </>
                        ) : 
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
                                <div className="buttons-container">
                                    <button className="cancel-button" disabled={true}>Hủy</button>
                                    <button className="save-hide-button" disabled={true}>Lưu & Ẩn</button>
                                    <button className="save-show-button" disabled={true}>Lưu & Hiển thị</button>
                                </div>
                            </>}
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
