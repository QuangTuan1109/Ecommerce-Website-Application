import React, { Component, useState } from 'react';
import { Link  } from "react-router-dom";
import { connect } from 'react-redux';
import './FooterHomepage.scss'

import logo from '../../assets/images/logo-website.png'


class FooterHomepage extends Component {

    render() {
        return (
            <div className='home-footer'>
                <div className='policy-section'>
                    <Link to='/' className='policy-link'>PRIVACY POLICY</Link>
                    <Link to='/' className='policy-link'>OPERATION REGULATIONS</Link>
                    <Link to='/' className='policy-link'>DELIVERY POLICY</Link>
                    <Link to='/' className='policy-link'>REFUND AND REFUND POLICY</Link>
                </div>
                <div className='logo-image-section'>
                    <img src={logo} alt='logo' />
                </div>
                <span>E-shopping Co., Ltd</span>
                <div className='address-section'>
                    <p>Address: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai, Phường Ngọc Khánh, Quận Ba Đình, Thành phố Hà Nội, Việt Nam. Tổng đài hỗ trợ: 19001221 - Email: cskh@hotro.shopee.vn</p>
                    <p>Chịu Trách Nhiệm Quản Lý Nội Dung: Lê Quang Tuấn - Điện thoại liên hệ: 024 73081221 (ext 4678)</p>
                    <p>Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch & Đầu tư TP Hà Nội cấp lần đầu ngày 10/02/2015</p>
                </div>
                <p>&copy; 2023 E-shopping</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(FooterHomepage);
