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
                    <div className='home-header-content-sec2'>
                        <div className='home-header-part1'>
                            <div className='left-content-sec1'>
                                <Link to='/' className='social-link-facebook'><i class="fab fa-facebook"></i></Link>
                                <Link to='/' className='social-link-twitter'><i class="fab fa-twitter"></i></Link>
                                <Link to='/' className='social-link-instagram'><i class="fab fa-instagram"></i></Link>
                                <Link to='/' className='social-link-youtube'><i class="fab fa-youtube"></i></Link>
                            </div>
                            <div className='right-content-sec1'>
                                <i class="fas fa-globe"></i>
                                <select value={this.state.value} onChange={this.handleChange}>
                                    <option value='Vietnamese'>Vietnamese</option>
                                    <option value='English'>English</option>
                                </select>
                                <i class="fas fa-question"></i>
                                <Link to='/' className='link'>Support</Link>
                                <i class="fas fa-download"></i>
                                <Link to='/' className='link'>Download</Link>
                            </div>
                        </div>
                        <div className='home-header-part2'>
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
                                    <Link to='/' className='component-link'><i class="fas fa-heart"></i></Link>
                                    <Link to='/' className='component-link'><i class="fas fa-shopping-cart"></i></Link>
                                    <Link to='/' className='component-link'><i class="fas fa-bell"></i></Link>
                                </div>
                                <div className='vertical-line'></div>
                                <div className='avatar-image'>
                                    <img src={avt} alt={'avt'}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='home-header-content-sec3'>
                        <div className='child-content'>
                            <div><b>New Arrivals</b></div>
                        </div>
                        <div className='child-content'>
                            <div><b>Brands</b></div>
                        </div>
                        <div className='child-content'>
                            <div><b>Women</b></div>
                        </div>
                        <div className='child-content'>
                            <div><b>Men</b></div>
                        </div>
                        <div className='child-content'>
                            <div><b>Girls</b></div>
                        </div>
                        <div className='child-content'>
                            <div><b>Boys</b></div>
                        </div>
                        <div className='child-content'>
                            <div><b>Kids</b></div>
                        </div>
                        <div className='child-content'>
                            <div><b>Sale</b></div>
                        </div>
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
