import React, { Component } from 'react';
import { withRouter, Prompt } from "react-router-dom";
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
            selectedDeliveryOptions: {},
            isBlocking: true,
            voucherShop: null
        };
    }

    componentDidMount() {
        const totalPayment = localStorage.getItem('totalPayment');
        const selectProductCart = localStorage.getItem('selectProductCart');

        if (totalPayment) {
            this.setState({ totalAmount: JSON.parse(totalPayment) });
        }
        if (selectProductCart) {
            this.setState({ productCart: JSON.parse(selectProductCart) });
        }

        if (selectProductCart) {
            // Parse productCart from localStorage
            const productCart = JSON.parse(selectProductCart);
            // Set default delivery method and fee for each product
            const updatedProductCart = productCart.map(item => ({
                ...item,
                deliveryMethod: item.ProductID.deliveryFee[0].name,
                deliveryFee: item.ProductID.deliveryFee[0].fee,
                totalAmountPerProduct: item.TotalPrices + item.ProductID.deliveryFee[0].fee,
            }));
            this.setState({ productCart: updatedProductCart });
        }

        window.addEventListener('beforeunload', this.handleBeforeUnload);
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.handleBeforeUnload);
        localStorage.removeItem('selectProductCart');
        localStorage.removeItem('totalPayment');
    }

    handleBeforeUnload = (event) => {
        if (this.state.isBlocking) {
            event.preventDefault();
            event.returnValue = '';
        }
    };

    handleLeavePage = (location) => {
        const userConfirmed = window.confirm("Bạn có chắc chắn muốn rời khỏi trang này? Giỏ hàng và thông tin thanh toán của bạn sẽ bị xóa.");
        if (userConfirmed) {
            localStorage.removeItem('selectProductCart');
            localStorage.removeItem('totalPayment');
            return true; // Cho phép điều hướng
        }
        return false; // Chặn điều hướng
    };

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

    handleDeliveryOptionChange = (e, productId, fee) => {
        const { value } = e.target;
        this.setState(prevState => ({
            productCart: prevState.productCart.map(item => {
                if (item.ProductID._id === productId) {
                    return {
                        ...item,
                        deliveryMethod: value,
                        deliveryFee: fee,
                        totalAmountPerProduct: item.TotalPrices + fee
                    };
                }
                return item;
            })
        }));
    };


    handleCheckout = () => {
        // Handle the checkout process
        const { address, productCart, selectedVoucher, deliveryMethod, selectedDeliveryOptions } = this.state;
        // Construct checkout data and send to API
        const checkoutData = {
            address,
            productCart,
            voucher: selectedVoucher,
            deliveryMethod,
            deliveryOptions: selectedDeliveryOptions
        };
        // Call the API to complete the checkout process
        axios.post(`http://localhost:5000/api/v1/order/checkout`, checkoutData, {
            headers: {
                'Authorization': localStorage.getItem('accessToken')
            }
        })
            .then(res => {
                this.setState({ isBlocking: false });
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
        const { popupVisible, popupMessage, popupType, onConfirm, address, productCart, voucherList, selectedVoucher, deliveryMethod, totalAmount, voucherShop } = this.state;
        console.log(productCart)

        return (
            <div className='checkout-container'>
                <Prompt
                    when={this.state.isBlocking}
                    message={(location) => this.handleLeavePage(location)}
                />
                <div className='checkout-header'>
                    <HeaderHomepage />
                </div>
                <div className='checkout-body'>
                    <div className='checkout-content'>
                        {/* Delivery Address Section */}
                        <div className='delivery-address-section'>
                            <h3>Địa Chỉ Nhận Hàng</h3>
                            <div>
                                {/* <input
                                    type="radio"
                                    name={`deliveryOption-${item.ProductID._id}`}
                                    value={deli.name}
                                    checked={item.deliveryMethod === deli.name}
                                    onChange={(e) => this.handleDeliveryOptionChange(e, item.ProductID._id, deli.fee)}
                                /> */}
                            </div>
                        </div>

                        {/* Product Section */}
                        <div className='product-section'>
                            <h3>Products</h3>
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
                                            <div className='note-part'>
                                                <label className='note-title'>Note: </label>
                                                <input type='text' placeholder='Note to seller...' />
                                            </div>
                                            <div className='delivery-part'>
                                                <span>Đơn vị vận chuyển</span>
                                                <div className='delivery-btn'>
                                                    {item.ProductID.deliveryFee.map((deli, index) => (
                                                        <label
                                                            key={index}
                                                            className={`delivery-option ${item.deliveryMethod === deli.name ? 'selected' : ''}`}
                                                        >
                                                            <input
                                                                type="radio"
                                                                name={`deliveryOption-${item.ProductID._id}`}
                                                                value={deli.name}
                                                                checked={item.deliveryMethod === deli.name}
                                                                onChange={(e) => this.handleDeliveryOptionChange(e, item.ProductID._id, deli.fee)}
                                                            />
                                                            {deli.name} : {formatCurrency(deli.fee)}
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='total-amount'>
                                            <div className='ingredient-price'>
                                                <div className='label-price'>
                                                    <label>The total amount ({item.Quantity} products):</label>
                                                </div>
                                                <div className='value-price'>
                                                    <span>{formatCurrency(item.TotalPrices)}</span>
                                                </div>
                                            </div>
                                            {/* {voucherShop && (
                                                <div className='ingredient-price'><p>The total amount: <span>{formatCurrency(item.TotalPrices)}</span></p></div>
                                            )} */}
                                            {item.deliveryMethod && (
                                                <div className='ingredient-price'>
                                                    <div className='label-price'>
                                                        <label>Transport fee: </label>
                                                    </div>
                                                    <div className='value-price'>
                                                        <span>{formatCurrency(item.deliveryFee)}</span>
                                                    </div>
                                                </div>
                                            )}
                                            <div className='ingredient-price'>
                                                <div className='label-price'>
                                                    <label>Total cost of goods: </label>
                                                </div>
                                                <div className='value-price'>
                                                    <span className='total-amount-product'>{formatCurrency(voucherShop
                                                        ? item.totalAmountPerProduct - voucherShop
                                                        : item.totalAmountPerProduct
                                                    )}</span>
                                                </div>
                                            </div>
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

                        {/* Total Amount Section */}
                        <div className='total-amount-section'>
                            <h3>Total Amount</h3>
                            <span>{formatCurrency(totalAmount)}</span>
                        </div>

                        {/* Checkout Button */}
                        <div className='checkout-button'>
                            <button onClick={this.handleCheckout}>Thanh Toán</button>
                        </div>
                    </div>
                    <div className='checkout-footer'>
                        <AboutUs />
                        <FooterHomepage />
                    </div>
                </div>
                {popupVisible && (
                    <CustomPopup
                        message={popupMessage}
                        type={popupType}
                        onConfirm={onConfirm}
                        onClose={this.closePopup}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.customer.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
    // Map your dispatch to props
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Checkout));

