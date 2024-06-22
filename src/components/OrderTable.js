import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { formatCurrency } from '../method/handleMethod';
import { Link } from 'react-router-dom';
import './OrderTable.scss'

class OrderTable extends Component {
    renderCell = (itemProduct, column) => {
        const { orders, returnProductIds, showReturnColumns, handleInputChange, handleSelectProduct,
            handleConfirmProduct, handleShippedProduct, handleApproveReturn, handleRejectReturn
         } = this.props

        switch (column.key) {
            case 'productName':
                return (
                    <td>
                        <div className='img-product'>
                            <img
                                src={itemProduct.classifyDetail.Image ? itemProduct.classifyDetail.Image : itemProduct.product.Image[0]}
                                alt='img-product'
                                width={100}
                                height={100}
                            />
                        </div>
                        {itemProduct.product.Name}
                    </td>
                );
            case 'variation':
                return (
                    <td>
                        {itemProduct.classifyDetail ? (
                            itemProduct.classifyDetail.Value2 ? (
                                `${itemProduct.classifyDetail.Value1} - ${itemProduct.classifyDetail.Value2}`
                            ) : (
                                itemProduct.classifyDetail.Value1
                            )
                        ) : ('None')}
                    </td>
                );
            case 'quantity':
                return <td>{itemProduct.quantity}</td>;
            case 'price':
                return <td>{formatCurrency(itemProduct.price)}</td>;
            case 'voucher':
                return (
                    <td>
                        {itemProduct.voucherShop.length !== 0 ? (
                            itemProduct.voucherShop.map(voucherShop => (
                                <span key={voucherShop.id}> -{formatCurrency(voucherShop.discountValue)}</span>
                            ))
                        ) : ('None')}
                    </td>
                );
            case 'deliveryMethod':
                return (
                    <td>
                        {itemProduct.deliveryMethod && (
                            itemProduct.deliveryMethod
                        )}
                    </td>
                );
            case 'deliveryFee':
                return (
                    <td>
                        {itemProduct.deliveryFee && (
                            `${formatCurrency(itemProduct.deliveryFee)}`
                        )}
                    </td>
                );
            case 'totalAmount':
                let productTotal = itemProduct.price;
                if (itemProduct.voucherShop.length !== 0) {
                    itemProduct.voucherShop.forEach(voucherShop => {
                        productTotal -= voucherShop.discountValue;
                    });
                }
                return <td>{formatCurrency(productTotal)}</td>;
            case 'note':
                return <td>{itemProduct.message ? itemProduct.message : 'None'}</td>;
            case 'estimatedDeliveryDate':
                return <td>{moment(this.props.orders.createdDate).add(itemProduct.product.preparationTime, 'days').format('DD/MM/YYYY')}</td>;
            case 'confirmOrder':
                if (itemProduct.productStatus === 'Pending') {
                    return (
                        <td>
                            {this.props.remainingTimes[itemProduct._id] > 0 ? (
                                <span>{this.props.formatRemainingTime(this.props.remainingTimes[itemProduct._id])}</span>
                            ) : (
                                <span>Time's up!</span>
                            )}
                        </td>
                    );
                } else {
                    return <td><span>Confirmed</span></td>;
                }
            case 'status':
                return  <td>{itemProduct.productStatus}</td>;
            case 'returnReasonInput':
                return (
                    <td>
                        <input
                            type="text"
                            value={itemProduct.returnReason || ''}
                            name='returnReason'
                            placeholder='Enter your reason and desire'
                            onChange={(e) => handleInputChange(e, orders._id, itemProduct._id)}
                        />
                    </td>
                )
            case 'returnReason':
                return itemProduct.returnRequest === true ? <td>{itemProduct.returnReason}</td> : <td>None</td>;
            case 'returnStatus':
                return itemProduct.returnRequest === true ? <td>{itemProduct.returnStatus}</td> : <td>None</td>;
            case 'returnOrderStatus':
                return itemProduct.returnRequest === true ? <td>{itemProduct.returnOrderStatus}</td> : <td>None</td>;
            case 'action':
                return (
                    <td>
                        {(orders.orderStatus === 'Pending' ||
                            orders.orderStatus === 'Confirmed' ||
                            orders.orderStatus === 'Shipped' ||
                            orders.orderStatus === 'Completed' ||
                            orders.orderStatus === 'Cancelled' ||
                            ((orders.orderStatus === 'Return/Refund' || orders.orderStatus === 'Partial Return/Refund') && orders.products.some(product => product.productStatus === 'Return/Refund')) ||
                            orders.orderStatus === 'Delivery failed' ||
                            (orders.orderStatus === 'Delivered' && !showReturnColumns[orders._id])
                        ) && (
                                <Link to=''>Detail</Link>
                            )}
                        {(showReturnColumns[orders._id] && orders.orderStatus === 'Delivered') && (
                            <button
                                className={`return-order-button ${returnProductIds.includes(itemProduct._id) ? 'selected' : ''}`}
                                onClick={() => handleSelectProduct(orders._id, itemProduct._id)}
                            >
                                {returnProductIds.includes(itemProduct._id) ? 'Hủy' : 'Chọn'}
                            </button>
                        )}
                    </td>
                );
            case 'actions':
                return (
                    <td>
                        {(orders.orderStatus === 'Pending' && itemProduct.productStatus !== 'Confirmed') && (
                            <>
                                <button className="confirm-order-button" onClick={() => handleConfirmProduct(orders._id, itemProduct.product._id, itemProduct.classifyDetail._id)}>Confirm</button>
                            </>
                        )}
                        {(orders.orderStatus === 'Pending' && itemProduct.productStatus === 'Confirmed') && (
                            <button className="confirm-order-button" onClick={() => handleConfirmProduct(orders._id, itemProduct.product._id, itemProduct.classifyDetail._id)}>Confirmed</button>
                        )}
                        {(orders.orderStatus === 'Confirmed' && itemProduct.productStatus !== 'Shipped') && (
                            <button className="confirm-order-button" onClick={() => handleShippedProduct(orders._id, itemProduct.product._id, itemProduct.classifyDetail._id)}>Ship product</button>
                        )}
                        {(orders.orderStatus === 'Confirmed' && itemProduct.productStatus === 'Shipped') && (
                            <button className="confirm-order-button" onClick={() => handleShippedProduct(orders._id, itemProduct.product._id, itemProduct.classifyDetail._id)}>Shipped</button>
                        )}
                        {(orders.orderStatus === 'Shipped' ||
                            orders.orderStatus === 'Delivered' ||
                            orders.orderStatus === 'Completed' ||
                            orders.orderStatus === 'Cancelled' ||
                            itemProduct.productStatus === 'Cancelled' ||
                            itemProduct.productStatus === 'Completed' ||
                            ((orders.orderStatus === 'Return/Refund' || orders.orderStatus === 'Partial Return/Refund') &&
                             orders.products.some(product => product.returnOrderStatus === 'Shipped' || product.returnOrderStatus === 'Failed' || product.returnOrderStatus === 'Shipped')) ||
                            itemProduct.productStatus === 'Delivered') && (
                                <span>None</span>
                            )}
                        {(itemProduct.productStatus === 'Return/Refund' && itemProduct.returnOrderStatus === 'Pending') && (
                            <>
                                <button className="confirm-order-button" onClick={() => handleApproveReturn(orders._id, itemProduct.product._id, itemProduct.classifyDetail._id)}>Approve</button>
                                <button className="cancel-order-button" onClick={() => handleRejectReturn(orders._id, itemProduct.product._id, itemProduct.classifyDetail._id)}>Reject</button>
                            </>
                        )}
                        {(itemProduct.productStatus === 'Return/Refund' && itemProduct.returnOrderStatus === 'Confirmed') && (
                            <button className="confirm-order-button" onClick={() => handleShippedProduct(orders._id, itemProduct.product._id, itemProduct.classifyDetail._id)}>Ship product</button>
                        )}
                    </td>
                );
            default:
                return null;
        }
    };

    render() {
        const { orders, columns } = this.props;

        return (
            <table>
                <thead>
                    <tr>
                        {columns.map(column => (
                            <th key={column.key}>{column.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {orders && orders.products.map((itemProduct, orderIndex) => (
                        <tr key={orderIndex}>
                            {columns.map(column => (
                                <React.Fragment key={column.key}>
                                    {this.renderCell(itemProduct, column)}
                                </React.Fragment>
                            ))}
                        </tr>
                    ))}
                </tbody>

            </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderTable);