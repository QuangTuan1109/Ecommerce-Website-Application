import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import './OrderPage.scss';
import HeaderHomepage from '../../HomePage/HeaderHomepage';
import CustomPopup from '../../../components/CustomPopup';
import OrderItem from '../../../components/OrderItem';
import withOrderAPI from '../../../hoc/withOrderAPI';
import ReactPaginate from 'react-paginate';

class OrderPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'All',
            showReturnColumns: {},
            returnProductIds: [],
            returnReason: '',
            currentPage: 0,
            ordersPerPage: 5
        };
    }

    handleTabClick = (tabName) => {
        this.setState({ activeTab: tabName, currentPage: 0 });
    }

    filterOrders = (tabName) => {
        const { orders } = this.props;
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

    renderContentBasedOnTab = () => {
        const { activeTab, currentPage, ordersPerPage } = this.state;
        const { handleCancelOrder, handleConfirmOrder, handleConfirmReturn, handleReturnRefundClick,
            handleSelectProduct, handleInputChange, handleCancelReturn, showReturnColumns, returnProductIds } = this.props
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
                    {currentOrders.map(order => {
                        let infomations = [
                            { key: 'orderCode'},
                            { key: 'shopspaceVoucher'},
                            { key: 'paymentMethod'},
                            { key: 'totalOrderPayment'},
                            { key: 'paymentOrder'},
                            { key: 'ordertatus'},
                            { key: 'ordredDate'},
                            { key: 'updatedDate'}
                        ];

                        let columns = [
                            { key: 'productName', label: 'Product Name' },
                            { key: 'variation', label: 'Variation' },
                            { key: 'quantity', label: 'Quantity' },
                            { key: 'price', label: 'Price' },
                            { key: 'voucher', label: 'Voucher' },
                            { key: 'deliveryMethod', label: 'Delivery Method' },
                            { key: 'deliveryFee', label: 'Delivery Fee' },
                            { key: 'note', label: 'Note' },
                            { key: 'estimatedDeliveryDate', label: 'Estimated Delivery Date' },
                            { key: 'action', label: 'Action' }
                        ];

                        if (showReturnColumns[order._id]) {
                            columns.splice(columns.length - 1, 0,
                                { key: 'returnReasonInput', label: 'Reason & Request' }
                            );
                        }

                        if (activeTab === 'Return/Refund' || (order.orderStatus === 'Return/Refund' || order.orderStatus === 'Partial Return/Refund')) {
                            columns.splice(columns.length - 1, 0,
                                { key: 'returnReason', label: 'Reason & Request' },
                                { key: 'returnStatus', label: 'Status Request' },
                                { key: 'returnOrderStatus', label: 'Return Order Status' }
                            );
                        }

                        return (
                            <OrderItem
                                key={order._id}
                                order={order}
                                columns={columns}
                                infomations={infomations}
                                handleCancelOrder={handleCancelOrder}
                                handleConfirmOrder={handleConfirmOrder}
                                handleReturnRefundClick={handleReturnRefundClick}
                                handleSelectProduct={handleSelectProduct}
                                showReturnColumns={showReturnColumns}
                                returnProductIds={returnProductIds}
                                handleInputChange={handleInputChange}
                                handleConfirmReturn={handleConfirmReturn}
                                handleCancelReturn={handleCancelReturn}
                            />
                        );
                    })}
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

    render() {
        const { popupVisible, activeTab } = this.state;

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
                            message={this.props.error.message}
                            type="error"
                            onClose={this.props.fetchOrders}
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

export default connect(mapStateToProps, mapDispatchToProps)(withOrderAPI(OrderPage));
