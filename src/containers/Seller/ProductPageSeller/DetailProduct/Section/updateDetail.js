import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select, { components } from 'react-select';
import axios from '../../../../../axios';
import { withRouter } from 'react-router-dom';

/**
 * Component displaying detailed product information.
 * Allows users to input or select attribute values.
 */
class updateDetail extends Component {
    constructor(props) {
        super(props);
        // Initialize state
        this.state = {
            product: {},
            attributeNames: [],
            data: [],
            value: {},
        };
    }

    componentDidMount() {
        this.fetchProducts()
    }

    componentDidUpdate(prevProps, prevState) {
        // Refetch data if category prop changes    
        if (this.props.category !== prevProps.category) {
            const { category } = this.props;
            if (category) {
                this.fetchData(category);
            }
        }

        if (prevState !== this.state) {
            this.props.onDetailDataChange({
                Detail: this.state.value
            });
        }
    }

    fetchProducts = () => {
        const productId = this.props.match.params.id

        axios.get(`http://localhost:5000/api/v1/products/detail/${productId}`, {
            headers: {
                'Authorization': localStorage.getItem('accessToken')
            }
        })
            .then(response => {
                this.setState({ product: response, value: response.Detail });

                axios.post('http://localhost:5000/api/v1/products/get-value-detail', { Category: response.Category }, {
                    headers: {
                        'Authorization': `${localStorage.getItem('accessToken')}`
                    }
                })
                    .then(response => {
                        const { attributeNames, data } = response;
                        this.setState({ attributeNames, data });
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
            })
            .catch(error => {
                console.error('Error fetching product detail:', error);
            });
    }

    /**
     * Update state with the input value of an attribute.
     * @param {string} attribute - The attribute name.
     * @param {string} value - The value of the attribute.
     */
    handleInputChange = (attribute, value) => {
        this.setState(prevState => ({
            value: {
                ...prevState.value,
                [attribute]: value
            }
        }));
    }

    /**
     * Update state with the selected option for an attribute.
     * @param {string} attribute - The attribute name.
     * @param {Object} selectedOption - The selected option object.
     */
    handleSelectChange = (attribute, selectedOption) => {
        this.setState(prevState => ({
            value: {
                ...prevState.value,
                [attribute]: selectedOption ? selectedOption.value : null
            }
        }));
    }

    render() {
        const { product, attributeNames, data, value } = this.state;

        return (
            <div className='container'>
                <h2>Product Details</h2>
                <h3>Please complete all attribute information to boost the exposure of your product.</h3>
                <div className="attribute-container">
                    {attributeNames.map((attributeName, index) => (
                        <div className="attribute-column" key={index}>
                            <label>{attributeName}</label>
                            {Object.keys(product.Detail).includes(attributeName) ? (
                                data[index] !== null ? (
                                    <>
                                    <Select
                                        options={data[index].map(option => ({ value: option, label: option }))}
                                        value={{ value: value[attributeName], label: value[attributeName]}}
                                        isSearchable
                                        components={{ DropdownIndicator: null, IndicatorSeparator: null, Input: CustomInputSearch }}
                                        onChange={(selectedOption) => this.handleSelectChange(attributeName, selectedOption)}
                                    />
                                    </>
                                ) : (
                                    <CustomInput
                                        placeholder="Enter value"
                                        value={value[attributeName]}
                                        onChange={(e) => this.handleInputChange(attributeName, e.target.value)}
                                    />

                                )
                                
                            ) : (
                                data[index] !== null ? (
                                    <Select
                                        options={data[index].map(option => ({ value: option, label: option }))}
                                        placeholder="Please select"
                                        isSearchable
                                        components={{ DropdownIndicator: null, IndicatorSeparator: null, Input: CustomInputSearch }}
                                        onChange={(selectedOption) => this.handleSelectChange(attributeName, selectedOption)}
                                    />

                                ) : (
                                    <CustomInput
                                        placeholder="Enter value"
                                        value={this.state.value[attributeName]}
                                        onChange={(e) => this.handleInputChange(attributeName, e.target.value)}
                                    />

                                )
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

// Map Redux state to component props
const mapStateToProps = state => {
    return {
        category: state.seller.category,
        isLoggedIn: state.seller.isLoggedIn,
    };
};

// Connect component to Redux store
export default withRouter(connect(mapStateToProps)(updateDetail));

// Custom input component for entering attribute values
const CustomInput = props => {
    return (
        <input className='CustomInput' {...props} />
    );
};

// Custom input component used within the dropdown select for searching
const CustomInputSearch = props => {
    return (
        <components.Input {...props} />
    );
};
