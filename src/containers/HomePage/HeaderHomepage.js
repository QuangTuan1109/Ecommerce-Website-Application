import React, { Component } from 'react';
import { Link  } from "react-router-dom";
import { connect } from 'react-redux';
import './HeaderHomepage.scss'
import avt from '../../assets/images/avatar.png'
import logo from '../../assets/images/logo-website.png'

class HeaderHomepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'Vietnamese'
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
      }

    render() {
        return (
            <div className='home-header-container'>
                <div className='home-header-content'>
                    <div className='home-header-content-sec1'>
                        <div className='left-content-sec1'>
                            <select value={this.state.value} onChange={this.handleChange}>
                                <option value='Vietnamese'>Vietnamese</option>
                                <option value='English'>English</option>
                            </select>
                        </div>
                        <div className='right-content-sec1'>
                            <Link to='/' className='header-link'>My Wishlist</Link>
                            <div className='vertical-line'></div>
                            <div className='avatar-image'>
                            <img src={avt} alt={'avt'}/>
                            </div>
                        </div>
                    </div>
                    <div className='home-header-content-sec2'>
                        <div className='left-content-sec2'>
                            <img src={logo} alt={'logo'}/>
                            <div className='search-input'>
                                <input type='text' 
                                className='search-control' 
                                placeholder='Searching...'
                                value={this.state.username}
                                onChange={(event) => this.handelOnchangeUsername(event)}
                                />
                            </div>
                            <div className='search-button'>
                                <button className='btn-search' onClick={() => this.handelOnClickButton()}>Search</button>
                            </div>
                        </div>
                        <div className='right-content-sec2'>
                            <div className='cart'>
                                <Link to='/' className='cart-link'>Cart</Link>
                                <i class="fas fa-shopping-cart"></i>
                            </div>
                        </div>
                    </div>
                    <div className='home-header-content-sec3'>
                    
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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderHomepage);
