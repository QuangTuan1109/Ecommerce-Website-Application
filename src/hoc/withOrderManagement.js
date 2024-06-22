import React, { Component } from 'react';
import jwt from 'jsonwebtoken';
import axios from '../axios';

const withOrderManagement = (WrappedComponent) => {
  class WithOrderManagement extends Component {
    constructor(props) {
      super(props);
      this.state = {
        activeTab: 'All',
        orders: [],
        remainingTimes: {}
      };
    }

    componentDidMount() {
      this.fetchOrders();
      this.startTimer();
    }

    componentWillUnmount() {
      clearInterval(this.timerInterval);
    }

    startTimer = () => {
      this.timerInterval = setInterval(this.updateRemainingTimes, 1000);
    };

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
    };

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
                console.error('Error fetching orders:', error);
              });
          }
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      }
    };

    handleConfirmProduct = async (orderId, productId, classifyDetailId) => {
      const accessToken = localStorage.getItem('accessToken');

      if (accessToken) {
        try {
          await axios.post(`http://localhost:5000/api/v1/order/confirm-order`, {
            orderId,
            productId,
            classifyDetailId
          }, {
            headers: {
              'Authorization': accessToken
            }
          });
          this.fetchOrders();
        } catch (error) {
          console.error('Error confirming product:', error);
        }
      }
    };

    handleShippedProduct = async (orderId, productId, classifyDetailId) => {
      const accessToken = localStorage.getItem('accessToken');

      if (accessToken) {
        try {
          await axios.post(`http://localhost:5000/api/v1/order/confirm-shipped-order`, {
            orderId,
            productId,
            classifyDetailId
          }, {
            headers: {
              'Authorization': accessToken
            }
          });
          this.fetchOrders();
        } catch (error) {
          console.error('Error confirming product:', error);
        }
      }
    };

    handleApproveReturn = async (orderId, productId, classifyDetailId) => {
      const accessToken = localStorage.getItem('accessToken');

      if (accessToken) {
        try {
          await axios.post(`http://localhost:5000/api/v1/order/approve-return`, {
            orderId,
            productId,
            classifyDetailId
          }, {
            headers: {
              'Authorization': accessToken
            }
          });
          this.fetchOrders();
        } catch (error) {
          console.error('Error approving return:', error);
        }
      }
    };

    handleRejectReturn = async (orderId, productId, classifyDetailId) => {
      const accessToken = localStorage.getItem('accessToken');

      if (accessToken) {
        try {
          await axios.post(`http://localhost:5000/api/v1/order/reject-return`, {
            orderId,
            productId,
            classifyDetailId
          }, {
            headers: {
              'Authorization': accessToken
            }
          });
          this.fetchOrders();
        } catch (error) {
          console.error('Error rejecting return:', error);
        }
      }
    };

    handleTabClick = (tabName) => {
      this.setState({ activeTab: tabName });
    };

    filterOrders = (tabName) => {
      const { orders } = this.state;
      return this.filterOrdersByProductStatus(orders, tabName);
    };

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
    };

    formatRemainingTime = (remainingTimeInSeconds) => {
      const hours = Math.floor(remainingTimeInSeconds / 3600);
      const minutes = Math.floor((remainingTimeInSeconds % 3600) / 60);
      const seconds = Math.floor(remainingTimeInSeconds % 60);

      const formattedHours = hours > 0 ? `${hours}h ` : '';
      const formattedMinutes = `${minutes}m `;
      const formattedSeconds = `${seconds}s`;

      return `${formattedHours}${formattedMinutes}${formattedSeconds}`;
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...this.state}
          handleTabClick={this.handleTabClick}
          filterOrders={this.filterOrders}
          formatRemainingTime={this.formatRemainingTime}
          handleConfirmProduct={this.handleConfirmProduct}
          handleShippedProduct={this.handleShippedProduct}
          handleApproveReturn={this.handleApproveReturn}
          handleRejectReturn={this.handleRejectReturn}
        />
      );
    }
  }

  return WithOrderManagement;
};

export default withOrderManagement;
