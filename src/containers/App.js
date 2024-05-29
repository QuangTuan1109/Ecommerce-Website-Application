import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';


import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';

import { path } from '../utils'

import Home from '../routes/Home';
//import Login from '../routes/Login';
import Login from './Auth/Login';
import RegisterUser from './Auth/RegisterUser'
import RegisterSeller from './Auth/RegisterSeller';
import Header from './Header/Header';

import { CustomToastCloseButton } from '../components/CustomToast';
import HomePage from '../containers/HomePage/HomePage'
import Products from './Customer/ProductsPage/Products';
import DetailProduct from './Customer/ProductsPage/DetailProduct';
import News from './Customer/NewsPage/News'
import Cart from './Customer/CartPage/Cart';
import Checkout from './Customer/CheckoutPage/Checkout'
import Homepage from './Seller/HomepageSeller/Homepage'
import CreateProduct from './Seller/ProductPageSeller/CreateProduct/CreateProduct'
import AllProduct from './Seller/ProductPageSeller/AllProduct/AllProduct'
import DetailProductSeller from './Seller/ProductPageSeller/DetailProduct/DetailProduct';
import UpdateProduct from './Seller/ProductPageSeller/DetailProduct/UpdateProduct';

class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        {this.props.isLoggedIn && <Header />}

                        <div className="content-container">
                                <Switch>
                                    <Route path={path.HOME} exact component={(Home)} />
                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                    <Route path={path.REGISTERUSER} component={userIsNotAuthenticated(RegisterUser)} />
                                    <Route path={path.REGISTERSELLER} component={userIsAuthenticated(RegisterSeller)} />
                                    <Route path={path.HOMEPAGE} component={HomePage} />
                                    <Route path={path.PRODUCT_PAGE} component={Products}></Route>
                                    <Route path={path.DETAIL_PRODUCT_PAGE} component={userIsAuthenticated(DetailProduct)}></Route>
                                    <Route path={path.NEWS} component={userIsAuthenticated(News)}></Route>
                                    <Route path={path.CART} component={userIsAuthenticated(Cart)}></Route>
                                    <Route path={path.CHECKOUT} component={userIsAuthenticated(Checkout)}></Route>
                                    <Route path={path.HOMEPAGESELLER} component={userIsAuthenticated(Homepage)}></Route>
                                    <Route path={path.CREATEPRODUCT} component={userIsAuthenticated(CreateProduct)}></Route>
                                    <Route path={path.ALLPRODUCT} component={userIsAuthenticated(AllProduct)}></Route>
                                    <Route path={path.DETAILPRODUCTSELLER} component={userIsAuthenticated(DetailProductSeller)}></Route>
                                    <Route path={path.UPDATEPRODUCT} component={userIsAuthenticated(UpdateProduct)}></Route>
                                </Switch>
                        </div>

                        <ToastContainer
                            className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                            autoClose={false} hideProgressBar={true} pauseOnHover={false}
                            pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                            closeButton={<CustomToastCloseButton />}
                        />
                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.admin.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);