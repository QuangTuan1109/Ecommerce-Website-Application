import React, { Component } from 'react';
import { connect } from 'react-redux';
import './navBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'; 
import { Link } from 'react-router-dom';

class navBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSection: null,
        };
    } 
    
    handleSectionClick = (sectionName) => {
        this.setState({ activeSection: sectionName });
    }
    
    render() {
        const { activeSection } = this.state;

        return (
            <div className="box">
                <div className={`box-item ${activeSection === 'basicInfo' ? 'active' : ''}`} onClick={() => this.handleSectionClick('basicInfo')}>
                    <span className={`icon ${activeSection === 'basicInfo' ? 'active' : ''}`}><FontAwesomeIcon icon={faInfoCircle} /></span>
                    <Link to="#" className="nav-item-link">Basic Information</Link>
                </div>
                <div className={`box-item ${activeSection === 'basicInfo' ? 'active' : ''}`} onClick={() => this.handleSectionClick('basicInfo')}>
                    <span className={`icon ${activeSection === 'basicInfo' ? 'active' : ''}`}><FontAwesomeIcon icon={faInfoCircle} /></span>
                    <Link to="#" className="nav-item-link">Details Information</Link>
                </div>
                <div className={`box-item ${activeSection === 'salesInfo' ? 'active' : ''}`} onClick={() => this.handleSectionClick('salesInfo')}>
                    <span className={`icon ${activeSection === 'salesInfo' ? 'active' : ''}`}><FontAwesomeIcon icon={faInfoCircle} /></span>
                    <Link to="#" className="nav-item-link">Sales Information</Link>
                </div>
                <div className={`box-item ${activeSection === 'shipping' ? 'active' : ''}`} onClick={() => this.handleSectionClick('shipping')}>
                    <span className={`icon ${activeSection === 'shipping' ? 'active' : ''}`}><FontAwesomeIcon icon={faInfoCircle} /></span>
                    <Link to="#" className="nav-item-link">Shipping</Link>
                </div>
                <div className={`box-item ${activeSection === 'otherInfo' ? 'active' : ''}`} onClick={() => this.handleSectionClick('otherInfo')}>
                    <span className={`icon ${activeSection === 'otherInfo' ? 'active' : ''}`}><FontAwesomeIcon icon={faInfoCircle} /></span>
                    <Link to="#" className="nav-item-link">Others</Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(navBar);
