import React, { Component } from 'react';
import { Link  } from "react-router-dom";
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import './Recommended.scss'

class Recommended extends Component {
    render() {
        return (
            <div className='recommend-section'>
                <div className='title-recommended'>
                    <span> Recommended For You</span>
                </div>
                <div className='grid-recommended-section'>
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
