import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import './Recommended.scss'
import axios from '../../../axios'

import fetchDataHOC from '../../../hoc/fetchDataHOC';
import CardComponent from '../../../components/CardComponent';

const fetchProductRecommendation = () => {
    return axios.post('http://localhost:5000/api/v1/products/recommendation', {}, {
        headers: {
            'Authorization': `${localStorage.getItem('accessToken')}`
        }
    });
};

const ProductList = ({ data, loading, error }) => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading data: {error.message}</p>;

    return (
        <div className='grid-recommended-section'>
            {data && data.map(item => (
                <CardComponent key={item._id} item={item} />
            ))}
        </div>
    );
};

const ProductListWithFetch = fetchDataHOC(ProductList, fetchProductRecommendation);

class Recommended extends Component {
    render() {
        return (
            <div className='recommend-section'>
                <div className='title-recommended'>
                    <span> Recommended For You</span>
                </div>
                <ProductListWithFetch />
                <div className='button-see-more'>
                    <Link to='/' className='button'>See more</Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(Recommended);
