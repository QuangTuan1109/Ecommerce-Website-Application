import React, { Component } from 'react';
import { connect } from 'react-redux';
import './OtherInformation.scss';

/**
 * Component for managing others information of a product.
 * Allows users to add pre-order, condition, sku.
 */
class OtherInformation extends Component {
    /**
     * Constructor for initializing component state.
     * @param {Object} props - Component props.
     */
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: 'No',
            preparationTime: 5,
            condition: 'New',
            sku: ''
        };
    }

    /**
     * Updates other data when state changes.
     * @param {Object} prevProps - Previous props.
     * @param {Object} prevState - Previous state.
     */
    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
            this.props.onOtherDataChange({
                preOrderGoods: this.state.selectedOption,
                preparationTime: this.state.preparationTime,
                Status: this.state.condition,
                SKU: this.state.sku
            });
        }
    }

    /**
     * Handles change in selected option.
     * @param {Object} changeEvent - Event object.
     */
    handleOptionChange = changeEvent => {
        this.setState({
            selectedOption: changeEvent.target.value,
            preparationTime: 5
        });
    };

    /**
     * Handles change in preparation time.
     * @param {Object} event - Event object.
     */
    handlePreparationTimeChange = event => {
        this.setState({
            preparationTime: event.target.value
        });
    };

    /**
     * Handles change in condition.
     * @param {Object} event - Event object.
     */
    handleConditionChange = event => {
        this.setState({
            condition: event.target.value
        });
    };

    /**
     * Handles change in SKU.
     * @param {Object} event - Event object.
     */
    handleSkuChange = event => {
        this.setState({
            sku: event.target.value
        });
    };


    render() {
        let additionalInfo;
        if (this.state.selectedOption === 'No') {
            additionalInfo = (
                <p>
                    I will ship out within 2 business days. (excluding public holidays and courier service non-working days).
                </p>
            );
        } else {
            additionalInfo = (
                <div>
                    <p>
                        I need <input type="number" value={this.state.preparationTime} onChange={this.handlePreparationTimeChange} /> business days to ship (between 5 to 15)
                    </p>
                    {(this.state.preparationTime < 5 || this.state.preparationTime > 15) &&
                        <p style={{ color: 'red' }}>
                            Your days to ship is now out of range, please change it.
                        </p>
                    }
                </div>
            );
        }

        return (
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
                            checked={this.state.selectedOption === 'No'}
                            onChange={this.handleOptionChange}
                        />
                        <span className="information-name">No</span>
                    </div>
                    <div>
                        <input
                            type="radio"
                            className="information-input"
                            name="preOrder"
                            value="Yes"
                            checked={this.state.selectedOption === 'Yes'}
                            onChange={this.handleOptionChange}
                        />
                        <span className="information-name">Yes</span>
                    </div>
                </div>
                {additionalInfo}
                <div className="product-information">
                    <div className="label-container"><label className="information-label">Condition</label></div>
                    <div className="attribute-column">
                        <select value={this.state.condition} onChange={this.handleConditionChange}>
                            <option value="New">New</option>
                            <option value="Old">Used</option>
                        </select>
                    </div>
                </div>
                <div className="product-information">
                    <div className="label-container"><label htmlFor="sku-input" className="information-label">Parent SKU</label></div>
                    <input
                        type="text"
                        className="sku-input"
                        name="sku"
                        value={this.state.sku}
                        onChange={this.handleSkuChange}
                    />
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

export default connect(mapStateToProps, mapDispatchToProps)(OtherInformation);
