import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import './AllProduct.scss'

import Header from '../../Header'
import NavbarHomepage from '../../HomepageSeller/Section/NavbarHomepage'
import AllProductContent from './Section/AllProductContent';


class AllProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'All',
            selectedTool: null
            
        };
    }

    handleTabClick = (tabName) => {
        this.setState({ activeTab: tabName }); // Cập nhật mục active khi được click
    }

    handleSelectChange = (event) => {
        const { history } = this.props;
        const selectedTool = event.target.value;
        this.setState({ selectedTool });
        if (selectedTool) {
            history.push(`/${selectedTool}`);
        }
    };

    renderContentBasedOnTab = () => {
        const { activeTab } = this.state;

        switch (activeTab) {
            case 'All':
                return <AllProductContent />;
            case 'Live':
                return;
            case 'Violation':
                return;
            case 'Under System Review':
                return;
            case 'Unpublished':
                return;
            default:
                return <AllProductContent />;
        }
    };


    render() {
        const { activeTab } = this.state

        return (
            <div className='all-product-seller-container'>
                <Header />
                <div className="body-container">
                    <div className="sidebar">
                        <NavbarHomepage />
                    </div>
                    <div className="main-content">
                        <div className="header-content">
                            <h3>Products</h3>
                            <div className="tools-header">
                                <div className="left-header-content">
                                    <div className="navbar-content">
                                        <ul className="sub-nav">
                                            <li className={`sub-nav-item ${activeTab === 'All' ? 'active' : ''}`} onClick={() => this.handleTabClick('All')}>
                                                <FontAwesomeIcon className="nav-icon" />
                                                All
                                            </li>
                                            <li className={`sub-nav-item ${activeTab === 'Live' ? 'active' : ''}`} onClick={() => this.handleTabClick('Live')}>
                                                <FontAwesomeIcon className="nav-icon" />
                                                Live (0)
                                            </li>
                                            <li className={`sub-nav-item ${activeTab === 'Violation' ? 'active' : ''}`} onClick={() => this.handleTabClick('Violation')}>
                                                <FontAwesomeIcon className="nav-icon" />
                                                Violation (0)
                                            </li>
                                            <li className={`sub-nav-item ${activeTab === 'Under System Review' ? 'active' : ''}`} onClick={() => this.handleTabClick('Under System Review')}>
                                                <FontAwesomeIcon className="nav-icon" />
                                                Under System Review (0)
                                            </li>
                                            <li className={`sub-nav-item ${activeTab === 'Unpublished' ? 'active' : ''}`} onClick={() => this.handleTabClick('Unpublished')}>
                                                <FontAwesomeIcon className="nav-icon" />
                                                Unpublished (0)
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="right-header-content">
                                    <div className="tool-select">
                                        <select
                                            value={this.state.selectedTool}
                                            onChange={this.handleSelectChange}
                                        >
                                            <option value="">Product Tools</option>
                                            <option value="massUpload">Mass Upload</option>
                                            <option value="massUpdate">Mass Update</option>
                                            <option value="attributesTool">Attributes Tool</option>
                                            <option value="brandManagement">Brand Management</option>
                                            <option value="sizeChartManagement">Size Chart Management</option>
                                        </select>
                                    </div>
                                    <div className="add-product" onClick={this.toggleClassification}>
                                        <Link to="/create-product" target="_blank" className="add-product-link">
                                            <span className="icon">+</span>
                                            <span className="text">Add a New Product</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="body-content">
                            <div className="section">
                                {this.renderContentBasedOnTab()}
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
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProduct);
