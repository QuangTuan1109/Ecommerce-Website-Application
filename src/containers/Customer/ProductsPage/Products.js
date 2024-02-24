import React, { Component } from 'react';
import { Link  } from "react-router-dom";
import { connect } from "react-redux";

import HeaderHomepage from '../../HomePage/HeaderHomepage';

import AboutUs from '../../HomePage/Section/AboutUs'

import FooterHomepage from '../../HomePage/FooterHomepage';
import './Products.scss';


class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'all prices'
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {

        return (
            <>
                <HeaderHomepage />
                <div className='product-page-container'>
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
                                <Link to='/' className='main-category'>Boys's Fashion</Link>
                                <Link to='/' className='detail-category'>Jacket</Link>
                                <Link to='/' className='detail-category'>T-Shirt</Link>
                                <Link to='/' className='detail-category'>Jacket</Link>
                                <Link to='/' className='detail-category'>T-Shirt</Link>
                                <Link to='/' className='detail-category'>Jacket</Link>
                                <Link to='/' className='detail-category'>T-Shirt</Link>
                                <Link to='/' className='detail-category'>Jacket</Link>
                                <Link to='/' className='detail-category'>T-Shirt</Link>
                                <Link to='/' className='detail-category'>Jacket</Link>
                                <Link to='/' className='detail-category'>T-Shirt</Link>
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
                            <div className='product-card'>
                                <div className='product-image'>
                                    <Link to='/' className='image-link-product'>
                                        <div className='image' />
                                    </Link>
                                    <span className='product-discount-label'>-30%</span>
                                    <ul className='product-link'>
                                        <li><Link to='/' data-tip='Add to wishlist' className='detail-component'><i class="fas fa-heart"></i></Link></li>
                                        <li><Link to='/product/id' data-tip='View store' className='detail-component'><i class="fa fa-random"></i></Link></li>
                                        <li><Link to='/' data-tip='View detail' className='detail-component'><i class="fa fa-search"></i></Link></li>
                                    </ul>
                                </div>
                                <div className='product-content'>
                                    <ul className='rating'>
                                        <li class="fas fa-star"></li>
                                        <li class="fas fa-star"></li>
                                        <li class="fas fa-star"></li>
                                        <li class="far fa-star"></li>
                                        <li class="far fa-star"></li>
                                    </ul>
                                    <h3 className='product-name'><Link to='/' className='name'>MEN'S BLAZER</Link></h3>
                                    <div className='product-price'><span>$90.00</span> $60.00</div>
                                    <Link to='/' className='add-to-cart'>Add to cart</Link>
                                </div>
                            </div>
                            <div className='product-card'>
                                <div className='product-image'>
                                    <Link to='/' className='image-link-product'>
                                        <div className='image' />
                                    </Link>
                                    <span className='product-discount-label'>-30%</span>
                                    <ul className='product-link'>
                                        <li><Link to='/' data-tip='Add to wishlist' className='detail-component'><i class="fas fa-heart"></i></Link></li>
                                        <li><Link to='/' data-tip='View store' className='detail-component'><i class="fa fa-random"></i></Link></li>
                                        <li><Link to='/' data-tip='View detail' className='detail-component'><i class="fa fa-search"></i></Link></li>
                                    </ul>
                                </div>
                                <div className='product-content'>
                                    <ul className='rating'>
                                        <li class="fas fa-star"></li>
                                        <li class="fas fa-star"></li>
                                        <li class="fas fa-star"></li>
                                        <li class="far fa-star"></li>
                                        <li class="far fa-star"></li>
                                    </ul>
                                    <h3 className='product-name'><Link to='/' className='name'>MEN'S BLAZER</Link></h3>
                                    <div className='product-price'><span>$90.00</span> $60.00</div>
                                    <Link to='/' className='add-to-cart'>Add to cart</Link>
                                </div>
                            </div>
                            <div className='product-card'>
                                <div className='product-image'>
                                    <Link to='/' className='image-link-product'>
                                        <div className='image' />
                                    </Link>
                                    <span className='product-discount-label'>-30%</span>
                                    <ul className='product-link'>
                                        <li><Link to='/' data-tip='Add to wishlist' className='detail-component'><i class="fas fa-heart"></i></Link></li>
                                        <li><Link to='/' data-tip='View store' className='detail-component'><i class="fa fa-random"></i></Link></li>
                                        <li><Link to='/' data-tip='View detail' className='detail-component'><i class="fa fa-search"></i></Link></li>
                                    </ul>
                                </div>
                                <div className='product-content'>
                                    <ul className='rating'>
                                        <li class="fas fa-star"></li>
                                        <li class="fas fa-star"></li>
                                        <li class="fas fa-star"></li>
                                        <li class="far fa-star"></li>
                                        <li class="far fa-star"></li>
                                    </ul>
                                    <h3 className='product-name'><Link to='/' className='name'>MEN'S BLAZER</Link></h3>
                                    <div className='product-price'><span>$90.00</span> $60.00</div>
                                    <Link to='/' className='add-to-cart'>Add to cart</Link>
                                </div>
                            </div>
                            <div className='product-card'>
                                <div className='product-image'>
                                    <Link to='/' className='image-link-product'>
                                        <div className='image' />
                                    </Link>
                                    <span className='product-discount-label'>-30%</span>
                                    <ul className='product-link'>
                                        <li><Link to='/' data-tip='Add to wishlist' className='detail-component'><i class="fas fa-heart"></i></Link></li>
                                        <li><Link to='/' data-tip='View store' className='detail-component'><i class="fa fa-random"></i></Link></li>
                                        <li><Link to='/' data-tip='View detail' className='detail-component'><i class="fa fa-search"></i></Link></li>
                                    </ul>
                                </div>
                                <div className='product-content'>
                                    <ul className='rating'>
                                        <li class="fas fa-star"></li>
                                        <li class="fas fa-star"></li>
                                        <li class="fas fa-star"></li>
                                        <li class="far fa-star"></li>
                                        <li class="far fa-star"></li>
                                    </ul>
                                    <h3 className='product-name'><Link to='/' className='name'>MEN'S BLAZER</Link></h3>
                                    <div className='product-price'><span>$90.00</span> $60.00</div>
                                    <Link to='/' className='add-to-cart'>Add to cart</Link>
                                </div>
                            </div>
                            <div className='product-card'>
                                <div className='product-image'>
                                    <Link to='/' className='image-link-product'>
                                        <div className='image' />
                                    </Link>
                                    <span className='product-discount-label'>-30%</span>
                                    <ul className='product-link'>
                                        <li><Link to='/' data-tip='Add to wishlist' className='detail-component'><i class="fas fa-heart"></i></Link></li>
                                        <li><Link to='/' data-tip='View store' className='detail-component'><i class="fa fa-random"></i></Link></li>
                                        <li><Link to='/' data-tip='View detail' className='detail-component'><i class="fa fa-search"></i></Link></li>
                                    </ul>
                                </div>
                                <div className='product-content'>
                                    <ul className='rating'>
                                        <li class="fas fa-star"></li>
                                        <li class="fas fa-star"></li>
                                        <li class="fas fa-star"></li>
                                        <li class="far fa-star"></li>
                                        <li class="far fa-star"></li>
                                    </ul>
                                    <h3 className='product-name'><Link to='/' className='name'>MEN'S BLAZER</Link></h3>
                                    <div className='product-price'><span>$90.00</span> $60.00</div>
                                    <Link to='/' className='add-to-cart'>Add to cart</Link>
                                </div>
                            </div>
                            <div className='product-card'>
                                <div className='product-image'>
                                    <Link to='/' className='image-link-product'>
                                        <div className='image' />
                                    </Link>
                                    <span className='product-discount-label'>-30%</span>
                                    <ul className='product-link'>
                                        <li><Link to='/' data-tip='Add to wishlist' className='detail-component'><i class="fas fa-heart"></i></Link></li>
                                        <li><Link to='/' data-tip='View store' className='detail-component'><i class="fa fa-random"></i></Link></li>
                                        <li><Link to='/' data-tip='View detail' className='detail-component'><i class="fa fa-search"></i></Link></li>
                                    </ul>
                                </div>
                                <div className='product-content'>
                                    <ul className='rating'>
                                        <li class="fas fa-star"></li>
                                        <li class="fas fa-star"></li>
                                        <li class="fas fa-star"></li>
                                        <li class="far fa-star"></li>
                                        <li class="far fa-star"></li>
                                    </ul>
                                    <h3 className='product-name'><Link to='/' className='name'>MEN'S BLAZER</Link></h3>
                                    <div className='product-price'><span>$90.00</span> $60.00</div>
                                    <Link to='/' className='add-to-cart'>Add to cart</Link>
                                </div>
                            </div>
                            <div className='product-card'>
                                <div className='product-image'>
                                    <Link to='/' className='image-link-product'>
                                        <div className='image' />
                                    </Link>
                                    <span className='product-discount-label'>-30%</span>
                                    <ul className='product-link'>
                                        <li><Link to='/' data-tip='Add to wishlist' className='detail-component'><i class="fas fa-heart"></i></Link></li>
                                        <li><Link to='/' data-tip='View store' className='detail-component'><i class="fa fa-random"></i></Link></li>
                                        <li><Link to='/' data-tip='View detail' className='detail-component'><i class="fa fa-search"></i></Link></li>
                                    </ul>
                                </div>
                                <div className='product-content'>
                                    <ul className='rating'>
                                        <li class="fas fa-star"></li>
                                        <li class="fas fa-star"></li>
                                        <li class="fas fa-star"></li>
                                        <li class="far fa-star"></li>
                                        <li class="far fa-star"></li>
                                    </ul>
                                    <h3 className='product-name'><Link to='/' className='name'>MEN'S BLAZER</Link></h3>
                                    <div className='product-price'><span>$90.00</span> $60.00</div>
                                    <Link to='/' className='add-to-cart'>Add to cart</Link>
                                </div>
                            </div>
                            <div className='product-card'>
                                <div className='product-image'>
                                    <Link to='/' className='image-link-product'>
                                        <div className='image' />
                                    </Link>
                                    <span className='product-discount-label'>-30%</span>
                                    <ul className='product-link'>
                                        <li><Link to='/' data-tip='Add to wishlist' className='detail-component'><i class="fas fa-heart"></i></Link></li>
                                        <li><Link to='/' data-tip='View store' className='detail-component'><i class="fa fa-random"></i></Link></li>
                                        <li><Link to='/' data-tip='View detail' className='detail-component'><i class="fa fa-search"></i></Link></li>
                                    </ul>
                                </div>
                                <div className='product-content'>
                                    <ul className='rating'>
                                        <li class="fas fa-star"></li>
                                        <li class="fas fa-star"></li>
                                        <li class="fas fa-star"></li>
                                        <li class="far fa-star"></li>
                                        <li class="far fa-star"></li>
                                    </ul>
                                    <h3 className='product-name'><Link to='/' className='name'>MEN'S BLAZER</Link></h3>
                                    <div className='product-price'><span>$90.00</span> $60.00</div>
                                    <Link to='/' className='add-to-cart'>Add to cart</Link>
                                </div>
                            </div>
                            <div className='product-card'>
                                <div className='product-image'>
                                    <Link to='/' className='image-link-product'>
                                        <div className='image' />
                                    </Link>
                                    <span className='product-discount-label'>-30%</span>
                                    <ul className='product-link'>
                                        <li><Link to='/' data-tip='Add to wishlist' className='detail-component'><i class="fas fa-heart"></i></Link></li>
                                        <li><Link to='/' data-tip='View store' className='detail-component'><i class="fa fa-random"></i></Link></li>
                                        <li><Link to='/' data-tip='View detail' className='detail-component'><i class="fa fa-search"></i></Link></li>
                                    </ul>
                                </div>
                                <div className='product-content'>
                                    <ul className='rating'>
                                        <li class="fas fa-star"></li>
                                        <li class="fas fa-star"></li>
                                        <li class="fas fa-star"></li>
                                        <li class="far fa-star"></li>
                                        <li class="far fa-star"></li>
                                    </ul>
                                    <h3 className='product-name'><Link to='/' className='name'>MEN'S BLAZER</Link></h3>
                                    <div className='product-price'><span>$90.00</span> $60.00</div>
                                    <Link to='/' className='add-to-cart'>Add to cart</Link>
                                </div>
                            </div>
                            <div className='product-card'>
                                <div className='product-image'>
                                    <Link to='/' className='image-link-product'>
                                        <div className='image' />
                                    </Link>
                                    <span className='product-discount-label'>-30%</span>
                                    <ul className='product-link'>
                                        <li><Link to='/' data-tip='Add to wishlist' className='detail-component'><i class="fas fa-heart"></i></Link></li>
                                        <li><Link to='/' data-tip='View store' className='detail-component'><i class="fa fa-random"></i></Link></li>
                                        <li><Link to='/' data-tip='View detail' className='detail-component'><i class="fa fa-search"></i></Link></li>
                                    </ul>
                                </div>
                                <div className='product-content'>
                                    <ul className='rating'>
                                        <li class="fas fa-star"></li>
                                        <li class="fas fa-star"></li>
                                        <li class="fas fa-star"></li>
                                        <li class="far fa-star"></li>
                                        <li class="far fa-star"></li>
                                    </ul>
                                    <h3 className='product-name'><Link to='/' className='name'>MEN'S BLAZER</Link></h3>
                                    <div className='product-price'><span>$90.00</span> $60.00</div>
                                    <Link to='/' className='add-to-cart'>Add to cart</Link>
                                </div>
                            </div>
                        </div>
                        <div className='footer-paging'>
                            <button className='prev-btn' disabled><i class="fa-sharp fa fa-backward"></i></button>
                            <div className='btn-paging'><Link to='/' className='button'>1</Link></div>
                            <div className='btn-paging'><Link to='/' className='button'>2</Link></div>
                            <div className='btn-paging'><Link to='/' className='button'>3</Link></div>
                            <div className='btn-paging'><Link to='/' className='button'>4</Link></div>
                            <div className='btn-paging'><Link to='/' className='button'>5</Link></div>
                            <div className='btn-paging'><Link to='/' className='button'>...</Link></div>
                            <button className='next-btn'><i class="fa-sharp fa fa-forward"></i></button>
                        </div>
                    </div>
                </div>
                <AboutUs />
                <FooterHomepage />
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Products);
