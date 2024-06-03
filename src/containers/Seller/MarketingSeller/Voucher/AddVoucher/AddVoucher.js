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

class AddVoucher extends Component {
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
        const params = new URLSearchParams(this.props.location.search);
        const voucherType = params.get('type');
        this.setState({ voucherType });
        this.fetchAllProduct(voucherType)
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
                                            <span>Loại mã</span>
                                        </div>
                                        <div className='input-content'>
                                            <input type='text' value={voucherType} readOnly />
                                        </div>
                                    </div>
                                    <div className='basic-content'>
                                        <div className='label-content'>
                                            <span>Tên chương trình giảm giá</span>
                                        </div>
                                        <div className='input-content'>
                                            <input
                                                type='text'
                                                placeholder='Nhập tên voucher'
                                                name='voucherName'
                                                value={this.state.voucherName}
                                                onChange={this.handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className='basic-content'>
                                        <div className='label-content'>
                                            <span>Mã Voucher</span>
                                        </div>
                                        <div className='input-content'>
                                            <input
                                                type='text'
                                                placeholder='Nhập mã voucher'
                                                name='voucherCode'
                                                value={this.state.voucherCode}
                                                onChange={this.handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className='basic-content'>
                                        <div className='label-content'>
                                            <span>Thời gian sử dụng mã</span>
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
                                                <span>Mục tiêu: </span>
                                            </div>
                                            <div className='input-content'>
                                                <input
                                                    type='text'
                                                    value={'Người mua mới'}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    )}
                                    {voucherType === 'voucher-old-customer' && (
                                        <div className='basic-content'>
                                            <div className='label-content'>
                                                <span>Mục tiêu: </span>
                                            </div>
                                            <div className='input-content'>
                                                <input
                                                    type='text'
                                                    value={'Người mua có đơn mua lại'}
                                                    readOnly
                                                />
                                                <span>Đã mua hàng <input
                                                    type='number'
                                                    className='input-select'
                                                    name='numOfPurchases'
                                                    value={this.state.numOfPurchases}
                                                    onChange={this.handleInputChange}
                                                /> lần </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='voucher-setup-infor'>
                                <div className='title-component'>
                                    <h3>Thiết lập mã giảm giá</h3>
                                </div>
                                <div className='basic-form'>
                                    <div className='basic-content'>
                                        <div className='label-content'>
                                            <span>Loại giảm giá | Mức giảm</span>
                                        </div>
                                        <div className='input-content'>
                                            <select value={discountType} onChange={this.handleDiscountTypeChange}>
                                                <option value='amount'>Theo số tiền</option>
                                                <option value='percentage'>Theo phần trăm</option>
                                            </select>
                                        </div>
                                    </div>
                                    {discountType === 'amount' && (
                                        <div className='basic-content'>
                                            <div className='label-content'>
                                                <span>Giá trị giảm</span>
                                            </div>
                                            <div className='input-content'>
                                                <input
                                                    type='number'
                                                    placeholder='Nhập số tiền'
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
                                                    <span>Nhập giá trị lớn hơn 1%</span>
                                                </div>
                                                <div className='input-content'>
                                                    <input
                                                        type='number'
                                                        placeholder='Nhập % giảm'
                                                        name='discountValue'
                                                        value={this.state.discountValue}
                                                        onChange={this.handleInputChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className='basic-content'>
                                                <div className='label-content'>
                                                    <span>Mức giảm tối đa</span>
                                                </div>
                                                <div className='input-content'>
                                                    <input
                                                        type='number'
                                                        placeholder='Nhập mức giảm tối đa'
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
                                            <span>Giá trị đơn hàng tối thiểu</span>
                                        </div>
                                        <div className='input-content'>
                                            <input
                                                type='number'
                                                placeholder='Nhập giá trị đơn hàng tối thiểu'
                                                name='minOrderAmount'
                                                value={this.state.minOrderAmount}
                                                onChange={this.handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className='basic-content'>
                                        <div className='label-content'>
                                            <span>Tổng lượt sử dụng tối đa</span>
                                        </div>
                                        <div className='input-content'>
                                            <input
                                                type='number'
                                                placeholder='Nhập tổng lượt sử dụng tối đa'
                                                name='maxTotalUsage'
                                                value={this.state.maxTotalUsage}
                                                onChange={this.handleInputChange} />
                                        </div>
                                    </div>
                                    <div className='basic-content'>
                                        <div className='label-content'>
                                            <span>Lượt sử dụng tối đa/Người mua</span>
                                        </div>
                                        <div className='input-content'>
                                            <input
                                                type='number'
                                                placeholder='Nhập lượt sử dụng tối đa/Người mua'
                                                name='maxUsagePerUser'
                                                value={this.state.maxUsagePerUser}
                                                onChange={this.handleInputChange} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='product-apply'>
                                <div className='title-component'>
                                    <h3>Sản phẩm được áp dụng</h3>
                                </div>
                                {voucherType === 'voucher-product' ? (
                                    <div className="filter-section">
                                        <label for="category">Ngành hàng:</label>
                                        <select id="category">
                                            <option value="all">Tất cả ngành hàng</option>
                                            {/* other options */}
                                        </select>
                                        <label for="search">Tên sản phẩm:</label>
                                        <input type="text" id="search" placeholder="Tên sản phẩm" />
                                    </div>
                                ) : null}
                                <div className="product-list">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Sản Phẩm</th>
                                                <th>Ngành hàng</th>
                                                <th>Giá</th>
                                                <th>Kho hàng</th>
                                                <th>Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {voucherType === 'voucher-product' ? (
                                                <tr>
                                                    {products && products.length > 0 ? (
                                                        products.map(item => (
                                                            <>
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
                                                            </>
                                                        ))
                                                    ) : (<div>Không có sản phẩm nào</div>)}

                                                </tr>
                                            ) : (
                                                <tr>
                                                    <td colspan="5" className="no-product">
                                                        <div className="no-product-icon"></div>
                                                        Tất cả sản phẩm được áp dụng
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
                    <button className='save-btn' onClick={this.handleSaveVoucher}>Save</button>

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddVoucher));
