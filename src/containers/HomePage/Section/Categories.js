import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link  } from "react-router-dom";
import './Categories.scss'

import Slider from 'react-slick'

class Categories extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 20,
            slidesToScroll: 2,
        };

        return (
            <div className='section section-categories-slider'>
                <div className='section-container'>
                    <div className='section-title'>
                        <span className='title-content-section'>Categories</span>
                    </div>
                    <div className='section-body'>
                        <Slider {...settings}>
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
                                       
                        </Slider>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
