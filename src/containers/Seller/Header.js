import React, { Component, useState } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import axios from '../../axios';
import './Header.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBoxOpen, faBullhorn, faMoneyBill, faChartBar, faCog, faStore, faLanguage, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'Vietnamese',
            User: null
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    async fetchUser() {
        try {
            const fetchUserAPI = await axios.get('http://localhost:5000/api/v1/user', {
                headers: {
                    'Authorization': `${localStorage.getItem('accessToken')}`
                }
            })

            this.setState({ User: fetchUserAPI })
        } catch (error) {
            console.error("Error:", error);
        }
    }
    componentDidMount() {
        this.fetchUser();
    }

    render() {
        const { User } = this.state

        let firstInitial = "";
        if (User && User.user && User.user.SellerID && User.user.SellerID.Fullname) {
            const sellerName = User.user.SellerID.Fullname;
            firstInitial = sellerName.charAt(0);
        }

        return (
            <header className="header">
                <div className="left">
                    <div className="logo">Logo</div>
                </div>
                {User && (
                    <div className="right">
                        <div className="icon notification">
                            <i className="fas fa-bell"></i>
                            <div className="notification-box">Thông báo 1<br />Thông báo 2</div>
                        </div>
                        <div className="icon features">
                            <i className="fas fa-list"></i>
                            <div className="features-box">
                                <ul>
                                    <li><FontAwesomeIcon icon={faShoppingCart} className="icon-item" /> Đơn hàng</li>
                                    <li><FontAwesomeIcon icon={faBoxOpen} className="icon-item" /> Tất cả sản phẩm</li>
                                    <li><FontAwesomeIcon icon={faBullhorn} className="icon-item" /> Kênh maketing</li>
                                    <li><FontAwesomeIcon icon={faMoneyBill} className="icon-item" /> Số dư tài khoản</li>
                                    <li><FontAwesomeIcon icon={faChartBar} className="icon-item" /> Phân tích bán hàng</li>
                                    <li><FontAwesomeIcon icon={faCog} className="icon-item" /> Thiết lập shop</li>
                                </ul>

                            </div>
                        </div>
                        <div className="avatar">
                            <div className="avatar-img">{User.user.SellerID.Image ? User.user.SellerID.Image : firstInitial}</div>
                            <div className="seller-name">{User.user.SellerID.Fullname}</div>
                            <div className="seller-info-box">
                                <div className="avatar-img-in-box">{User.user.SellerID.Image ? User.user.SellerID.Image : firstInitial}</div>
                                <div className="seller-details">
                                    <div className="name">{User.user.SellerID.Fullname}</div>
                                    <ul>
                                        <li><FontAwesomeIcon icon={faStore} className="icon-item" /> Hồ sơ shop</li>
                                        <li><FontAwesomeIcon icon={faCog} className="icon-item" /> Thiết lập shop</li>
                                        <li><FontAwesomeIcon icon={faLanguage} className="icon-item" /> Chỉnh ngôn ngữ</li>
                                        <li><FontAwesomeIcon icon={faSignOutAlt} className="icon-item" /> Đăng xuất</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </header>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
