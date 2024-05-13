import actionTypes from './actionTypes';

export const sellerLoginSuccess = (sellerInfo) => ({
    type: actionTypes.SELLER_LOGIN_SUCCESS,
    sellerInfo: sellerInfo
})

export const sellerLoginFail = () => ({
    type: actionTypes.SELLER_LOGIN_FAIL
})

export const sellerProcessLogout = () => ({
    type: actionTypes.SELLER_PROCESS_LOGOUT
})

export const updateCategory = (category) => {
    return {
        type: actionTypes.UPDATE_CATEGORY,
        payload: category
    };
};