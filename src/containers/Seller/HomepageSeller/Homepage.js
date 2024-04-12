import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Homepage.scss'
import Header from '../Header'
import NavbarHomepage from './Section/NavbarHomepage'
import TaskSection from'./Section/TaskSection'
import SellAnalysis from './Section/SellAnalysis';
import MarketingChannel from './Section/MarketingChannel'


class Homepage extends Component {

    render() {

        return (
            <div className='homepage-container'>
                <Header />
                <div className="body-container">
                    <div className="left-sidebar">
                        <NavbarHomepage />
                    </div>
                    <div className="main-content">
                        <TaskSection />
                        <SellAnalysis />
                        <div className="marketing-channel-container">
                            <MarketingChannel />
                        </div>
                    </div>
                    <div className="right-sidebar">
                        {/* Phần bên phải */}
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

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
