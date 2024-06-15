import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import HeaderHomepage from '../../HomePage/HeaderHomepage';
import AboutUs from '../../HomePage/Section/AboutUs'
import FooterHomepage from '../../HomePage/FooterHomepage';
import './Products.scss';
import axios from '../../../axios'

import { formatCurrency } from '../../../method/handleMethod'


class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            category: [],
            value: 'all prices',
            page: 1,
            hasMore: true,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        this.fetchProductByCategory();
        this.fetchAllSubCategory();
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }


    fetchProductByCategory() {
        const { id } = this.props.match.params;
        const { page } = this.state;

        axios.get(`http://localhost:5000/api/v1/products/${id}?page=${page}&limit=20`)
            .then(response => {
                const newProducts = response.products;
                const hasMore = newProducts.length > 0;
                this.setState(prevState => ({
                    products: [...prevState.products, ...newProducts],
                    hasMore,
                    page: prevState.page + 1
                }));
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    fetchAllSubCategory() {
        const { id } = this.props.match.params;
        axios.get(`http://localhost:5000/api/v1/products/categories/subcategories/${id}`)
            .then(response => this.setState({ category: response.data }))
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    handleClick(categoryId) {
        axios.get(`http://localhost:5000/api/v1/products/${categoryId}?page=1&limit=20`)
            .then(response => {
                if (response) {
                    this.setState({ 
                        products: response.products,
                        page: 1,
                        hasMore: true
                    });
                } else {
                    this.setState({ products: [] })
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleScroll() {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && this.state.hasMore) {
            this.fetchProductByCategory();
        }
    }

    render() {
        const { products, category } = this.state;

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
                                    <select value={this.state.value} onChange={this.handleChange}>
                                        <option value='all price'>All Prices</option>
                                        <option value='low to high'>From low to high</option>
                                        <option value='high to low'>From high to low</option>
                                    </select>
                                </div>
                            </div>
                            <div className='left-result-filter'>
                                <div className='categories-filter'>
                                    <Link to='/' className='filter-title'><i className="fa fa-bars"></i>All Categories</Link>
                                    <Link onClick={() => this.handleClick(this.props.match.params.id)} className='main-category'>{this.props.match.params.catName}</Link>
                                    {category.map((cate, index) => (
                                        <Link key={index} className='detail-category' onClick={() => this.handleClick(cate.id)}>{cate.name}</Link>
                                    ))}
                                </div>
                                <div className='searching-filter'>
                                    <form className='form-filter'>
                                        <Link to='/' className='filter-title'><i className="fa fa-filter"></i>Searching Filter</Link>
                                        <Link to='/' className='filter-by-name'>Selling Place</Link>
                                        <div className='place-checkbox'>
                                            <input className='check-input' type='checkbox' name='place' value={'Đồng Nai'} />
                                            <label>Đồng Nai</label>
                                        </div>
                                        <div className='place-checkbox'>
                                            <input className='check-input' type='checkbox' name='place' value={'Đồng Nai'} />
                                            <label>Đồng Nai</label>
                                        </div>
                                        <div className='place-checkbox'>
                                            <input className='check-input' type='checkbox' name='place' value={'Đồng Nai'} />
                                            <label>Đồng Nai</label>
                                        </div>
                                        <div className='place-checkbox'>
                                            <input className='check-input' type='checkbox' name='place' value={'Đồng Nai'} />
                                            <label>Đồng Nai</label>
                                        </div>
                                        <div className='place-checkbox'>
                                            <input className='check-input' type='checkbox' name='place' value={'Đồng Nai'} />
                                            <label>Đồng Nai</label>
                                        </div>
                                        <div className='place-checkbox'>
                                            <input className='check-input' type='checkbox' name='place' value={'Đồng Nai'} />
                                            <label>Đồng Nai</label>
                                        </div>
                                        <div className='place-checkbox'>
                                            <input className='check-input' type='checkbox' name='place' value={'Đồng Nai'} />
                                            <label>Đồng Nai</label>
                                        </div>
                                        <div className='place-checkbox'>
                                            <input className='check-input' type='checkbox' name='place' value={'Đồng Nai'} />
                                            <label>Đồng Nai</label>
                                        </div>
                                        <div className='place-checkbox'>
                                            <input className='check-input' type='checkbox' name='place' value={'Đồng Nai'} />
                                            <label>Đồng Nai</label>
                                        </div>
                                        <div className='place-checkbox'>
                                            <input className='check-input' type='checkbox' name='place' value={'Đồng Nai'} />
                                            <label>Đồng Nai</label>
                                        </div>
                                        <Link to='/' className='filter-by-name'>Brands</Link>
                                        <div className='place-checkbox'>
                                            <input className='check-input' type='checkbox' name='place' value={'Gucci'} />
                                            <label>Gucci</label>
                                        </div>
                                        <div className='place-checkbox'>
                                            <input className='check-input' type='checkbox' name='place' value={'Gucci'} />
                                            <label>Gucci</label>
                                        </div>
                                        <div className='place-checkbox'>
                                            <input className='check-input' type='checkbox' name='place' value={'Gucci'} />
                                            <label>Gucci</label>
                                        </div>
                                        <div className='place-checkbox'>
                                            <input className='check-input' type='checkbox' name='place' value={'Gucci'} />
                                            <label>Gucci</label>
                                        </div>
                                        <div className='place-checkbox'>
                                            <input className='check-input' type='checkbox' name='place' value={'Gucci'} />
                                            <label>Gucci</label>
                                        </div>
                                        <div className='place-checkbox'>
                                            <input className='check-input' type='checkbox' name='place' value={'Gucci'} />
                                            <label>Gucci</label>
                                        </div>
                                        <Link to='/' className='filter-by-name'>Prices</Link>
                                        <div className='price-input'>
                                            <input className='prices-input' type='text' name='price' placeholder='From' />
                                            <div className='horizontial-line' />
                                            <input className='prices-input' type='text' name='price' placeholder='To' />
                                        </div>
                                        <div className='btn-price'><Link to='/' className='button'>Apply</Link></div>
                                        <Link to='/' className='filter-by-name'>Status</Link>
                                        <div className='place-checkbox'>
                                            <input className='check-input' type='checkbox' name='place' value={'Used'} />
                                            <label>Used</label>
                                        </div>
                                        <div className='place-checkbox'>
                                            <input className='check-input' type='checkbox' name='place' value={'New'} />
                                            <label>New</label>
                                        </div>
                                        <div className='btn-filter'><Link to='/' className='button'>Delete All</Link></div>
                                    </form>
                                </div>
                            </div>
                            <div className='show-products-card'>
                                {products.map((product, index) => (
                                    <div key={index} className='product-card'>
                                        <div className='product-image'>
                                            <Link to={`/product/detail/${product._id}`} className='image-link-product'>
                                                <img src={product.Image[0]} alt={product.Name} className='image' />
                                            </Link>
                                            {product.DiscountValue !== 0 && (
                                                <span className='product-discount-label'>-{product.DiscountValue}</span>
                                            )}
                                            <ul className='product-link'>
                                                <li><Link to='/' data-tip='Add to wishlist' className='detail-component'><i className="fas fa-heart"></i></Link></li>
                                                <li><Link to='/' data-tip='View store' className='detail-component'><i className="fa fa-random"></i></Link></li>
                                                <li><Link to={`/product/detail/${product._id}`} data-tip='View detail' className='detail-component'><i className="fa fa-search"></i></Link></li>
                                            </ul>
                                        </div>
                                        <div className='product-content'>
                                            <ul className='rating'>
                                                {[...Array(5)].map((star, i) => (
                                                    <li key={i} className={i < product.Rating ? 'fas fa-star' : 'far fa-star'}></li>
                                                ))}
                                            </ul>
                                            <h3 className='product-name'><Link to='/' className='name'>{product.Name}</Link></h3>
                                            {product.Price ? (
                                                <div className='product-price'>{formatCurrency(product.Price)}</div>
                                            ) : (
                                                <div className='product-price'>{product.PriceRange}</div>
                                            )}
                                            <Link to='/' className='add-to-cart'>Add to cart</Link>
                                        </div>
                                    </div>
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

const mapStateToProps = state => {
    return {
        isLoggedIn: state.customer.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);