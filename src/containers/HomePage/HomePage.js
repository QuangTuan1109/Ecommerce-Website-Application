import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss'
import HeaderHomepage from './HeaderHomepage'
import Introduction from './Section/Introduction'
import Categories from './Section/Categories'
import FeaturedProducts from './Section/FeaturedProduct'
import Recommended from './Section/Recommended'
import News from './Section/News'
import AboutUs from './Section/AboutUs';
import FooterHomepage from './FooterHomepage';

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

class HomePage extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll:2,
        };

        return (
            <div className='homepage-container'>
                <HeaderHomepage />
                <Introduction settings = {settings} />
                <Categories settings = {settings}/>
                <FeaturedProducts />
                <Recommended />
                <News />
                <AboutUs />
                <FooterHomepage />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
