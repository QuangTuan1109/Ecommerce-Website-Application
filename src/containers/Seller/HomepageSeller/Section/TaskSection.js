import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './TaskSection.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBoxOpen, faBullhorn, faMoneyBill, faChartBar, faCog, faStore, faLanguage, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

class TaskSection extends Component {
    render() {
        return (
            <div className="task-section">
                <div className="section-title">Danh sách cần làm</div>
                <div className="sub-title">Danh sách các công việc bạn chưa hoàn thành</div>
                <div className="task-list">
                    <Link to="/link/to/task1" className="task-item">
                        <FontAwesomeIcon icon={faShoppingCart} className="task-icon" />
                        <span className="task-name">Chờ Xác Nhận</span>
                        <span className="task-count">5</span>
                    </Link>
                    <Link to="/link/to/task2" className="task-item">
                        <FontAwesomeIcon icon={faBoxOpen} className="task-icon" />
                        <span className="task-name">Chờ Lấy Hàng</span>
                        <span className="task-count">3</span>
                    </Link>
                    <Link to="/link/to/task1" className="task-item">
                        <FontAwesomeIcon icon={faShoppingCart} className="task-icon" />
                        <span className="task-name">Đã Xử Lý</span>
                        <span className="task-count">5</span>
                    </Link>
                    <Link to="/link/to/task2" className="task-item">
                        <FontAwesomeIcon icon={faBoxOpen} className="task-icon" />
                        <span className="task-name">Đơn Hủy</span>
                        <span className="task-count">3</span>
                    </Link> <Link to="/link/to/task1" className="task-item">
                        <FontAwesomeIcon icon={faShoppingCart} className="task-icon" />
                        <span className="task-name">Trả Hàng/Hoàn Tiền Chờ Xử Lý</span>
                        <span className="task-count">5</span>
                    </Link>
                    <Link to="/link/to/task2" className="task-item">
                        <FontAwesomeIcon icon={faBoxOpen} className="task-icon" />
                        <span className="task-name">Sản Phẩm Bị Tạm Khóa</span>
                        <span className="task-count">3</span>
                    </Link> <Link to="/link/to/task1" className="task-item">
                        <FontAwesomeIcon icon={faShoppingCart} className="task-icon" />
                        <span className="task-name">Sản Phẩm Hết Hàng</span>
                        <span className="task-count">5</span>
                    </Link>
                    <Link to="/link/to/task2" className="task-item">
                        <FontAwesomeIcon icon={faBoxOpen} className="task-icon" />
                        <span className="task-name">Chương Trình Khuyến Mãi Chờ Xử Lý</span>
                        <span className="task-count">3</span>
                    </Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(TaskSection);
