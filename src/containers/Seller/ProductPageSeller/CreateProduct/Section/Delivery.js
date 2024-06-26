import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Delivery.scss';
import axios from '../../../../../axios'

import { calculateShippingFee, handleKeyPress } from '../../../../../method/handleMethod'

/**
 * Component for managing delivery of a product.
 * Allows users to set weight, length, width, height and delivery fee.
 */
class Delivery extends Component {
    /**
     * Constructor for initializing component state and binding functions.
     * @param {Object} props - Component props.
     */
    constructor(props) {
        super(props);
        this.state = {
            weight: '',
            width: '',
            length: '',
            height: '',
            shippingFees: null,
            deliveryMethods: [],
            exceedLimits: false,
            selectedMethods: [],
            methodToggles: {},
        };
    }

    /**
     * Updates delivery data when state changes.
     * @param {Object} prevProps - Previous props.
     * @param {Object} prevState - Previous state.
     */
    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
            this.props.onDeliveryDataChange({
                Weight: this.state.weight,
                Width: this.state.width,
                Length: this.state.length,
                Height: this.state.height,
                deliveryFee: this.state.selectedMethods
            });
        }
    }

    /**
     * Fetches delivery methods from the server upon component mount.
     */
    componentDidMount() {

        axios.get('http://localhost:5000/api/v1/products/get-all-delivery')
            .then(response => {
                this.setState({ deliveryMethods: response });
            })
            .catch(error => {
                console.error('Error fetching delivery methods:', error);
            });
    }

    /**
     * Toggles selection of delivery method and updates selected methods.
     * @param {Object} method - Selected delivery method.
     */
    handleSelectMethod = (method) => {
        const { selectedMethods, methodToggles, shippingFees } = this.state;
        const isMethodSelected = methodToggles[method.deliveryMethod];
        let updatedSelectedMethods = [...selectedMethods];
        const newSelectedMethod = {
            name: method.deliveryMethod,
            fee: shippingFees[selectedMethods.length]
        };

        if (isMethodSelected) {
            updatedSelectedMethods = updatedSelectedMethods.filter(selectedMethod => selectedMethod.name !== method.deliveryMethod);
        } else {
            updatedSelectedMethods.push(newSelectedMethod);
        }

        const updatedMethodToggles = { ...methodToggles };
        updatedMethodToggles[method.deliveryMethod] = !isMethodSelected;

        this.setState({ selectedMethods: updatedSelectedMethods, methodToggles: updatedMethodToggles });
    }

    /**
     * Handles change in weight, width, length, height and recalculates shipping fee.
     * @param {Object} e - Event object.
     */
    handleWeightChange = (e) => {
        const { value } = e.target;
        const { width, length, height, deliveryMethods } = this.state;
        this.setState({ weight: value }, () => {
            this.setState(calculateShippingFee(value, width, length, height, deliveryMethods));
        });
    }

    handleWidthChange = (e) => {
        const { value } = e.target;
        const { weight, length, height, deliveryMethods } = this.state;
        this.setState({ width: value }, () => {
            this.setState(calculateShippingFee(weight, value, length, height, deliveryMethods));
        });
    }
    handleLengthChange = (e) => {
        const { value } = e.target;
        const { weight, width, height, deliveryMethods } = this.state;
        this.setState({ length: value }, () => {
            this.setState(calculateShippingFee(weight, width, value, height, deliveryMethods));
        });
    }
    handleHeightChange = (e) => {
        const { value } = e.target;
        const { weight, width, length, deliveryMethods } = this.state;
        this.setState({ height: value }, () => {
            this.setState(calculateShippingFee(weight, width, length, value, deliveryMethods));
        });
    }

    render() {
        const { weight, shippingFees, deliveryMethods } = this.state;

        return (
            <div className='container'>
                <h2>Shipping</h2>
                <div className="delivery-container">
                    <div className="content-section">
                        <div className="label-container">
                            <label className="label-name">Weight</label>
                        </div>
                        <div className="content-container">
                            <input
                                type="text"
                                inputmode="none"
                                pattern="[0-9,\.]*"
                                className="price-input"
                                placeholder="Input Weight"
                                value={weight}
                                onChange={this.handleWeightChange}
                                min={1}
                                onKeyPress={handleKeyPress}
                            />
                            <span className="unit">gr</span>
                        </div>
                    </div>
                    <div className="content-section">
                        <div className="label-container">
                            <label className="label-name">Parcel Size</label>
                        </div>
                        <div className="content-container">
                            <input
                                type="text"
                                inputmode="none"
                                pattern="[0-9,\.]*"
                                className="price-input"
                                placeholder="Width"
                                min={1}
                                onChange={this.handleWidthChange}
                                onKeyPress={handleKeyPress}
                            />
                            <span className="multiply-icon">X</span>
                            <input
                                type="text"
                                inputmode="none"
                                pattern="[0-9,\.]*"
                                className="price-input"
                                placeholder="Length"
                                min={1}
                                onChange={this.handleLengthChange}
                                onKeyPress={handleKeyPress}
                            />
                            <span className="multiply-icon">X</span>
                            <input
                                type="text"
                                inputmode="none"
                                pattern="[0-9,\.]*"
                                className="price-input"
                                placeholder="Height"
                                min={1}
                                onChange={this.handleHeightChange}
                                onKeyPress={handleKeyPress}
                            />
                        </div>

                    </div>
                    <div className="content-section">
                        {shippingFees && (
                            <div className="label-container">
                                <label className="label-name">Shipping Fee</label>
                            </div>

                        )}
                        <div className="content-container">
                            <div className="delivery-table">
                                {shippingFees && deliveryMethods.map((method, index) => (
                                    <div className="delivery-content" key={index}>
                                        <div className="label-delivery-name">
                                            <label className='name'>{method.deliveryMethod}</label>
                                        </div>
                                        <div className="content-delivery">
                                            <div className='delivery-info'>
                                                <label className='name-method'>{method.deliveryMethod}</label>
                                            </div>
                                            {weight ? (
                                                <div className='delivery-info'>
                                                    <label className='name-price' style={{ color: this.state.exceedLimits[method.deliveryMethod] ? 'red' : 'inherit' }}>
                                                        {shippingFees[index] !== null && this.state.exceedLimits[method.deliveryMethod] === false ? `Shipping Fee: ${shippingFees[index]} đ` : 'Weight or parcel size value is invalid'}
                                                    </label>
                                                </div>
                                            ) : (
                                                <div className='delivery-info'>
                                                    <label className='name-price' >Weight Required</label>
                                                </div>
                                            )}
                                            {/* Toggle button */}
                                            <button onClick={() => this.handleSelectMethod(method)} disabled={!weight || this.state.exceedLimits[method.deliveryMethod]}>
                                                {this.state.methodToggles[method.deliveryMethod] ? (
                                                    <>
                                                        <i className="fas fa-check-circle"></i> Applied
                                                    </>
                                                ) : (
                                                    <>
                                                        <i className="fas fa-times-circle"></i> Not Yet Applied
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
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
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Delivery);
