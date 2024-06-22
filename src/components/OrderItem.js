import React, { Component } from 'react';
import { connect } from 'react-redux';
import './OrderItem.scss'
import OrderTable from './OrderTable';
import OrderInformation from './OrderInformation';

class OrderItem extends Component {
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
                        <OrderInformation orders={order} infomations={infomations}/>
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
                            handleSelectProduct={handleSelectProduct}/>
                    </div>
                </div>
                <div className='action-btn'>
                    {((order.orderStatus === 'Pending' ||
                        (order.cancelRequest === false && order.orderStatus === 'Confirmed')) && !remainingTimes) && (
                            <button className="cancel-order-button" onClick={() => handleCancelOrder(order._id)}>Cancel Order</button>
                        )}
                    {(order.cancelRequest === true &&
                        order.orderStatus === 'Confirmed') && (
                            <button className="cancel-request-order-button" disabled>Request pending</button>
                        )}
                    {((order.orderStatus === 'Delivered' || (!remainingTimes && (order.orderStatus === 'Return/Refund' || order.orderStatus === 'Partial Return/Refund') && order.products.some(product => product.productStatus === 'Return/Refund' && product.returnOrderStatus === 'Delivered'))) && !showReturnColumns[order._id]) && (
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
                    {(order.orderStatus === 'Delivered' && showReturnColumns[order._id]) && (
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

