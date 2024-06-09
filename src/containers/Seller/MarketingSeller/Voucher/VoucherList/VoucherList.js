import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../../Header';
import NavbarHomepage from '../../../HomepageSeller/Section/NavbarHomepage';
import './VoucherList.scss';
import { Link } from 'react-router-dom';
import axios from '../../../../../axios'
import { formatCurrency } from '../../../../../method/handleMethod'
import moment from 'moment';

class VoucherList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            voucherList: []
        };
    }

    componentDidMount() {
        this.fetchVoucherList()
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
        const { voucherList } = this.state
        
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
                                <h3>Tạo Voucher</h3>
                                <span>Tạo Mã giảm giá toàn shop hoặc Mã giảm giá sản phẩm ngay bây giờ để thu hút người mua.</span>
                            </div>
                            <div className='voucher-component'>
                                <div className='voucher-item'>
                                    <div className='voucher-item-content'>
                                        <p>Voucher toàn Shop</p>
                                        <p>Voucher áp dụng cho tất cả sản phẩm trong shop của bạn</p>
                                    </div>
                                    <Link to='/add-voucher?type=voucher-shop'>
                                        <button className='voucher-item-btn'>Tạo</button>
                                    </Link>
                                </div>
                                <div className='voucher-item'>
                                    <div className='voucher-item-content'>
                                        <p>Voucher sản phẩm</p>
                                        <p>Voucher chỉ áp dụng cho những sản phẩm nhất định mà shop chọn</p>
                                    </div>
                                    <Link to='/add-voucher?type=voucher-product'>
                                        <button className='voucher-item-btn'>Tạo</button>
                                    </Link>
                                </div>
                                <div className='voucher-item'>
                                    <div className='voucher-item-content'>
                                        <p>Voucher khách hàng mới</p>
                                        <p>Voucher nhằm thu hút khách hàng mới và khách hàng tiềm năng</p>
                                    </div>
                                    <Link to='/add-voucher?type=voucher-new-customer'>
                                        <button className='voucher-item-btn'>Tạo</button>
                                    </Link>
                                </div>
                                <div className='voucher-item'>
                                    <div className='voucher-item-content'>
                                        <p>Voucher khách hàng mua lại</p>
                                        <p>Voucher nhằm thu hút khách hàng mục tiêu có đơn mua lại tại shop</p>
                                    </div>
                                    <Link to='/add-voucher?type=voucher-old-customer'>
                                        <button className='voucher-item-btn'>Tạo</button>
                                    </Link>
                                </div>
                                <div className='voucher-item'>
                                    <div className='voucher-item-content'>
                                        <p>Ưu đãi follower</p>
                                        <p>Khuyến khích người mua theo dõi shop bằng cách tặng Voucher cho người theo dõi mới</p>
                                    </div>
                                    <Link to='/add-voucher?type=voucher-follower'>
                                        <button className='voucher-item-btn'>Tạo</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className='voucher-list-component'>
                            <div className='voucher-list-header'>
                                <h3>Hiệu Quả</h3>
                                <p>(Từ 23-05-2024 đến 30-05-2024)</p>
                            </div>
                            <div className='voucher-list-stats'>
                                <div className='stat-item'>
                                    <p>Doanh Số</p>
                                    <p>0</p>
                                </div>
                                <div className='stat-item'>
                                    <p>Đơn hàng</p>
                                    <p>0</p>
                                </div>
                                <div className='stat-item'>
                                    <p>Tỉ lệ sử dụng</p>
                                    <p>0</p>
                                </div>
                                <div className='stat-item'>
                                    <p>Người mua</p>
                                    <p>0</p>
                                </div>
                            </div>
                            <div className='voucher-list-search'>
                                <input type='text' placeholder='Tìm kiếm' />
                                <button>Tìm</button>
                            </div>
                            <div className='voucher-list-table'>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Tên Voucher | Mã voucher</th>
                                            <th>Loại mã</th>
                                            <th>Giảm giá</th>
                                            <th>Tổng lượt sử dụng tối đa</th>
                                            <th>Thời gian hoạt động</th>
                                            <th>Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {voucherList && voucherList.length > 0 ? (
                                            voucherList.map(item => (
                                                <tr>
                                                    <td>{item.nameVoucher}</td>
                                                    <td>{item.typeCode}</td>
                                                    <td>{item.discountType === 'amount' ? formatCurrency(item.discountValue) : `${item.discountValue}%`}</td>
                                                    <td>{item.maxTotalUsage}</td>
                                                    <td>{moment(item.validFrom).format('DD/MM/YYYY - HH:mm:ss')} - {moment(item.validTo).format('DD/MM/YYYY - HH:mm:ss')}</td>
                                                    <td>Xóa</td>
                                                </tr>
                                            ))
                                        ) : (

                                            <tr>
                                                <td colSpan='9'>Không có Mã giảm giá nào</td>
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
