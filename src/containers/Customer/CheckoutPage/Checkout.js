import React, { Component } from 'react';
import { withRouter, Prompt } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import CryptoJS from 'crypto-js';

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
            productCart: [],
            voucherList: [],
            selectedVoucher: [],
            deliveryMethod: '',
            totalAmount: 0,
            selectedDeliveryOptions: {},
            isBlocking: true,
            showVoucherPopup: {},
        };
        this.currentPopupIndex = null;
    }

    componentDidMount() {
        const encryptedData = localStorage.getItem('encryptedData');

        // Giải mã dữ liệu bằng AES với privateKey
        const bytes = CryptoJS.AES.decrypt(encryptedData, 'lequangtuan1109');
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        // Sử dụng dữ liệu đã giải mã
        const { selectProductCart, totalPayment } = decryptedData;

        if (totalPayment) {
            this.setState({ totalAmount: JSON.parse(totalPayment) });
        }
        if (selectProductCart) {
            this.setState({ productCart: selectProductCart });
        }

        if (selectProductCart) {
            const productCart = selectProductCart;
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
        localStorage.removeItem('encryptedData');
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
            localStorage.removeItem('encryptedData');
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

    handleVoucherSelect = (customer, voucher, sellerId, productId, classifyDetail) => {
        const { selectedVoucher } = this.state;
    
        // Tìm thông tin về việc sử dụng voucher hiện tại của khách hàng
        const currentUsageByIndex = customer.usageHistory.find(item => item.voucherId === voucher._id);
        let currentUsage = currentUsageByIndex ? currentUsageByIndex.currentUsage : 0;
    
        // Tạo một đối tượng voucher mới để lưu vào local storage và thêm vào mảng selectedVoucher
        const newVoucher = {
            customerID: customer._id,
            Voucher: voucher,
            sellerID: sellerId,
            currentUsage: currentUsage
        };
    
        // Khóa bí mật để mã hóa dữ liệu
        const privateKey = 'lequangtuan1109';
    
        // Tìm vị trí của sản phẩm trong mảng selectedVoucher
        const index = selectedVoucher.findIndex(item => item.productId === productId && item.classifyDetail === classifyDetail);
    
        // Tạo một mảng updatedSelectedVoucher để lưu các cập nhật
        const updatedSelectedVoucher = [...selectedVoucher];
    
        // Kiểm tra nếu voucher này đã được sử dụng ở bất kỳ sản phẩm nào của cùng một cửa hàng
        let voucherUsedInSameSeller = false;
        updatedSelectedVoucher.forEach(item => {
            item.vouchers.forEach(v => {
                if (v.Voucher._id === voucher._id && v.sellerID === sellerId) {
                    voucherUsedInSameSeller = true;
                    currentUsage = Math.max(currentUsage, v.currentUsage); // Lấy số lần sử dụng lớn nhất
                }
            });
        });
    
        if (index !== -1) {
            // Sản phẩm đã tồn tại trong selectedVoucher
            const productVoucherIndex = updatedSelectedVoucher[index].vouchers.findIndex(v => v.Voucher._id === voucher._id);
    
            if (productVoucherIndex !== -1) {
                // Nếu voucher đã được chọn trước đó, hủy bỏ nó
                updatedSelectedVoucher[index].vouchers.splice(productVoucherIndex, 1);
                newVoucher.currentUsage = currentUsage - 1; // Giảm số lần sử dụng
            } else {
                // Nếu voucher chưa được chọn trước đó, thêm nó vào mảng
                if (currentUsage >= voucher.maxUsagePerUser) {
                    this.showPopup('Bạn đã hết lượt sử dụng voucher.', 'error', this.handleFailure);
                }else {
                    newVoucher.currentUsage = currentUsage + 1; // Tăng số lần sử dụng
                    updatedSelectedVoucher[index].vouchers.push(newVoucher);
                }
            }
        } else {
            // Nếu sản phẩm chưa được chọn voucher trước đó, tạo một mảng mới và thêm voucher vào đó
            if (currentUsage >= voucher.maxUsagePerUser) {
                this.showPopup('Bạn đã hết lượt sử dụng voucher.', 'error', this.handleFailure);
            } else {
                newVoucher.currentUsage = currentUsage + 1;
        
                const initialSelectedVoucher = {
                    productId: productId,
                    classifyDetail: classifyDetail,
                    vouchers: [newVoucher]
                };
        
                // Thêm sản phẩm mới vào updatedSelectedVoucher
                updatedSelectedVoucher.push(initialSelectedVoucher);
            }
        }
    
        // Cập nhật currentUsage cho tất cả các sản phẩm thuộc cùng một người bán và voucher
        updatedSelectedVoucher.forEach(item => {
            item.vouchers.forEach(v => {
                if (v.Voucher._id === voucher._id && v.sellerID === sellerId) {
                    v.currentUsage = newVoucher.currentUsage;
                }
            });
        });
    
        // Cập nhật state với mảng selectedVoucher đã cập nhật
        this.setState({ selectedVoucher: updatedSelectedVoucher });
    
        // Cập nhật và lưu dữ liệu đã mã hóa vào local storage
        const dataToEncrypt = JSON.stringify({ selectedVoucher: updatedSelectedVoucher });
        const encryptedData = CryptoJS.AES.encrypt(dataToEncrypt, privateKey).toString();
        localStorage.setItem('encryptedVoucher', encryptedData);
    }
    
    
    
    

    handleDeliveryMethodChange = (method) => {
        this.setState({ deliveryMethod: method });
    }

    handleDeliveryOptionChange = (e, productId, classifyDetail, fee) => {
        const { value } = e.target;
        this.setState(prevState => ({
            productCart: prevState.productCart.map(item => {
                const isMatchingProduct = classifyDetail
                    ? item.ProductID._id === productId &&
                    item.classifyDetail.Value1 === classifyDetail.Value1 &&
                    item.classifyDetail.Value2 === classifyDetail.Value2
                    : item.ProductID._id === productId;

                if (isMatchingProduct) {
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

    toggleVoucherPopup = (index) => {
        const { productCart, showVoucherPopup, currentPopupIndex } = this.state;
        const updatedShowVoucherPopup = { ...showVoucherPopup };
        updatedShowVoucherPopup[index] = currentPopupIndex === index ? !updatedShowVoucherPopup[index] : true;
        this.setState({ showVoucherPopup: updatedShowVoucherPopup, currentPopupIndex: index });

        const product = productCart[index];
        if (product && !product.voucherList) {
            const sellerId = product.ProductID.SellerID;
            axios.get(`http://localhost:5000/api/v1/promotion/get-voucher-seller/${sellerId}`)
                .then(res => {
                    const updatedProductCart = [...this.state.productCart];
                    updatedProductCart[index].voucherList = res.data;
                    this.setState({ productCart: updatedProductCart });
                })
                .catch(error => console.error(error));
        }
    };


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
        const { popupVisible, popupMessage, popupType, onConfirm, productCart, voucherList, selectedVoucher, deliveryMethod, totalAmount, showVoucherPopup } = this.state;

        console.log(selectedVoucher)
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
                                productCart.map((item, index) => {
                                    const productVouchers = selectedVoucher.find(v => v.classifyDetail ? v.productId === item.ProductID._id
                                        && v.classifyDetail.Value1 === item.classifyDetail.Value1
                                        && v.classifyDetail.Value2 === item.classifyDetail.Value2
                                        : v.productId === item.ProductID._id);

                                    return (
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
                                                    <div className='unit-price'><span>Unit Price:</span>{formatCurrency(item.TotalPrices)}</div>
                                                    <div className='quantity'><span>Quantity:</span> {item.Quantity}</div>
                                                    <div className='total-price'><span>Total Price:</span> {formatCurrency(item.TotalPrices)}</div>
                                                </div>
                                            </div>
                                            <div className="voucher">
                                                {productVouchers && productVouchers.vouchers.map((itemVoucher, voIndex) => (
                                                    <div key={voIndex} className='selected-voucher'>
                                                        <FontAwesomeIcon icon={faTag} />
                                                        <span>-{itemVoucher.Voucher.discountType === 'amount' ?
                                                            formatCurrency(itemVoucher.Voucher.discountValue) :
                                                            `${itemVoucher.Voucher.discountValue}%`}</span>
                                                    </div>
                                                ))}
                                                <button className='voucher-btn' onClick={() => this.toggleVoucherPopup(index)}>
                                                    <span>Select voucher</span>
                                                </button>
                                                {showVoucherPopup && index === this.state.currentPopupIndex && (
                                                    <div className="voucher-popup">
                                                        <div className="voucher-header">
                                                            <h3>Voucher Shop</h3>
                                                            <span className="close-btn" onClick={this.toggleVoucherPopup}>&times;</span>
                                                        </div>
                                                        {item.voucherList && item.voucherList.length > 0 ? (
                                                            item.voucherList.map((voucher, voucherIndex) => {
                                                                const isDisabled = voucher.status === 'Disabled' ||
                                                                    (voucher.discountType === 'amount' && voucher.minOrderAmount > item.TotalPrices) ||
                                                                    (item.CustomerID.usageHistory.some(history => {
                                                                        return history.voucherId.toString() === voucher._id && history.currentUsage === voucher.maxUsagePerUser;
                                                                    })) ||
                                                                    (voucher.discountType === 'percentage' && (item.TotalPrices - item.TotalPrices * voucher.discountValue / 100) > voucher.maxReduction) ||
                                                                    (productVouchers && productVouchers.vouchers.some(selected => selected.Voucher.typeCode === voucher.typeCode && selected.Voucher._id !== voucher._id)) ||
                                                                    ((item.totalAmountPerProduct - item.TotalPrices * (voucher.discountType === 'amount' ? 1 : (1 - voucher.discountValue / 100))) < 0);

                                                                return (
                                                                    <div key={voucherIndex} className={`voucher-item ${isDisabled ? 'disabled' : ''}`}>
                                                                        <div className="voucher-info">
                                                                            <div className='voucher-img'>
                                                                                <img src={voucher.image} width='100px' height='100%' alt='voucher' className='product-image' />
                                                                            </div>
                                                                            <div className='voucher-detail'>
                                                                                <span className="voucher-name">{voucher.nameVoucher}</span>
                                                                                <span className='voucher-value'>Discount {voucher.discountType === 'amount' ?
                                                                                    formatCurrency(voucher.discountValue) :
                                                                                    `${voucher.discountValue}%`}</span>
                                                                                <span className="voucher-conditions">Simple to minimal {formatCurrency(voucher.minOrderAmount)}</span>
                                                                            </div>
                                                                        </div>
                                                                        <button
                                                                            className={`voucher-select-btn ${productVouchers && productVouchers.vouchers.some(selected => selected.Voucher._id === voucher._id) ? 'cancel' : ''}`}
                                                                            onClick={() => this.handleVoucherSelect(item.CustomerID, voucher, item.ProductID.SellerID, item.ProductID._id, item.classifyDetail)}
                                                                            disabled={isDisabled}
                                                                        >
                                                                            {productVouchers && productVouchers.vouchers.some(selected => selected.Voucher._id === voucher._id) ? 'Hủy' : 'Dùng'}
                                                                        </button>
                                                                    </div>
                                                                );
                                                            })
                                                        ) : (
                                                            <div className='no-voucher'>The shop doesn't have vouchers yet</div>
                                                        )}

                                                    </div>
                                                )}
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
                                                                    onChange={(e) => this.handleDeliveryOptionChange(e, item.ProductID._id, item.classifyDetail, deli.fee)}
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
                                                {productVouchers && productVouchers.vouchers && productVouchers.vouchers.length > 0 && (
                                                    <div className='ingredient-price'>
                                                        <div className='label-price'>
                                                            <label>Discount:</label>
                                                        </div>
                                                        <div className='value-price'>
                                                            {productVouchers.vouchers.map((itemVoucher, index) => (
                                                                <span key={index}>
                                                                    -{itemVoucher.Voucher.discountType === 'amount'
                                                                        ? formatCurrency(itemVoucher.Voucher.discountValue)
                                                                        : `${itemVoucher.Voucher.discountValue}%`}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
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
                                                        <span className='total-amount-product'>{formatCurrency(productVouchers
                                                            ? item.totalAmountPerProduct - productVouchers.vouchers.reduce((totalDiscount, voucher) => {
                                                                return totalDiscount + (voucher.Voucher.discountType === 'amount' ? voucher.Voucher.discountValue : (item.TotalPrices * voucher.Voucher.discountValue / 100));
                                                            }, 0)
                                                            : item.totalAmountPerProduct
                                                        )}</span>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )

                                })
                            ) : (
                                <div>No products in the cart</div>
                            )}
                        </div>

                        {/* Voucher Section */}
                        <div className='voucher-section'>
                            <h3>Chọn Voucher</h3>
                            {/* {voucherList.length > 0 ? (
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
                            )} */}
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

