import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select, { components } from 'react-select';
import axios from '../../../../../axios';
import './DetailInformation.scss';

/**
 * Component displaying detailed product information.
 * Allows users to input or select attribute values.
 */
class DetailInformation extends Component {
    constructor(props) {
        super(props);
        // Initialize state
        this.state = {
            attributeNames: [],
            data: [],
            value: {}
        };
    }

    componentDidMount() {
        // Fetch data when component mounts
        const { category } = this.props;
        if (category) {
            this.fetchData(category);
        }
    }

    componentDidUpdate(prevProps) {
        // Refetch data if category prop changes
        if (this.props.category !== prevProps.category) {
            const { category } = this.props;
            if (category) {
                this.fetchData(category);
            }
        }
    }

    /**
     * Fetch attribute data for the specified category from the backend.
     * @param {string} category - The category of the product.
     */
    fetchData = (category) => {
        axios.post('http://localhost:5000/api/v1/products/get-value-detail', { Category: category }, {
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
        }), () => {
            this.sendDataToParent();
        });
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
        }), () => {
            this.sendDataToParent();
        });
    }

    // Send updated detail data to the parent component
    sendDataToParent = () => {
        const { value } = this.state;
        this.props.onDetailDataChange(value);
    }

    render() {
        const { attributeNames, data } = this.state;

        return (
            <div className='container'>
                <h2>Product Details</h2>
                <h3>Please complete all attribute information to boost the exposure of your product.</h3>
                <div className="attribute-container">
                    {attributeNames.map((attributeName, index) => (
                        <div className="attribute-column" key={index}>
                            <label>{attributeName}</label>
                            {data[index] !== null ? (
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
        isLoggedIn: state.admin.isLoggedIn,
    };
};

// Connect component to Redux store
export default connect(mapStateToProps)(DetailInformation);

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
