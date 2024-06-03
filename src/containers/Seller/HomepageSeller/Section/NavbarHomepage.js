import React, { Component } from 'react';
import { connect } from 'react-redux';
import './NavbarHomepage.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faShoppingCart, faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


class NavbarHomepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openMenus: {
                orderManagement: false,
                productManagement: false,
                marketingChanel: false,
                finance: false,
                data: false,
                development: false,
                customerCare: false,
                shopManagement: false,
                shopSetup: false,
                help: false
            }
        };
    }

    toggleMenu(menuName) {
        this.setState(prevState => ({
            openMenus: {
                ...prevState.openMenus,
                [menuName]: !prevState.openMenus[menuName]
            }
        }));
    }

    render() {
        const { openMenus } = this.state;

        return (
            <nav className="navbar">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <div className="nav-item-header" onClick={() => this.toggleMenu('orderManagement')}>
                            <FontAwesomeIcon icon={openMenus['orderManagement'] ? faCaretUp : faCaretDown} className="nav-icon" />
                            Quản Lý Đơn Hàng
                        </div>
                        {openMenus['orderManagement'] && (
                            <ul className="sub-nav">
                                <li className="sub-nav-item">
                                    <FontAwesomeIcon icon={faShoppingCart} className="nav-icon" />
                                    Tất Cả Đơn Hàng
                                </li>
                                <li className="sub-nav-item">
                                    <FontAwesomeIcon icon={faBoxOpen} className="nav-icon" />
                                    Giao Hàng Loạt
                                </li>
                                <li className="sub-nav-item">
                                    <FontAwesomeIcon icon={faBoxOpen} className="nav-icon" />
                                    Đơn Hủy
                                </li>
                                <li className="sub-nav-item">
                                    <FontAwesomeIcon icon={faBoxOpen} className="nav-icon" />
                                    Trả Hàng Hoàn Tiền
                                </li>
                                <li className="sub-nav-item">
                                    <FontAwesomeIcon icon={faBoxOpen} className="nav-icon" />
                                    Cài Đặt Vận chuyển
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className="nav-item">
                        <div className="nav-item-header" onClick={() => this.toggleMenu('productManagement')}>
                            <FontAwesomeIcon icon={openMenus['productManagement'] ? faCaretUp : faCaretDown} className="nav-icon" />
                            Quản lý sản phẩm
                        </div>
                        {openMenus['productManagement'] && (
                            <ul className="sub-nav">
                                <li className="sub-nav-item">
                                    <Link to="/all-product" className="nav-item-link">
                                        <FontAwesomeIcon icon={faShoppingCart} className="nav-icon" />
                                        Tất Cả Sản Phẩm
                                    </Link>
                                </li>
                                <li className="sub-nav-item">
                                    <Link to="/create-product" className="nav-item-link">
                                        <FontAwesomeIcon icon={faBoxOpen} className="nav-icon" />
                                        Thêm Sản Phẩm
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className="nav-item">
                        <div className="nav-item-header" onClick={() => this.toggleMenu('marketingChanel')}>
                            <FontAwesomeIcon icon={openMenus['marketingChanel'] ? faCaretUp : faCaretDown} className="nav-icon" />
                            Kênh Marketing
                        </div>
                        {openMenus['marketingChanel'] && (
                            <ul className="sub-nav">
                                <li className="sub-nav-item">
                                    <FontAwesomeIcon icon={faShoppingCart} className="nav-icon" />
                                    Kênh Marketing
                                </li>
                                <li className="sub-nav-item">
                                    <FontAwesomeIcon icon={faBoxOpen} className="nav-icon" />
                                    Quảng Cáo ShopSpace
                                </li>
                                <li className="sub-nav-item">
                                    <Link to="/voucher/list" className="nav-item-link">
                                        <FontAwesomeIcon icon={faBoxOpen} className="nav-icon" />
                                        Mã giảm giá của shop
                                    </Link>
                                </li>
                                <li className="sub-nav-item">
                                    <FontAwesomeIcon icon={faBoxOpen} className="nav-icon" />
                                    Live & Video
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className="nav-item">
                        <div className="nav-item-header" onClick={() => this.toggleMenu('finance')}>
                            <FontAwesomeIcon icon={openMenus['finance'] ? faCaretUp : faCaretDown} className="nav-icon" />
                            Tài Chính
                        </div>
                        {openMenus['finance'] && (
                            <ul className="sub-nav">
                                <li className="sub-nav-item">
                                    <FontAwesomeIcon icon={faShoppingCart} className="nav-icon" />
                                    Doanh Thu
                                </li>
                                <li className="sub-nav-item">
                                    <FontAwesomeIcon icon={faBoxOpen} className="nav-icon" />
                                    Số Dư ShopSpace
                                </li>
                                <li className="sub-nav-item">
                                    <FontAwesomeIcon icon={faBoxOpen} className="nav-icon" />
                                    Tài Khoản Ngân Hàng
                                </li>
                                <li className="sub-nav-item">
                                    <FontAwesomeIcon icon={faBoxOpen} className="nav-icon" />
                                    Cài Đặt Thanh Toán
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className="nav-item">
                        <div className="nav-item-header" onClick={() => this.toggleMenu('data')}>
                            <FontAwesomeIcon icon={openMenus['data'] ? faCaretUp : faCaretDown} className="nav-icon" />
                            Dữ Liệu
                        </div>
                        {openMenus['data'] && (
                            <ul className="sub-nav">
                                <li className="sub-nav-item">
                                    <FontAwesomeIcon icon={faShoppingCart} className="nav-icon" />
                                    Phân Tích Bán Hàng
                                </li>
                                <li className="sub-nav-item">
                                    <FontAwesomeIcon icon={faBoxOpen} className="nav-icon" />
                                    Hiệu Quả Hoạt Động
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className="nav-item">
                        <div className="nav-item-header" onClick={() => this.toggleMenu('development')}>
                            <FontAwesomeIcon icon={openMenus['development'] ? faCaretUp : faCaretDown} className="nav-icon" />
                            Phát Triển
                        </div>
                        {openMenus['development'] && (
                            <ul className="sub-nav">
                                <li className="sub-nav-item">
                                    <FontAwesomeIcon icon={faShoppingCart} className="nav-icon" />
                                    Nhiệm Vụ Người Bán
                                </li>
                                <li className="sub-nav-item">
                                    <FontAwesomeIcon icon={faBoxOpen} className="nav-icon" />
                                    Shop Yêu Thích
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className="nav-item">
                        <div className="nav-item-header" onClick={() => this.toggleMenu('customerCare')}>
                            <FontAwesomeIcon icon={openMenus['customerCare'] ? faCaretUp : faCaretDown} className="nav-icon" />
                            Chăm Sóc Khách Hàng
                        </div>
                        {openMenus['customerCare'] && (
                            <ul className="sub-nav">
                                <li className="sub-nav-item">
                                    <FontAwesomeIcon icon={faShoppingCart} className="nav-icon" />
                                    Trợ Lý Chat
                                </li>
                                <li className="sub-nav-item">
                                    <FontAwesomeIcon icon={faBoxOpen} className="nav-icon" />
                                    Hỏi Đáp
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className="nav-item">
                        <div className="nav-item-header" onClick={() => this.toggleMenu('shopManagement')}>
                            <FontAwesomeIcon icon={openMenus['shopManagement'] ? faCaretUp : faCaretDown} className="nav-icon" />
                            Quản Lý Shop
                        </div>
                        {openMenus['shopManagement'] && (
                            <ul className="sub-nav">
                                <li className="sub-nav-item">
                                    <FontAwesomeIcon icon={faShoppingCart} className="nav-icon" />
                                    Đánh Giá Shop
                                </li>
                                <li className="sub-nav-item">
                                    <FontAwesomeIcon icon={faBoxOpen} className="nav-icon" />
                                    Hồ Sơ Shop
                                </li>
                                <li className="sub-nav-item">
                                    <FontAwesomeIcon icon={faBoxOpen} className="nav-icon" />
                                    Trang Trí Shop
                                </li>
                                <li className="sub-nav-item">
                                    <FontAwesomeIcon icon={faBoxOpen} className="nav-icon" />
                                    Danh Mục Của Shop
                                </li>
                                <li className="sub-nav-item">
                                    <FontAwesomeIcon icon={faBoxOpen} className="nav-icon" />
                                    Kho Hình Ảnh/Video
                                </li>
                                <li className="sub-nav-item">
                                    <FontAwesomeIcon icon={faBoxOpen} className="nav-icon" />
                                    Báo Cáo Của Tôi
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className="nav-item">
                        <div className="nav-item-header" onClick={() => this.toggleMenu('shopSetup')}>
                            <FontAwesomeIcon icon={openMenus['shopSetup'] ? faCaretUp : faCaretDown} className="nav-icon" />
                            Thiết Lập shop
                        </div>
                        {openMenus['shopSetup'] && (
                            <ul className="sub-nav">
                                <li className="sub-nav-item">
                                    <FontAwesomeIcon icon={faShoppingCart} className="nav-icon" />
                                    Địa chỉ
                                </li>
                                <li className="sub-nav-item">
                                    <FontAwesomeIcon icon={faBoxOpen} className="nav-icon" />
                                    Thiết Lập Shop
                                </li>
                                <li className="sub-nav-item">
                                    <FontAwesomeIcon icon={faBoxOpen} className="nav-icon" />
                                    Tài Khoản
                                </li>
                                <li className="sub-nav-item">
                                    <FontAwesomeIcon icon={faBoxOpen} className="nav-icon" />
                                    Nền Tảng Đối Tác
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className="nav-item">
                        <div className="nav-item-header" onClick={() => this.toggleMenu('help')}>
                            <FontAwesomeIcon icon={openMenus['help'] ? faCaretUp : faCaretDown} className="nav-icon" />
                            Trợ Giúp
                        </div>
                        {openMenus['help'] && (
                            <ul className="sub-nav">
                                <li className="sub-nav-item">
                                    <FontAwesomeIcon icon={faShoppingCart} className="nav-icon" />
                                    Hỗ Trợ Người Bán
                                </li>
                            </ul>
                        )}
                    </li>
                </ul>
            </nav>
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

export default connect(mapStateToProps, mapDispatchToProps)(NavbarHomepage);
