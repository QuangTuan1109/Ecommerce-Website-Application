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
            value: 'all prices'
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.fetchProductByCategory();
        this.fetchAllSubCategory()
    }

    fetchProductByCategory() {
        const { id } = this.props.match.params;
        axios.get(`http://localhost:5000/api/v1/products/${id}`)
            .then(response => this.setState({ products: response }))
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
        console.log("a")
        axios.get(`http://localhost:5000/api/v1/products/${categoryId}`)
            .then(response => {
                if (response) {
                    this.setState({ products: response })
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

    render() {
        const { products, category } = this.state;
        console.log(products)
        console.log(category)

        return (
            <div className='product-container'>
                <div className='product-header'>
                    <HeaderHomepage />
                </div>
                <div className='product-body'>
                    <div className='product-page'>
                        <div className='product-page-title'>
                            <ul className='option'>
                                <li><span>Welcome everyone to E-Shopping</span></li>
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
                                <div className='paging-part'>
                                    <div className='controller-num-state'>
                                        <span className='controller-current-state'>1</span>
                                        /
                                        <span className='controller-total-state'>9</span>
                                    </div>
                                    <button className='prev-btn' disabled><i class="fa-sharp fa fa-backward"></i></button>
                                    <button className='next-btn'><i class="fa-sharp fa fa-forward"></i></button>
                                </div>
                            </div>
                            <div className='left-result-filter'>
                                <div className='categories-filter'>
                                    <Link to='/' className='filter-title'><i class="fa fa-bars"></i>All Categories</Link>
                                    <Link onClick={() => this.handleClick(this.props.match.params.id)} className='main-category'>{this.props.match.params.catName}</Link>
                                    {category.map((cate, index) => (
                                        <Link key={index} className='detail-category' onClick={() => this.handleClick(cate.id)}>{cate.name}</Link>
                                    ))}
                                </div>
                                <div className='searching-filter'>
                                    <form className='form-filter'>
                                        <Link to='/' className='filter-title'><i class="fa fa-filter"></i>Searching Filter</Link>
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
                                    <div className='product-card'>
                                        <div className='product-image'>
                                            <Link to={`/product/detail/${product._id}`} className='image-link-product'>
                                                <img src={product.Image[0]} alt={product.Name} className='image' />
                                            </Link>
                                            {product.DiscountValue !== 0 && (
                                                <span className='product-discount-label'>-{product.DiscountValue}</span>
                                            )}
                                            <ul className='product-link'>
                                                <li><Link to='/' data-tip='Add to wishlist' className='detail-component'><i class="fas fa-heart"></i></Link></li>
                                                <li><Link to='/' data-tip='View store' className='detail-component'><i class="fa fa-random"></i></Link></li>
                                                <li><Link to={`/product/detail/${product._id}`} data-tip='View detail' className='detail-component'><i class="fa fa-search"></i></Link></li>
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
                            {/* <div className='footer-paging'>
                            <button className='prev-btn' disabled><i class="fa-sharp fa fa-backward"></i></button>
                            <div className='btn-paging'><Link to='/' className='button'>1</Link></div>
                            <div className='btn-paging'><Link to='/' className='button'>2</Link></div>
                            <div className='btn-paging'><Link to='/' className='button'>3</Link></div>
                            <div className='btn-paging'><Link to='/' className='button'>4</Link></div>
                            <div className='btn-paging'><Link to='/' className='button'>5</Link></div>
                            <div className='btn-paging'><Link to='/' className='button'>...</Link></div>
                            <button className='next-btn'><i class="fa-sharp fa fa-forward"></i></button>
                        </div> */}
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
