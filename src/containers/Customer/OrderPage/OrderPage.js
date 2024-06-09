import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import './OrderPage.scss';
import jwt from 'jsonwebtoken';
import HeaderHomepage from '../../HomePage/HeaderHomepage';
import { formatCurrency } from '../../../method/handleMethod';
import CustomPopup from '../../../components/CustomPopup';
import moment from 'moment';
import axios from '../../../axios'
import ReactPaginate from 'react-paginate';

class OrderPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popupType: '',
            onConfirm: null,
            activeTab: 'All',
            orders: [],
            showReturnColumns: {},
            returnProductIds: [],
            returnReason: '',
            currentPage: 0,
            ordersPerPage: 5
        };
    }

    componentDidMount() {
        this.fetchOrders();
    }

    fetchOrders = async () => {
        try {
            axios.get(`http://localhost:5000/api/v1/order/get-order`, {
                headers: {
                    'Authorization': localStorage.getItem('accessToken')
                }
            })
                .then(response => this.setState({ orders: response.data }))
                .catch(error => {
                    console.error('Error fetching voucher:', error);
                });
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    }

    handleCancelOrder = async (orderId) => {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
            try {
                const decodedToken = jwt.decode(accessToken);
                if (decodedToken) {
                    const userId = decodedToken.sub;

                    axios.post(`http://localhost:5000/api/v1/order/cancel-order`, { orderId, userId }, {
                        headers: {
                            'Authorization': localStorage.getItem('accessToken')
                        },
                    })
                        .then(response => {
                            if (response.message === 'Order cancelled successfully') {
                                this.showPopup('Cancel successful!', 'successful', this.handleSuccess)
                            } else if (response.message === 'Cancel request sent to seller') {
                                this.showPopup('Cancel request sent to seller', 'successful', this.handleSuccess)
                            }
                        })
                        .catch(error => {
                            console.error('Error fetching voucher:', error);
                        });
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        }
    }

    handleConfirmOrder = async (orderId) => {
        try {
            axios.post(`http://localhost:5000/api/v1/order/confirm-order-successfully`, { orderId }, {
                headers: {
                    'Authorization': localStorage.getItem('accessToken')
                },
            })
                .then(response => this.showPopup('Confirm successful!', 'successful', this.handleSuccess))
                .catch(error => {
                    console.error('Error fetching voucher:', error);
                });
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    }

    handleConfirmReturn = async (orderRequest) => {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
            try {
                const decodedToken = jwt.decode(accessToken);
                if (decodedToken) {
                    const userId = decodedToken.sub;

                    try {
                        axios.post(`http://localhost:5000/api/v1/order/confirm-return`, { orderRequest, userId }, {
                            headers: {
                                'Authorization': localStorage.getItem('accessToken')
                            },
                        })
                            .then(response =>  this.showPopup('Confirm successful!', 'successful', this.handleSuccess))
                            .catch(error => {
                                console.error('Error fetching voucher:', error);
                            });
                    } catch (error) {
                        console.error('Error fetching orders:', error);
                    }
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        }
    }

    handleTabClick = (tabName) => {
        this.setState({ activeTab: tabName, currentPage: 0 });
    }

    filterOrders = (tabName) => {
        const { orders } = this.state;
        switch (tabName) {
            case 'All':
                return orders;
            case 'Order is pending':
                return orders.filter(order => order.orderStatus === 'Pending');
            case 'Order confirmed':
                return orders.filter(order => order.orderStatus === 'Confirmed');
            case 'Order is being delivered':
                return orders.filter(order => order.orderStatus === 'Shipped');
            case 'Order delivered':
                return orders.filter(order => order.orderStatus === 'Delivered' || ((order.orderStatus === 'Return/Refund' || order.orderStatus === 'Partial Return/Refund') && order.products.some(product => product.productStatus === 'Return/Refund' && product.returnOrderStatus === 'Delivered')));
            case 'Completed':
                return orders.filter(order => order.orderStatus === 'Completed');
            case 'Cancelled':
                return orders.filter(order => order.orderStatus === 'Cancelled');
            case 'Return/Refund':
                return orders.filter(order => (order.orderStatus === 'Return/Refund' || order.orderStatus === 'Partial Return/Refund') && order.products.some(product => product.productStatus === 'Return/Refund'));
            case 'Delivery failed':
                return orders.filter(order => order.orderStatus === 'Delivery failed');
            default:
                return orders;
        }
    }


    handlePageChange = (selectedItem) => {
        const pageNumber = selectedItem.selected;
        this.setState({
            currentPage: pageNumber
        });
    }

    handleReturnRefundClick = (orderId) => {
        this.setState(prevState => ({
            showReturnColumns: {
                ...prevState.showReturnColumns,
                [orderId]: !prevState.showReturnColumns[orderId]
            },
            returnProductIds: [],
            orders: prevState.orders.map(order => {
                if (order._id === orderId) {
                    return {
                        ...order,
                        products: order.products.map(product => ({
                            ...product,
                            returnReason: ''
                        }))
                    };
                }
                return order;
            })
        }));
    }

    handleInputChange = (e, orderId, productId) => {
        const { name, value } = e.target;
        if (name === 'returnReason') {
            this.setState(prevState => ({
                orders: prevState.orders.map(order => {
                    if (order._id === orderId) {
                        const updatedProducts = order.products.map(product => {
                            if (product._id === productId) {
                                return {
                                    ...product,
                                    [name]: value
                                };
                            }
                            return product;
                        });
                        return {
                            ...order,
                            products: updatedProducts
                        };
                    }
                    return order;
                })
            }));
        } else {
            this.setState({ [name]: value });
        }
    }
    

    handleSelectProduct = (orderId, productId) => {
        const orderToUpdate = this.state.orders.find(order => order._id === orderId);
        if (!orderToUpdate) {
            console.error('Order not found');
            return;
        }
        
        const productToUpdate = orderToUpdate.products.find(product => product._id === productId);
        if (!productToUpdate) {
            console.error('Product not found in order');
            return;
        }
    
        productToUpdate.returnRequest = true;
        
        const updatedProducts = orderToUpdate.products.map(product => {
            if (product._id === productId) {
                return productToUpdate;
            }
            return product;
        });
    
        this.setState(prevState => ({
            orders: prevState.orders.map(order => {
                if (order._id === orderId) {
                    return {
                        ...order,
                        products: updatedProducts
                    };
                }
                return order;
            }),
            returnProductIds: [...prevState.returnProductIds, productId]
        }));
    }
    
    


    handleCancelReturn = () => {
        this.setState({
            showReturnColumns: {},
            returnReason: '',
            returnProductIds: []
        });

        this.setState(prevState => ({
            orders: prevState.orders.map(order => ({
                ...order,
                products: order.products.map(product => ({
                    ...product,
                    returnReason: ''
                }))
            }))
        }));
    }


    renderContentBasedOnTab = () => {
        const { activeTab, currentPage, ordersPerPage } = this.state;
        const filteredOrders = this.filterOrders(activeTab);

        const indexOfLastOrder = (currentPage + 1) * ordersPerPage;
        const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
        const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

        if (filteredOrders.length === 0) {
            return <div>No orders found.</div>;
        }

        return (
            <div>
                <div className="order-list">
                    {currentOrders.map(order => (
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
                                    <label><div className='label-name'><span>Shopspace voucher has been applied: </span></div><div className='label-content'> {order.voucherSystem.length !== 0 ? order.voucherSystem.map(voucherSys => voucherSys) : 'None'}</div></label>
                                    <label><div className='label-name'><span>Payment method: </span></div><div className='label-content'> {order.paymentMethod}</div></label>
                                    <label><div className='label-name'><span>Total order payment: </span></div><div className='label-content'> {formatCurrency(order.totalAmount)}</div></label>
                                    <label><div className='label-name'><span>Payment orders: </span></div><div className='label-content'> {order.bankTransferImage.length !== 0 || order.orderStatus === 'Completed' ||
                                        order.orderStatus === 'Delivered' || order.orderStatus === 'Return/Refund' ? 'Paided' : 'Unpaid'}</div></label>
                                    <label><div className='label-name'><span>Order status: </span></div><div className='label-content'> {order.orderStatus}</div></label>
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
                                                <th>Delivery Method</th>
                                                <th>Delivery Fee</th>
                                                <th>Note</th>
                                                <th>Estimated delivery date</th>
                                                {this.state.showReturnColumns[order._id] && (
                                                    <th>Reason & Request</th>
                                                )}
                                                {(order.orderStatus === 'Return/Refund' || order.orderStatus === 'Partial Return/Refund') && (
                                                    <>
                                                        <th>Reason & Request</th>
                                                        <th>Status request</th>
                                                        <th>Status order</th>
                                                    </>
                                                )}
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        {order.products && order.products.map((itemProduct, index) => (
                                            <tbody>
                                                <tr key={index}>
                                                    <td>{itemProduct.product.Name}</td>
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
                                                    <td>
                                                        {itemProduct.deliveryMethod && (
                                                            itemProduct.deliveryMethod
                                                        )}
                                                    </td>
                                                    <td>
                                                        {itemProduct.deliveryFee && (
                                                            `${formatCurrency(itemProduct.deliveryFee)}`
                                                        )}
                                                    </td>
                                                    <td>{itemProduct.message ? itemProduct.message : 'None'}</td>
                                                    <td>{moment(order.createdAt).add(itemProduct.product.preparationTime, 'days').format('DD/MM/YYYY')}</td>
                                                    {(this.state.showReturnColumns[order._id] && order.orderStatus === 'Delivered') && (
                                                        <td>
                                                            <input
                                                                type="text"
                                                                value={itemProduct.returnReason || ''}
                                                                name='returnReason'
                                                                placeholder='Enter your reason and desire'
                                                                onChange={(e) => this.handleInputChange(e, order._id, itemProduct._id)}
                                                            />
                                                        </td>
                                                    )}
                                                   {(order.orderStatus === 'Return/Refund' || order.orderStatus === 'Partial Return/Refund') && (
                                                        itemProduct.returnRequest ? (
                                                            <>
                                                                <td>{itemProduct.returnReason}</td>
                                                                <td>{itemProduct.returnStatus}</td>
                                                                <td>{itemProduct.returnOrderStatus}</td>
                                                            </>
                                                        ): (
                                                            <>
                                                                <td>None</td>
                                                                <td>None</td>
                                                                <td>None</td>
                                                            </>
                                                        )
                                                    )}
                                                    <td>
                                                        {(order.orderStatus === 'Pending' ||
                                                            order.orderStatus === 'Confirmed' ||
                                                            order.orderStatus === 'Shipped' ||
                                                            order.orderStatus === 'Completed' ||
                                                            order.orderStatus === 'Cancelled' ||
                                                            ((order.orderStatus === 'Return/Refund' || order.orderStatus === 'Partial Return/Refund') && order.products.some(product => product.productStatus === 'Return/Refund')) ||
                                                            order.orderStatus === 'Delivery failed' ||
                                                            (order.orderStatus === 'Delivered' && !this.state.showReturnColumns[order._id])
                                                        ) && (
                                                                <Link to=''>Detail</Link>
                                                            )}
                                                        {(this.state.showReturnColumns[order._id] && order.orderStatus === 'Delivered') && (
                                                            <button
                                                                className={`return-order-button ${this.state.returnProductIds.includes(itemProduct._id) ? 'selected' : ''}`}
                                                                onClick={() => this.handleSelectProduct(order._id, itemProduct._id)}
                                                            >
                                                                {this.state.returnProductIds.includes(itemProduct._id) ? 'Hủy' : 'Chọn'}
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        ))}
                                    </table>
                                </div>
                            </div>
                            <div className='action-btn'>
                                {(order.orderStatus === 'Pending' ||
                                    (order.cancelRequest === false && order.orderStatus === 'Confirmed')) && (
                                        <button className="cancel-order-button" onClick={() => this.handleCancelOrder(order._id)}>Cancel Order</button>
                                    )}
                                {(order.cancelRequest === true &&
                                    order.orderStatus === 'Confirmed') && (
                                        <button className="cancel-request-order-button" disabled>Request pending</button>
                                    )}
                                {((order.orderStatus === 'Delivered' || ((order.orderStatus === 'Return/Refund' || order.orderStatus === 'Partial Return/Refund') && order.products.some(product => product.productStatus === 'Return/Refund' && product.returnOrderStatus === 'Delivered'))) && !this.state.showReturnColumns[order._id]) && (
                                    <>
                                        <button className="cancel-order-button" onClick={() => this.handleReturnRefundClick(order._id)}>Return/Refund</button>
                                        <button className="confirm-order-button" onClick={() => this.handleConfirmOrder(order._id)}>Confirm Order</button>
                                    </>
                                )}
                                {(order.orderStatus === 'Delivered' && this.state.showReturnColumns[order._id]) && (
                                    <>
                                        <button className="cancel-order-button" onClick={() => this.handleCancelReturn()}>Cancel Return</button>
                                        <button className="confirm-order-button" onClick={() => this.handleConfirmReturn(order)}>Confirm Return</button>
                                    </>
                                )}
                                {order.orderStatus === 'Completed' && (
                                    <>
                                        <button className="confirm-order-button" onClick={() => this.handleCancelOrder(order._id)}>Review</button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <ReactPaginate
                    pageCount={Math.ceil(filteredOrders.length / this.state.ordersPerPage)}
                    pageRangeDisplayed={5}
                    marginPagesDisplayed={2}
                    previousLabel={<FontAwesomeIcon icon={faAngleLeft} />}
                    nextLabel={<FontAwesomeIcon icon={faAngleRight} />}
                    breakLabel={'...'}
                    onPageChange={this.handlePageChange}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                    forcePage={this.state.currentPage}
                />
            </div>
        );
    }

    handleSuccess = () => {
        this.closePopup();
        window.location.reload();
    }

    handleFailure = () => {
        this.closePopup();
    }

    confirmCancel = () => {
        this.closePopup();
        this.props.history.goBack();
    }

    showPopup = (message, type, onConfirm = null) => {
        this.setState({
            popupVisible: true,
            popupMessage: message,
            popupType: type,
            onConfirm: onConfirm
        });
    }

    closePopup = () => {
        this.setState({
            popupVisible: false,
            popupMessage: '',
            popupType: '',
            onConfirm: null
        });
    }

    render() {
        const { popupVisible, popupMessage, popupType, onConfirm, activeTab } = this.state;

        return (
            <div className='order-container'>
                <HeaderHomepage />
                <div className="body-container">
                    <div className="main-content">
                        <div className="header-content">
                            <h3>Orders</h3>
                            <div className="tools-header">
                                <div className="left-header-content">
                                    <div className="navbar-content">
                                        <ul className="sub-nav">
                                            {['All', 'Order is pending', 'Order confirmed', 'Order is being delivered', 'Order delivered', 'Completed', 'Cancelled', 'Return/Refund', 'Delivery failed'].map(tab => (
                                                <li key={tab} className={`sub-nav-item ${activeTab === tab ? 'active' : ''}`} onClick={() => this.handleTabClick(tab)}>
                                                    <FontAwesomeIcon className="nav-icon" />
                                                    {tab}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="body-content">
                            <div className="section">
                                {this.renderContentBasedOnTab()}
                            </div>
                        </div>
                    </div>
                    {popupVisible && (
                        <CustomPopup
                            message={popupMessage}
                            type={popupType}
                            onConfirm={onConfirm}
                            onClose={this.closePopup}
                        />
                    )}
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);