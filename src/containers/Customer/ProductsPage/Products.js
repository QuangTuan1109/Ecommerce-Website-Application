import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HeaderHomepage from '../../HomePage/HeaderHomepage';
import AboutUs from '../../HomePage/Section/AboutUs';
import FooterHomepage from '../../HomePage/FooterHomepage';
import './Products.scss';
import CardComponent from '../../../components/CardComponent';
import { connect } from 'react-redux';
import withProductFetching from '../../../hoc/withProductFetching';

class Products extends Component {
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    render() {
        const { products, category, value, handleClick } = this.props;

        return (
            <div className='product-container'>
                <div className='product-header'>
                    <HeaderHomepage />
                </div>
                <div className='product-body'>
                    <div className='product-page'>
                        <div className='product-page-title'>
                            <ul className='option'>
                                <li><span>Welcome everyone to Shopspace</span></li>
                                <li><span>You can find good products here.</span></li>
                                <li><span>Wish you have a good experience.</span></li>
                            </ul>
                        </div>
                        <div className='product-page-content'>
                            <div className='header-result-filter'>
                                <div className='sorted-part'>
                                    <span>Sorted by: </span>
                                    <div className='btn-filter'><Link to='/' className='button'>Popular</Link></div>
                                    <div className='btn-filter'><Link to='/' className='button'>Latest</Link></div>
                                    <div className='btn-filter'><Link to='/' className='button'>Bestseller</Link></div>
                                    <select value={value} onChange={this.handleChange}>
                                        <option value='all prices'>All Prices</option>
                                        <option value='low to high'>From low to high</option>
                                        <option value='high to low'>From high to low</option>
                                    </select>
                                </div>
                            </div>
                            <div className='left-result-filter'>
                                <div className='categories-filter'>
                                    <Link to='/' className='filter-title'><i className="fa fa-bars"></i>All Categories</Link>
                                    <div className='sub-categories'>
                                        {category.map((cate, index) => (
                                            <Link key={index} className='detail-category' onClick={() => handleClick(cate.id)}>{cate.name}</Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className='show-products-card'>
                                {products.map((product, index) => (
                                    <CardComponent key={index} item={product} />
                                ))}
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

const mapStateToProps = state => ({
    isLoggedIn: state.customer.isLoggedIn
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(withProductFetching(Products));
