import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import './Recommended.scss'
import axios from '../../../axios'

import { formatCurrency } from '../../../method/handleMethod'

class Recommended extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recommendation: []
        };
    }


    async recommendation() {
        try {
            const fetchProductRecommend = await axios.post('http://localhost:5000/api/v1/products/recommendation', {}, {
                headers: {
                    'Authorization': `${localStorage.getItem('accessToken')}`
                }
            })
            this.setState({ recommendation: fetchProductRecommend })
        } catch (error) {
            console.error("Error:", error);
        }
    }


    componentDidMount() {
        this.recommendation();
    }

    render() {
        const { recommendation } = this.state
        console.log(recommendation)
        return (
            <div className='recommend-section'>
                <div className='title-recommended'>
                    <span> Recommended For You</span>
                </div>
                <div className='grid-recommended-section'>
                    {recommendation && (
                        recommendation.map(item => (
                            <div className='product-card'>
                                <div className='product-image'>
                                    <Link to={`/product/detail/${item._id}`} className='image-link-product'>
                                        <img src={item.Image[0]} alt={item.Name} className='image' />
                                    </Link>
                                    {item.DiscountValue && (
                                        <span className='product-discount-label'>{item.DiscountValue}</span>
                                    )}
                                    <ul className='product-link'>
                                        <li><Link to='/' data-tip='Add to wishlist' className='detail-component'><i class="fas fa-heart"></i></Link></li>
                                        <li><Link to='/' data-tip='View store' className='detail-component'><i class="fa fa-random"></i></Link></li>
                                        <li><Link to={`/product/detail/${item._id}`} data-tip='View detail' className='detail-component'><i class="fa fa-search"></i></Link></li>
                                    </ul>
                                </div>
                                <div className='product-content'>
                                    <ul className='rating'>
                                        {[...Array(5)].map((star, i) => (
                                            <li key={i} className={i < item.Rating ? 'fas fa-star' : 'far fa-star'}></li>
                                        ))}
                                    </ul>
                                    <h3 className='product-name'><Link to='/' className='name'>{item.Name}</Link></h3>
                                    {item.Price ? (
                                                <div className='product-price'>{formatCurrency(item.Price)}</div>
                                            ) : (
                                                <div className='product-price'>{item.PriceRange}</div>
                                            )}
                                    <Link to='/' className='add-to-cart'>Add to cart</Link>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <div className='button-see-more'>
                    <Link to='/' className='button'>See more</Link>
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
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Recommended);
