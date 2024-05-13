import {combineReducers} from 'redux';
import { connectRouter } from 'connected-react-router';

import appReducer from "./appReducer";
import adminReducer from "./adminReducer";
import userReducer from "./userReducer";
import customerReducer from './customerReducer';
import sellerReducer from './sellerReducer';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistCommonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};

const adminPersistConfig = {
    ...persistCommonConfig,
    key: 'admin',
    whitelist: ['isLoggedIn', 'adminInfo']
};

const customerPersistConfig = {
    ...persistCommonConfig,
    key: 'customer',
    whitelist: ['isLoggedIn', 'customerInfo']
};

const sellerPersistConfig = {
    ...persistCommonConfig,
    key: 'seller',
    whitelist: ['isLoggedIn', 'sellerInfo']
};

export default (history) => combineReducers({
    router: connectRouter(history),
    admin: persistReducer(adminPersistConfig, adminReducer),
    customer: persistReducer(customerPersistConfig, customerReducer),
    seller: persistReducer(sellerPersistConfig, sellerReducer),
    user: userReducer,
    app: appReducer
})