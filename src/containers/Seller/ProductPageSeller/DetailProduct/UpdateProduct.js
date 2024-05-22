import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import axios from '../../../../axios'

import Header from '../../Header'
import Navbar from '../../ProductPageSeller/CreateProduct/Section/navBar'
import UpdateBasic from './Section/updateBasic'
import UpdateDetail from './Section/updateDetail'
import UpdateSale from './Section/updateSale'
import UpdateDelivery from './Section/updateDelivery'
import UpdateOther from './Section/updateOther';
import CustomPopup from '../../../../components/CustomPopup'

class UpdateProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {},
            attributeNames: [],
            updateBasicData: null,
            updateDetailData: null,
            updateSellData: null,
            updateDeliveryData: null,
            updateOtherData: null,
            popupType: '',
            onConfirm: null
        };
    }

    handleBasicDataChange = (data) => {
        this.setState({ updateBasicData: data });
    }

    handleDetailDataChange = (data) => {
        this.setState({ updateDetailData: data });
    }

    handleSaleDataChange = (data) => {
        this.setState({ updateSellData: data });
    }

    handleDeliveryDataChange = (data) => {
        this.setState({ updateDeliveryData: data });
    }

    handleOtherDataChange = (data) => {
        this.setState({ updateOtherData: data });
    }

    handleUpdate = async () => {
        const { product, updateBasicData, updateDetailData, updateSellData, updateDeliveryData, updateOtherData } = this.state;

        if (updateBasicData && updateDetailData && updateSellData && updateDeliveryData && updateOtherData) {
            const combinedData = {
                ...updateBasicData,
                ...updateDetailData,
                ...updateSellData,
                ...updateDeliveryData,
                ...updateOtherData
            };

            try {
                await axios.put(`http://localhost:5000/api/v1/products/update-product/${product._id}`, combinedData, {
                    headers: {
                        'Authorization': localStorage.getItem('accessToken')
                    }
                });
                this.showPopup('Product updated successfully!', 'successful', this.handleSuccess);
            } catch (error) {
                console.error('Error:', error.response);
            }
        } else {
            console.error('Missing data from one or more sections.');
        }
    }

    componentDidMount() {
        this.fetchProducts()
    }

    fetchProducts = () => {
        const productId = this.props.match.params.id

        axios.get(`http://localhost:5000/api/v1/products/detail/${productId}`, {
            headers: {
                'Authorization': localStorage.getItem('accessToken')
            }
        })
            .then(response => {
                this.setState({ product: response });
            })
            .catch(error => {
                console.error('Error fetching product detail:', error);
            });
    }

    handleCancel = () => {
        const { updateBasicData, updateDetailData, updateSellData, updateDeliveryData, updateOtherData } = this.state;
        const hasData = updateBasicData || updateDetailData || updateSellData || updateDeliveryData || updateOtherData;

        if (!hasData) {
            this.props.history.goBack();
        } else {
            this.showPopup('Are you sure you want to cancel?', 'confirm', this.confirmCancel);
        }
    }

    handleSuccess = () => {
        this.closePopup();
        this.props.history.push(`/detail-product-seller/${this.state.product._id}`);
    }

    handleFailure = () => {
        this.closePopup();
    }

    confirmCancel = () => {
        this.closePopup();
        this.props.history.push(`/detail-product-seller/${this.state.product._id}`)
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
        const { popupVisible, popupMessage, popupType, onConfirm } = this.state;

        return (
            <div className='detail-product-seller-container'>
                <Header />
                <div className="body-container">
                    <div className="left-content">
                        <Navbar />
                    </div>
                    <div className="right-content">
                        <div className="section">
                            <UpdateBasic onBasicDataChange={this.handleBasicDataChange} />
                        </div>
                        <div className="section">
                            <UpdateDetail onDetailDataChange={this.handleDetailDataChange} />
                        </div>
                        <div className="section">
                            <UpdateSale onSaleDataChange={this.handleSaleDataChange} />
                        </div>
                        <div className="section">
                            <UpdateDelivery onDeliveryDataChange={this.handleDeliveryDataChange} />
                        </div>
                        <div className="section">
                            <UpdateOther onOtherDataChange={this.handleOtherDataChange} />
                        </div>
                        <div className="buttons-actions">
                            <Link onClick={this.handleCancel} className="all-link">
                                <FontAwesomeIcon icon={faArrowLeft} />
                                <span>Cancel</span>
                            </Link>
                            <Link onClick={this.handleUpdate} className="edit-link">
                                <FontAwesomeIcon icon={faPencilAlt} />
                                <span>Update Product</span>
                            </Link>
                        </div>
                        {popupVisible && (
                            <CustomPopup
                                message={popupMessage}
                                type={popupType}
                                onClose={this.closePopup}
                                onConfirm={onConfirm}
                            />
                        )}
                    </div>
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
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UpdateProduct));