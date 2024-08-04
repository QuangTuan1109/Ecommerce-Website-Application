import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import jwt from 'jsonwebtoken';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './AddVoucher.scss';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import Header from '../../../Header';
import CustomPopup from '../../../../../components/CustomPopup';
import axios from '../../../../../axios'

class DetailVoucher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            popupVisible: false,
            popupMessage: '',
            popupType: '',
            onConfirm: null,
            voucherType: '',
            startTime: '',
            endTime: '',
            discountType: 'amount',
            voucherName: '',
            voucherCode: '',
            discountValue: '',
            maxReduction: '',
            maxUsagePerUser: '',
            minOrderAmount: '',
            maxTotalUsage: '',
            productId: '',
            numOfPurchases: '',
            selectedProductIds: []
        };
    }

    componentDidMount() {
        this.fetchVoucher()
        const params = new URLSearchParams(this.props.location.search);
        const voucherType = params.get('type');
        this.setState({ voucherType });
        this.fetchAllProduct(voucherType)
    }

    fetchVoucher = () => {
        const voucherId = this.props.match.params.voucherId

        const formatDateTimeLocal = (dateString) => {
            const date = new Date(dateString);
            const pad = (num) => String(num).padStart(2, '0');
        
            const year = date.getFullYear();
            const month = pad(date.getMonth() + 1);
            const day = pad(date.getDate());
            const hours = pad(date.getHours());
            const minutes = pad(date.getMinutes());
        
            return `${year}-${month}-${day}T${hours}:${minutes}`;
        }

        axios.get(`http://localhost:5000/api/v1/promotion/get-voucher-detail/${voucherId}`, {
            headers: {
                'Authorization': localStorage.getItem('accessToken')
            }
        })
            .then(response => {
                this.setState({
                    voucherType: response.typeCode,
                    voucherName: response.nameVoucher,
                    voucherCode: response.code,
                    startTime: formatDateTimeLocal(response.validFrom),
                    endTime: formatDateTimeLocal(response.validTo),
                    discountType: response.discountType,
                    discountValue: response.discountValue,
                    maxReduction: response.maxReduction,
                    maxTotalUsage: response.maxTotalUsage,
                    minOrderAmount: response.minOrderAmount,
                    maxUsagePerUser: response.maxUsagePerUser
                })
            })
            .catch(error => {
                console.error('Error fetching product detail:', error);
            });
    }

    fetchAllProduct = async (voucherType) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            try {
                const decodedToken = jwt.decode(accessToken);
                if (decodedToken) {
                    const sellerID = decodedToken.sub;
                    axios
                    .get(`http://localhost:5000/api/v1/products/${sellerID}/all-products`)
                    .then(response => {
                            this.setState({ products: response.data });
                            if (voucherType === 'voucher-product') {
                                this.setState({ selectedProductIds: [] });
                            } else {
                                const allProductIds = response.data.map(product => product._id);
                                this.setState({ selectedProductIds: allProductIds });
                            }
                        })
                        .catch(error => {
                            console.error('Error fetching products:', error);
                        });
                } else {
                    console.error('Failed to decode access token.');
                }
            } catch (error) {
                console.error('Error decoding access token:', error);
            }
        } else {
            console.error('Access token not found.');
        }
    };
    

    handleCancel = () => {
        this.showPopup('Are you sure you want to cancel?', 'confirm', this.confirmCancel);
    }

    handleSuccess = () => {
        this.closePopup();
        this.props.history.push('/voucher/list');
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

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleDiscountTypeChange = (event) => {
        this.setState({ discountType: event.target.value });
    };

    handleProductSelect = (productId) => {
        const { voucherType } = this.state;
    
        if (voucherType === 'voucher-product') {
            this.setState(prevState => {
                const isSelected = prevState.selectedProductIds.includes(productId);
                let selectedProductIds = [...prevState.selectedProductIds];
                if (isSelected) {
                    selectedProductIds = selectedProductIds.filter(id => id !== productId);
                } else {
                    selectedProductIds.push(productId);
                }
                return { selectedProductIds };
            });
        }
    };

    handleSaveVoucher = async () => {
        const formData = {
            typeCode: this.state.voucherType,
            nameVoucher: this.state.voucherName,
            code: this.state.voucherCode,
            validFrom: this.state.startTime,
            validTo: this.state.endTime,
            discountType: this.state.discountType,
            discountValue: this.state.discountValue,
            numOfPurchases: this.state.numOfPurchases,
            maxReduction: this.state.maxReduction,
            maxUsagePerUser: this.state.maxUsagePerUser,
            minOrderAmount: this.state.minOrderAmount,
            maxTotalUsage: this.state.maxTotalUsage,
            productId: this.state.selectedProductIds,
        }

        try {
            await axios.post(`http://localhost:5000/api/v1/promotion/add-voucher`, formData, {
                headers: {
                    'Authorization': localStorage.getItem('accessToken')
                }
            });
            this.showPopup('Product saved voucher!', 'successful', this.handleSuccess);
        } catch (error) {
            this.showPopup('Failed to save voucher.', 'error', this.handleFailure);
        }
    }

    handleUpdateVoucher = async () => {
        const voucherId = this.props.match.params.voucherId

        const formData = {
            typeCode: this.state.voucherType,
            nameVoucher: this.state.voucherName,
            code: this.state.voucherCode,
            validFrom: this.state.startTime,
            validTo: this.state.endTime,
            discountType: this.state.discountType,
            discountValue: this.state.discountValue,
            numOfPurchases: this.state.numOfPurchases,
            maxReduction: this.state.maxReduction,
            maxUsagePerUser: this.state.maxUsagePerUser,
            minOrderAmount: this.state.minOrderAmount,
            maxTotalUsage: this.state.maxTotalUsage,
            productId: this.state.selectedProductIds,
        }

        try {
            await axios.patch(`http://localhost:5000/api/v1/promotion/${voucherId}/update`, formData, {
                headers: {
                    'Authorization': localStorage.getItem('accessToken')
                }
            });
            this.showPopup('Updated voucher!', 'successful', this.handleSuccess);
        } catch (error) {
            this.showPopup('Failed to update voucher.', 'error', this.handleFailure);
        }
    }

    handleDeleteVoucher = () => {
        try {
            const voucherId = this.props.match.params.voucherId

            this.showPopup('Are you sure you want to delete voucher?', 'confirm', async () => {
                try {
                    await axios.delete(`http://localhost:5000/api/v1/promotion/${voucherId}/delete`, {
                        headers: {
                            'Authorization': localStorage.getItem('accessToken')
                        }
                    });
                    this.handleSuccess();
                } catch (error) {
                    this.showPopup('Error.', 'error', this.handleFailure);
                }
            }, () => {
                this.closePopup();
            });
        } catch (error) {
            this.showPopup('Error.', 'error', this.handleFailure);
        }
    }

    

    render() {
        const { popupVisible, popupMessage, popupType, onConfirm, voucherType, startTime, endTime, discountType, products } = this.state;
        
        return (
            <div className='create-voucher-container'>
                <Header />
                <div className="body">
                    {voucherType && (
                        <>
                            <div className='voucher-basic-infor'>
                                <div className='title-component'>
                                    <h3>Basic Information</h3>
                                </div>
                                <div className='basic-form'>
                                    <div className='basic-content'>
                                        <div className='label-content'>
                                            <span>Type code</span>
                                        </div>
                                        <div className='input-content'>
                                            <input type='text' value={voucherType} readOnly />
                                        </div>
                                    </div>
                                    <div className='basic-content'>
                                        <div className='label-content'>
                                            <span>Name of discount program</span>
                                        </div>
                                        <div className='input-content'>
                                            <input
                                                type='text'
                                                placeholder='Input voucher name'
                                                name='voucherName'
                                                value={this.state.voucherName}
                                                onChange={this.handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className='basic-content'>
                                        <div className='label-content'>
                                            <span>Voucher code</span>
                                        </div>
                                        <div className='input-content'>
                                            <input
                                                type='text'
                                                placeholder='Input voucher code'
                                                name='voucherCode'
                                                value={this.state.voucherCode}
                                                onChange={this.handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className='basic-content'>
                                        <div className='label-content'>
                                            <span>Code usage time</span>
                                        </div>
                                        <div className='input-content time-inputs'>
                                            <input
                                                type='datetime-local'
                                                name='startTime'
                                                value={startTime}
                                                onChange={this.handleInputChange}
                                            />
                                            <span> - </span>
                                            <input
                                                type='datetime-local'
                                                name='endTime'
                                                value={endTime}
                                                onChange={this.handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    {voucherType === 'voucher-new-customer' && (
                                        <div className='basic-content'>
                                            <div className='label-content'>
                                                <span>Purpose: </span>
                                            </div>
                                            <div className='input-content'>
                                                <input
                                                    type='text'
                                                    value={'New buyers'}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    )}
                                    {voucherType === 'voucher-old-customer' && (
                                        <div className='basic-content'>
                                            <div className='label-content'>
                                                <span>Purpose: </span>
                                            </div>
                                            <div className='input-content'>
                                                <input
                                                    type='text'
                                                    value={'The buyer has a repurchase order'}
                                                    readOnly
                                                />
                                                <span>Purchased <input
                                                    type='number'
                                                    className='input-select'
                                                    name='numOfPurchases'
                                                    value={this.state.numOfPurchases}
                                                    onChange={this.handleInputChange}
                                                /> times </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='voucher-setup-infor'>
                                <div className='title-component'>
                                    <h3>Set up discount code</h3>
                                </div>
                                <div className='basic-form'>
                                    <div className='basic-content'>
                                        <div className='label-content'>
                                            <span>Discount Type | Reduced level</span>
                                        </div>
                                        <div className='input-content'>
                                            <select value={discountType} onChange={this.handleDiscountTypeChange}>
                                                <option value='amount'>The amount</option>
                                                <option value='percentage'>The percent</option>
                                            </select>
                                        </div>
                                    </div>
                                    {discountType === 'amount' && (
                                        <div className='basic-content'>
                                            <div className='label-content'>
                                                <span>Discount value</span>
                                            </div>
                                            <div className='input-content'>
                                                <input
                                                    type='number'
                                                    placeholder='Input the amount'
                                                    name='discountValue'
                                                    value={this.state.discountValue}
                                                    onChange={this.handleInputChange}
                                                />
                                            </div>
                                        </div>
                                    )}
                                    {discountType === 'percentage' && (
                                        <>
                                            <div className='basic-content'>
                                                <div className='label-content'>
                                                    <span>Input a value greater than 1%</span>
                                                </div>
                                                <div className='input-content'>
                                                    <input
                                                        type='number'
                                                        placeholder='Input % reduction'
                                                        name='discountValue'
                                                        value={this.state.discountValue}
                                                        onChange={this.handleInputChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className='basic-content'>
                                                <div className='label-content'>
                                                    <span>Maximum reduction</span>
                                                </div>
                                                <div className='input-content'>
                                                    <input
                                                        type='number'
                                                        placeholder='Input maximum reduction'
                                                        name='maxReduction'
                                                        value={this.state.maxReduction}
                                                        onChange={this.handleInputChange}
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    <div className='basic-content'>
                                        <div className='label-content'>
                                            <span>Minimum order value</span>
                                        </div>
                                        <div className='input-content'>
                                            <input
                                                type='number'
                                                placeholder='Input minimum order value'
                                                name='minOrderAmount'
                                                value={this.state.minOrderAmount}
                                                onChange={this.handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className='basic-content'>
                                        <div className='label-content'>
                                            <span>Maximum total usage</span>
                                        </div>
                                        <div className='input-content'>
                                            <input
                                                type='number'
                                                placeholder='Input maximum total usage'
                                                name='maxTotalUsage'
                                                value={this.state.maxTotalUsage}
                                                onChange={this.handleInputChange} />
                                        </div>
                                    </div>
                                    <div className='basic-content'>
                                        <div className='label-content'>
                                            <span>Maximum Usage/Buyer</span>
                                        </div>
                                        <div className='input-content'>
                                            <input
                                                type='number'
                                                placeholder='Input maximum Usage/Buyer'
                                                name='maxUsagePerUser'
                                                value={this.state.maxUsagePerUser}
                                                onChange={this.handleInputChange} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='product-apply'>
                                <div className='title-component'>
                                    <h3>Product is applicable</h3>
                                </div>
                                {voucherType === 'voucher-product' ? (
                                    <div className="filter-section">
                                        <label for="category">Categories:</label>
                                        <select id="category">
                                            <option value="all">All categories</option>
                                            {/* other options */}
                                        </select>
                                        <label for="search">Product name:</label>
                                        <input type="text" id="search" placeholder="Product name" />
                                    </div>
                                ) : null}
                                <div className="product-list">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>Category</th>
                                                <th>Price</th>
                                                <th>Stock</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {voucherType === 'voucher-product' ? (
                                                products && products.length > 0 ? (
                                                    products.map(item => (
                                                            <tr>
                                                                <td>
                                                                    <div>{item.Name}</div>
                                                                </td>
                                                                <td>
                                                                    <div>{item.Category}</div>
                                                                </td>
                                                                <td>
                                                                    <div>{item.PriceRange ? item.PriceRange : item.Price}</div>
                                                                </td>
                                                                <td>
                                                                    <div>100</div>
                                                                </td>
                                                                <td>
                                                                    <div><button className={`select-btn ${this.state.selectedProductIds.includes(item._id) ? 'selected' : ''}`}
                                                                         onClick={() => this.handleProductSelect(item._id)}>
                                                                        {this.state.selectedProductIds.includes(item._id) ? <FontAwesomeIcon icon={faCheckCircle} /> : <FontAwesomeIcon icon={faTimesCircle} />}
                                                                    </button></div>
                                                                </td>
                                                </tr>
                                                        ))
                                                    ) : (<div>No products</div>)

                                            ) : (
                                                <tr>
                                                    <td colspan="5" className="no-product">
                                                        <div className="no-product-icon"></div>
                                                        All products apply
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    )}
                    <button className='cancel-btn' onClick={this.handleCancel}>Cancel</button>
                    <button className='save-btn' onClick={this.handleUpdateVoucher}>Update</button>
                    <button className='delete-btn' onClick={this.handleDeleteVoucher}>Delete</button>


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
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.seller.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailVoucher));
