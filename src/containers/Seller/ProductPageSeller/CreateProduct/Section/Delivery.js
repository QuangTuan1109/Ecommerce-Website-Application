import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Delivery.scss';

class Delivery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleButton: false,
            weight: '', // State để lưu trữ cân nặng
            shippingFee: null // State để lưu trữ phí vận chuyển, sẽ là null khi chưa nhập cân nặng
        };
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    // Hàm xử lý thay đổi toggle button
    handleToggle = () => {
        this.setState(prevState => ({
            toggleButton: !prevState.toggleButton
        }));
    }

    // Hàm xử lý thay đổi trường nhập cân nặng
    handleWeightChange = (e) => {
        const { value } = e.target;
        this.setState({ weight: value }, () => {
            // Tính toán phí vận chuyển khi thay đổi cân nặng
            this.calculateShippingFee();
        });
    }

    // Hàm tính toán phí vận chuyển dựa trên cân nặng
    calculateShippingFee = () => {
        const { weight } = this.state;
        // Điều kiện tính toán phí vận chuyển ở đây
        // Trong ví dụ này, giả sử phí vận chuyển là 1000 đồng cho mỗi kg
        const shippingFee = weight ? parseInt(weight) * 1000 : null;
        this.setState({ shippingFee });
    }

    handleKeyPress = (e) => {
        const charCode = e.which ? e.which : e.keyCode;
        // Kiểm tra xem ký tự nhập vào có phải là số không
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            e.preventDefault();
        }
    };

    render() {
        const { toggleButton, weight, shippingFee } = this.state;

        return (
            <div className='container'>
                <h2>Vận chuyển</h2>
                <div className="delivery-container">
                    <div className="content-section">
                        <div className="label-container">
                            <label className="label-name">Cân nặng(sau khi đóng gói)</label>
                        </div>
                        <div className="content-container">
                            <input
                                type="number"
                                className="price-input"
                                placeholder="Nhập cân nặng"
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
                            <label className="label-name">Kích thước đóng gói(Phí vận chuyển thực tế sẽ thay đổi nếu bạn nhập sai kích thước)</label>
                        </div>
                        <div className="content-container">
                            <input
                                type="number"
                                className="price-input"
                                placeholder="Rộng"
                                min={1}
                                onKeyPress={this.handleKeyPress}
                            />
                            <span className="multiply-icon">X</span>
                            <input
                                type="number"
                                className="price-input"
                                placeholder="Dài"
                                min={1}
                                onKeyPress={this.handleKeyPress}
                            />
                            <span className="multiply-icon">X</span>
                            <input
                                type="number"
                                className="price-input"
                                placeholder="Cao"
                                min={1}
                                onKeyPress={this.handleKeyPress}
                            />
                        </div>
                    </div>
                    <div className="content-section">
                        <div className="label-container">
                            <label className="label-name">Phí vận chuyển</label>
                        </div>
                        <div className="content-container">
                            <div className="delivery-table">
                                <div className="delivery-content">
                                    <div className="label-delivery-name">
                                        <label className='name'>Hàng Cồng Kềnh</label>
                                    </div>
                                    <div className="content-delivery">
                                        <label className='name'>Hàng Cồng Kềnh</label>
                                        {weight ? (
                                            <>
                                                <label className='name'>{shippingFee !== null ? `Phí vận chuyển: ${shippingFee} đ` : 'Hãy nhập cân nặng'}</label>
                                            </>
                                        ) : (
                                            <label className='name'>Hãy nhập cân nặng</label>
                                        )}
                                        {/* Toggle button */}
                                        <button onClick={this.handleToggle} disabled={!weight}>
                                            {toggleButton ? (
                                                <>
                                                    <i className="fas fa-check-circle"></i> Đã áp dụng
                                                </>
                                            ) : (
                                                <>
                                                    <i className="fas fa-times-circle"></i> Chưa áp dụng
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                                <div className="delivery-content">
                                    <div className="label-delivery-name">
                                        <label className='name'>Giao Hàng Nhanh</label>
                                    </div>
                                    <div className="content-delivery">
                                        <label className='name'>Giao Hàng Nhanh</label>
                                        {weight ? (
                                            <>
                                                <label className='name'>{shippingFee !== null ? `Phí vận chuyển: ${shippingFee} đ` : 'Hãy nhập cân nặng'}</label>
                                            </>
                                        ) : (
                                            <label className='name'>Hãy nhập cân nặng</label>
                                        )}
                                        {/* Toggle button */}
                                        <button onClick={this.handleToggle} disabled={!weight}>
                                            {toggleButton ? (
                                                <>
                                                    <i className="fas fa-check-circle"></i> Đã áp dụng
                                                </>
                                            ) : (
                                                <>
                                                    <i className="fas fa-times-circle"></i> Chưa áp dụng
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                                <div className="delivery-content">
                                    <div className="label-delivery-name">
                                        <label className='name'>Giao Hàng Tiết Kiệm</label>
                                    </div>
                                    <div className="content-delivery">
                                        <label className='name'>Giao Hàng Tiết Kiệm</label>
                                        {weight ? (
                                            <>
                                                <label className='name'>{shippingFee !== null ? `Phí vận chuyển: ${shippingFee} đ` : 'Hãy nhập cân nặng'}</label>
                                            </>
                                        ) : (
                                            <label className='name'>Hãy nhập cân nặng</label>
                                        )}
                                        {/* Toggle button */}
                                        <button onClick={this.handleToggle} disabled={!weight}>
                                            {toggleButton ? (
                                                <>
                                                    <i className="fas fa-check-circle"></i> Đã áp dụng
                                                </>
                                            ) : (
                                                <>
                                                    <i className="fas fa-times-circle"></i> Chưa áp dụng
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
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
