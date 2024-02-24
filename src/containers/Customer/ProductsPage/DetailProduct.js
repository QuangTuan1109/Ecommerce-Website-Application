import React, { Component } from 'react';
import { Link  } from "react-router-dom";
import { connect } from "react-redux";

import HeaderHomepage from '../../HomePage/HeaderHomepage';

import AboutUs from '../../HomePage/Section/AboutUs'

import FooterHomepage from '../../HomePage/FooterHomepage';

import avt from '../../../assets/images/avatar.png'
import './DetailProduct.scss';

import Slider from 'react-slick'

class DetailProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1
        };
    }

    handleIncreaseQualityProduct () {
       this.setState((prevState, props) => {
        return {
            value: prevState.value + 1
        }
       })    
    }

    handleDecreaseQualityProduct () {
        this.setState((prevState, props) => {
            if (prevState.value == 1) {
                return {
                    value: prevState.value = 1
                }
            } else {
                return {
                    value: prevState.value - 1
                }
            }
        })    
     }

    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 1,
        };


        return (
            <>
                <HeaderHomepage />
                <div className='detail-page-container'>
                    <div className='route-product'>
                        <span>
                            <Link to='/' className='route'>E-shopping</Link> {'>'} 
                            <Link to='/' className='route'>E-shopping</Link> {'>'} 
                            <Link to='/' className='route'>E-shopping</Link> {'>'} 
                            <Link to='/' className='route'>E-shopping</Link>
                        </span>
                    </div>
                    <div className='product-information'>
                        <div className='product-information-component1'>
                            <div className='main-img'>
                                <Link to='/' className='image-link'><div className='main-image' /></Link>
                            </div>
                            <div className='sub-img'>
                                <Slider {...settings}>
                                    <Link to='/' className='image-link'><div className='sub-image' /></Link>
                                    <Link to='/' className='image-link'><div className='sub-image' /></Link>
                                    <Link to='/' className='image-link'><div className='sub-image' /></Link>
                                    <Link to='/' className='image-link'><div className='sub-image' /></Link>
                                    <Link to='/' className='image-link'><div className='sub-image' /></Link>
                                    <Link to='/' className='image-link'><div className='sub-image' /></Link>
                                    <Link to='/' className='image-link'><div className='sub-image' /></Link>
                                </Slider>
                            </div>
                        </div>
                        <div className='product-information-component2'>
                            <label>Premium Cotton gender t-shirt embroidered with hearts, Waist Vi, red ruffled ribbons embroidered with reverse logo on the back AP38P khotrangnamnu</label>
                            <div className='sub-infor'>
                                <div className='rating-part'>
                                    <span>Rating: </span>
                                    <ul className='rating'>
                                        <li className="fas fa-star"></li>
                                        <li className="fas fa-star"></li>
                                        <li className="fas fa-star"></li>
                                        <li className="far fa-star"></li>
                                        <li className="far fa-star"></li>
                                    </ul> 
                                </div> 
                                <span>Sold: 100K</span>
                            </div>
                            <div className='main-infor'>
                                <div className='price-infor'>
                                    <label>Price: </label>
                                    <span>50.000 VND - 200.000 VND</span>
                                </div>
                                <div className='quantity-size-info'>
                                    <div className='quantity-part'>
                                        <label>Quantity: </label>
                                        <input className="minus is-form" type="button" value="-" onClick={() => this.handleDecreaseQualityProduct()} />
                                        <input aria-label="quantity" className="input-qty" name="" type="number" value= {this.state.value} />
                                        <input className="plus is-form" type="button" value="+" onClick={() => this.handleIncreaseQualityProduct()}/>
                                    </div>
                                    <div className='size-part'>
                                        <label>Size: </label>
                                        <input className="size-btn" type="button" value="S"/>
                                        <input className="size-btn" type="button" value="L"/>
                                        <input className="size-btn" type="button" value="M"/>
                                        <input className="size-btn" type="button" value="XL"/>
                                        <input className="size-btn" type="button" value="XXL"/>
                                    </div> 
                                </div>
                                <div className='color-infor'>
                                    <label>Color: </label>
                                    <input className="color-btn" type="button" value="Black"/>
                                    <input className="color-btn" type="button" value="White"/>
                                    <input className="color-btn" type="button" value="Pink"/>
                                    <input className="color-btn" type="button" value="Orange"/>
                                    <input className="color-btn" type="button" value="Brown"/>
                                </div>
                                <div className='add-btn'>
                                    <input className="add-to-cart-btn" type="button" value="Add To Cart"/>
                                    <input className="buy-btn" type="button" value="Buy Now"/>
                                </div>
                                <div className='social-like-part'>
                                    <div className='social-btn'>
                                        <label>Share: </label>
                                        <Link to='/' className='social-link-facebook'><i class="fab fa-facebook"></i></Link>
                                        <Link to='/' className='social-link-twitter'><i class="fab fa-twitter"></i></Link>
                                        <Link to='/' className='social-link-instagram'><i class="fab fa-instagram"></i></Link>
                                        <Link to='/' className='social-link-youtube'><i class="fab fa-youtube"></i></Link>
                                    </div>  
                                    <div className='wishlist-btn'>
                                        <i class="fa fa-heart"></i>
                                        <span>Liked: 280K</span>
                                    </div>    
                                </div>  
                            </div>      
                        </div>
                    </div>
                    <div className='seler-information'>
                        <div className='seller-infor'>
                            <div className='avt-seller-part'>
                                <img src={avt} alt={'avt'}/>
                                <div className='name-seller'>
                                        <h5>Lê Quang Tuấn</h5>
                                        <small>Online 2h ago</small>
                                </div>
                            </div>
                            <div className='information'>
                                <div className='contact-btn'>
                                    <Link to='/' className='contact-btn-link'><i class="fas fa-comment"> Chat now</i></Link>
                                    <div className="vertical-line"></div>
                                    <Link to='/' className='contact-btn-link'><i class="fas fa-eye"> See shop</i></Link>
                                </div>
                            </div>
                        </div>
                        <div className='seller-detail-infor'>
                            <div>
                                <h5>Rating: <span>16,5k</span></h5>
                                <h5>Products: <span>812</span></h5>
                            </div>
                            <div>
                                <h5>Rating: <span>16,5k</span></h5>
                                <h5>Products: <span>812</span></h5>
                            </div>
                            <div>
                                <h5>Joining: <span>3 months</span></h5>
                                <h5>Follower: <span>31.2k</span></h5>
                            </div>
                        </div>
                    </div>
                    <div className='product-detail'>
                        <div className='block-tabs'>
                            <input type='radio' id='description' name='mytabs'/>
                            <label className='tabs-button' for='description'>Description</label>
                            <div className='content'>
                                <div className='detail-product'>
                                    <h3>Product Details</h3>
                                    <div className='detail-product-content'>
                                        <label>Category: </label>
                                        <span>
                                            <Link to='/' className='route-cate'>E-shopping</Link> {'>'} 
                                            <Link to='/' className='route-cate'>E-shopping</Link> {'>'} 
                                            <Link to='/' className='route-cate'>E-shopping</Link> {'>'} 
                                            <Link to='/' className='route-cate'>E-shopping</Link>
                                        </span>
                                    </div>
                                    <div className='detail-product-content'>
                                        <label>Material: </label>
                                        <span>Synthetic</span>
                                    </div>
                                    <div className='detail-product-content'>
                                        <label>Sample: </label>
                                        <span>Slippery</span>
                                    </div>
                                    <div className='detail-product-content'>
                                        <label>Quantity Of Promotional Goods: </label>
                                        <span>63</span>
                                    </div>
                                    <div className='detail-product-content'>
                                        <label>Remaining Products: </label>
                                        <span>3617</span>
                                    </div>
                                    <div className='detail-product-content'>
                                        <label>From: </label>
                                        <span>Ho Chi Minh city</span>
                                    </div>
                                </div>
                                <div className='description'>
                                    <h3>Description</h3>
                                    <div className='description-content'>
                                        <label>Product's name: </label>
                                        <span>Premium Cotton gender t-shirt embroidered with hearts, Waist Vi, red ruffled ribbons
                                             embroidered with reverse logo on the back AP38P khotrangnamnu</span>
                                    </div>
                                    <div className='description-content'>
                                        <label>Product information: </label>
                                        <ul>
                                            <li>✔ High-neck design to replace masks, discreetly protect from the sun</li>
                                            <li>✔ Soft, slim waist</li>
                                            <li>✔ Material: 95% Cotton, 5% Spandex (censored printed on collar)</li>
                                            <li>✔ Color: Black, charcoal, dark gray</li>
                                            <li>✔ High-neck design to replace masks, discreetly protect from the sun</li>
                                            <li>✔ Soft, slim waist</li>
                                            <li>✔ Material: 95% Cotton, 5% Spandex (censored printed on collar)</li>
                                            <li>✔ Color: Black, charcoal, dark gray</li>
                                        </ul>
                                    </div>
                                    <div className='description-content'>
                                        <label>Size guide: </label>
                                        <ul>
                                            <li>L: 45-64kg , dưới m67</li>
                                            <li>XL: 65-80kg, dưới m75</li>
                                        </ul>
                                    </div>
                                    <div className='description-content'>
                                        <label>Storage instructions: </label>
                                        <ul>
                                            <li>✔ High-neck design to replace masks, discreetly protect from the sun</li>
                                            <li>✔ Soft, slim waist</li>
                                            <li>✔ Material: 95% Cotton, 5% Spandex (censored printed on collar)</li>
                                            <li>✔ Color: Black, charcoal, dark gray</li>
                                        </ul>
                                    </div>
                                    <div className='description-content'>
                                        <label>Customer commitment: </label>
                                        <ul>
                                            <li>✔ High-neck design to replace masks, discreetly protect from the sun</li>
                                            <li>✔ Soft, slim waist</li>
                                            <li>✔ Material: 95% Cotton, 5% Spandex (censored printed on collar)</li>
                                            <li>✔ Color: Black, charcoal, dark gray</li>
                                        </ul>
                                    </div>
                                </div>
                                <hr className='horizon-line' />
                                <div className='hash-tag'>
                                    <span>#ao #ao_chong_nang #ao_chong_nang_xin, #ao_chong_nang_nu, #ao_chong_nang_dep #ao #chong #nang #nu #khoac #thoi_trang_nu #ao_chong_nang_chuan #ao_chong_nang_mua_he #ao_khoac
                                         #chong_nang #ao_khoac_chong_nang #ao_khoac_gia_re #ao_khoac_chong_tia_uv #ao_khoac_mua_he #thong_hoi #sieu_mat</span>
                                </div>
                            </div>
                            <input type='radio' id='review' name='mytabs' />
                            <label className='tabs-button' for='review'>Review</label>
                            <div className='content'>
                                <div className='filter-review'>
                                    <div className='rating-total'>
                                        <span>4.8/5</span>
                                        <ul className='rating'>
                                            <li className="fas fa-star"></li>
                                            <li className="fas fa-star"></li>
                                            <li className="fas fa-star"></li>
                                            <li className="far fa-star"></li>
                                            <li className="far fa-star"></li>
                                        </ul> 
                                    </div>
                                    <div className='filter-rating'>
                                        <div className='filter-rating-btn'>
                                            <input type='radio' id='all' name='mytabs-content' />
                                            <label className='tabs-button-content' for='all'>All (11k)</label>
                                        </div>
                                        <div className='filter-rating-btn'>
                                            <input type='radio' id='5-star' name='mytabs-content' />
                                            <label className='tabs-button-content' for='5-star'>5 star (0)</label>
                                        </div>
                                        <div className='filter-rating-btn'>
                                            <input type='radio' id='4-star' name='mytabs-content' />
                                            <label className='tabs-button-content' for='4-star'>4 star (11k)</label>
                                        </div>
                                        <div className='filter-rating-btn'>
                                            <input type='radio' id='3-star' name='mytabs-content' />
                                            <label className='tabs-button-content' for='3-star'>3 star (11k)</label>
                                        </div>
                                        <div className='filter-rating-btn'>
                                            <input type='radio' id='2-star' name='mytabs-content' />
                                            <label className='tabs-button-content' for='2-star'>2 star (11k)</label>
                                        </div>
                                        <div className='filter-rating-btn'>
                                            <input type='radio' id='1-star' name='mytabs-content' />
                                            <label className='tabs-button-content' for='1-star'>1 star (11k)</label>
                                        </div>
                                        <div className='filter-rating-btn'>
                                            <input type='radio' id='comment' name='mytabs-content' />
                                            <label className='tabs-button-content' for='comment'>Comment/Figure/Video (11k)</label>
                                        </div>
                                    </div>
                                </div>
                                <div className='comment-review'>
                                    <div className='comment-part'>
                                        <div className='avt-customer'>
                                            <img src={avt} alt={'avt'}/>
                                            <div className='name-customer'>
                                                <h5>Lê Quang Tuấn</h5>
                                                <ul className='rating'>
                                                    <li className="fas fa-star"></li>
                                                    <li className="fas fa-star"></li>
                                                    <li className="fas fa-star"></li>
                                                    <li className="far fa-star"></li>
                                                    <li className="far fa-star"></li>
                                                </ul> 
                                                <small>2023-05-08 11:09</small>
                                            </div>
                                        </div>
                                        <div className='comment-content'>
                                            <div className='review-description'>
                                                <label>Compared to description: </label>
                                                <span>The same with the description</span>
                                            </div>
                                            <div className='review-description'>
                                                <label>Color: </label>
                                                <span>Black</span>
                                            </div>
                                            <div className='review-description'>
                                                <label>Material: </label>
                                                <span>Cotton</span>
                                            </div>
                                            <div className='commnent'>
                                                <label>Comment: </label>
                                                <span>This product is pretty good. I'm very satisfied with it.</span>
                                            </div>
                                            <div className='figures'>
                                                <div className='review-image' />
                                                <div className='review-image' />
                                                <div className='review-image' />
                                                <div className='review-image' />
                                                <div className='review-image' />
                                            </div>
                                            <div className='commnent'>
                                                <label>Seller feedback: </label>
                                                <span>2N Unisex thanks you for trusting and shopping at High End ❤️ Your reviews are the motivation 
                                                    for the shop to try and improve itself even more! Wishing you always have fun and have great experiences when shopping at 2N!</span>
                                            </div>
                                        </div>

                                    </div>
                                    <div className='comment-part'>
                                        <div className='avt-customer'>
                                            <img src={avt} alt={'avt'}/>
                                            <div className='name-customer'>
                                                <h5>Lê Quang Tuấn</h5>
                                                <ul className='rating'>
                                                    <li className="fas fa-star"></li>
                                                    <li className="fas fa-star"></li>
                                                    <li className="fas fa-star"></li>
                                                    <li className="far fa-star"></li>
                                                    <li className="far fa-star"></li>
                                                </ul> 
                                                <small>2023-05-08 11:09</small>
                                            </div>
                                        </div>
                                        <div className='comment-content'>
                                            <div className='review-description'>
                                                <label>Compared to description: </label>
                                                <span>The same with the description</span>
                                            </div>
                                            <div className='review-description'>
                                                <label>Color: </label>
                                                <span>Black</span>
                                            </div>
                                            <div className='review-description'>
                                                <label>Material: </label>
                                                <span>Cotton</span>
                                            </div>
                                            <div className='commnent'>
                                                <label>Comment: </label>
                                                <span>This product is pretty good. I'm very satisfied with it.</span>
                                            </div>
                                            <div className='figures'>
                                                <div className='review-image' />
                                                <div className='review-image' />
                                                <div className='review-image' />
                                                <div className='review-image' />
                                                <div className='review-image' />
                                            </div>
                                            <div className='commnent'>
                                                <label>Seller feedback: </label>
                                                <span>2N Unisex thanks you for trusting and shopping at High End ❤️ Your reviews are the motivation 
                                                    for the shop to try and improve itself even more! Wishing you always have fun and have great experiences when shopping at 2N!</span>
                                            </div>
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
                            <input type='radio' id='shipping-infor' name='mytabs' />
                            <label className='tabs-button' for='shipping-infor'>Shipping Information</label>
                            <div className='content'>
                                3
                            </div>
                           
                        </div>
                    </div>
                    <div className='related-product'>
                        <div className='title-related'>
                            <span>Related products</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailProduct);
