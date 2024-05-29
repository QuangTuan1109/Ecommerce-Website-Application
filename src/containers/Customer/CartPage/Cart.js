import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import HeaderHomepage from '../../HomePage/HeaderHomepage';
import AboutUs from '../../HomePage/Section/AboutUs'
import FooterHomepage from '../../HomePage/FooterHomepage';
import avt from '../../../assets/images/avatar.png'
import './Cart.scss';
import axios from '../../../axios'
import { formatCurrency } from '../../../method/handleMethod'

import { width } from '@fortawesome/free-solid-svg-icons/fa0';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 17,
            productCart: []
        };
    }

    componentDidMount() {
        this.fetchProductCart();
    }

    fetchProductCart() {
        axios.get(`http://localhost:5000/api/v1/order/cart`, {
            headers: {
                'Authorization': localStorage.getItem('accessToken')
            }
        })
            .then(res => this.setState({ productCart: res.data }))
    }

    handleQuantityChange = (amount) => {
        this.setState((prevState) => {
            const newQuantity = prevState.quantity + amount;
            return { quantity: newQuantity > 0 ? newQuantity : 1 };
        });
    };

    render() {
        const { productCart } = this.state;

        return (
            <div className='cart-container'>
                <div className='cart-header'>
                    <HeaderHomepage />
                </div>
                <div className='cart-body'>
                    <div className='cart-content'>
                        <div className='cart-header-row'>
                            <div class="product">Product</div>
                            <div class="unit-price">Unit Price</div>
                            <div class="quantity">Quantity</div>
                            <div class="total-price">Total Price</div>
                            <div class="action">Action</div>
                        </div>
                        <div className='cart-item'>
                            <div className='item-details'>
                                {productCart && productCart.map(item => (
                                    <div className='item-info'>
                                        <div className='product-info-basic'>
                                            <div className='product-img'>
                                                <img src={item.classifyDetail.Image ? item.classifyDetail.Image : item.ProductID.Image[0]} width='100px' height='100px' alt='Product' className='product-image' />
                                            </div>
                                            <div className='product-info'>
                                                <h3>{item.ProductID.Name}</h3>
                                                <span>Product Classification: {item.classifyDetail.Value1}, {item.classifyDetail.Value2}</span>
                                            </div>
                                        </div>
                                        <div className='pricing'>
                                            {/* <span className='original-price'>₫226.000</span> */}
                                            <span className='sale-price'>{formatCurrency(item.classifyDetail ? item.classifyDetail.Price : item.ProductID.Price)}</span>
                                        </div>
                                        <div className='quantity-control'>
                                            <button onClick={() => this.handleQuantityChange(-1)}>-</button>
                                            <span>{item.Quantity}</span>
                                            <button onClick={() => this.handleQuantityChange(1)}>+</button>
                                        </div>
                                        <div className='total-price'>{formatCurrency(item.TotalPrices)}</div>
                                        <div className='actions'>
                                            <button className='choose-item'>Choose</button>
                                            <button className='remove-item'>Delete</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='checkout-section'>
                                <button className='checkout-btn'>Buy</button>
                            </div>
                        </div>
                    </div>
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
