import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './OrderManage.scss';
import jwt from 'jsonwebtoken';
import moment from 'moment';


import Header from '../Header'
import NavbarHomepage from '../HomepageSeller/Section/NavbarHomepage'
import axios from '../../../axios'
import { formatCurrency } from '../../../method/handleMethod';

class OrderManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'All',
            orders: [],
            remainingTimes: {}
        };
    }

    componentDidMount() {
        this.fetchOrders()
        this.startTimer();
    }

    startTimer = () => {
        this.timerInterval = setInterval(this.updateRemainingTimes, 1000);
    }

    updateRemainingTimes = () => {
        const { orders } = this.state;
        const updatedRemainingTimes = {};

        orders.forEach(order => {
            order.products.forEach(product => {
                const currentTime = new Date();
                const confirmationTime = new Date(product.confirmationTime);

                if (currentTime < confirmationTime) {
                    const remainingTime = Math.max((confirmationTime - currentTime) / 1000, 0);

                    updatedRemainingTimes[product._id] = remainingTime;
                } else {
                    updatedRemainingTimes[product._id] = 0;
                }
            });
        });

        this.setState({ remainingTimes: updatedRemainingTimes });
    }

    fetchOrders = async () => {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
            try {
                const decodedToken = jwt.decode(accessToken);
                if (decodedToken) {
                    const sellerID = decodedToken.sub;

                    axios.get(`http://localhost:5000/api/v1/order/${sellerID}`, {
                        headers: {
                            'Authorization': localStorage.getItem('accessToken')
                        }
                    })
                        .then(response => this.setState({ orders: response }))
                        .catch(error => {
                            console.error('Error fetching voucher:', error);
                        });
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        }
    }

    handleConfirmProduct = async (orderId, productId, classifyDetailId) => {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
            try {
                await axios.post(`http://localhost:5000/api/v1/order/confirm-order`,
                    {
                        orderId,
                        productId,
                        classifyDetailId
                    },
                    {
                        headers: {
                            'Authorization': accessToken
                        }
                    });
                this.fetchOrders();
            } catch (error) {
                console.error('Error confirming product:', error);
            }
        }
    }

    handleShippedProduct = async (orderId, productId, classifyDetailId) => {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
            try {
                await axios.post(`http://localhost:5000/api/v1/order/confirm-shipped-order`,
                    {
                        orderId,
                        productId,
                        classifyDetailId
                    },
                    {
                        headers: {
                            'Authorization': accessToken
                        }
                    });
                this.fetchOrders();
            } catch (error) {
                console.error('Error confirming product:', error);
            }
        }
    }

    handleApproveReturn = async (orderId, productId, classifyDetailId) => {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
            try {
                await axios.post(`http://localhost:5000/api/v1/order/approve-return`,
                    {
                        orderId,
                        productId,
                        classifyDetailId
                    },
                    {
                        headers: {
                            'Authorization': accessToken
                        }
                    });
                this.fetchOrders();
            } catch (error) {
                console.error('Error confirming product:', error);
            }
        }
    }

    handleRejectReturn= async (orderId, productId, classifyDetailId) => {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
            try {
                await axios.post(`http://localhost:5000/api/v1/order/reject-return`,
                    {
                        orderId,
                        productId,
                        classifyDetailId
                    },
                    {
                        headers: {
                            'Authorization': accessToken
                        }
                    });
                this.fetchOrders();
            } catch (error) {
                console.error('Error confirming product:', error);
            }
        }
    }

    handleTabClick = (tabName) => {
        this.setState({ activeTab: tabName });
    }

    filterOrders = (tabName) => {
        const { orders } = this.state;
        return this.filterOrdersByProductStatus(orders, tabName);
    }
    
    filterOrdersByProductStatus = (orders, tabName) => {
        const ordersWithFilteredProducts = [];
    
        orders.forEach(order => {
            const newOrder = { ...order, products: [] };
    
            switch (tabName) {
                case 'Wait for confirmation':
                    newOrder.products = order.products.filter(product => product.productStatus === 'Pending');
                    break;
                case 'Waiting for delivery':
                    newOrder.products = order.products.filter(product => product.productStatus === 'Confirmed');
                    break;
                case 'Delivering':
                    newOrder.products = order.products.filter(product => product.productStatus === 'Shipped');
                    break;
                case 'Delivered':
                    newOrder.products = order.products.filter(product => product.productStatus === 'Delivered');
                    break;
                case 'Completed':
                    newOrder.products = order.products.filter(product => product.productStatus === 'Completed');
                    break;
                case 'Cancelled':
                    newOrder.products = order.products.filter(product => product.productStatus === 'Cancelled');
                    break;
                case 'Return/Refund':
                    newOrder.products = order.products.filter(product => product.productStatus === 'Return/Refund');
                    break;
                case 'Delivery failed':
                    newOrder.products = order.products.filter(product => product.productStatus === 'Delivery failed');
                    break;
                default:
                    newOrder.products = order.products;
                    break;
            }
    
            if (newOrder.products.length > 0) {
                ordersWithFilteredProducts.push(newOrder);
            }
        });
    
        return ordersWithFilteredProducts;
    }
    

    formatRemainingTime = (remainingTimeInSeconds) => {
        const hours = Math.floor(remainingTimeInSeconds / 3600);
        const minutes = Math.floor((remainingTimeInSeconds % 3600) / 60);
        const seconds = Math.floor(remainingTimeInSeconds % 60);

        const formattedHours = hours > 0 ? `${hours}h ` : '';
        const formattedMinutes = `${minutes}m `;
        const formattedSeconds = `${seconds}s`;

        return `${formattedHours}${formattedMinutes}${formattedSeconds}`;
    }


    componentWillUnmount() {
        clearInterval(this.timerInterval);
    }

    renderContentBasedOnTab = () => {
        const { activeTab, remainingTimes } = this.state;
        const filteredOrders = this.filterOrders(activeTab);

        console.log(filteredOrders.length)

        if (filteredOrders.length === 0) {
            return (
                <div className="order-list">
                    <p>0 Đơn hàng</p>
                    <div className="order-table">
                        <p>Không tìm thấy đơn hàng</p>
                    </div>
                </div>
            )
        }

        return (
            <div className="order-list">
                {filteredOrders.map(order => {
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

                    return (
                        <div key={order._id} className="order-item">
                            <div className='general-order-infomation'>
                                <div className='delivery-information'>
                                    <h3>Delivery information</h3>
                                    <label><div className='label-name'><span>Name of recipient: </span></div><div className='label-content'>{order.recipName}</div></label>
                                    <label><div className='label-name'><span>Recipient phone number: </span></div><div className='label-content'> {order.phone} </div></label>
                                    <label><div className='label-name'><span>Delivery address: </span></div><div className='label-content'> {order.shippingAddress} </div></label>
                                </div>
                                <div className='order-information'>
                                    <h3>Order information</h3>
                                    <label><div className='label-name'><span>Order code: </span></div><div className='label-content'> {order._id}</div></label>
                                    <label><div className='label-name'><span>Payment method: </span></div><div className='label-content'> {order.paymentMethod}</div></label>
                                    <label><div className='label-name'><span>Total order: </span></div><div className='label-content'> {formatCurrency(totalOrderAmount)}</div></label>
                                    <label><div className='label-name'><span>Payment orders: </span></div><div className='label-content'> {order.bankTransferImage.length !== 0 || order.orderStatus === 'Completed' ||
                                        order.orderStatus === 'Delivered' || order.orderStatus === 'Return/Refund' || order.orderStatus === 'Partial Return/Refund' ? 'Paided' : 'Unpaid'}</div></label>
                                    <label><div className='label-name'><span>Order date: </span></div><div className='label-content'>{moment(order.createdDate).format('DD/MM/YYYY - HH:mm:ss')}</div></label>
                                    <label><div className='label-name'><span>Update date: </span></div><div className='label-content'>{moment(order.updated).format('DD/MM/YYYY - HH:mm:ss')}</div></label>
                                </div>
                            </div>
                            <div className='product-information'>
                                <h3>Product Information</h3>
                                <div className='product-table'>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Product Name</th>
                                                <th>Variation</th>
                                                <th>Quantity</th>
                                                <th>Price</th>
                                                <th>Voucher</th>
                                                <th>Total Amount</th>
                                                <th>Note</th>
                                                <th>Estimated delivery date</th>
                                                <th>Confirm order </th>
                                                <th>Status</th>
                                                {order.products.some(product => product.returnRequest === true) && (
                                                    <th>Reason and Request</th>
                                                )}
                                                {order.products.some(product => product.returnRequest === true) && (
                                                    <th>Return Status</th>
                                                )}
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        {order.products && order.products.map((itemProduct, index) => {
                                            let productTotal = itemProduct.price;

                                            if (itemProduct.voucherShop.length !== 0) {
                                                itemProduct.voucherShop.forEach(voucherShop => {
                                                    productTotal -= voucherShop.discountValue;
                                                });
                                            }

                                            return (
                                                <tbody key={index}>
                                                    <tr key={index}>
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
                                                        <td>
                                                            {itemProduct.classifyDetail ? (
                                                                itemProduct.classifyDetail.Value2 ? (
                                                                    `${itemProduct.classifyDetail.Value1} - ${itemProduct.classifyDetail.Value2}`
                                                                ) : (
                                                                    itemProduct.classifyDetail.Value1
                                                                )
                                                            ) : ('None')}
                                                        </td>
                                                        <td>{itemProduct.quantity}</td>
                                                        <td>{formatCurrency(itemProduct.price)}</td>
                                                        <td>
                                                            {itemProduct.voucherShop.length !== 0 ? (
                                                                itemProduct.voucherShop.map(voucherShop => (
                                                                    <span> -{formatCurrency(voucherShop.discountValue)}</span>
                                                                ))
                                                            ) : ('None')}
                                                        </td>
                                                        <td>{formatCurrency(productTotal)}</td>
                                                        <td>{itemProduct.message ? itemProduct.message : 'None'}</td>
                                                        <td>{moment(order.createdAt).add(itemProduct.product.preparationTime, 'days').format('DD/MM/YYYY')}</td>
                                                        {itemProduct.productStatus === 'Pending' ? (
                                                            <td>
                                                                {remainingTimes[itemProduct._id] > 0 ? (
                                                                    <span>{this.formatRemainingTime(remainingTimes[itemProduct._id])}</span>
                                                                ) : (
                                                                    <span>Time's up!</span>
                                                                )}
                                                            </td>
                                                        ) : (
                                                            <td>
                                                                <span> Confirmed</span>
                                                            </td>
                                                        )}
                                                        <td>{itemProduct.productStatus}</td>
                                                        {(itemProduct.returnRequest === true) && (
                                                            <>
                                                                <td>{itemProduct.returnReason}</td>
                                                                <td>{itemProduct.returnOrderStatus}</td>
                                                            </>
                                                        )}
                                                        <td>
                                                            {(order.orderStatus === 'Pending' && itemProduct.productStatus !== 'Confirmed') && (
                                                                <>
                                                                    <button className="confirm-order-button" onClick={() => this.handleConfirmProduct(order._id, itemProduct.product._id, itemProduct.classifyDetail._id)}>Confirm</button>
                                                                    <button className="cancel-order-button" onClick={() => this.handleCancelOrder(order._id)}>Cancel</button>
                                                                </>
                                                            )}
                                                            {(order.orderStatus === 'Pending' && itemProduct.productStatus === 'Confirmed') && (
                                                                <button className="confirm-order-button" onClick={() => this.handleConfirmProduct(order._id, itemProduct.product._id, itemProduct.classifyDetail._id)}>Confirmed</button>
                                                            )}
                                                            {(order.orderStatus === 'Confirmed' && itemProduct.productStatus !== 'Shipped') && (
                                                                <button className="confirm-order-button" onClick={() => this.handleShippedProduct(order._id, itemProduct.product._id, itemProduct.classifyDetail._id)}>Ship product</button>
                                                            )}
                                                            {(order.orderStatus === 'Confirmed' && itemProduct.productStatus === 'Shipped') && (
                                                                <button className="confirm-order-button" onClick={() => this.handleShippedProduct(order._id, itemProduct.product._id, itemProduct.classifyDetail._id)}>Shipped</button>
                                                            )}
                                                            {(order.orderStatus === 'Shipped' ||
                                                                order.orderStatus === 'Delivered' ||
                                                                order.orderStatus === 'Completed' ||
                                                                order.orderStatus === 'Cancelled' ||
                                                                itemProduct.productStatus === 'Cancelled' ||
                                                                itemProduct.productStatus === 'Completed' ||
                                                                ((order.orderStatus === 'Return/Refund' || order.orderStatus === 'Partial Return/Refund') && order.products.some(product => product.productStatus === 'Return/Refund')) ||
                                                                itemProduct.productStatus === 'Delivered') && (
                                                                <span>None</span>
                                                            )}
                                                            {(itemProduct.productStatus === 'Return/Refund' && itemProduct.returnOrderStatus === 'Pending') && (
                                                                <>
                                                                    <button className="confirm-order-button" onClick={() => this.handleApproveReturn(order._id, itemProduct.product._id, itemProduct.classifyDetail._id)}>Approve</button>
                                                                    <button className="cancel-order-button" onClick={() => this.handleRejectReturn(order._id, itemProduct.product._id, itemProduct.classifyDetail._id)}>Reject</button>
                                                                </>
                                                            )}
                                                            {(itemProduct.productStatus === 'Return/Refund' && itemProduct.returnOrderStatus === 'Confirmed') && (
                                                                <button className="confirm-order-button" onClick={() => this.handleShippedProduct(order._id, itemProduct.product._id, itemProduct.classifyDetail._id)}>Ship product</button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            )
                                        })}
                                    </table>
                                </div>
                            </div>
                            <div className='action-btn'>
                                {order.orderStatus === 'Completed' && (
                                    <>
                                        <button className="confirm-order-button" onClick={() => this.handleCancelOrder(order._id)}>Review</button>
                                    </>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    }

    render() {
        const { activeTab } = this.state

        console.log(this.state.orders)
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
                                        <li key={tab} className={`sub-nav-item ${activeTab === tab ? 'active' : ''}`} onClick={() => this.handleTabClick(tab)}>
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

const mapStateToProps = state => {
    return {
        isLoggedIn: state.seller.isLoggedIn
    };
};

export default connect(mapStateToProps)(OrderManage);
