import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SellInformation.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faImage } from '@fortawesome/free-solid-svg-icons';

/**
 * Component for managing Sales information of a product.
 * Allows users to add Variations, Unit Price, Stock, Wholesale, Size Chart.
 */
class SellInformation extends Component {
    /**
     * Constructor for the component.
     */
    constructor(props) {
        super(props);
        this.state = {
            unitPrice: '',
            unitQuantity: '',
            discounts: [{ from: '', to: '', price: '' }],
            priceClassify: [],
            quantityClassify: [],
            skuClassify: [],
            showClassification: false,
            input1Value: '',
            input2List: [''],
            input1classify2Value: '',
            inputclassify2List: [''],
            text: '',
            text2: '',
            imageSrc: '',
            showAdditionalInfo2: false,
            showPriceAndQuantity: true,
            showClassification2: false,
            showDiscount: false,
            showPopupNewSizeTable: false,
            tableName: '',
            tableNameMaxLength: 50,
            tableNameLength: 0,
            sizeSettings: [
                { name: "Chiều dài", checked: false },
                { name: "Chiều rộng", checked: false }
            ],
            otherSettings: [
                { name: "Chiều dài", checked: false },
                { name: "Chiều rộng", checked: false }
            ]
        };
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    /**
     * Handles componentDidUpdate lifecycle method.
     * Updates API data when the state changes.
     * @param {Object} prevProps - Previous props of the component.
     * @param {Object} prevState - Previous state of the component.
     */
    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
            const { input2List, inputclassify2List } = this.state;
            const classifyObjects = [];

            for (let i = 0; i < input2List.length; i++) {
                for (let j = 0; j < inputclassify2List.length; j++) {
                    const obj = {
                        Option1: this.state.input1Value,
                        Value1: input2List[i].text,
                        Option2: this.state.input1classify2Value,
                        Value2: inputclassify2List[j].text2,
                        Image: input2List[i].imageSrc ? input2List[i].imageSrc : null,
                        Price: this.state.priceClassify[`${i}-${j}`],
                        Stock: this.state.quantityClassify[`${i}-${j}`],
                        SKU: this.state.skuClassify[`${i}-${j}`]
                    };
                    classifyObjects.push(obj);
                }
            }

            // Call onSellDataChange function with updated data
            this.props.onSellDataChange({
                Classify: classifyObjects,
                Price: this.state.unitPrice,
                Quantity: this.state.unitQuantity,
                Discount: this.state.discounts
            });
        }
    }

    /**
     * Handles changes in price for a classification.
     * @param {Object} e - Event object.
     * @param {number} index - Index of the classification.
     */
    handlePriceClassifyChange = (e, index) => {
        const { value } = e.target;
        const { priceClassify } = this.state;
        priceClassify[index] = value;
        this.setState({ priceClassify });
    };

    /**
     * Handles changes in quantity for a classification.
     * @param {Object} e - Event object.
     * @param {number} index - Index of the classification.
     */
    handleQuantityClassifyChange = (e, index) => {
        const { value } = e.target;
        const { quantityClassify } = this.state;
        quantityClassify[index] = value;
        this.setState({ quantityClassify });
    };

    /**
     * Handles changes in SKU for a classification.
     * @param {Object} e - Event object.
     * @param {number} index - Index of the classification.
     */
    handleSkuClassifyChange = (e, index) => {
        const { value } = e.target;
        const { skuClassify } = this.state;
        skuClassify[index] = value;
        this.setState({ skuClassify });
    };

    /**
     * Toggles the display of classification options.
     */
    toggleClassification = () => {
        this.setState(prevState => ({
            showClassification: !prevState.showClassification,
            showPriceAndQuantity: !prevState.showPriceAndQuantity,
            unitPrice: '',
            unitQuantity: ''
        }), () => {
            const { showClassification } = this.state;
            const addClassification = document.querySelector('.add-classification');
            if (addClassification) {
                addClassification.style.display = showClassification ? 'none' : 'flex';
            }
        });
    };

    /**
     * Toggles the display of additional information.
     */
    handleToggleAdditionalInfo2 = () => {
        this.setState(prevState => ({
            showAdditionalInfo2: !prevState.showAdditionalInfo2,
            showClassification2: !prevState.showClassification2
        }), () => {
            const { showAdditionalInfo2 } = this.state;
            const addClassification2 = document.querySelector('.add-classification2');
            if (addClassification2) {
                addClassification2.style.display = showAdditionalInfo2 ? 'none' : 'flex';
            }
        });
    };

    /**
     * Closes additional information section.
     */
    closeAdditionalInfo = () => {
        const { showAdditionalInfo2 } = this.state;
        if (showAdditionalInfo2) {
            this.setState({
                showClassification: false,
                showAdditionalInfo2: false,
                input1Value: '',
                input2List: [{ text: '', inputclassify2List: [{ text: '' }] }],
                showPriceAndQuantity: true,
                showClassification2: false,
                inputclassify2List: ['']
            });
        } else {
            this.setState({
                showClassification: false,
                input1Value: '',
                input2List: [{ text: '', inputclassify2List: [{ text: '' }] }],
                showPriceAndQuantity: true,
                showClassification2: false,
                input1classify2Value: '',
                inputclassify2List: ['']
            });
        }
    };

    /**
     * Closes additional information section 2.
     */
    closeAdditionalInfo2 = () => {
        this.setState({
            showAdditionalInfo2: false,
            input1classify2Value: '',
            inputclassify2List: [''],
            showClassification2: false,
            priceClassify: []
        });
    };

    /**
     * Handles image upload for a classification.
     * @param {Object} e - Event object.
     * @param {number} index - Index of the classification.
     */
    handleImageUpload = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                const { input2List } = this.state;
                const updatedInput2List = [...input2List];
                updatedInput2List[index] = { ...updatedInput2List[index], imageSrc: reader.result };
                this.setState({ input2List: updatedInput2List });
            };
        }
    };

    /**
     * Handles input change for a classification.
     * @param {Object} e - Event object.
     * @param {string} inputType - Type of input.
     * @param {number} index - Index of the classification.
     */
    handleInputChange = (e, inputType, index) => {
        const { value } = e.target;
        if (inputType === 'input1') {
            this.setState({ input1Value: value });
        } else {
            const updatedInput2List = this.state.input2List.map((item, i) => {
                if (i === index) {
                    return { ...item, text: value };
                }
                return item;
            });
            this.setState({ input2List: updatedInput2List });
        }
    };

    /**
     * Handles input change for a classification 2.
     * @param {Object} e - Event object.
     * @param {string} inputType - Type of input.
     * @param {number} index - Index of the classification.
     */
    handleInputChange2 = (e, inputType, index) => {
        const { value } = e.target;
        if (inputType === 'input1') {
            this.setState({ input1classify2Value: value });
        } else {
            const updatedInputClassify2List = this.state.inputclassify2List.map((item, i) => {
                if (i === index) {
                    return { ...item, text2: value };
                }
                return item;
            });
            this.setState({ inputclassify2List: updatedInputClassify2List });
        }
    };

    /**
     * Adds a new input field for classification 1.
     */
    handleAddInput2 = () => {
        this.setState(prevState => ({
            input2List: [...prevState.input2List, '']
        }));
    };

    /**
     * Adds a new input field for classification 2.
     */
    handleAddInputClassify2 = () => {
        this.setState(prevState => ({
            inputclassify2List: [...prevState.inputclassify2List, '']
        }));
    };

    /**
     * Removes an input field for classification 1.
     * @param {number} index - Index of the classification.
     */
    handleRemoveInput2 = (index) => {
        const { input2List } = this.state;
        input2List.splice(index, 1);
        this.setState({ input2List });
    };

    /**
     * Removes an input field for classification 2.
     * @param {number} index - Index of the classification.
     */
    handleRemoveInputClassify2 = (index) => {
        const { inputclassify2List, priceClassify, quantityClassify, skuClassify } = this.state;

        if (inputclassify2List.length === 1) {
            return;
        }

        inputclassify2List.splice(index, 1);

        const updatedPriceClassify = {};
        const updatedQuantityClassify = {};
        const updatedSkuClassify = {};

        Object.keys(priceClassify).forEach((key) => {
            const [rowIndex, colIndex] = key.split('-').map(Number);

            if (colIndex > index) {
                updatedPriceClassify[`${rowIndex}-${colIndex - 1}`] = priceClassify[key];
            }
            else if (colIndex < index) {
                updatedPriceClassify[key] = priceClassify[key];
            }

            if (colIndex > index) {
                updatedQuantityClassify[`${rowIndex}-${colIndex - 1}`] = quantityClassify[key];
                updatedSkuClassify[`${rowIndex}-${colIndex - 1}`] = skuClassify[key];
            } else if (colIndex < index) {
                updatedQuantityClassify[key] = quantityClassify[key];
                updatedSkuClassify[key] = skuClassify[key];
            }
        });

        this.setState({
            inputclassify2List,
            priceClassify: updatedPriceClassify,
            quantityClassify: updatedQuantityClassify,
            skuClassify: updatedSkuClassify
        });
    };

    /**
     * Handles change in unit price.
     * @param {Object} event - Event object.
     */
    handleUnitPriceChange = (event) => {
        this.setState({ unitPrice: event.target.value });
    }

    /**
     * Handles change in unit quantity.
     * @param {Object} event - Event object.
     */
    handleQuantityChange = (event) => {
        this.setState({ unitQuantity: event.target.value });
    }

    /**
     * Handles change in 'from' value for a discount.
     * @param {Object} event - Event object.
     * @param {number} index - Index of the discount.
     */
    handleFromChange = (event, index) => {
        const { value } = event.target;
        const { discounts } = this.state;
        const newDiscounts = [...discounts];
        newDiscounts[index].from = value;
        this.setState({ discounts: newDiscounts });
    }

    /**
     * Handles change in 'to' value for a discount.
     * @param {Object} event - Event object.
     * @param {number} index - Index of the discount.
     */
    handleToChange = (event, index) => {
        const { value } = event.target;
        const { discounts } = this.state;
        const newDiscounts = [...discounts];
        newDiscounts[index].to = value;
        this.setState({ discounts: newDiscounts });
    }

    /**
     * Handles change in price for a discount.
     * @param {Object} event - Event object.
     * @param {number} index - Index of the discount.
     */
    handlePriceChange = (event, index) => {
        const { value } = event.target;
        const { discounts } = this.state;
        const newDiscounts = [...discounts];
        newDiscounts[index].price = value;
        this.setState({ discounts: newDiscounts });
    }

    /**
     * Adds a new row for discount.
     */
    addRowDiscount = () => {
        const { discounts } = this.state;
        this.setState({ discounts: [...discounts, { from: '', to: '', price: '' }] });
    }

    /**
     * Removes a row for discount.
     * @param {number} index - Index of the discount to be removed.
     */
    removeRow = (index) => {
        const { discounts } = this.state;
        if (discounts.length === 1) return;
        const newDiscounts = [...discounts];
        newDiscounts.splice(index, 1);
        this.setState({ discounts: newDiscounts });
    }

    /**
     * Toggles the display of discount options.
     */
    toggleDiscount = () => {
        this.setState(prevState => ({
            showDiscount: !prevState.showDiscount,
        }), () => {
            const { showDiscount } = this.state;
            const addDiscount = document.querySelector('.add-discount');
            if (addDiscount) {
                addDiscount.style.display = showDiscount ? 'none' : 'flex';
            }
        });
    };

    /**
     * Cancels discount entry.
     */
    cancelDiscount = () => {
        this.setState({
            showDiscount: false,
            additionalRows: 1
        });
    }

    /**
     * Toggles the display of the new size table popup.
     */
    toggleSizeTable = () => {
        this.setState(prevState => ({
            showPopupNewSizeTable: !prevState.showPopupNewSizeTable,
        }), () => {
            const { showPopupNewSizeTable } = this.state;
            const addPopupSizeTable = document.querySelector('.create-size-table');
            if (addPopupSizeTable) {
                addPopupSizeTable.style.display = showPopupNewSizeTable ? 'none' : 'flex';
            }
        });
    };

    /**
     * Handles change in size setting.
     * @param {Object} event - Event object.
     */
    handleSizeSettingChange = (event) => {
        const { name, checked } = event.target;
        const updatedSettings = this.state.sizeSettings.map(setting =>
            setting.name === name ? { ...setting, checked: checked } : setting
        );

        this.setState({
            sizeSettings: updatedSettings
        });
    }

    /**
     * Handles change in other setting.
     * @param {Object} event - Event object.
     */
    handleOtherSettingChange = (event) => {
        const { name, checked } = event.target;
        this.setState(prevState => ({
            otherSettings: {
                ...prevState.otherSettings,
                [name]: checked
            }
        }));
    }

    /**
     * Handles change in table name.
     * @param {Object} event - Event object.
     */
    handleTableNameChange = (event) => {
        const input = event.target.value;
        const length = input.length > this.state.tableNameMaxLength ? this.state.tableNameMaxLength : input.length;

        this.setState({
            tableName: input.substring(0, this.state.tableNameMaxLength),
            tableNameLength: length
        });
    }

    /**
     * Handles key press event to allow only numerical input.
     * @param {Object} e - Event object.
     */
    handleKeyPress = (e) => {
        const charCode = e.which ? e.which : e.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            e.preventDefault();
        }
    };

    render() {
        const { discounts, showClassification, tableName, tableNameLength, tableNameMaxLength, sizeSettings, otherSettings,
            input1Value, input1classify2Value, input2List, showAdditionalInfo2, inputclassify2List, showPriceAndQuantity,
            showClassification2, showDiscount, showPopupNewSizeTable } = this.state;

        console.log(this.state.priceClassify)

        return (
            <div className='container'>
                <h2>Sales Information</h2>
                <div className="classification-container">
                    <label className="label-name">Variations</label>
                    <div className="add-classification" style={{ display: showClassification ? 'none' : 'flex' }} onClick={this.toggleClassification}>
                        <span className="icon">+</span>
                        <span className="text">Enable Variations</span>
                    </div>
                    <div className="classify-group">
                        {showClassification && (
                            <div className="additional-info show">
                                <span className="close-icon" onClick={this.closeAdditionalInfo}>x</span>
                                <h3>Variation 1</h3>
                                <div className="input1-container">
                                    <input
                                        type="text"
                                        value={input1Value}
                                        onChange={(e) => this.handleInputChange(e, 'input1')}
                                        maxLength={14}
                                        placeholder="Color,..."
                                    />
                                    {input1Value.trim() === '' && <div className="error-message">The box cannot be left blank</div>}
                                </div>
                                <div className="input2-container">
                                    <div className="input2-list">
                                        {input2List.map((item, index) => (
                                            <div key={index} className="input2-item">
                                                <input
                                                    type="text"
                                                    value={item.text}
                                                    onChange={(e) => this.handleInputChange(e, 'input2', index)}
                                                    maxLength={20}
                                                    placeholder={`Blue, Red, White,...`}
                                                />
                                                <div className="image-preview">
                                                    {item.imageSrc && <img src={item.imageSrc} alt={`Product ${index}`} />}
                                                </div>
                                                <div className="input2-actions">
                                                    {index >= 1 ? (
                                                        <FontAwesomeIcon
                                                            icon={faTrash}
                                                            className="delete-icon"
                                                            onClick={() => this.handleRemoveInput2(index)}
                                                        />
                                                    ) : (
                                                        <FontAwesomeIcon icon={faTrash} className="disabled-icon" />
                                                    )}
                                                    <label htmlFor={`image-upload-${index}`} className="upload-icon">
                                                        <FontAwesomeIcon icon={faImage} />
                                                    </label>
                                                    <input
                                                        type="file"
                                                        id={`image-upload-${index}`}
                                                        accept="image/*"
                                                        onChange={(e) => this.handleImageUpload(e, index)}
                                                        style={{ display: 'none' }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={this.handleAddInput2}>Add Variation</button>
                                </div>
                            </div>
                        )}
                        {showClassification && (
                            <div className="add-classification2" style={{ display: showAdditionalInfo2 ? 'none' : 'flex' }} onClick={this.handleToggleAdditionalInfo2}>
                                <span className="icon">+</span>
                                <span className="text">Add Variation 2</span>
                            </div>
                        )}
                        {showAdditionalInfo2 && (
                            <div className="additional-info2 show">
                                <span className="close-icon2" onClick={this.closeAdditionalInfo2}>x</span>
                                <h3>Variation 2</h3>
                                <div className="input1-container">
                                    <input
                                        type="text"
                                        value={input1classify2Value}
                                        onChange={(e) => this.handleInputChange2(e, 'input1', 0)}
                                        maxLength={14}
                                        placeholder="Size,..."
                                    />
                                    {input1classify2Value.trim() === '' && <div className="error-message">The box cannot be left blank</div>}
                                </div>
                                <div className="input2-container">
                                    <div className="input2-list">
                                        {inputclassify2List.map((item, index) => (
                                            <div key={index} className="input2-item">
                                                <input
                                                    type="text"
                                                    value={item.text2}
                                                    onChange={(e) => this.handleInputChange2(e, 'input2', index)}
                                                    maxLength={20}
                                                    placeholder={`S, L, M,....`}
                                                />
                                                <div className="input2-actions">
                                                    {index >= 0 ? (
                                                        <FontAwesomeIcon
                                                            icon={faTrash}
                                                            className="delete-icon"
                                                            onClick={() => this.handleRemoveInputClassify2(index)}
                                                        />
                                                    ) : (
                                                        <FontAwesomeIcon icon={faTrash} className="disabled-icon" />
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={this.handleAddInputClassify2}>Add Variation</button>
                                </div>
                            </div>
                        )}
                        {showClassification && (
                            <div className="product-table">
                                <table>
                                    <tbody>
                                        <tr>
                                            <th colSpan={this.state.showClassification2 ? "5" : "4"}>Variation List</th>
                                        </tr>
                                        <tr className="product-row">
                                            <td style={{ width: '20%' }}>{input1Value ? input1Value : "Variation 1"}</td>
                                            {showClassification2 && <td style={{ width: '20%' }}>{input1classify2Value ? input1classify2Value : "Variation 2"}</td>}
                                            <td style={{ width: '20%' }}>Price</td>
                                            <td style={{ width: '20%' }}>Stock</td>
                                            <td style={{ width: '20%' }}>SKU</td>
                                        </tr>
                                        {input2List.slice(0).map((item, index) => (
                                            <tr className="row-content" key={index}>
                                                <td>
                                                    <div className="image-container">
                                                        {item.imageSrc && <img src={item.imageSrc} alt={`Product ${index}`} />}
                                                    </div>
                                                    <div className="text-container">
                                                        {item.text}
                                                    </div>
                                                </td>
                                                {showClassification2 ? <td>{inputclassify2List.map((item2, index2) => (
                                                    <div className="content-classification"><p>{item2.text2}</p></div>
                                                ))}</td> : null}
                                                {showClassification2 ? (
                                                    <td>
                                                        {inputclassify2List.map((item2, index2) => (
                                                            <div key={index2} className='content-classification'>
                                                                <input
                                                                    type="number"
                                                                    className="input"
                                                                    placeholder="Input Price"
                                                                    min={1}
                                                                    value={this.state.priceClassify[`${index}-${index2}`] || ''}
                                                                    onChange={(e) => this.handlePriceClassifyChange(e, `${index}-${index2}`)}
                                                                    onKeyPress={this.handleKeyPress}
                                                                />
                                                                <span className="currency-icon">&#8363;</span>
                                                            </div>
                                                        ))}
                                                    </td>
                                                ) : (
                                                    <td>
                                                        <div className='content-classification'>
                                                            {inputclassify2List.map((item2, index2) => (
                                                                <input
                                                                    type="number"
                                                                    className="input"
                                                                    placeholder="Input Price"
                                                                    min={1}
                                                                    value={this.state.priceClassify[`${index}-${index2}`] || ''}
                                                                    onChange={(e) => this.handlePriceClassifyChange(e, `${index}-${index2}`)}
                                                                    onKeyPress={this.handleKeyPress}
                                                                />
                                                            ))}
                                                            <span className="currency-icon">&#8363;</span>
                                                        </div>
                                                    </td>
                                                )}
                                                {showClassification2 ? (
                                                    <td>
                                                        {inputclassify2List.map((item2, index2) => (
                                                            <div key={index2} className='content-classification'>
                                                                <input
                                                                    type="number"
                                                                    className="input"
                                                                    placeholder="Input Quantity"
                                                                    min={1}
                                                                    value={this.state.quantityClassify[`${index}-${index2}`] || ''}
                                                                    onChange={(e) => this.handleQuantityClassifyChange(e, `${index}-${index2}`)}
                                                                    onKeyPress={this.handleKeyPress}
                                                                />
                                                            </div>
                                                        ))}
                                                    </td>
                                                ) : (
                                                    <td>
                                                        {inputclassify2List.map((item2, index2) => (
                                                            <div key={index2} className='content-classification'>
                                                                <input
                                                                    type="number"
                                                                    className="input"
                                                                    placeholder="Input Quantity"
                                                                    min={1}
                                                                    value={this.state.quantityClassify[`${index}-${index2}`] || ''}
                                                                    onChange={(e) => this.handleQuantityClassifyChange(e, `${index}-${index2}`)}
                                                                    onKeyPress={this.handleKeyPress}
                                                                />
                                                            </div>
                                                        ))}
                                                    </td>
                                                )}
                                                {showClassification2 ? (
                                                    <td>
                                                        {inputclassify2List.map((item2, index2) => (
                                                            <div key={index2} className='content-classification'>
                                                                <input
                                                                    type="text"
                                                                    className="input"
                                                                    placeholder="Input Code"
                                                                    value={this.state.skuClassify[`${index}-${index2}`] || ''}
                                                                    onChange={(e) => this.handleSkuClassifyChange(e, `${index}-${index2}`)}
                                                                />
                                                            </div>
                                                        ))}
                                                    </td>
                                                ) : (
                                                    <td>
                                                        {inputclassify2List.map((item2, index2) => (
                                                            <div key={index2} className='content-classification'>
                                                                <input
                                                                    type="text"
                                                                    className="input"
                                                                    placeholder="Input Code"
                                                                    value={this.state.skuClassify[`${index}-${index2}`] || ''}
                                                                    onChange={(e) => this.handleSkuClassifyChange(e, `${index}-${index2}`)}
                                                                />
                                                            </div>
                                                        ))}
                                                    </td>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
                {showPriceAndQuantity && (
                    <div>
                        <div className="price-product">
                            <label htmlFor="price-input" className="price-label">Price</label>
                            <input
                                type="number"
                                className="price-input"
                                placeholder="Input Price"
                                min={1}
                                onKeyPress={this.handleKeyPress}
                                value={this.state.unitPrice}
                                onChange={this.handleUnitPriceChange}
                            />
                            <span className="currency-icon">&#8363;</span>
                        </div>
                        <div className="quantity-product">
                            <label htmlFor="quantity-input" className="quantity-label">Stock</label>
                            <input
                                type="number"
                                className="quantity-input"
                                placeholder="Input Quantity"
                                min={1}
                                onKeyPress={this.handleKeyPress}
                                value={this.state.unitQuantity}
                                onChange={this.handleQuantityChange}
                            />
                        </div>
                    </div>
                )}
                <div className="discount">
                    <label>Wholesale</label>
                    <div className="add-discount" style={{ display: showDiscount ? 'none' : 'flex' }} onClick={this.toggleDiscount}>
                        <span className="icon">+</span>
                        <span className="text">Add Price Tier</span>
                    </div>
                    <div className="discount-group">
                        {showDiscount && (
                            <div className="discount-table">
                                <table>
                                    <tbody>
                                        <tr className="discount-row">
                                            <td>No.</td>
                                            <td>Min Quantity</td>
                                            <td>Max Quantity</td>
                                            <td>Unit Price</td>
                                            <td>Action</td>
                                        </tr>
                                        {discounts.map((discount, index) => (
                                            <tr className="discount-row-content" key={index}>
                                                <td>Price Tier {index + 1}</td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        placeholder="From"
                                                        min={1}
                                                        onKeyPress={this.handleKeyPress}
                                                        value={discount.from}
                                                        onChange={(event) => this.handleFromChange(event, index)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        placeholder="To"
                                                        min={1}
                                                        onKeyPress={this.handleKeyPress}
                                                        value={discount.to}
                                                        onChange={(event) => this.handleToChange(event, index)}
                                                    />
                                                </td>
                                                <td>
                                                    <div className="input-with-icon">
                                                        <input
                                                            type="number"
                                                            placeholder="Input Price"
                                                            min={1}
                                                            onKeyPress={this.handleKeyPress}
                                                            value={discount.price}
                                                            onChange={(event) => this.handlePriceChange(event, index)}
                                                        />
                                                        <span className="currency-icon">&#8363;</span>
                                                    </div>
                                                </td>
                                                <td><span className="trash-icon" onClick={() => this.removeRow(index)}>🗑️</span></td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td colSpan="5" style={{ textAlign: 'center' }}>
                                                <div className="button-discount">
                                                    <div className="add-row" onClick={this.addRowDiscount}>
                                                        <span className="text">Add Price Tier</span>
                                                    </div>
                                                    <div className="cancel-discount" onClick={this.cancelDiscount}>
                                                        <span className="text">Cancel</span>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
                <div className="size-table">
                    <label>Size Chart</label>
                    <div className="add-size-table">
                        <span className="icon">+</span>
                        <span className="text">Add Your Size Chart</span>
                    </div>
                    <div className="create-size-table" style={{ display: showPopupNewSizeTable ? 'none' : 'flex' }} onClick={this.toggleSizeTable}>
                        <span className="icon">+</span>
                        <span className="text">Add New Size Chart</span>
                    </div>
                    {showPopupNewSizeTable && (
                        <div className="popup-container">
                            <div className="popup-header">
                                <h3>Add New Size Chart</h3>
                                <span className="close-icon" onClick={this.toggleSizeTable}>×</span>
                            </div>
                            <div className="popup-content">
                                <div className="table-name-input">
                                    <label htmlFor="tableName">Size Chart Name</label>
                                    <input type="text" id="tableName" name="tableName" value={tableName} maxLength={tableNameMaxLength} onChange={this.handleTableNameChange} />
                                    <div className="char-count">{tableNameLength}/{tableNameMaxLength}</div>
                                </div>
                                <div className="size-settings">
                                    <h4>Set Size Measurements</h4>
                                    {sizeSettings.map((setting, index) => (
                                        <div key={index}>
                                            <input type="checkbox" id={`sizeSetting${index}`} name={setting.name} checked={setting.checked} onChange={this.handleSizeSettingChange} />
                                            <label htmlFor={`sizeSetting${index}`}>{setting.name}</label>
                                        </div>
                                    ))}
                                </div>
                                <div className="other-settings">
                                    <h4>Set Other Measurements</h4>
                                    {otherSettings.map((setting, index) => (
                                        <div key={index}>
                                            <input type="checkbox" id={`otherSetting${index}`} name={`otherSetting${index}`} checked={setting} onChange={this.handleOtherSettingChange} />
                                            <label htmlFor={`otherSetting${index}`}>Other Setting {index}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
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

export default connect(mapStateToProps, mapDispatchToProps)(SellInformation);