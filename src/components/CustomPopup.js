import React, { Component } from 'react';
import './CustomPopup.scss';

class CustomPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPopup: true
        };
    }

    handleClose = () => {
        this.setState({ showPopup: false });
        this.props.onClose();
    };

    render() {
        const { message, type, onConfirm } = this.props;
        const { showPopup } = this.state;
        const iconClass = type === 'successful' ? 'fa-check-circle success-icon' : 'fa-times-circle error-icon';
        const iconNoti = 'fa-question-circle noti-icon'

        return (
            <div className={`popup-overlay ${showPopup ? 'show' : ''}`}>
                <div className={`popup ${type}`}>
                    <div className="icon-wrapper">
                        {type === 'confirm' ? (
                            <i className={`fas ${iconNoti}`}></i>
                        ) : (
                            <i className={`fas ${iconClass}`}></i>
                        )}
                    </div>
                    <p>{message}</p>
                    {type === 'confirm' ? (
                        <div className="popup-buttons">
                            <button className="confirm-button-popup" onClick={onConfirm}>Yes</button>
                            <button className="cancel-button-popup" onClick={this.handleClose}>No</button>
                        </div>
                    ) : (
                        <div className="button-ok">
                            <button className="ok-button-popup" onClick={() => { this.props.onConfirm(); }}>OK</button>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default CustomPopup;
