import actionTypes from '../actions/actionTypes';

const initialState = {
    customerInfo: null,
    isLoggedIn: false
};

const customerReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CUSTOMER_LOGIN_SUCCESS:
            return {
                ...state,
                customerInfo: action.customerInfo,
                isLoggedIn: true
            };
        case actionTypes.CUSTOMER_LOGIN_FAIL:
        case actionTypes.CUSTOMER_PROCESS_LOGOUT:
            return {
                ...state,
                customerInfo: null,
                isLoggedIn: false
            };
        default:
            return state;
    }
};

export default customerReducer;
