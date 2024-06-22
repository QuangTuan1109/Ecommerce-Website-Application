import React from 'react';
import axios from '../axios';
import jwt from 'jsonwebtoken';
import CustomPopup from '../components/CustomPopup';

const withOrderAPI = (WrappedComponent) => {
    class WithOrderAPI extends React.Component {
        state = {
            orders: [],
            error: null,
            popupVisible: false,
            popupMessage: '',
            popupType: '',
            onConfirm: null,
            showReturnColumns: {},
            returnProductIds: []
        };

        componentDidMount() {
            this.fetchOrders();
        }

        fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/v1/order/get-order', {
                    headers: {
                        'Authorization': localStorage.getItem('accessToken')
                    }
                });
                this.setState({ orders: response.data, error: null });
            } catch (error) {
                this.setState({ error });
            }
        }

        handleCancelOrder = async (orderId) => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                if (accessToken) {
                    const decodedToken = jwt.decode(accessToken);
                    if (decodedToken) {
                        const userId = decodedToken.sub;
                        const response = await axios.post('http://localhost:5000/api/v1/order/cancel-order', { orderId, userId }, {
                            headers: {
                                'Authorization': localStorage.getItem('accessToken')
                            }
                        });
                        if (response.message === 'Order cancelled successfully') {
                            this.showPopup('Cancel successful!', 'successful', this.handleSuccess);
                        } else if (response.message === 'Cancel request sent to seller') {
                            this.showPopup('Cancel request sent to seller', 'successful', this.handleSuccess);
                        }
                    }
                }
            } catch (error) {
                this.setState({ error });
                this.showPopup('Failed to cancel order', 'error', this.handleFailure);
            }
        }

        handleConfirmOrder = async (orderId) => {
            try {
                const response = await axios.post('http://localhost:5000/api/v1/order/confirm-order-successfully', { orderId }, {
                    headers: {
                        'Authorization': localStorage.getItem('accessToken')
                    }
                });
                if (response.message === 'The order has been confirmed and the status has been updated to Completed') {
                    this.showPopup('Confirm successful!', 'successful', this.handleSuccess);
                } else {
                    this.showPopup('Failed to confirm order', 'error', this.handleFailure);
                }
            } catch (error) {
                this.setState({ error });
                this.showPopup('Failed to confirm order', 'error', this.handleFailure);
            }
        }

        handleConfirmReturn = async (orderRequest) => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                if (accessToken) {
                    const decodedToken = jwt.decode(accessToken);
                    if (decodedToken) {
                        const userId = decodedToken.sub;
                        const response = await axios.post('http://localhost:5000/api/v1/order/confirm-return', { orderRequest, userId }, {
                            headers: {
                                'Authorization': localStorage.getItem('accessToken')
                            }
                        });
                        if (response.message === 'The request to return the product has been sent successfully') {
                            this.showPopup('Return confirmed!', 'successful', this.handleSuccess);
                        } else {
                            this.showPopup('Failed to confirm return', 'error', this.handleFailure);
                        }
                    }
                }
            } catch (error) {
                this.setState({ error });
                this.showPopup('Failed to confirm return', 'error', this.handleFailure);
            }
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

        handleSuccess = () => {
            this.closePopup();
            window.location.reload();
        }

        handleFailure = () => {
            this.closePopup();
        }

        showPopup = (message, type, callback) => {
            this.setState({
                popupVisible: true,
                popupMessage: message,
                popupType: type,
                onConfirm: callback
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
            const { orders, error, popupVisible, popupMessage, popupType, showReturnColumns, returnProductIds } = this.state;

            return (
                <>
                    <WrappedComponent
                        {...this.props}
                        orders={orders}
                        error={error}
                        handleCancelOrder={this.handleCancelOrder}
                        handleConfirmOrder={this.handleConfirmOrder}
                        handleConfirmReturn={this.handleConfirmReturn}
                        handleReturnRefundClick={this.handleReturnRefundClick}
                        handleInputChange={this.handleInputChange}
                        handleSelectProduct={this.handleSelectProduct}
                        handleCancelReturn={this.handleCancelReturn}
                        showReturnColumns={showReturnColumns}
                        returnProductIds={returnProductIds} 
                        showPopup={this.showPopup}
                    />
                    {popupVisible && (
                        <CustomPopup
                            message={popupMessage}
                            type={popupType}
                            onClose={this.closePopup}
                            onConfirm={this.state.onConfirm}
                        />
                    )}
                </>
            );
        }
    }

    return WithOrderAPI;
};

export default withOrderAPI;
