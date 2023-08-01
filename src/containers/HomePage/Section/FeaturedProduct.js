import React, { Component } from 'react';
import { Link  } from "react-router-dom";
import { connect } from 'react-redux';
import './FeaturedProducts.scss'

class FeaturedProducts extends Component {
    render() {

        return (
            <div className='section-featuredProducts'>
                <div className='grid-section-container'>
                    <div className='grid-section-component'>
                        <div className='grid-section-title'>
                            <span>New Arrivals</span>
                            <Link to='/' className='seemore-link'>See more</Link>
                        </div>
                        <div className='grid-section-content'>
                            <div className='section-customize'>
                                <Link to='/' className='image-link'><div className='bg-image' /></Link>
                                <div className='title-promotions'><Link to='/' className='title-link'>Boys</Link></div>
                            </div>
                            <div className='section-customize'>
                                <Link to='/' className='image-link'><div className='bg-image' /></Link>
                                <div className='title-promotions'><Link to='/' className='title-link'>Boys</Link></div>
                            </div>
                            <div className='section-customize'>
                                <Link to='/' className='image-link'><div className='bg-image' /></Link>
                                <div className='title-promotions'><Link to='/' className='title-link'>Boys</Link></div>
                            </div>
                            <div className='section-customize'>
                                <Link to='/' className='image-link'><div className='bg-image' /></Link>
                                <div className='title-promotions'><Link to='/' className='title-link'>Boys</Link></div>
                            </div>
                        </div>
                    </div>
                    <div className='grid-section-component'>
                        <div className='grid-section-title'>
                            <span>Flash Sale</span>
                            <Link to='/' className='seemore-link'>See more</Link>
                        </div>
                        <div className='grid-section-content'>
                            <div className='section-customize'>
                                <Link to='/' className='image-link'><div className='bg-image' /></Link>
                                <div className='title-promotions'><Link to='/' className='title-link'>Boys</Link></div>
                            </div>
                            <div className='section-customize'>
                                <Link to='/' className='image-link'><div className='bg-image' /></Link>
                                <div className='title-promotions'><Link to='/' className='title-link'>Boys</Link></div>
                            </div>
                            <div className='section-customize'>
                                <Link to='/' className='image-link'><div className='bg-image' /></Link>
                                <div className='title-promotions'><Link to='/' className='title-link'>Boys</Link></div>
                            </div>
                            <div className='section-customize'>
                                <Link to='/' className='image-link'><div className='bg-image' /></Link>
                                <div className='title-promotions'><Link to='/' className='title-link'>Boys</Link></div>
                            </div>
                        </div>
                    </div>
                    <div className='grid-section-component'>
                        <div className='grid-section-title'>
                            <span>Best Seller</span>
                            <Link to='/' className='seemore-link'>See more</Link>
                        </div>
                        <div className='grid-section-content'>
                            <div className='section-customize'>
                                <Link to='/' className='image-link'><div className='bg-image' /></Link>
                                <div className='title-promotions'><Link to='/' className='title-link'>Boys</Link></div>
                            </div>
                            <div className='section-customize'>
                                <Link to='/' className='image-link'><div className='bg-image' /></Link>
                                <div className='title-promotions'><Link to='/' className='title-link'>Boys</Link></div>
                            </div>
                            <div className='section-customize'>
                                <Link to='/' className='image-link'><div className='bg-image' /></Link>
                                <div className='title-promotions'><Link to='/' className='title-link'>Boys</Link></div>
                            </div>
                            <div className='section-customize'>
                                <Link to='/' className='image-link'><div className='bg-image' /></Link>
                                <div className='title-promotions'><Link to='/' className='title-link'>Boys</Link></div>
                            </div>
                        </div>
                    </div>
                    <div className='grid-section-component'>
                        <div className='grid-section-title'>
                            <span>Top Trending</span>
                            <Link to='/' className='seemore-link'>See more</Link>
                        </div>
                        <div className='grid-section-content'>
                            <div className='section-customize'>
                                <Link to='/' className='image-link'><div className='bg-image' /></Link>
                                <div className='title-promotions'><Link to='/' className='title-link'>Boys</Link></div>
                            </div>
                            <div className='section-customize'>
                                <Link to='/' className='image-link'><div className='bg-image' /></Link>
                                <div className='title-promotions'><Link to='/' className='title-link'>Boys</Link></div>
                            </div>
                            <div className='section-customize'>
                                <Link to='/' className='image-link'><div className='bg-image' /></Link>
                                <div className='title-promotions'><Link to='/' className='title-link'>Boys</Link></div>
                            </div>
                            <div className='section-customize'>
                                <Link to='/' className='image-link'><div className='bg-image' /></Link>
                                <div className='title-promotions'><Link to='/' className='title-link'>Boys</Link></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedProducts);
