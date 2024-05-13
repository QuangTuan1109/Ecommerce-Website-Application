import actionTypes from './actionTypes';

export const customerLoginSuccess = (customerInfo) => ({
    type: actionTypes.CUSTOMER_LOGIN_SUCCESS,
    customerInfo: customerInfo
})

export const customerLoginFail = () => ({
    type: actionTypes.CUSTOMER_LOGIN_FAIL
})

export const customerProcessLogout = () => ({
    type: actionTypes.CUSTOMER_PROCESS_LOGOUT
})