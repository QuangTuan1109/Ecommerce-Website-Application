import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import CryptoJS from 'crypto-js';

import './HeaderHomepage.scss';
import avt from '../../assets/images/avatar.png';
import logo from '../../assets/images/logo-website.png';
import user from '../../assets/icon/Sample_User_Icon.png';
import settings from '../../assets/icon/Sample_Settings_Icon.png';
import Theme from '../../assets/icon/Sample_Theme_Icon.png';
import Helps from '../../assets/icon/Sample_Help_Icon.png';
import Feedback from '../../assets/icon/Sample_Feedback_Icon.png';
import Logout from '../../assets/icon/Sample_logout_Icon.png';
import { customerProcessLogout, sellerLoginSuccess, sellerProcessLogout } from '../../store/actions'
import axios from '../../axios'

class HeaderHomepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'Vietnamese',
            User: null,
            keywordSearch: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleSellerChannelClick = this.handleSellerChannelClick.bind(this);
    }

    async fetchUser() {
        try {
            const fetchUserAPI = await axios.get('http://localhost:5000/api/v1/user',  {
                headers: {
                    'Authorization': `${localStorage.getItem('accessToken')}`
                }
            })
            this.setState({ User: fetchUserAPI })
        } catch (error) {
            console.error("Error:", error);
        }
    }

    async handelOnClickButton() {
        const { keywordSearch } = this.state
        try {
            await axios.get('http://localhost:5000/api/v1/products/search', {
                headers: {
                    'Authorization': `${localStorage.getItem('accessToken')}`
                },
                params: {
                    q: keywordSearch 
                },
            }).then(response => {
                const privateKey = 'lequangtuan1109';
    
                const dataToEncrypt = JSON.stringify({ response });
            
                const encryptedData = CryptoJS.AES.encrypt(dataToEncrypt, privateKey).toString();
            
                localStorage.setItem('encryptedData', encryptedData);
        
                this.props.history.push('/products-search');
            })
        } catch (error) {
            console.error("Error:", error);
        }
    }

    handelOnchange(event) {
        this.setState({ keywordSearch: event.target.value });
    }

    componentDidMount() {
        this.fetchUser();
    }

    handleLogout() {
        localStorage.setItem('accessToken', null);
        this.props.customerProcessLogout();
        this.props.sellerProcessLogout();
        this.setState({User: null})
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    async handleSellerChannelClick() {
        try {
            const response = await axios.post('http://localhost:5000/api/v1/signin-seller', {}, {
                headers: {
                    'Authorization': `${localStorage.getItem('accessToken')}`
                }
            });

            if (response.success) {
                localStorage.setItem('accessToken', response.token)
                this.props.sellerLoginSuccess();
                window.open('/seller', '_blank')
            } else {
                console.log("Unauthorized");
            }
        } catch (error) {
            if (error.response && error.response.status === 403) {
                window.open('/seller-account-register', '_blank')
            }
        }
    }

    render() {
        const { isLoggedIn } = this.props;
        const { User } = this.state;

        let firstInitial = "";
        if (User && User.user && User.user.CustomerID && User.user.CustomerID.Fullname) {
            const sellerName = User.user.CustomerID.Fullname;
            firstInitial = sellerName.charAt(0);
        }

        return (
            <div className='home-header-container'>
                <div className='home-header-content'>
                    {isLoggedIn ? (
                        <div className='home-header-content-user'>
                            {/* User header content */}
                            <div className='home-header-content-sec1'>
                                <div className='home-header-part1'>
                                    <div className='left-content-sec1'>
                                        <Link to='/' className='social-link-facebook'><i className="fab fa-facebook"></i></Link>
                                        <Link to='/' className='social-link-twitter'><i className="fab fa-twitter"></i></Link>
                                        <Link to='/' className='social-link-instagram'><i className="fab fa-instagram"></i></Link>
                                        <Link to='/' className='social-link-youtube'><i className="fab fa-youtube"></i></Link>
                                    </div>
                                    <div className='right-content-sec1'>
                                        <i className="fas fa-globe"></i>
                                        <select value={this.state.value} onChange={this.handleChange}>
                                            <option value='Vietnamese'>Vietnamese</option>
                                            <option value='English'>English</option>
                                        </select>
                                        <i className="fas fa-question"></i>
                                        <Link to='/' className='link'>Support</Link>
                                        <i className="fas fa-download"></i>
                                        <Link to='/' className='link'>Download</Link>
                                    </div>
                                </div>
                                <div className='home-header-part2'>
                                    <div className='left-content-sec2'>
                                        <img src={logo} alt={'logo'} />
                                        <div className='search-input'>
                                            <input type='text'
                                                className='search-control'
                                                placeholder='Searching...'
                                                value={this.state.keywordSearch ? this.state.keywordSearch : ''}
                                                onChange={(event) => this.handelOnchange(event)}
                                            />
                                        </div>
                                        <div className='search-button'>
                                            <button className='btn-search' onClick={() => this.handelOnClickButton()}>Search</button>
                                        </div>
                                    </div>
                                    <div className='right-content-sec2'>
                                        <div className='user-features'>
                                            <Link to='/' className='component-link'><i className="fas fa-heart"></i></Link>
                                            <Link to='/cart' className='component-link'><i className="fas fa-shopping-cart"></i></Link>
                                            <Link to='/' className='component-link'><i className="fas fa-comment-alt"></i></Link>
                                            <div className='notification-section'>
                                                <div className='notification-icon'>
                                                    <i className="fas fa-bell"></i>
                                                </div>
                                                <div className='notification'>
                                                    <h3>Notification</h3>
                                                    <div className='notification-element'>
                                                        <img src={avt} alt={'avt'} />
                                                        <div className='content-notification'>
                                                            <Link to='/' className='content-noti'>Lê Quang Tuấn posted a new post: New shirt in 2023</Link>
                                                            <small>2h ago</small>
                                                        </div>
                                                    </div>
                                                    <div className='notification-element'>
                                                        <img src={avt} alt={'avt'} />
                                                        <div className='content-notification'>
                                                            <Link to='/' className='content-noti'>Lê Quang Tuấn posted a new post: New shirt in 2023</Link>
                                                            <small>2h ago</small>
                                                        </div>
                                                    </div>
                                                    <div className='notification-element'>
                                                        <img src={avt} alt={'avt'} />
                                                        <div className='content-notification'>
                                                            <Link to='/' className='content-noti'>Lê Quang Tuấn posted a new post: New shirt in 2023</Link>
                                                            <small>2h ago</small>
                                                        </div>
                                                    </div>
                                                    <div className='show-all-button'>
                                                        <Link to='/' className='button'>Show all</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='vertical-line'></div>
                                        <div className='avatar-image'>
                                            {User && (
                                                <>
                                                    {User.user.CustomerID.Image ? (
                                                        <img src={User.user.CustomerID.Image} alt='avt' className="avatar-img" />
                                                    ) : (
                                                        <div className="avatar-img">{firstInitial}</div>
                                                    )}
                                                    <div className='menu'>
                                                        <h3>{User.user.CustomerID.Fullname}</h3>
                                                        <p>Customer</p>
                                                        <ul>
                                                            <li><img src={user} alt={'user-icon'} /><Link to='/' className='menu-element'>My Profile</Link></li>
                                                            <li><img src={user} alt={'user-icon'} /><Link rel="noopener noreferrer" onClick={this.handleSellerChannelClick} className='menu-element'>Seller Channel</Link></li>
                                                            <li><img src={Helps} alt={'order-icon'} /><Link to='/purchase' className='menu-element'>Order</Link></li>
                                                            <li><img src={settings} alt={'settings-icon'} /><Link to='/' className='menu-element'>Settings</Link></li>
                                                            <li>
                                                                <img src={Theme} alt={'Theme-icon'} /><Link to='/' className='menu-element'>Theme</Link>
                                                                <label className="switch">
                                                                    <input type="checkbox" />
                                                                    <span className="slider round"></span>
                                                                </label>
                                                            </li>
                                                            <li><img src={Helps} alt={'Helps-icon'} /><Link to='/' className='menu-element'>Helps</Link></li>
                                                            <li><img src={Feedback} alt={'user-icon'} /><Link to='/' className='menu-element'>Send Feedback</Link></li>
                                                            <li><img src={Logout} alt={'Logout-icon'} /><Link to='/homepage' onClick={this.handleLogout} className='menu-element'>Log out</Link></li>
                                                        </ul>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='home-header-content-sec2'>
                                <div className='child-content'>
                                    <div><Link to='/news' className='content-nav'><b>New Arrivals</b></Link></div>
                                </div>
                                <div className='child-content'>
                                    <div><Link to='/' className='content-nav'><b>New Arrivals</b></Link></div>
                                </div>
                                <div className='child-content'>
                                    <div><Link to='/' className='content-nav'><b>New Arrivals</b></Link></div>
                                </div>
                                <div className='child-content'>
                                    <div><Link to='/' className='content-nav'><b>New Arrivals</b></Link></div>
                                </div>
                                <div className='child-content'>
                                    <div><Link to='/' className='content-nav'><b>New Arrivals</b></Link></div>
                                </div>
                                <div className='child-content'>
                                    <div><Link to='/' className='content-nav'><b>New Arrivals</b></Link></div>
                                </div>
                                <div className='child-content'>
                                    <div><Link to='/' className='content-nav'><b>New Arrivals</b></Link></div>
                                </div>
                                <div className='child-content'>
                                    <div><Link to='/' className='content-nav'><b>New Arrivals</b></Link></div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="home-header-content-guest">
                            {/* Guest header content */}
                            <div className='home-header-content-sec1'>
                                <div className='home-header-part1'>
                                    <div className='left-content-sec1'>
                                        <Link to='/' className='social-link-facebook'><i className="fab fa-facebook"></i></Link>
                                        <Link to='/' className='social-link-twitter'><i className="fab fa-twitter"></i></Link>
                                        <Link to='/' className='social-link-instagram'><i className="fab fa-instagram"></i></Link>
                                        <Link to='/' className='social-link-youtube'><i className="fab fa-youtube"></i></Link>
                                    </div>
                                    <div className='right-content-sec1'>
                                        <i className="fas fa-globe"></i>
                                        <select value={this.state.value} onChange={this.handleChange}>
                                            <option value='Vietnamese'>Vietnamese</option>
                                            <option value='English'>English</option>
                                        </select>
                                        <i className="fas fa-question"></i>
                                        <Link to='/' className='link'>Support</Link>
                                        <i className="fas fa-download"></i>
                                        <Link to='/' className='link'>Download</Link>
                                    </div>
                                </div>
                                <div className='home-header-part2'>
                                    <div className='left-content-sec2'>
                                        <img src={logo} alt={'logo'} />
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
                                        <div className='guest-features'>
                                            <Link to='/login' className='component-link'><i className="fas fa-heart"></i></Link>
                                            <Link to='/login' className='component-link'><i className="fas fa-shopping-cart"></i></Link>
                                            <Link to='/login' className='component-link'><i className="fas fa-comment-alt"></i></Link>
                                            <div className='notification-section'>
                                                <div className='notification-icon'>
                                                    <i className="fas fa-bell"></i>
                                                </div>
                                                <div className='notification'>
                                                    <h3>Notification</h3>
                                                    <span>Log in to see notifications</span>
                                                    <div className='button'>
                                                        <Link to='/login' className='button-link'>Signin</Link>
                                                        <Link to='/customer-account-register' className='button-link'>Signup</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='vertical-line'></div>
                                        <div className='guest-button'>
                                            <Link to='/login' className='button-link'>Signin</Link>
                                            <Link to='/customer-account-register' className='button-link'>Signup</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
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
        customerProcessLogout: () => dispatch(customerProcessLogout()),
        sellerLoginSuccess: () => dispatch(sellerLoginSuccess()),
        sellerProcessLogout: () => dispatch(sellerProcessLogout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HeaderHomepage));
