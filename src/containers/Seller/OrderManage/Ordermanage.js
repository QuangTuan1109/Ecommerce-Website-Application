// OrderManage.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './OrderManage.scss';

import Header from '../Header';
import NavbarHomepage from '../HomepageSeller/Section/NavbarHomepage';
import OrderItem from '../../../components/OrderItem';
import withOrderManagement from '../../../hoc/withOrderManagement';

class OrderManage extends Component {
    renderContentBasedOnTab = () => {
        const { activeTab, remainingTimes, filterOrders, formatRemainingTime, handleConfirmProduct, handleShippedProduct, handleApproveReturn, handleRejectReturn } = this.props;
        const filteredOrders = filterOrders(activeTab);

        if (filteredOrders.length === 0) {
            return (
                <div className="order-list">
                    <p>0 Đơn hàng</p>
                    <div className="order-table">
                        <p>Không tìm thấy đơn hàng</p>
                    </div>
                </div>
            );
        }

        return (
            <div className="order-list">
                {filteredOrders.map(order => {
                     let infomations = [
                        { key: 'orderCode'},
                        { key: 'paymentMethod'},
                        { key: 'totalOrder'},
                        { key: 'paymentOrder'},
                        { key: 'ordredDate'},
                        { key: 'updatedDate'}
                    ];

                    let columns = [
                        { key: 'productName', label: 'Product Name' },
                        { key: 'variation', label: 'Variation' },
                        { key: 'quantity', label: 'Quantity' },
                        { key: 'price', label: 'Price' },
                        { key: 'voucher', label: 'Voucher' },
                        { key: 'totalAmount', label: 'Total Amount' },
                        { key: 'note', label: 'Note' },
                        { key: 'estimatedDeliveryDate', label: 'Estimated Delivery Date' },
                        { key: 'confirmOrder', label: 'Confirm Order' },
                        { key: 'status', label: 'Status' },
                        { key: 'actions', label: 'Action' }
                    ];

                    return (
                        <OrderItem
                            key={order._id}
                            order={order}
                            infomations={infomations}
                            columns={columns}
                            remainingTimes={remainingTimes}
                            formatRemainingTime={formatRemainingTime}
                            handleConfirmProduct={handleConfirmProduct}
                            handleShippedProduct={handleShippedProduct}
                            handleApproveReturn={handleApproveReturn}
                            handleRejectReturn={handleRejectReturn}
                        />
                    );
                })}
            </div>
        );
    };

    render() {
        const { activeTab, handleTabClick } = this.props;

        return (
            <div className='order-manage-container'>
                <Header />
                <div className='order-manage-body'>
                    <div className="sidebar">
                        <NavbarHomepage />
                    </div>
                    <div className="order-manage-main">
                        <div className="header">
                            <h2>{activeTab}</h2>
                        </div>
                        <div className="tabs">
                            <div className="navbar-content">
                                <ul className="sub-nav">
                                    {['All', 'Wait for confirmation', 'Waiting for delivery', 'Delivering', 'Delivered', 'Completed', 'Cancelled', 'Return/Refund', 'Delivery failed'].map(tab => (
                                        <li key={tab} className={`sub-nav-item ${activeTab === tab ? 'active' : ''}`} onClick={() => handleTabClick(tab)}>
                                            <FontAwesomeIcon className="nav-icon" />
                                            {tab}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="order-search">
                            <input type="text" placeholder="Order code" />
                            <select>
                                <option>Shipping unit</option>
                                <option>ALL ĐVVC</option>
                            </select>
                        </div>
                        {this.renderContentBasedOnTab()}
                    </div>
                </div>
            </div>
        );

    }
}

const mapStateToProps = state => ({
    seller: state.seller,
});

export default connect(mapStateToProps)(withOrderManagement(OrderManage));
