import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderHomepage from './HeaderHomepage'
import Introduction from './Section/Introduction'

class HomePage extends Component {

    render() {
        return (
            <div>
                <HeaderHomepage />
                <Introduction />
                <div style={{height: '300px'}}></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
