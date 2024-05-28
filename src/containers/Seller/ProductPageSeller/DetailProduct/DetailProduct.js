import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import './DetailProduct.scss'
import axios from '../../../../axios'

import Header from '../../Header'
import Navbar from '../../ProductPageSeller/CreateProduct/Section/navBar'
import CustomPopup from '../../../../components/CustomPopup'


class DetailProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {},
            attributeNames: [],
            popupType: '',
            onConfirm: null
        };
    }

    componentDidMount() {
        this.fetchProducts();
    }

    fetchProducts = () => {
        const productId = this.props.match.params.id
        console.log(this.props)

        axios.get(`http://localhost:5000/api/v1/products/detail/${productId}`, {
            headers: {
                'Authorization': localStorage.getItem('accessToken')
            }
        })
            .then(response => {
                this.setState({ product: response, attributeNames: [response.Detail] });
            })
            .catch(error => {
                console.error('Error fetching product detail:', error);
            });
    }

    handleDelete = (productId) => {
        try {
            this.showPopup('Are you sure you want to delete product?', 'confirm', async () => {
                try {
                    await axios.delete(`http://localhost:5000/api/v1/products/delete-product/${productId}`, {
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

    handleSuccess = () => {
        this.closePopup();
        this.props.history.push('/all-product');
    }

    handleFailure = () => {
        this.closePopup();
    }

    confirmCancel = () => {
        this.closePopup();
        this.props.history.push(`/all-product`)
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
        const { product, attributeNames,  popupVisible, popupMessage, popupType, onConfirm } = this.state;
        let additionalInfo;
        if (product.preOrderGoods === 'No') {
            additionalInfo = (
                <p>
                    I will ship out within 2 business days. (excluding public holidays and courier service non-working days).
                </p>
            );
        } else {
            additionalInfo = (
                <div>
                    <p>
                        I need {product.preparationTime} business days to ship (between 5 to 15)
                    </p>
                </div>
            );
        }
        console.log(product)

        return (
            <div className='detail-product-seller-container'>
                <Header />
                <div className="body-container">
                    <div className="left-content">
                        <Navbar />
                    </div>
                    <div className="right-content">
                        <div className="section">
                            <div className='container'>
                                <h2>Basic Information</h2>
                                <div className="image-section">
                                    <h3>Product Images </h3>
                                    <div className="image-list">
                                        {product.Image && product.Image.map((image, index) => (
                                            <div key={index} className="image-item">
                                                <img key={index} src={image} alt={`Product ${index + 1}`} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="video-section">
                                    <h3>Product Video</h3>
                                    <ReactPlayer
                                        className="video"
                                        url={product.Video}
                                        controls={true}
                                        width='600px'
                                        height='auto'
                                    />
                                </div>
                                <div className="product-name-section">
                                    <h3>Product Name </h3>
                                    <input
                                        type="text"
                                        value={product.Name}
                                        readOnly
                                    />
                                </div>
                                <div className="category-section">
                                    <h3>Category </h3>
                                    <div className="input-wrapper">
                                        <input
                                            type="text"
                                            value={product.Category}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="description-section">
                                    <h3>Description</h3>
                                    <div className="input-wrapper">
                                        <textarea
                                            className="description-input"
                                            value={product.Description}
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="section">
                            <div className='detail-container'>
                                <h2>Details Information</h2>
                                <div className="attribute-container">
                                    {attributeNames.map((attribute, index) => (
                                        <div className="attribute-column" key={index}>
                                            {Object.entries(attribute).map(([key, value]) => (
                                                <div key={key} className="attribute-item">
                                                    <label>{key}</label>
                                                    <input
                                                        type="text"
                                                        value={value}
                                                        readOnly
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="section">
                            <div className='sales-container'>
                                <h2>Sales Information</h2>
                                {product.Classify && (
                                    <div className="classification-container">
                                        <div className="classify-group">
                                            <div className="product-table">
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            {product.Classify.slice(0).map((item, index) => (
                                                                <th colSpan={item.Options[0].Value2 ? "5" : "4"} key={index}>Variation List</th>
                                                            ))}
                                                        </tr>
                                                        <tr className="product-row">
                                                            {product.Classify.slice(0).map((item, index) => (
                                                                <>
                                                                    <td style={{ width: '20%' }}>{item.Options[0].Option1}</td>
                                                                    {item.Options[0].Value2 && <td style={{ width: '20%' }}>{item.Options[0].Option2}</td>}
                                                                </>
                                                            ))}
                                                            <td style={{ width: '20%' }}>Price</td>
                                                            <td style={{ width: '20%' }}>Stock</td>
                                                            <td style={{ width: '20%' }}>SKU</td>
                                                        </tr>
                                                        {product.Classify.slice(0).map((item, index) => (
                                                            item.Options.map((option, optionIndex) => (
                                                                <tr className="row-content" key={`${index}-${optionIndex}`}>
                                                                    <td>
                                                                        <>
                                                                            <div className="image-container">
                                                                                {option.Image && <img src={option.Image} alt={`Product ${index}`} />}
                                                                            </div>
                                                                            <div className="text-container">
                                                                                {option.Value1}
                                                                            </div>
                                                                        </>
                                                                    </td>
                                                                    {item.Options[0].Value2 ? <td>
                                                                        <div className="content-classification"><p>{option.Value2}</p></div>
                                                                    </td> : null}
                                                                    <td>
                                                                        <div className='content-classification'>
                                                                            <>
                                                                                <input
                                                                                    type="number"
                                                                                    className="input"
                                                                                    value={option.Price}
                                                                                />
                                                                                <span className="currency-icon">&#8363;</span>
                                                                            </>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className='content-classification'>
                                                                            <input
                                                                                type="number"
                                                                                className="input"
                                                                                value={option.Stock}
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div key={optionIndex} className='content-classification'>
                                                                            <input
                                                                                type="text"
                                                                                className="input"
                                                                                value={option.SKU}
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {(product.Price && product.Quantity) && (
                                    <div>
                                        <div className="price-product">
                                            <label htmlFor="price-input" className="price-label">Price</label>
                                            <input
                                                type="number"
                                                className="price-input"
                                                value={product.Price}
                                                readOnly
                                            />
                                            <span className="currency-icon">&#8363;</span>
                                        </div>
                                        <div className="quantity-product">
                                            <label htmlFor="quantity-input" className="quantity-label">Stock</label>
                                            <input
                                                type="number"
                                                className="quantity-input"
                                                value={product.Quantity}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                )}
                                {product.discounts && (
                                    <div className="discount">
                                        <label>Wholesale</label>
                                        <div className="discount-group">
                                            <div className="discount-table">
                                                <table>
                                                    <tbody>
                                                        <tr className="discount-row">
                                                            <td>No.</td>
                                                            <td>Min Quantity</td>
                                                            <td>Max Quantity</td>
                                                            <td>Unit Price</td>
                                                        </tr>
                                                        {product.discounts.map((discount, index) => (
                                                            discount.Value.map((priceTier, priceTierIndex) => (
                                                                <>
                                                                    <tr className="discount-row-content" key={index}>
                                                                        <td>Price Tier {priceTierIndex + 1}</td>
                                                                        <td>
                                                                            <input
                                                                                type="number"
                                                                                value={priceTier.from}
                                                                            />
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                type="number"
                                                                                value={priceTier.to}
                                                                            />
                                                                        </td>
                                                                        <td>
                                                                            <div className="input-with-icon">
                                                                                <input
                                                                                    type="number"
                                                                                    value={priceTier.price}
                                                                                />
                                                                                <span className="currency-icon">&#8363;</span>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </>
                                                            ))
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                )}
                            </div>
                        </div>
                        <div className="section">
                            <div className='container'>
                                <h2>Shipping</h2>
                                <div className="delivery-container">
                                    <div className="content-section">
                                        <div className="label-container">
                                            <label className="label-name">Weight</label>
                                        </div>
                                        <div className="content-container">
                                            <input
                                                type="number"
                                                className="price-input"
                                                value={product.Weight}
                                                readOnly
                                            />
                                            <span className="unit">gr</span>
                                        </div>
                                    </div>
                                    <div className="content-section">
                                        {(product.Length != null && product.Height != null && product.Width!= null ) && (
                                            <>
                                                <div className="label-container">
                                                    <label className="label-name">Parcel Size</label>
                                                </div>
                                                <div className="content-container">
                                                    <input
                                                        type="number"
                                                        className="price-input"
                                                        value={product.Width}
                                                        readOnly
                                                    />
                                                    <span className="multiply-icon">X</span>
                                                    <input
                                                        type="number"
                                                        className="price-input"
                                                        value={product.Length}
                                                        readOnly
                                                    />
                                                    <span className="multiply-icon">X</span>
                                                    <input
                                                        type="number"
                                                        className="price-input"
                                                        value={product.Height}
                                                        readOnly
                                                    />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <div className="content-section">
                                        <div className="label-container">
                                            <label className="label-name">Shipping Fee</label>
                                        </div>
                                        <div className="content-container">
                                            <div className="delivery-table">
                                                {product.deliveryFee && product.deliveryFee.map((method, index) => (
                                                    <div className="delivery-content" key={index}>
                                                        <div className="label-delivery-name">
                                                            <label className='name'>{method.name}</label>
                                                        </div>
                                                        <div className="content-delivery">
                                                            <div className='delivery-info'>
                                                                <label className='name-method'>{method.name}</label>
                                                            </div>
                                                            <div className='delivery-info'>
                                                                <label className='name-price'>
                                                                    {`Shipping Fee: ${method.fee} đ`}
                                                                </label>
                                                            </div>
                                                            {/* Toggle button */}
                                                            <button disabled>
                                                                <i className="fas fa-check-circle"></i> Applied
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="section">
                            <div className='container'>
                                <h2>Others</h2>
                                <div className="product-information">
                                    <div className="label-container"><label htmlFor="information-input" className="information-label">Pre-Order</label></div>
                                    <div>
                                        <input
                                            type="radio"
                                            className="information-input"
                                            name="preOrder"
                                            value="No"
                                            checked={product.preOrderGoods === 'No'}
                                        />
                                        <span className="information-name">No</span>
                                    </div>
                                    <div>
                                        <input
                                            type="radio"
                                            className="information-input"
                                            name="preOrder"
                                            value="Yes"
                                            checked={product.preOrderGoods === 'Yes'}
                                        />
                                        <span className="information-name">Yes</span>
                                    </div>
                                </div>
                                {additionalInfo}
                                <div className="product-information">
                                    <div className="label-container"><label className="information-label">Condition</label></div>
                                    <div className="attribute-column">
                                    <input
                                        type="text"
                                        className="status-input"
                                        name="status"
                                        value={product.Status}
                                        readOnly
                                    />
                                    </div>
                                </div>
                                <div className="product-information">
                                    <div className="label-container"><label htmlFor="sku-input" className="information-label">Parent SKU</label></div>
                                    <input
                                        type="text"
                                        className="sku-input"
                                        name="sku"
                                        value={product.SKU}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="buttons-actions">
                            <Link to={`/all-product`} className="all-link">
                                <FontAwesomeIcon icon={faArrowLeft} />
                                <span>Back</span>
                            </Link>
                            <Link to={`/update-product/${product._id}`} className="edit-link">
                                <FontAwesomeIcon icon={faPencilAlt} />
                                <span>Update Product</span>
                            </Link>
                            <button className="delete-button" onClick={() => this.handleDelete(product._id)}>
                                <FontAwesomeIcon icon={faTrash} />
                                <span>Delete Product</span>
                            </button>
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
        isLoggedIn: state.seller.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailProduct);