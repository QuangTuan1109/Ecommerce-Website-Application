import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import HeaderHomepage from '../../HomePage/HeaderHomepage';
import AboutUs from '../../HomePage/Section/AboutUs'
import FooterHomepage from '../../HomePage/FooterHomepage';
import avt from '../../../assets/images/avatar.png'
import './DetailProduct.scss';
import axios from '../../../axios'
import { formatCurrency } from '../../../method/handleMethod'
import CustomPopup from '../../../components/CustomPopup';

import Slider from 'react-slick'

class DetailProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {},
            mainImage: '',
            Value1: null,
            Value2: null,
            Option1: null,
            Option2: null,
            Quantity: 1,
            unitPrice: null,
            popupType: '',
            onConfirm: null,
            isOutOfStock: false, 
        };
    }

    componentDidMount() {
        this.fetchProductByCategory();
    }

    fetchProductByCategory() {
        const { productId } = this.props.match.params;
        axios.get(`http://localhost:5000/api/v1/products/detail/${productId}`, {
            headers: {
                'Authorization': localStorage.getItem('accessToken')
            }
        })
            .then(response => this.setState({ 
                product: response, 
                mainImage: response.Image[0],
                unitPrice: response.Classify ? null : response.Price
            }))
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    handleAddToCartButton = () => {
        const { productId } = this.props.match.params;
        const { Option1, Value1, Option2, Value2, Quantity, unitPrice } = this.state;
        const formData = {
            Option1,
            Value1,
            Option2,
            Value2,
            Quantity,
            Price: unitPrice
        };

        try {
            axios.post(`http://localhost:5000/api/v1/order/${productId}/add-to-cart`, formData, {
                headers: {
                    'Authorization': localStorage.getItem('accessToken')
                }
            })
            .then(response => {
                this.showPopup('Successfully added to cart!', 'successful', this.handleSuccess);
            })
            .catch(error => {
                this.showPopup('Failed to add to cart.', 'error', this.handleFailure);
            });
        } catch (error) {
            this.showPopup('Failed to add to cart.', 'error', this.handleFailure);
        }       
    };


    handleIncreaseQuantityProduct = () => {
        this.setState((prevState, props) => {
            const newQuantity = prevState.Quantity + 1;
            return {
                Quantity: newQuantity
            };
        }, this.checkStock);
    };

    handleDecreaseQuantityProduct = () => {
        this.setState((prevState, props) => {
            if (prevState.Quantity === 1) {
                return {
                    Quantity: 1
                };
            } else {
                const newQuantity = prevState.Quantity - 1;
                return {
                    Quantity: newQuantity
                };
            }
        }, this.checkStock);
    };

    handleMouseEnter(image) {
        this.setState({ mainImage: image });
    }

    handleMouseLeave() {
        this.setState({ mainImage: this.state.product.Image[0] });
    }

    checkStock = () => {
        const { product, Value1, Value2, Quantity } = this.state;
        
        if (product.Classify) {
            const selectedClassify = product.Classify.find(
                classify => classify.Options.some(
                    option => option.Value2 ? (option.Value1 === Value1 && option.Value2 === Value2) : option.Value1 === Value1
                )
            );

            
            if (selectedClassify) {
                const selectedOption = selectedClassify.Options.find(
                    option => option.Value2 ? (option.Value1 === Value1 && option.Value2 === Value2) : option.Value1 === Value1
                );
                
                if (selectedOption && (selectedOption.Stock === 0 || selectedOption.Stock === Quantity)) {
                    this.setState({ isOutOfStock: true });
                } else {
                    this.setState({ isOutOfStock: false });
                }
                
            } else {
                this.setState({ isOutOfStock: false });
            }
        } else {
            if (product.Quantity && product.Quantity < Quantity) {
                this.setState({ isOutOfStock: true });
            } else {
                this.setState({ isOutOfStock: false });
            }
        }
    };
    
    
    handleOption1Change = (value, option) => {
        this.setState({ Value1: value, Option1: option }, this.checkStock);
    };

    handleOption2Change = (value, option) => {
        this.setState({ Value2: value, Option2: option }, this.checkStock);
    };

    handleSuccess = () => {
        this.closePopup();
        this.setState({
            Value2: null,
            Value1: null,
            Option1: null,
            Option2: null,
            Quantity: 1
        })
        this.props.history.push('/cart');
    }

    handleFailure = () => {
        this.closePopup();
    }

    confirmCancel = () => {
        this.closePopup();
        this.props.history.goBack();
    }

    showPopup = (message, type, onConfirm = null) => {
        this.setState({
            popupVisible: true,
            popupMessage: message,
            popupType: type,
            onConfirm: onConfirm
        });
    }

    closePopup = () => {
        this.setState({
            popupVisible: false,
            popupMessage: '',
            popupType: '',
            onConfirm: null
        });
    }

    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 1,
        };

        const { product, mainImage, popupVisible, popupMessage, popupType, onConfirm,isOutOfStock, Quantity } = this.state

        return (
            <div className='detail-container'>
                <div className='detail-header'>
                    <HeaderHomepage />
                </div>
                <div className='detail-body'>
                    <div className='detail-page-container'>
                        <div className='route-product'>
                            <span>
                                {product.Category}
                            </span>
                        </div>
                        <div className='product-information'>
                            <div className={`product-information-component1`}>
                                <div className='main-img'>
                                    <div className='main-image' style={{ backgroundImage: `url(${mainImage})` }} />
                                </div>
                                <div className='sub-img'>
                                    {product.Image && product.Image.length >= 5 ? (
                                        <Slider {...settings}>
                                            {product.Image.map((image, index) => (
                                                <div key={index} className='image-link' onMouseEnter={() => this.handleMouseEnter(image)} onMouseLeave={() => this.handleMouseLeave()}>
                                                    <div className='sub-image' style={{ backgroundImage: `url(${image})` }} />
                                                </div>
                                            ))}
                                        </Slider>
                                    ) : (
                                        <div className='sub-images'>
                                            {product.Image && product.Image.map((image, index) => (
                                                <div key={index} className='image-link' onMouseEnter={() => this.handleMouseEnter(image)} onMouseLeave={() => this.handleMouseLeave()}>
                                                    <div className='sub-image' style={{ backgroundImage: `url(${image})` }} />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='product-information-component2'>
                                <div className='video-product'>
                                    {product.Video && (
                                        <video width="100%" height="500px" controls>
                                            <source src={product.Video} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    )}
                                </div>
                                <div className='name-product'>
                                    <label>{product.Name}</label>
                                </div>
                                <div className='sub-infor'>
                                    <div className='rating-part'>
                                        <span>Rating: </span>
                                        <ul className='rating'>
                                            {[...Array(5)].map((star, i) => (
                                                <li key={i} className={i < product.Rating ? 'fas fa-star' : 'far fa-star'}></li>
                                            ))}
                                        </ul>
                                    </div>
                                    <span>Sold: 100K</span>
                                </div>
                                <div className='main-infor'>
                                    <div className='price-infor'>
                                        <label>Price: </label>
                                        {product.PriceRange ? (
                                            <span>{product.PriceRange}</span>
                                        ) : (
                                            <span>{formatCurrency(product.Price)}</span>
                                        )}
                                    </div>
                                    {product.Classify && product.Classify.length > 0 && product.Classify[0].Options[0].Value2 && (
                                        <div className='option2-part'>
                                            <label>{product.Classify[0].Options[0].Option2}: </label>
                                            {[...new Set(product.Classify[0].Options.map(option => option.Value2))].map((value, index) => (
                                                <label key={index} className={"custom-radio" + (this.state.Value2 === value ? " checked" : "")}>
                                                    <input
                                                        type="radio"
                                                        name="option2"
                                                        value={value}
                                                        onClick={() => this.handleOption2Change(value, product.Classify[0].Options[0].Option2)}
                                                        checked={this.state.Value2 === value}
                                                        disabled={product.Classify[0].Options.find(option => option.Value2 === value && option.Value1 === this.state.Value1)?.stock === 0}
                                                    />
                                                    {value}
                                                </label>
                                            ))}
                                        </div>
                                    )}

                                    {product.Classify && product.Classify.length > 0 && (
                                        <div className='option1-part'>
                                            <label>{product.Classify[0].Options[0].Option1}: </label>
                                            {product.Classify[0].Options.map((option, index) => (
                                                index === 0 || option.Value1 !== product.Classify[0].Options[index - 1].Value1 ? (
                                                    <>
                                                        {option.Image && (
                                                            <img src={option.Image} width='50px' height='50px' alt={`Images ${index}`} />
                                                        )}
                                                        <label key={index} className={"custom-radio" + (this.state.Value1 === option.Value1 ? " checked" : "")}>
                                                            <input
                                                                type="radio"
                                                                name="option1"
                                                                value={option.Value1}
                                                                onClick={() => this.handleOption1Change(option.Value1, option.Option1)}
                                                                checked={this.state.Value1 === option.Value1}
                                                                disabled={product.Classify[0].Options.find(opt => opt.Value1 === option.Value1 && (this.state.Value2 ? opt.Value2 === this.state.Value2 : true))?.stock === 0}
                                                            />
                                                            {option.Value1}
                                                        </label>
                                                    </>
                                                ) : null
                                            ))}
                                        </div>
                                    )}
                                    <div className='quantity-size-info'>
                                        <div className='quantity-part'>
                                            <label>Quantity: </label>
                                            <input className="minus is-form" type="button" value="-" onClick={this.handleDecreaseQuantityProduct} disabled={isOutOfStock || Quantity <= 1} />
                                            <input aria-label="quantity" className="input-qty" name="" type="number" value={Quantity} readOnly />
                                            <input className="plus is-form" type="button" value="+" onClick={this.handleIncreaseQuantityProduct} disabled={isOutOfStock} />
                                        </div>
                                    </div>

                                    <div className='add-btn'>
                                        <input className="add-to-cart-btn" onClick={this.handleAddToCartButton} disabled={isOutOfStock} type="button" value="Add To Cart" />
                                        <input className="buy-btn" type="button" value="Buy Now" />
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
                                            <span>Liked: {product.Like}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {product.SellerID && (
                            <div className='seler-information'>
                                <div className='seller-infor'>
                                    <div className='avt-seller-part'>
                                        <img src={product.SellerID.Image} alt={'avt'} />
                                        <div className='name-seller'>
                                            <h5>{product.SellerID.Fullname}</h5>
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
                                        <h5>Joining: <span>3 months</span></h5>
                                        <h5>Follower: <span>31.2k</span></h5>
                                    </div>
                                </div>
                            </div>

                        )}
                        <div className='product-detail'>
                            <div className='block-tabs'>
                                <input type='radio' id='description' name='mytabs' />
                                <label className='tabs-button' for='description'>Description</label>
                                <div className='content'>
                                    <div className='detail-product'>
                                        <h3>Product Details</h3>
                                        <div className='detail-product-content'>
                                            <label>Category: </label>
                                            <span>
                                                {product.Category}
                                            </span>
                                        </div>
                                        {product.Detail && Object.entries(product.Detail).map(([key, value]) => (
                                            <div key={key} className='detail-product-content'>
                                                <label>{key}: </label>
                                                <span>{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className='description'>
                                        <h3>Description</h3>
                                        <div className='description-content'>
                                            {product.Description}
                                        </div>
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
                                                <img src={avt} alt={'avt'} />
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
                                                <img src={avt} alt={'avt'} />
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
                    {popupVisible && (
                            <CustomPopup
                                message={popupMessage}
                                type={popupType}
                                onClose={this.closePopup}
                                onConfirm={onConfirm}
                            />
                        )}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailProduct));
