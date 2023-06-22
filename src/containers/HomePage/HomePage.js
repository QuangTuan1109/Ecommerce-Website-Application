import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderHomepage from './HeaderHomepage'

class HomePage extends Component {

    render() {
        return (
            <div>
                <HeaderHomepage />
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
