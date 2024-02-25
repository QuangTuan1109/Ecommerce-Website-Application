import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link  } from "react-router-dom";
import './TopSearch.scss'

import Slider from 'react-slick'

class TopSearch extends Component {
    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 6,
            slidesToScroll: 1,
        };

        return (
            <div className='section section-categories-slider-top-search'>
            <div className='section-container'>
                <div className='section-title'>
                    <span className='title-content-section'>Top Search</span>
                    <Link to='/' className='seemore-link'>See more</Link>
                </div>
                <div className='section-body'>
                    <Slider {...settings}>
                        <div className='section-customize'>
                            <Link to='/' className='image-link'><div className='bg-image-top-search' /></Link>
                            <div className='title-promotions-top-search'><Link to='/' className='title-link'>Boys3</Link></div>
                        </div>
                        <div className='section-customize'>
                            <Link to='/' className='image-link'><div className='bg-image-top-search' /></Link>
                            <div className='title-promotions-top-search'><Link to='/' className='title-link'>Boys4</Link></div>
                        </div>
                        <div className='section-customize'>
                            <Link to='/' className='image-link'><div className='bg-image-top-search' /></Link>
                            <div className='title-promotions-top-search'><Link to='/' className='title-link'>Boys3</Link></div>
                        </div>
                        <div className='section-customize'>
                            <Link to='/' className='image-link'><div className='bg-image-top-search' /></Link>
                            <div className='title-promotions-top-search'><Link to='/' className='title-link'>Boys4</Link></div>
                        </div>
                        <div className='section-customize'>
                            <Link to='/' className='image-link'><div className='bg-image-top-search' /></Link>
                            <div className='title-promotions-top-search'><Link to='/' className='title-link'>Boys</Link></div>
                        </div>
                        <div className='section-customize'>
                            <Link to='/' className='image-link'><div className='bg-image-top-search' /></Link>
                            <div className='title-promotions-top-search'><Link to='/' className='title-link'>Boys2</Link></div>
                        </div>
                        <div className='section-customize'>
                            <Link to='/' className='image-link'><div className='bg-image-top-search' /></Link>
                            <div className='title-promotions-top-search'><Link to='/' className='title-link'>Boys3</Link></div>
                        </div>
                        <div className='section-customize'>
                            <Link to='/' className='image-link'><div className='bg-image-top-search' /></Link>
                            <div className='title-promotions-top-search'><Link to='/' className='title-link'>Boys4</Link></div>
                        </div>
                        <div className='section-customize'>
                            <Link to='/' className='image-link'><div className='bg-image-top-search' /></Link>
                            <div className='title-promotions-top-search'><Link to='/' className='title-link'>Boys3</Link></div>
                        </div>
                        <div className='section-customize'>
                            <Link to='/' className='image-link'><div className='bg-image-top-search' /></Link>
                            <div className='title-promotions-top-search'><Link to='/' className='title-link'>Boys4</Link></div>
                        </div>
                    </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(TopSearch);
