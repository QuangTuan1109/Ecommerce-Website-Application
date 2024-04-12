import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SellInformation.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faImage } from '@fortawesome/free-solid-svg-icons';


class SellInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            additionalRows: 1,
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

    // Handle Show Classification Section
    toggleClassification = () => {
        this.setState(prevState => ({
            showClassification: !prevState.showClassification,
            showPriceAndQuantity: !prevState.showPriceAndQuantity,
        }), () => {
            const { showClassification } = this.state;
            const addClassification = document.querySelector('.add-classification');
            if (addClassification) {
                addClassification.style.display = showClassification ? 'none' : 'flex';
            }
        });
    };

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

    // Handle Close Classification Section
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
    
    closeAdditionalInfo2 = () => {
        this.setState({
            showAdditionalInfo2: false,
            input1classify2Value: '',
            inputclassify2List: [''],
            showClassification2: false
        });
    };
    
    // Handle Upload Image
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

    // Handle Input
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

    handleKeyPress = (e) => {
        const charCode = e.which ? e.which : e.keyCode;
        // Kiểm tra xem ký tự nhập vào có phải là số không
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            e.preventDefault();
        }
    };

    // Handle Add New Input
    handleAddInput2 = () => {
        this.setState(prevState => ({
            input2List: [...prevState.input2List, '']
        }));
    };

    handleAddInputClassify2 = () => {
        this.setState(prevState => ({
            inputclassify2List: [...prevState.inputclassify2List, '']
        }));
    };

    // Handle Remove Input
    handleRemoveInput2 = (index) => {
        const { input2List } = this.state;
        input2List.splice(index, 1);
        this.setState({ input2List });
    };

    handleRemoveInputClassify2 = (index) => {
        const { inputclassify2List } = this.state;
        inputclassify2List.splice(index, 1);
        this.setState({ inputclassify2List });
    };

    // Handle Show Discount Section
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

    addRow = () => {
        this.setState(prevState => ({
            additionalRows: prevState.additionalRows + 1
        }));
    }

    cancelDiscount = () => {
        this.setState({
            showDiscount: false,
            additionalRows: 1
        });
    }

    // Handle Show Size Table Section
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

    handleSizeSettingChange = (event) => {
        const { name, checked } = event.target;
        const updatedSettings = this.state.sizeSettings.map(setting =>
            setting.name === name ? { ...setting, checked: checked } : setting
        );
    
        this.setState({
            sizeSettings: updatedSettings
        });
    }
    
    
    handleOtherSettingChange = (event) => {
        const { name, checked } = event.target;
        this.setState(prevState => ({
            otherSettings: {
                ...prevState.otherSettings,
                [name]: checked
            }
        }));
    }
    
    handleTableNameChange = (event) => {
        const input = event.target.value;
        const length = input.length > this.state.tableNameMaxLength ? this.state.tableNameMaxLength : input.length;

        this.setState({
            tableName: input.substring(0, this.state.tableNameMaxLength),
            tableNameLength: length
        });
    }



    render() {
        const { showClassification, tableName, tableNameLength, tableNameMaxLength, sizeSettings, otherSettings,
            input1Value, input1classify2Value, input2List, showAdditionalInfo2, inputclassify2List, showPriceAndQuantity,
             showClassification2, showDiscount, additionalRows, showPopupNewSizeTable } = this.state;

        return (
            <div className='container'>
                <h2>Thông tin bán hàng</h2>
                <div className="classification-container">
                    <label className="label-name">Phân loại hàng</label>
                    <div className="add-classification" style={{ display: showClassification ? 'none' : 'flex' }} onClick={this.toggleClassification}>
                        <span className="icon">+</span>
                        <span className="text">Thêm nhóm phân loại</span>
                    </div>
                    <div className="classify-group">
                        {showClassification && (
                            <div className="additional-info show">
                                <span className="close-icon" onClick={this.closeAdditionalInfo}>x</span>
                                <h3>Nhóm phân loại 1</h3>
                                <div className="input1-container">
                                    <input
                                        type="text"
                                        value={input1Value}
                                        onChange={(e) => this.handleInputChange(e, 'input1')}
                                        maxLength={14}
                                        placeholder="Màu sắc,..."
                                    />
                                    {input1Value.trim() === '' && <div className="error-message">Không được để trống ô</div>}
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
                                                    placeholder={`Xanh, Đỏ, Trắng,...`}
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
                                    <button onClick={this.handleAddInput2}>Thêm phân loại</button>
                                </div>
                            </div>
                        )}
                        {showClassification && (
                            <div className="add-classification2" style={{ display: showAdditionalInfo2 ? 'none' : 'flex' }} onClick={this.handleToggleAdditionalInfo2}>
                                <span className="icon">+</span>
                                <span className="text">Thêm nhóm phân loại 2</span>
                            </div>
                        )}
                        {showAdditionalInfo2 && (
                            <div className="additional-info2 show">
                                <span className="close-icon2" onClick={this.closeAdditionalInfo2}>x</span>
                                <h3>Nhóm phân loại 2</h3>
                                <div className="input1-container">
                                    <input
                                        type="text"
                                        value={input1classify2Value}
                                        onChange={(e) => this.handleInputChange2(e, 'input1', 0)}
                                        maxLength={14}
                                        placeholder="Kích thước,..."
                                    />
                                    {input1classify2Value.trim() === '' && <div className="error-message">Không được để trống ô</div>}
                                </div>
                                <div className="input2-container">
                                    <div className="input2-list">
                                        {inputclassify2List.map((item, index) => (
                                            <div key={index} className="input2-item">
                                                <input
                                                    type="text"
                                                    value={item.text}
                                                    onChange={(e) => this.handleInputChange2(e, 'input2', index)}
                                                    maxLength={20}
                                                    placeholder={`X, L, M,....`}
                                                />
                                                <div className="input2-actions">
                                                    {index >= 1 ? (
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
                                    <button onClick={this.handleAddInputClassify2}>Thêm phân loại</button>
                                </div>
                            </div>
                        )}
                        {showClassification && (
                            <div className="product-table">
                                <table>
                                    <tbody>
                                        <tr>
                                            <th colSpan={this.state.showClassification2 ? "5" : "4"}>Danh sách phân loại hàng</th>
                                        </tr>
                                        <tr className="product-row">
                                            <td style={{ width: '20%' }}>{input1Value ? input1Value : "Nhóm phân loại 1"}</td>
                                            {showClassification2 && <td style={{ width: '20%' }}>{input1classify2Value ? input1classify2Value : "Nhóm phân loại 2"}</td>}
                                            <td style={{ width: '20%' }}>Giá</td>
                                            <td style={{ width: '20%' }}>Kho hàng</td>
                                            <td style={{ width: '20%' }}>SKU phân loại</td>
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
                                                                    placeholder="Nhập giá"
                                                                    min={1}
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
                                                                    placeholder="Nhập giá"
                                                                    min={1}
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
                                                                    placeholder="Nhập số lượng"
                                                                    min={1}
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
                                                                    placeholder="Nhập số lượng"
                                                                    min={1}
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
                                                                    placeholder="Nhập mã"
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
                                                                    placeholder="Nhập mã"
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
                            <label htmlFor="price-input" className="price-label">Giá</label>
                            <input
                                type="number"
                                className="price-input"
                                placeholder="Nhập giá"
                                min={1}
                                onKeyPress={this.handleKeyPress}
                            />
                            <span className="currency-icon">&#8363;</span>
                        </div>
                        <div className="quantity-product">
                            <label htmlFor="quantity-input" className="quantity-label">Kho hàng</label>
                            <input
                                type="number"
                                className="quantity-input"
                                placeholder="Nhập số lượng"
                                min={1}
                                onKeyPress={this.handleKeyPress}
                            />
                        </div>
                    </div>
                )}
                <div className="discount">
                    <label>Mua nhiều giảm giá</label>
                    <div className="add-discount" style={{ display: showDiscount ? 'none' : 'flex'}} onClick={this.toggleDiscount}>
                        <span className="icon">+</span>
                        <span className="text">Thêm khoảng giá</span>
                    </div>
                    <div className="discount-group">
                    {showDiscount && (
                            <div className="discount-table">
                                <table>
                                    <tbody>
                                        <tr className="discount-row">
                                            <td>Khoảng giá</td>
                                            <td>Từ(sản phẩm)</td>
                                            <td>Đến(sản phẩm)</td>
                                            <td>Đơn giá</td>
                                            <td>Thao tác</td>
                                        </tr>
                                        {[...Array(additionalRows)].map((_, index) => (
                                        <tr className="discount-row-content" key={index}>
                                            <td>Khoảng giá {index + 1}</td>
                                            <td>
                                                <input 
                                                    type="number" 
                                                    placeholder="Từ"
                                                    min={1}
                                                    onKeyPress={this.handleKeyPress}
                                                />
                                            </td>
                                            <td>
                                                <input 
                                                    type="number" 
                                                    placeholder="Đến"
                                                    min={1}
                                                    onKeyPress={this.handleKeyPress}
                                                />
                                            </td>
                                            <td>
                                                <div className="input-with-icon">
                                                    <input 
                                                        type="number" 
                                                        placeholder="Nhập giá"
                                                        min={1}
                                                        onKeyPress={this.handleKeyPress}
                                                    />
                                                    <span className="currency-icon">&#8363;</span>
                                                </div>
                                            </td>
                                            <td><span className="trash-icon">🗑️</span></td>
                                        </tr>
                                    ))}
                                     <tr>
                                        <td colSpan="5" style={{ textAlign: 'center' }}>
                                            <div className="button-discount">
                                                <div className="add-row" onClick={this.addRow}>
                                                    <span className="text">Thêm khoảng giá</span>
                                                </div>
                                                <div className="cancel-discount" onClick={this.cancelDiscount}>
                                                    <span className="text">Hủy</span>
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
                    <label>Bảng kích cỡ</label>
                    <div className="add-size-table">
                        <span className="icon">+</span>
                        <span className="text">Thêm bảng quy đổi kích cỡ của bạn</span>
                    </div>
                    <div className="create-size-table" style={{ display: showPopupNewSizeTable ? 'none' : 'flex'}} onClick={this.toggleSizeTable}>
                        <span className="icon">+</span>
                        <span className="text">Tạo bảng quy đổi kích cỡ mới</span>
                    </div>
                    {showPopupNewSizeTable && (
                        <div className="popup-container">
                            <div className="popup-header">
                                <h3>Tạo bảng quy đổi kích cỡ mới</h3>
                                <span className="close-icon" onClick={this.toggleSizeTable}>×</span>
                            </div>
                            <div className="popup-content">
                                <div className="table-name-input">
                                    <label htmlFor="tableName">Tên bảng quy đổi kích cỡ</label>
                                    <input type="text" id="tableName" name="tableName" value={tableName} maxLength={tableNameMaxLength} onChange={this.handleTableNameChange} />
                                    <div className="char-count">{tableNameLength}/{tableNameMaxLength}</div>
                                </div>
                                <div className="size-settings">
                                    <h4>Thiết lập thông số size</h4>
                                    {sizeSettings.map((setting, index) => (
                                        <div key={index}>
                                            <input type="checkbox" id={`sizeSetting${index}`} name={setting.name} checked={setting.checked} onChange={this.handleSizeSettingChange} />
                                            <label htmlFor={`sizeSetting${index}`}>{setting.name}</label>
                                        </div>
                                    ))}
                                </div>
                                <div className="other-settings">
                                    <h4>Thiết lập thông số khác</h4>
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