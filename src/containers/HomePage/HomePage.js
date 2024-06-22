import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeaderHomepage from './HeaderHomepage';
import Introduction from './Section/Introduction';
import Categories from './Section/Categories';
import FeaturedProducts from './Section/FeaturedProduct';
import Recommended from './Section/Recommended';
import TopSearch from './Section/TopSearch';
import News from './Section/News';
import AboutUs from './Section/AboutUs';
import FooterHomepage from './FooterHomepage';
import ChatbotComponent from '../../components/chatbotComponent'; 
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showChatbot: false
        };
    }

    toggleChatbot = () => {
        this.setState(prevState => ({
            showChatbot: !prevState.showChatbot
        }));
    }

    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 2,
            autoplay: true,
            autoplaySpeed: 2000,
        };

        return (
            <div className='homepage-container'>
                <div className='homepage-header'>
                    <HeaderHomepage />
                </div>
                <div className='homepage-body'>
                    <Introduction settings={settings} />
                    <Categories settings={settings} />
                    <FeaturedProducts />
                    <Recommended />
                    <TopSearch />
                    <News />
                    <AboutUs />
                    <FooterHomepage />
                </div>
                <div className={`chatbot-popup ${this.state.showChatbot ? 'active' : ''}`}>
                    <div className='chatbot-popup-content'>
                        <ChatbotComponent />
                    </div>
                </div>
                <div className='chatbot-icon-container' onClick={this.toggleChatbot}>
                    <FontAwesomeIcon icon={faCommentAlt} className='chatbot-icon' />
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
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
