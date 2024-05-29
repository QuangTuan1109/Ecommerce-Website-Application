import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import HeaderHomepage from '../../HomePage/HeaderHomepage';
import AboutUs from '../../HomePage/Section/AboutUs';
import FooterHomepage from '../../HomePage/FooterHomepage';
import './Checkout.scss';
import axios from '../../../axios';
import { formatCurrency } from '../../../method/handleMethod';
import CustomPopup from '../../../components/CustomPopup';

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popupType: '',
            onConfirm: null,
            address: null,
            productCart: [],
            voucherList: [],
            selectedVoucher: null,
            deliveryMethod: '',
            totalAmount: 0,
        };
    }

    componentDidMount() {
        // this.fetchAddress();
        // this.fetchVouchers();

        const totalPayment = localStorage.getItem('totalPayment');
        const selectProductCart = localStorage.getItem('selectProductCart');

        if (totalPayment) {
            this.setState({ totalAmount: JSON.parse(totalPayment) });
        }
        if (selectProductCart) {
            this.setState({ productCart: JSON.parse(selectProductCart) });
        }
    }

    fetchAddress() {
        // Fetch customer address from API
        axios.get(`http://localhost:5000/api/v1/customer/address`, {
            headers: {
                'Authorization': localStorage.getItem('accessToken')
            }
        })
            .then(res => {
                this.setState({ address: res.data });
            })
            .catch(error => {
                console.error('Error fetching address:', error);
            });
    }

    fetchVouchers() {
        // Fetch available vouchers from API
        axios.get(`http://localhost:5000/api/v1/vouchers`)
            .then(res => {
                this.setState({ voucherList: res.data });
            })
            .catch(error => {
                console.error('Error fetching vouchers:', error);
            });
    }

    handleVoucherSelect = (voucher) => {
        this.setState({ selectedVoucher: voucher });
    }

    handleDeliveryMethodChange = (method) => {
        this.setState({ deliveryMethod: method });
    }

    handleCheckout = () => {
        // Handle the checkout process
        const { address, productCart, selectedVoucher, deliveryMethod } = this.state;
        // Construct checkout data and send to API
        const checkoutData = {
            address,
            productCart,
            voucher: selectedVoucher,
            deliveryMethod
        };
        // Call the API to complete the checkout process
        axios.post(`http://localhost:5000/api/v1/order/checkout`, checkoutData, {
            headers: {
                'Authorization': localStorage.getItem('accessToken')
            }
        })
            .then(res => {
                this.showPopup('Checkout successful!', 'successful', this.handleSuccess);
            })
            .catch(error => {
                this.showPopup('Checkout failed.', 'error', this.handleFailure);
            });
    }

    handleSuccess = () => {
        this.closePopup();
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
        const { popupVisible, popupMessage, popupType, onConfirm, address, productCart, voucherList, selectedVoucher, deliveryMethod, totalAmount } = this.state;

        return (
            <div className='checkout-container'>
                <div className='checkout-header'>
                    <HeaderHomepage />
                </div>
                <div className='checkout-body'>
                    <div className='checkout-content'>
                        {/* Delivery Address Section */}
                        <div className='delivery-address-section'>
                            <h3>Địa Chỉ Nhận Hàng</h3>
                            {address ? (
                                <div>
                                    <span>{address.name} ({address.phone})</span>
                                    <span>{address.address}</span>
                                    <button onClick={() => this.showPopup('Edit Address', 'edit', this.confirmCancel)}>Thay Đổi</button>
                                </div>
                            ) : (
                                <div>No address available</div>
                            )}
                        </div>

                        {/* Product Section */}
                        <div className='product-section'>
                            <h3>Sản phẩm</h3>
                            {productCart.length > 0 ? (
                                productCart.map((item, index) => (
                                    <div key={index} className='product-cart-item'>
                                        <div className='product-info'>
                                            <div className='product-img'>
                                                <img src={item.classifyDetail.Image ? item.classifyDetail.Image : item.ProductID.Image[0]} width='100px' height='100px' alt='Product' className='product-image' />
                                            </div>
                                            <div className='product-name'>
                                                <label>{item.ProductID.Name}</label>
                                                <span>Product Classification: {item.classifyDetail.Value1}, {item.classifyDetail.Value2}</span>
                                            </div>
                                            <div className='product-param'>
                                                <div className='unit-price'><span>Unit Price:</span> {formatCurrency(item.classifyDetail ? item.classifyDetail.Price : item.ProductID.Price)}</div>
                                                <div className='quantity'><span>Quantity:</span> {item.Quantity}</div>
                                                <div className='total-price'><span>Total Price:</span> {formatCurrency(item.TotalPrices)}</div>
                                            </div>
                                        </div>
                                        <div className='voucher'>
                                            <button className='voucher-btn'>
                                                <span>Select voucher</span>
                                            </button>
                                        </div>
                                        <div className='note'>
                                            <button className='voucher-btn'>
                                                <span>Select voucher</span>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div>No products in the cart</div>
                            )}
                        </div>

                        {/* Voucher Section */}
                        <div className='voucher-section'>
                            <h3>Chọn Voucher</h3>
                            {voucherList.length > 0 ? (
                                voucherList.map((voucher, index) => (
                                    <button
                                        key={index}
                                        disabled={!this.checkVoucherCondition(voucher)}
                                        onClick={() => this.handleVoucherSelect(voucher)}
                                        className={selectedVoucher && selectedVoucher.id === voucher.id ? 'selected' : ''}
                                    >
                                        {voucher.name} - {voucher.discount}
                                    </button>
                                ))
                            ) : (
                                <div>No vouchers available</div>
                            )}
                        </div>

                        {/* Delivery Information Section */}
                        <div className='delivery-information'>
                            <h3>Thông Tin Vận Chuyển</h3>
                            <select value={deliveryMethod} onChange={(e) => this.handleDeliveryMethodChange(e.target.value)}>
                                <option value=''>Select Delivery Method</option>
                                <option value='standard'>Standard Delivery</option>
                                <option value='express'>Express Delivery</option>
                            </select>
                        </div>

                        {/* Checkout Section */}
                        <div className='checkout'>
                            <h3>Thanh toán</h3>
                            <div>Tổng tiền hàng: {formatCurrency(totalAmount)}</div>
                            <div>
                                <button onClick={this.handleCheckout}>Đặt hàng</button>
                            </div>
                        </div>
                    </div>

                    {popupVisible && (
                        <CustomPopup
                            message={popupMessage}
                            type={popupType}
                            onClose={this.closePopup}
                            onConfirm={onConfirm}
                        />
                    )}
                    <AboutUs />
                    <FooterHomepage />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.customer.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Checkout));
