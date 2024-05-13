import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Delivery.scss';
import axios from '../../../../../axios'

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
            exceedLimit: false,
            selectedMethods: [],
            methodToggles: {}
        };
        this.handleKeyPress = this.handleKeyPress.bind(this);
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
     * Handles change in weight and recalculates shipping fee.
     * @param {Object} e - Event object.
     */
    handleWeightChange = (e) => {
        const { value } = e.target;
        this.setState({ weight: value }, () => {
            this.calculateShippingFee();
        });
    }

    /**
     * Calculates shipping fee based on weight, dimensions, and delivery methods.
     */
    calculateShippingFee = () => {
        const { weight, width, length, height, deliveryMethods } = this.state;
        let calculatedWeight = Math.ceil(weight / 1000);
        const shippingFees = [];
        let exceedLimits = {};

        deliveryMethods.forEach(method => {
            const { weightLimit, sizeLimit, deliveryFees } = method;
            let methodShippingFee = null;
            let exceedLimit = false

            if (calculatedWeight > weightLimit || width > sizeLimit.width || length > sizeLimit.length || height > sizeLimit.height) {
                exceedLimit = true;
            } else {
                exceedLimit = false
            }

            if (width && length && height &&
                width <= sizeLimit.width && length <= sizeLimit.length && height <= sizeLimit.height) {
                const dimensionalWeight = (width * length * height) / 6000;
                calculatedWeight = Math.max(dimensionalWeight, calculatedWeight);
            }

            if (Math.ceil(calculatedWeight) && Math.ceil(calculatedWeight) <= weightLimit) {

                for (let limit in deliveryFees) {
                    if (Math.ceil(calculatedWeight) === parseFloat(limit)) {
                        methodShippingFee = deliveryFees[limit];
                        break;
                    }
                }
            }
            shippingFees.push(methodShippingFee);
            exceedLimits[method.deliveryMethod] = exceedLimit;

        });
        this.setState({ shippingFees, exceedLimits });
    }

    /**
     * Handles key press event to allow only numerical input for weight and dimensions.
     * @param {Object} e - Event object.
     */
    handleKeyPress = (e) => {
        const charCode = e.which ? e.which : e.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            e.preventDefault();
        }
    };

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
                                type="number"
                                className="price-input"
                                placeholder="Input Weight"
                                value={weight}
                                onChange={this.handleWeightChange}
                                min={1}
                                onKeyPress={this.handleKeyPress}
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
                                type="number"
                                className="price-input"
                                placeholder="Width"
                                min={1}
                                onChange={(e) => {
                                    this.setState({ width: e.target.value }, this.calculateShippingFee);
                                }}
                                onKeyPress={this.handleKeyPress}
                            />
                            <span className="multiply-icon">X</span>
                            <input
                                type="number"
                                className="price-input"
                                placeholder="Length"
                                min={1}
                                onChange={(e) => {
                                    this.setState({ length: e.target.value }, this.calculateShippingFee);
                                }}
                                onKeyPress={this.handleKeyPress}
                            />
                            <span className="multiply-icon">X</span>
                            <input
                                type="number"
                                className="price-input"
                                placeholder="Height"
                                min={1}
                                onChange={(e) => {
                                    this.setState({ height: e.target.value }, this.calculateShippingFee);
                                }}
                                onKeyPress={this.handleKeyPress}
                            />
                        </div>
                    </div>
                    <div className="content-section">
                        <div className="label-container">
                            <label className="label-name">Shipping Fee</label>
                        </div>
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
                                                        {shippingFees[index] !== null && this.state.exceedLimits[method.deliveryMethod] === false ? `Shipping Fee: ${shippingFees[index]} đ` : 'Weight value is invalid'}
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
