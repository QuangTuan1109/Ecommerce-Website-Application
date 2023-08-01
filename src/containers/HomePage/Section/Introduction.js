import React, { Component } from 'react';
import { Link  } from "react-router-dom";
import { connect } from 'react-redux';
import './Introduction.scss'

import Slider from 'react-slick'

class Introduction extends Component {

    render() {

        return (
            <div className='section-introduction-slider'>
                    <div className='section-content-slider'>
                    <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <Link to='/' className='image-link'><div className='bg-image' /></Link>
                                <div className='title-promotions'>
                                    <Link to='/' className='title-link'>Promotions of the website</Link>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <Link to='/' className='image-link'><div className='bg-image' /></Link>
                                <div className='title-promotions'>
                                    <Link to='/' className='title-link'>Promotions of the website</Link>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <Link to='/' className='image-link'><div className='bg-image' /></Link>
                                <div className='title-promotions'>
                                    <Link to='/' className='title-link'>Promotions of the website</Link>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <Link to='/' className='image-link'><div className='bg-image' /></Link>
                                <div className='title-promotions'>
                                    <Link to='/' className='title-link'>Promotions of the website</Link>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <Link to='/' className='image-link'><div className='bg-image' /></Link>
                                <div className='title-promotions'>
                                    <Link to='/' className='title-link'>Promotions of the website</Link>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <Link to='/' className='image-link'><div className='bg-image' /></Link>
                                <div className='title-promotions'>
                                    <Link to='/' className='title-link'>Promotions of the website</Link>
                                </div>
                            </div>
                        </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(Introduction);
