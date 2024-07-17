import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './CardComponent.scss';
import { formatCurrency } from '../method/handleMethod'

class CardComponent extends Component {

    constructor(props) {
        super(props);
        this.acceptBtnRef = React.createRef();
    }

    initialState = {
    };

    state = {
        ...this.initialState
    };

    render() {
        const { item } = this.props;

        return (
            <div className='product-card'>
                <div className='product-image'>
                    <Link to={`/product/detail/${item._id}`} className='image-link-product'>
                        <img src={item.Image[0]} alt={item.Name} className='image' />
                    </Link>
                    {item.DiscountValue !== 0 && (
                        <span className='product-discount-label'>- {item.DiscountValue}</span>
                    )}
                    <ul className='product-link'>
                        <li><Link to='/' data-tip='Add to wishlist' className='detail-component'><i className="fas fa-heart"></i></Link></li>
                        <li><Link to='/' data-tip='View store' className='detail-component'><i className="fa fa-random"></i></Link></li>
                        <li><Link to={`/product/detail/${item._id}`} data-tip='View detail' className='detail-component'><i className="fa fa-search"></i></Link></li>
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
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardComponent);
