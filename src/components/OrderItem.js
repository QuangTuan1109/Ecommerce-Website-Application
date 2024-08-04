import React, { Component } from 'react';
import { connect } from 'react-redux';
import './OrderItem.scss'
import OrderTable from './OrderTable';
import OrderInformation from './OrderInformation';
import axios from '../axios'
class OrderItem extends Component {
    handlePaymentClick = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const { order } = this.props;
            const totalAmount = order.totalAmount;

            const response = await axios.post('http://localhost:5000/api/v1/payment/momo', 
                {
                    amount: totalAmount,
                    orderId: order._id
                }, 
                {
                    headers: {
                        'Authorization': `${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.payUrl) {
                window.open(response.payUrl, '_blank');
            } else {
                console.error('Payment URL not provided in the response');
            }


        } catch (error) {
            console.error('Payment API call failed:', error);
        }
    };
    render() {
        const { order, infomations, showReturnColumns, returnProductIds, handleInputChange, handleCancelOrder,
            handleConfirmOrder, handleReturnRefundClick, handleSelectProduct, handleConfirmReturn, handleCancelReturn, columns,
            remainingTimes, formatRemainingTime, handleConfirmProduct, handleShippedProduct, handleApproveReturn, handleRejectReturn } = this.props;

        return (
            <div key={order._id} className="order-item">
                <div className='general-order-information'>
                    <div className='delivery-information'>
                        <h3>Delivery information</h3>
                        <label><div className='label-name'><span>Name of recipient: </span></div><div className='label-content'>{order.recipName}</div></label>
                        <label><div className='label-name'><span>Recipient phone number: </span></div><div className='label-content'> {order.phone} </div></label>
                        <label><div className='label-name'><span>Delivery address: </span></div><div className='label-content'> {order.shippingAddress} </div></label>
                    </div>
                    <div className='order-information'>
                        <h3>Order information</h3>
                        <OrderInformation orders={order} infomations={infomations} />
                    </div>
                </div>
                <div className='product-information'>
                    <h3>Product Information</h3>
                    <div className='product-table'>
                        <OrderTable
                            orders={order}
                            columns={columns}
                            remainingTimes={remainingTimes}
                            formatRemainingTime={formatRemainingTime}
                            handleConfirmProduct={handleConfirmProduct}
                            handleShippedProduct={handleShippedProduct}
                            handleApproveReturn={handleApproveReturn}
                            handleRejectReturn={handleRejectReturn}
                            showReturnColumns={showReturnColumns}
                            returnProductIds={returnProductIds}
                            handleInputChange={handleInputChange}
                            handleSelectProduct={handleSelectProduct} />
                    </div>
                </div>
                <div className='action-btn'>
                    {((order.paymentMethod === 'Online payment' && order.paymentStatus === 'Unpaid' && order.orderStatus === 'Pending') && !remainingTimes) && (
                            <>
                                <div className='payment-info'>
                                    <div className='payment-section' onClick={this.handlePaymentClick}>
                                        <div className='payment-logo' />
                                        <div className='payment-details'>
                                            <label className='payment-title'>Payment by MoMo</label>
                                            <span className='payment-subtitle'>Via MoMo banking app</span>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                         {(((order.orderStatus === 'Pending' ||
                        (order.cancelRequest === false && order.orderStatus === 'Confirmed')) && !remainingTimes) ) && (
                            <>
                                <button className="cancel-order-button" onClick={() => handleCancelOrder(order._id)}>Cancel Order</button>
                            </>
                        )}
                    {(order.cancelRequest === true &&
                        order.orderStatus === 'Confirmed') && (
                            <button className="cancel-request-order-button" disabled>Request pending</button>
                        )}
                    {(!remainingTimes && (order.orderStatus === 'Delivered' || ((order.orderStatus === 'Return/Refund' || order.orderStatus === 'Partial Return/Refund') && order.products.some(product => product.productStatus === 'Return/Refund' && product.returnOrderStatus === 'Delivered'))) && !showReturnColumns[order._id]) && (
                        <>
                            <button className="return-refund-order-button" onClick={() => handleReturnRefundClick(order._id)}>Return/Refund</button>
                            <button className="confirm-order-button" onClick={() => handleConfirmOrder(order._id)}>Confirm Order</button>
                        </>
                    )}
                    {(((!remainingTimes && (order.orderStatus === 'Return/Refund' || order.orderStatus === 'Partial Return/Refund') && order.products.some(product => product.productStatus === 'Return/Refund' && product.returnOrderStatus === 'Failed'))) && !showReturnColumns[order._id]) && (
                        <>
                            <button className="confirm-order-button" onClick={() => handleConfirmOrder(order._id)}>Confirm Order</button>
                        </>
                    )}
                    {!remainingTimes && (order.orderStatus === 'Delivered' && showReturnColumns[order._id]) && (
                        <>
                            <button className="cancel-order-button" onClick={() => handleCancelReturn()}>Cancel Return</button>
                            <button className="confirm-order-button" onClick={() => handleConfirmReturn(order)}>Confirm Return</button>
                        </>
                    )}
                    {order.orderStatus === 'Completed' && (
                        <>
                            <button className="confirm-order-button" onClick={() => handleCancelOrder(order._id)}>Review</button>
                        </>
                    )}
                </div>
            </div>
        );
    }
}

OrderItem.defaultProps = {
    handleCancelOrder: () => { },
    handleConfirmOrder: () => { },
    handleReturnRefundClick: () => { },
    handleSelectProduct: () => { },
    handleConfirmReturn: () => { },
    handleCancelReturn: () => { },
    formatRemainingTime: () => { },
    handleConfirmProduct: () => { },
    handleShippedProduct: () => { },
    handleApproveReturn: () => { },
    handleRejectReturn: () => { }
};

const mapStateToProps = state => {
    return {
        // Các props cần thiết từ Redux state có thể được truyền vào đây
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // Các actions Redux có thể được truyền vào đây
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderItem);

