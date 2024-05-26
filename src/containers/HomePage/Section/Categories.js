import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link  } from "react-router-dom";
import axios from '../../../axios'
import './Categories.scss'

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Slider from 'react-slick'

class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [] // Khởi tạo mảng categories trong state
        };
    }

    componentDidMount() {
        // Gọi API để lấy danh sách categories
        axios.get('http://localhost:5000/api/v1/products/categories')
            .then(response => {
                // Lưu danh sách categories vào state
                this.setState({ categories: response.data });
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }

    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 12,
            slidesToScroll: 2,
        };

        const { categories } = this.state;

        return (
           <div className='section section-categories-slider'>
                <div className='section-container'>
                    <div className='section-title'>
                        <span className='title-content-section'>Categories</span>
                    </div>
                    <div className='section-body'>
                        <Slider {...settings}>
                            {categories.map(category => (
                                <div key={category._id} className='section-customize'>
                                    <Link to={`/category/${category._id}`} className='image-link'><div className='bg-image' /></Link>
                                    <div className='title-promotions'><Link to={`/category/${category._id}`} className='title-link'>{category.Name}</Link></div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.customer.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
