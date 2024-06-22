import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { formatCurrency } from '../method/handleMethod';
import './OrderTable.scss'

class OrderInformation extends Component {
    renderInfor = (order, infomation) => {
        switch (infomation.key) {
            case 'orderCode':
                return <label><div className='label-name'><span>Order code: </span></div><div className='label-content'> {order._id}</div></label>;
            case 'shopspaceVoucher':
                return <label><div className='label-name'><span>Shopspace voucher has been applied: </span></div><div className='label-content'> {order.voucherSystem.length !== 0 ? order.voucherSystem.map(voucherSys => voucherSys) : 'None'}</div></label>;
            case 'totalOrderPayment':
                return <label><div className='label-name'><span>Total order payment: </span></div><div className='label-content'> {formatCurrency(order.totalAmount)}</div></label>
            case 'totalOrder':
                let totalOrderAmount = 0;
                order.products.forEach(itemProduct => {
                    let productTotal = itemProduct.price;

                    if (itemProduct.voucherShop.length !== 0) {
                        itemProduct.voucherShop.forEach(voucherShop => {
                            productTotal -= voucherShop.discountValue;
                        });
                    }

                    totalOrderAmount += productTotal;
                });
                return <label><div className='label-name'><span>Total order: </span></div><div className='label-content'> {formatCurrency(totalOrderAmount)}</div></label>
            case 'paymentOrder':
                return <label><div className='label-name'><span>Payment order: </span></div><div className='label-content'> {order.bankTransferImage.length !== 0 || order.orderStatus === 'Completed' || order.orderStatus === 'Delivered' || order.orderStatus === 'Return/Refund' ? 'Paid' : 'Unpaid'}</div></label>
            case 'paymentMethod':
                return <label><div className='label-name'><span>Payment method: </span></div><div className='label-content'> {order.paymentMethod}</div></label>;
            case 'ordertatus':
                return <label><div className='label-name'><span>Order status: </span></div><div className='label-content'> {order.orderStatus}</div></label>;
            case 'ordredDate':
                return <label><div className='label-name'><span>Order date: </span></div><div className='label-content'>{moment(order.createdDate).format('DD/MM/YYYY - HH:mm:ss')}</div></label>;
            case 'updatedDate':
                return <label><div className='label-name'><span>Update date: </span></div><div className='label-content'>{moment(order.updated).format('DD/MM/YYYY - HH:mm:ss')}</div></label>;
            default:
                return null;
        }
    };

    render() {
        const { orders, infomations } = this.props;

        return (
            orders &&  (
                infomations.map(infomation => (
                    this.renderInfor(orders, infomation)
                ))
            )
        );
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderInformation);