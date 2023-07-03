import React, { Component } from 'react';
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
                                <div className='bg-image' />
                                <div className='title-promotions'>Promotions of the website</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image' />
                                <div className='title-promotions'>Promotions of the website</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image' />
                                <div className='title-promotions'>Promotions of the website</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image' />
                                <div className='title-promotions'>Promotions of the website</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image' />
                                <div className='title-promotions'>Promotions of the website</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image' />
                                <div className='title-promotions'>Promotions of the website</div>
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
