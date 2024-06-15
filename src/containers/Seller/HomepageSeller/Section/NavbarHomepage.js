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
                            Order Management
                        </div>
                        {openMenus['orderManagement'] && (
                            <ul className="sub-nav">
                                <li className="sub-nav-item">
                                    <Link to="/sale/order" className="nav-item-link">
                                        <FontAwesomeIcon icon={faShoppingCart} className="nav-icon" />
                                        All Orders
                                    </Link>
                                </li>
                                <li className="sub-nav-item">
                                    <FontAwesomeIcon icon={faBoxOpen} className="nav-icon" />
                                    Order Cancelling
                                </li>
                                <li className="sub-nav-item">
                                    <FontAwesomeIcon icon={faBoxOpen} className="nav-icon" />
                                    Return/Refund
                                </li>
                                <li className="sub-nav-item">
                                    <FontAwesomeIcon icon={faBoxOpen} className="nav-icon" />
                                    Delivery Settings
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className="nav-item">
                        <div className="nav-item-header" onClick={() => this.toggleMenu('productManagement')}>
                            <FontAwesomeIcon icon={openMenus['productManagement'] ? faCaretUp : faCaretDown} className="nav-icon" />
                            Product Management
                        </div>
                        {openMenus['productManagement'] && (
                            <ul className="sub-nav">
                                <li className="sub-nav-item">
                                    <Link to="/all-product" className="nav-item-link">
                                        <FontAwesomeIcon icon={faShoppingCart} className="nav-icon" />
                                        All Product
                                    </Link>
                                </li>
                                <li className="sub-nav-item">
                                    <Link to="/create-product" className="nav-item-link">
                                        <FontAwesomeIcon icon={faBoxOpen} className="nav-icon" />
                                        Create Product
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className="nav-item">
                        <div className="nav-item-header" onClick={() => this.toggleMenu('marketingChanel')}>
                            <FontAwesomeIcon icon={openMenus['marketingChanel'] ? faCaretUp : faCaretDown} className="nav-icon" />
                            Marketing Channel
                        </div>
                        {openMenus['marketingChanel'] && (
                            <ul className="sub-nav">
                                <li className="sub-nav-item">
                                    <FontAwesomeIcon icon={faShoppingCart} className="nav-icon" />
                                    Marketing Channel
                                </li>
                                <li className="sub-nav-item">
                                    <FontAwesomeIcon icon={faBoxOpen} className="nav-icon" />
                                    ShopSpace Ads
                                </li>
                                <li className="sub-nav-item">
                                    <Link to="/voucher/list" className="nav-item-link">
                                        <FontAwesomeIcon icon={faBoxOpen} className="nav-icon" />
                                        Voucher Shop
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
                            Finance
                        </div>
                        {openMenus['finance'] && (
                            <ul className="sub-nav">
                                <li className="sub-nav-item">
                                    <FontAwesomeIcon icon={faShoppingCart} className="nav-icon" />
                                    Revenue
                                </li>
                                <li className="sub-nav-item">
                                    <FontAwesomeIcon icon={faBoxOpen} className="nav-icon" />
                                    ShopSpace Balance
                                </li>
                                <li className="sub-nav-item">
                                    <FontAwesomeIcon icon={faBoxOpen} className="nav-icon" />
                                    Bank account
                                </li>
                                <li className="sub-nav-item">
                                    <FontAwesomeIcon icon={faBoxOpen} className="nav-icon" />
                                    Payment Settings
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className="nav-item">
                        <div className="nav-item-header" onClick={() => this.toggleMenu('data')}>
                            <FontAwesomeIcon icon={openMenus['data'] ? faCaretUp : faCaretDown} className="nav-icon" />
                            Data
                        </div>
                        {openMenus['data'] && (
                            <ul className="sub-nav">
                                <li className="sub-nav-item">
                                    <FontAwesomeIcon icon={faShoppingCart} className="nav-icon" />
                                    Sales Analysis
                                </li>
                                <li className="sub-nav-item">
                                    <FontAwesomeIcon icon={faBoxOpen} className="nav-icon" />
                                    Operational Efficiency
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className="nav-item">
                        <div className="nav-item-header" onClick={() => this.toggleMenu('development')}>
                            <FontAwesomeIcon icon={openMenus['development'] ? faCaretUp : faCaretDown} className="nav-icon" />
                            Development
                        </div>
                        {openMenus['development'] && (
                            <ul className="sub-nav">
                                <li className="sub-nav-item">
                                    <FontAwesomeIcon icon={faShoppingCart} className="nav-icon" />
                                    Seller Duties
                                </li>
                                <li className="sub-nav-item">
                                    <FontAwesomeIcon icon={faBoxOpen} className="nav-icon" />
                                    Favorite Shop
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className="nav-item">
                        <div className="nav-item-header" onClick={() => this.toggleMenu('customerCare')}>
                            <FontAwesomeIcon icon={openMenus['customerCare'] ? faCaretUp : faCaretDown} className="nav-icon" />
                            Customer Care
                        </div>
                        {openMenus['customerCare'] && (
                            <ul className="sub-nav">
                                <li className="sub-nav-item">
                                    <FontAwesomeIcon icon={faShoppingCart} className="nav-icon" />
                                    Chat Assistant
                                </li>
                                <li className="sub-nav-item">
                                    <FontAwesomeIcon icon={faBoxOpen} className="nav-icon" />
                                    Q&A
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className="nav-item">
                        <div className="nav-item-header" onClick={() => this.toggleMenu('shopManagement')}>
                            <FontAwesomeIcon icon={openMenus['shopManagement'] ? faCaretUp : faCaretDown} className="nav-icon" />
                            Shop Management
                        </div>
                        {openMenus['shopManagement'] && (
                            <ul className="sub-nav">
                                <li className="sub-nav-item">
                                    <FontAwesomeIcon icon={faShoppingCart} className="nav-icon" />
                                    Shop Rating
                                </li>
                                <li className="sub-nav-item">
                                    <FontAwesomeIcon icon={faBoxOpen} className="nav-icon" />
                                    Shop Profile
                                </li>
                                <li className="sub-nav-item">
                                    <FontAwesomeIcon icon={faBoxOpen} className="nav-icon" />
                                    Shop Decoration
                                </li>
                                <li className="sub-nav-item">
                                    <FontAwesomeIcon icon={faBoxOpen} className="nav-icon" />
                                    Shop Directory
                                </li>
                                <li className="sub-nav-item">
                                    <FontAwesomeIcon icon={faBoxOpen} className="nav-icon" />
                                    My Report
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className="nav-item">
                        <div className="nav-item-header" onClick={() => this.toggleMenu('shopSetup')}>
                            <FontAwesomeIcon icon={openMenus['shopSetup'] ? faCaretUp : faCaretDown} className="nav-icon" />
                            Setup Shop
                        </div>
                        {openMenus['shopSetup'] && (
                            <ul className="sub-nav">
                                <li className="sub-nav-item">
                                    <FontAwesomeIcon icon={faShoppingCart} className="nav-icon" />
                                    Address
                                </li>
                                <li className="sub-nav-item">
                                    <FontAwesomeIcon icon={faBoxOpen} className="nav-icon" />
                                    Setup Shop
                                </li>
                                <li className="sub-nav-item">
                                    <FontAwesomeIcon icon={faBoxOpen} className="nav-icon" />
                                    Account
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className="nav-item">
                        <div className="nav-item-header" onClick={() => this.toggleMenu('help')}>
                            <FontAwesomeIcon icon={openMenus['help'] ? faCaretUp : faCaretDown} className="nav-icon" />
                            Help
                        </div>
                        {openMenus['help'] && (
                            <ul className="sub-nav">
                                <li className="sub-nav-item">
                                    <FontAwesomeIcon icon={faShoppingCart} className="nav-icon" />
                                    Seller Support
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
