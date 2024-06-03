import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import HeaderHomepage from '../../HomePage/HeaderHomepage';
import AboutUs from '../../HomePage/Section/AboutUs';
import FooterHomepage from '../../HomePage/FooterHomepage';
import './Cart.scss';
import axios from '../../../axios';
import { formatCurrency } from '../../../method/handleMethod';
import CustomPopup from '../../../components/CustomPopup';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productCart: [],
            selectProductCart: [],
            totalPayment: 0,
            popupType: '',
            onConfirm: null
        };
    }

    componentDidMount() {
        localStorage.removeItem('selectProductCart');
        this.fetchProductCart();
        const selectProductCartFromStorage = localStorage.getItem('selectProductCart');
        if (selectProductCartFromStorage && !this.props.selectedProductsFromProps) {
            const selectProductCart = JSON.parse(selectProductCartFromStorage);
            this.setState({ selectProductCart });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.selectProductCart !== this.state.selectProductCart) {
            localStorage.setItem('selectProductCart', JSON.stringify(this.state.selectProductCart));
        }
    }

    fetchProductCart() {
        axios.get(`http://localhost:5000/api/v1/order/cart`, {
            headers: {
                'Authorization': localStorage.getItem('accessToken')
            }
        })
            .then(res => {
                if (res) {
                    this.setState({ productCart: res.data });
                } else {
                    this.setState({ productCart: [] });
                }
            })
            .catch(error => {
                console.error('Error fetching cart items:', error);
            });
    }

    handleDeleteProductCart(productId, classifyDetail) {
        axios.delete(`http://localhost:5000/api/v1/order/cart/${productId}`, {
            headers: {
                'Authorization': localStorage.getItem('accessToken'),
            },
            data: { classifyDetail }
        })
            .then(res => {
                this.showPopup('Product saved successfully!', 'successful', this.handleSuccess);
                this.setState(prevState => ({
                    productCart: prevState.productCart.filter(item => !(classifyDetail ? item.ProductID._id === productId
                        && item.classifyDetail.Value1 === classifyDetail.Value1 
                        && item.classifyDetail.Value2 === classifyDetail.Value2 : item.ProductID._id === productId))
                }));
            })
            .catch(error => {
                this.showPopup('Failed to delete product.', 'error', this.handleFailure);
            });
    }

    handleChooseProductCart(product) {
        this.setState(prevState => {
            const selectProductCart = [...prevState.selectProductCart];
            let totalPayment = prevState.totalPayment;

            const productIndex = selectProductCart.findIndex(item => product.classifyDetail ? 
                item.ProductID._id === product.ProductID._id 
                && item.classifyDetail.Value1 === product.classifyDetail.Value1 
                && item.classifyDetail.Value2 === product.classifyDetail.Value2 
                : item.ProductID._id === product.ProductID._id);
            if (productIndex === -1) {
                selectProductCart.push(product);
                totalPayment += product.TotalPrices;
            } else {
                selectProductCart.splice(productIndex, 1);
                totalPayment -= product.TotalPrices;
            }

            return { selectProductCart, totalPayment };
        });
    }

    handleBuyProductCart() {
        const { selectProductCart, totalPayment } = this.state;
    
        if (selectProductCart.length > 0) {
            localStorage.setItem('selectProductCart', JSON.stringify(selectProductCart));
            localStorage.setItem('totalPayment', totalPayment.toString());
    
            this.props.history.push('/checkout');
        } else {
            this.showPopup('No products selected for checkout.', 'error', this.handleFailure);
        }
    }

    handleQuantityChange = (amount) => {
        this.setState((prevState) => {
            const newQuantity = prevState.quantity + amount;
            return { quantity: newQuantity > 0 ? newQuantity : 1 };
        });
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
        const { productCart, selectProductCart, totalPayment, popupVisible, popupMessage, popupType, onConfirm } = this.state;

        console.log(selectProductCart)
        return (
            <div className='cart-container'>
                <div className='cart-header'>
                    <HeaderHomepage />
                </div>
                <div className='cart-body'>
                    {productCart.length !== 0 ? (
                        <div className='cart-content'>
                            <div className='cart-header-row'>
                                <div className="product">Product</div>
                                <div className="unit-price">Unit Price</div>
                                <div className="quantity">Quantity</div>
                                <div className="total-price">Total Price</div>
                                <div className="action">Action</div>
                            </div>
                            <div className='cart-item'>
                                <div className='item-details'>
                                    {productCart && productCart.map(item => (
                                        <div
                                            key={`${item.ProductID._id}-${item.classifyDetail.Value1}-${item.classifyDetail.Value2}`}
                                            className={`item-info ${selectProductCart.find(selectedItem =>  selectedItem.classifyDetail ?
                                                selectedItem.ProductID._id === item.ProductID._id 
                                                    && selectedItem.classifyDetail.Value1 === item.classifyDetail.Value1 
                                                    && selectedItem.classifyDetail.Value2 === item.classifyDetail.Value2
                                                : selectedItem.ProductID._id === item.ProductID._id ) ? 'selected-item' : ''}`}
                                        >
                                            <div className={`product-info-basic ${selectProductCart.find(selectedItem =>  selectedItem.classifyDetail ?
                                                selectedItem.ProductID._id === item.ProductID._id 
                                                    && selectedItem.classifyDetail.Value1 === item.classifyDetail.Value1 
                                                    && selectedItem.classifyDetail.Value2 === item.classifyDetail.Value2
                                                : selectedItem.ProductID._id === item.ProductID._id ) ? 'selected-item' : ''}`}>
                                                <div className='product-img'>
                                                    <img src={item.classifyDetail.Image ? item.classifyDetail.Image : item.ProductID.Image[0]} width='100px' height='100px' alt='Product' className='product-image' />
                                                </div>
                                                <div className='product-info'>
                                                    <h3>{item.ProductID.Name}</h3>
                                                    <span>Product Classification: {item.classifyDetail.Value1}, {item.classifyDetail.Value2}</span>
                                                </div>
                                            </div>
                                            <div className='pricing'>
                                                <span className='sale-price'>{formatCurrency(item.classifyDetail ? item.classifyDetail.Price : item.ProductID.Price)}</span>
                                            </div>
                                            <div className='quantity-control'>
                                                <button onClick={() => this.handleQuantityChange(-1)}>-</button>
                                                <span>{item.Quantity}</span>
                                                <button onClick={() => this.handleQuantityChange(1)}>+</button>
                                            </div>
                                            <div className='total-price'>{formatCurrency(item.TotalPrices)}</div>
                                            <div className='actions'>
                                                <button className='choose-item' onClick={() => this.handleChooseProductCart(item)}>{selectProductCart.find(selectedItem => 
                                                selectedItem.classifyDetail ?
                                                selectedItem.ProductID._id === item.ProductID._id 
                                                    && selectedItem.classifyDetail.Value1 === item.classifyDetail.Value1 
                                                    && selectedItem.classifyDetail.Value2 === item.classifyDetail.Value2
                                                : selectedItem.ProductID._id === item.ProductID._id ) ? 'Unselect' : 'Select'}</button>
                                                <button className='remove-item' onClick={() => this.handleDeleteProductCart(item.ProductID._id, item.classifyDetail)} >Remove</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className='checkout-section'>
                                    <div className='checkout-information'>
                                        <label><span>({selectProductCart.length})</span> Product Selected</label>
                                    </div>
                                    <div className='checkout-payment'>
                                        <label>Total Payment ({selectProductCart.length}) Product Selected: <span>{formatCurrency(totalPayment)}</span></label>
                                        <button className='checkout-btn' onClick={() => this.handleBuyProductCart()}>Buy</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="no-products">There are no products listed for your cart yet.</div>
                    )}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));
