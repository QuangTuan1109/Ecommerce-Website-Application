import React, { Component, useState } from 'react';
import { Link  } from "react-router-dom";
import { connect } from 'react-redux';
import './Header.scss'
import avt from '../../assets/images/avatar.png'
import logo from '../../assets/images/logo-website.png'
import user from '../../assets/icon/Sample_User_Icon.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBoxOpen, faBullhorn, faMoneyBill, faChartBar, faCog, faStore, faLanguage, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


class Header extends Component {
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
           <header className="header">
                <div className="left">
                    {/* Logo */}
                    <div className="logo">Logo</div>
                </div>
                <div className="right">
                    {/* Icon thông báo */}
                    <div className="icon notification">
                    <i className="fas fa-bell"></i>
                    {/* Box thông báo */}
                    <div className="notification-box">Thông báo 1<br />Thông báo 2</div>
                    </div>
                    {/* Icon tính năng khác */}
                    <div className="icon features">
                    <i className="fas fa-list"></i>
                    {/* Box tính năng */}
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
                    {/* Avatar và tên người bán */}
                    <div className="avatar">
                    {/* Avatar */}
                    <div className="avatar-img">A</div>
                    {/* Tên người bán */}
                    <div className="seller-name">Lê Quang Tuấn</div>
                    {/* Box thông tin người bán */}
                    <div className="seller-info-box">
                        <div className="avatar-img-in-box">A</div>
                        <div className="seller-details">
                        <div className="name">Lê Quang Tuấn</div>
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
