import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DetailInformation.scss';

class DetailInformation extends Component {
    render() {
        return (
            <div className='container'>
                <h2>Thông tin chi tiết</h2>
                <h3>Hoàn thành: 0 / 11 Điền thông tin thuộc tính để tăng mức độ hiển thị cho sản phẩm.</h3>
                <div className="attribute-container">
                    <div className="attribute-column">
                        <label>Thương hiệu</label>
                        <select>
                            {/* Options */}
                        </select>
                        {/* Các ô select tiếp theo */}
                    </div>
                    <div className="attribute-column">
                        <label>Thương hiệu</label>
                        <select>
                            {/* Options */}
                        </select>
                        {/* Các ô select tiếp theo */}
                    </div>
                    <div className="attribute-column">
                        <label>Thương hiệu</label>
                        <select>
                            {/* Options */}
                        </select>
                        {/* Các ô select tiếp theo */}
                    </div>
                    <div className="attribute-column">
                        <label>Thương hiệu</label>
                        <select>
                            {/* Options */}
                        </select>
                        {/* Các ô select tiếp theo */}
                    </div>
                    <div className="attribute-column">
                        <label>Thương hiệu</label>
                        <select>
                            {/* Options */}
                        </select>
                        {/* Các ô select tiếp theo */}
                    </div>
                    <div className="attribute-column">
                        <label>Thương hiệu</label>
                        <select>
                            {/* Options */}
                        </select>
                        {/* Các ô select tiếp theo */}
                    </div>
                    <div className="attribute-column">
                        <label>Thương hiệu</label>
                        <select>
                            {/* Options */}
                        </select>
                        {/* Các ô select tiếp theo */}
                    </div>
                    <div className="attribute-column">
                        <label>Thương hiệu</label>
                        <select>
                            {/* Options */}
                        </select>
                        {/* Các ô select tiếp theo */}
                    </div>
                    <div className="attribute-column">
                        <label>Thương hiệu</label>
                        <select>
                            {/* Options */}
                        </select>
                        {/* Các ô select tiếp theo */}
                    </div>
                    <div className="attribute-column">
                        <label>Thương hiệu</label>
                        <select>
                            {/* Options */}
                        </select>
                        {/* Các ô select tiếp theo */}
                    </div>
                    <div className="attribute-column">
                        <label>Thương hiệu</label>
                        <select>
                            {/* Options */}
                        </select>
                        {/* Các ô select tiếp theo */}
                    </div>
                    <div className="attribute-column">
                        <label>Thương hiệu</label>
                        <select>
                            {/* Options */}
                        </select>
                        {/* Các ô select tiếp theo */}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailInformation);
