import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import HeaderHomepage from '../../HomePage/HeaderHomepage';
import AboutUs from '../../HomePage/Section/AboutUs';
import FooterHomepage from '../../HomePage/FooterHomepage';
import './Products.scss';
import CardComponent from '../../../components/CardComponent';
import withProductFetching from '../../../hoc/withProductFetching';

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            productsPerPage: 16 // Số sản phẩm trên mỗi trang
        };
    }

    handlePageChange = ({ selected }) => {
        this.setState({
            currentPage: selected
        });
    };

    render() {
        const { products, category, value, handleClick } = this.props;
        const { currentPage, productsPerPage } = this.state;

        // Logic để tính chỉ số bắt đầu và kết thúc của sản phẩm trên mỗi trang
        const indexOfLastProduct = (currentPage + 1) * productsPerPage;
        const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
        const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

        return (
            <div key={currentPage} className='product-container'> {/* Đặt key cho component */}
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
                                {currentProducts.map((product, index) => (
                                    <CardComponent key={index} item={product} />
                                ))}
                            </div>
                            <ReactPaginate
                                pageCount={Math.ceil(products.length / productsPerPage)}
                                pageRangeDisplayed={5}
                                marginPagesDisplayed={2}
                                previousLabel={<FontAwesomeIcon icon={faAngleLeft} />}
                                nextLabel={<FontAwesomeIcon icon={faAngleRight} />}
                                breakLabel={'...'}
                                onPageChange={this.handlePageChange}
                                containerClassName={'pagination'}
                                activeClassName={'active'}
                                forcePage={currentPage}
                            />
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
