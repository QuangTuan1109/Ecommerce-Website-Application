import React, { Component } from 'react';
import { connect } from 'react-redux';
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
                                <div className='bg-image' />
                                <div className='title-promotions'>Boys</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image' />
                                <div className='title-promotions'>Phone & Accessory</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image' />
                                <div className='title-promotions'>Electronic device</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image' />
                                <div className='title-promotions'>Computer & Laptop</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image' />
                                <div className='title-promotions'>Cameras & Camcorders</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image' />
                                <div className='title-promotions'>Watch</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image' />
                                <div className='title-promotions'>Men's shoes</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image' />
                                <div className='title-promotions'>Household electrical appliances</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image' />
                                <div className='title-promotions'>Sport & travel</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image' />
                                <div className='title-promotions'>Car & Bike & Motobike</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image' />
                                <div className='title-promotions'>Men's backpacks and wallets</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image' />
                                <div className='title-promotions'>Toy</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image' />
                                <div className='title-promotions'>Take care of the pet</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image' />
                                <div className='title-promotions'>Women's fashion</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image' />
                                <div className='title-promotions'>Mom&Baby</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image' />
                                <div className='title-promotions'>Beauty</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image' />
                                <div className='title-promotions'>House&Life</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image' />
                                <div className='title-promotions'>Health</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image' />
                                <div className='title-promotions'>Women's shoes</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image' />
                                <div className='title-promotions'>Women's purse</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image' />
                                <div className='title-promotions'>Women's accessories and jewelry</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image' />
                                <div className='title-promotions'>Department store</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image' />
                                <div className='title-promotions'>Online bookstore</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image' />
                                <div className='title-promotions'>Kid's fashion</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image' />
                                <div className='title-promotions'>Laundry and home care</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image' />
                                <div className='title-promotions'>Voucher & Service</div>
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
