import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Introduction.scss'
import img2 from '../../../assets/introduction/promotions 2.gif'

import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

class Introduction extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll:2,
        };


        return (
            <div className='section-introduction-slider'>
                    <div className='introduction-content-slider'>
                    <Slider {...settings}>
                            <div className='introduction-customize'>
                                <div className='bg-image' />
                                <div>Promotions of the website</div>
                            </div>
                            <div className='introduction-customize'>
                                <div className='bg-image' />
                                <div>Promotions of the website</div>
                            </div>
                            <div className='introduction-customize'>
                                <div className='bg-image' />
                                <div>Promotions of the website</div>
                            </div>
                            <div className='introduction-customize'>
                                <div className='bg-image' />
                                <div>Promotions of the website</div>
                            </div>
                            <div className='introduction-customize'>
                                <div className='bg-image' />
                                <div>Promotions of the website</div>
                            </div>
                            <div className='introduction-customize'>
                                <div className='bg-image' />
                                <div>Promotions of the website</div>
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
