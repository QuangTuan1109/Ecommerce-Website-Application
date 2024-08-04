import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './TaskSection.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBoxOpen } from '@fortawesome/free-solid-svg-icons';

class TaskSection extends Component {
    render() {
        return (
            <div className="task-section">
                <div className="section-title">Task List</div>
                <div className="sub-title">List of tasks you haven't completed yet</div>
                <div className="task-list">
                    <Link to="/link/to/task1" className="task-item">
                        <FontAwesomeIcon icon={faShoppingCart} className="task-icon" />
                        <span className="task-name">Pending Confirmation</span>
                        <span className="task-count">5</span>
                    </Link>
                    <Link to="/link/to/task2" className="task-item">
                        <FontAwesomeIcon icon={faBoxOpen} className="task-icon" />
                        <span className="task-name">Pending Pickup</span>
                        <span className="task-count">3</span>
                    </Link>
                    <Link to="/link/to/task1" className="task-item">
                        <FontAwesomeIcon icon={faShoppingCart} className="task-icon" />
                        <span className="task-name">Processed</span>
                        <span className="task-count">5</span>
                    </Link>
                    <Link to="/link/to/task2" className="task-item">
                        <FontAwesomeIcon icon={faBoxOpen} className="task-icon" />
                        <span className="task-name">Canceled Orders</span>
                        <span className="task-count">3</span>
                    </Link>
                    <Link to="/link/to/task1" className="task-item">
                        <FontAwesomeIcon icon={faShoppingCart} className="task-icon" />
                        <span className="task-name">Pending Return/Refund Processing</span>
                        <span className="task-count">5</span>
                    </Link>
                    <Link to="/link/to/task2" className="task-item">
                        <FontAwesomeIcon icon={faBoxOpen} className="task-icon" />
                        <span className="task-name">Temporarily Locked Products</span>
                        <span className="task-count">3</span>
                    </Link>
                    <Link to="/link/to/task1" className="task-item">
                        <FontAwesomeIcon icon={faShoppingCart} className="task-icon" />
                        <span className="task-name">Out of Stock Products</span>
                        <span className="task-count">5</span>
                    </Link>
                    <Link to="/link/to/task2" className="task-item">
                        <FontAwesomeIcon icon={faBoxOpen} className="task-icon" />
                        <span className="task-name">Pending Promotion Processing</span>
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