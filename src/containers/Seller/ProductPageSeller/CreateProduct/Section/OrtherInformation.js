import React, { Component } from 'react';
import { connect } from 'react-redux';
import './OrtherInformation.scss';


class OrtherInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: 'no',
            preparationTime: 5
        };
    }

    handleOptionChange = changeEvent => {
        this.setState({
            selectedOption: changeEvent.target.value,
            preparationTime: 5
        });
    };

    handlePreparationTimeChange = event => {
        this.setState({
            preparationTime: event.target.value
        });
    };

    render() {
        let additionalInfo;
        if (this.state.selectedOption === 'no') {
            additionalInfo = (
                <p>
                    Tôi sẽ gửi hàng trong 2 ngày (không bao gồm các ngày nghỉ lễ, Tết và những ngày đơn vị vận chuyển không làm việc).
                </p>
            );
        } else {
            additionalInfo = (
                <div>
                    <p>
                        Tôi cần <input type="number" value={this.state.preparationTime} onChange={this.handlePreparationTimeChange} /> ngày chuẩn bị hàng. Bạn có thể chọn từ 5 đến 15 ngày. Shopee đề xuất chọn thời gian sớm nhất trong khả năng vận hành của bạn nhằm tăng tỉ lệ chuyển đổi!
                    </p>
                    { (this.state.preparationTime < 5 || this.state.preparationTime > 15) &&
                        <p style={{ color: 'red' }}>
                            Thời gian chuẩn bị hàng của bạn ngoài phạm vi ngày chuẩn bị hàng. Vui lòng thay đổi thời gian khác.
                        </p>
                    }
                </div>
            );
        }

        return (
            <div className='container'>
                <h2>Thông tin khác</h2>
                <div className="product-information">
                    <div className="label-container"><label htmlFor="information-input" className="information-label">Hàng đặt trước</label></div>
                    <div>
                        <input
                            type="radio"
                            className="information-input"
                            name="preOrder"
                            value="no"
                            checked={this.state.selectedOption === 'no'}
                            onChange={this.handleOptionChange}
                        />
                        <span className="information-name">Không</span>
                    </div>
                    <div>
                        <input
                            type="radio"
                            className="information-input"
                            name="preOrder"
                            value="yes"
                            checked={this.state.selectedOption === 'yes'}
                            onChange={this.handleOptionChange}
                        />
                        <span className="information-name">Có</span>
                    </div>
                </div>
                {additionalInfo}
                <div className="product-information">
                    <div className="label-container"><label className="information-label">Tình trạng</label></div>
                    <div className="attribute-column">
                        <select>
                            <option value="new">Mới</option>
                            <option value="used">Đã sử dụng</option>
                        </select>
                    </div>
                </div>
                <div className="product-information">
                    <div className="label-container"><label htmlFor="sku-input" className="information-label">SKU sản phẩm</label></div>
                    <input
                            type="text"
                            className="sku-input"
                            name="sku"
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

export default connect(mapStateToProps, mapDispatchToProps)(OrtherInformation);
