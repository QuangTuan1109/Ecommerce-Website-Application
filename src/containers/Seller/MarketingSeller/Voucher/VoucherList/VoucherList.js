import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../../Header';
import NavbarHomepage from '../../../HomepageSeller/Section/NavbarHomepage';
import './VoucherList.scss';
import { Link } from 'react-router-dom';
import axios from '../../../../../axios';
import { formatCurrency } from '../../../../../method/handleMethod';
import moment from 'moment';

class VoucherList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            voucherList: []
        };
    }

    componentDidMount() {
        this.fetchVoucherList();
    }

    fetchVoucherList = async () => {
        axios.get('http://localhost:5000/api/v1/promotion/seller-voucher', {
            headers: {
                'Authorization': localStorage.getItem('accessToken')
            }
        })
            .then(response => this.setState({ voucherList: response.data }))
            .catch(error => {
                console.error('Error fetching voucher:', error);
            });
    }

    render() {
        const { voucherList } = this.state;
        
        return (
            <div className='voucher-list-container'>
                <Header />
                <div className="body-container">
                    <div className="sidebar">
                        <NavbarHomepage />
                    </div>
                    <div className="main-content">
                        <div className='add-voucher-component'>
                            <div className='title-component'>
                                <h3>Create Voucher</h3>
                                <span>Create shop-wide discount codes or product-specific discount codes now to attract buyers.</span>
                            </div>
                            <div className='voucher-component'>
                                <div className='voucher-item'>
                                    <div className='voucher-item-content'>
                                        <p>Shop-wide Voucher</p>
                                        <p>Voucher applicable to all products in your shop</p>
                                    </div>
                                    <Link to='/add-voucher?type=voucher-shop'>
                                        <button className='voucher-item-btn'>Create</button>
                                    </Link>
                                </div>
                                <div className='voucher-item'>
                                    <div className='voucher-item-content'>
                                        <p>Product Voucher</p>
                                        <p>Voucher only applicable to selected products</p>
                                    </div>
                                    <Link to='/add-voucher?type=voucher-product'>
                                        <button className='voucher-item-btn'>Create</button>
                                    </Link>
                                </div>
                                <div className='voucher-item'>
                                    <div className='voucher-item-content'>
                                        <p>New Customer Voucher</p>
                                        <p>Voucher aimed at attracting new and potential customers</p>
                                    </div>
                                    <Link to='/add-voucher?type=voucher-new-customer'>
                                        <button className='voucher-item-btn'>Create</button>
                                    </Link>
                                </div>
                                <div className='voucher-item'>
                                    <div className='voucher-item-content'>
                                        <p>Returning Customer Voucher</p>
                                        <p>Voucher aimed at attracting repeat customers</p>
                                    </div>
                                    <Link to='/add-voucher?type=voucher-old-customer'>
                                        <button className='voucher-item-btn'>Create</button>
                                    </Link>
                                </div>
                                <div className='voucher-item'>
                                    <div className='voucher-item-content'>
                                        <p>Follower Discount</p>
                                        <p>Encourage buyers to follow your shop by offering vouchers to new followers</p>
                                    </div>
                                    <Link to='/add-voucher?type=voucher-follower'>
                                        <button className='voucher-item-btn'>Create</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className='voucher-list-component'>
                            <div className='voucher-list-header'>
                                <h3>Effectiveness</h3>
                                <p>(From 23-05-2024 to 30-05-2024)</p>
                            </div>
                            <div className='voucher-list-stats'>
                                <div className='stat-item'>
                                    <p>Sales</p>
                                    <p>0</p>
                                </div>
                                <div className='stat-item'>
                                    <p>Orders</p>
                                    <p>0</p>
                                </div>
                                <div className='stat-item'>
                                    <p>Usage Rate</p>
                                    <p>0</p>
                                </div>
                                <div className='stat-item'>
                                    <p>Buyers</p>
                                    <p>0</p>
                                </div>
                            </div>
                            <div className='voucher-list-search'>
                                <input type='text' placeholder='Search' />
                                <button>Search</button>
                            </div>
                            <div className='voucher-list-table'>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Voucher Name | Voucher Code</th>
                                            <th>Code Type</th>
                                            <th>Discount</th>
                                            <th>Max Total Usage</th>
                                            <th>Activity Period</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {voucherList && voucherList.length > 0 ? (
                                            voucherList.map(item => (
                                                <tr key={item._id}>
                                                    <td>{item.nameVoucher}</td>
                                                    <td>{item.typeCode}</td>
                                                    <td>{item.discountType === 'amount' ? formatCurrency(item.discountValue) : `${item.discountValue}%`}</td>
                                                    <td>{item.maxTotalUsage}</td>
                                                    <td>{moment(item.validFrom).format('DD/MM/YYYY - HH:mm:ss')} - {moment(item.validTo).format('DD/MM/YYYY - HH:mm:ss')}</td>
                                                    <td><Link to={`/detail-voucher/${item._id}`} className="action-link">Detail</Link></td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan='6'>No vouchers available</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.seller.isLoggedIn
    };
};

export default connect(mapStateToProps)(VoucherList);
