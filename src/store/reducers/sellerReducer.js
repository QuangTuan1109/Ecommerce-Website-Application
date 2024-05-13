import actionTypes from '../actions/actionTypes';

const initialState = {
    sellerInfo: null,
    isLoggedIn: false,
    category: ''
};

const sellerReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SELLER_LOGIN_SUCCESS:
            return {
                ...state,
                sellerInfo: action.sellerInfo,
                isLoggedIn: true
            };
        case actionTypes.SELLER_LOGIN_FAIL:
        case actionTypes.SELLER_PROCESS_LOGOUT:
            return {
                ...state,
                sellerInfo: null,
                isLoggedIn: false
            };
        case actionTypes.UPDATE_CATEGORY:
            return {
                ...state,
                category: action.payload
            };
        default:
            return state;
    }
};

export default sellerReducer;
