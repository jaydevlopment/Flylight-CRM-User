import {
    GetOtp, GetOtp_SUCCESS, GetOtp_CLEAR,
    VerifyOtp, VerifyOtp_SUCCESS, VerifyOtp_CLEAR,
    PASSWORD, PASSWORD_SUCCESS, PASSWORD_CLEAR
} from '../Actions/actionTypes';

const initialState = {
    sendotp: [],
    checkotp: [],
    setpassword: []
};

const verifyR = (state = initialState, action) => {
    switch (action.type) {
        case GetOtp:
            return {
                ...state,
            };
        case GetOtp_SUCCESS:
            return {
                ...state,
                sendotp: action.payload,
            };
        case GetOtp_CLEAR:
            return {
                sendotp: [],
            };

        case VerifyOtp:
            return {
                ...state,
            };
        case VerifyOtp_SUCCESS:
            return {
                ...state,
                checkotp: action.payload,
            };
        case VerifyOtp_CLEAR:
            return {
                checkotp: [],
            };
        case PASSWORD:
            return {
                ...state,
            };
        case PASSWORD_SUCCESS:
            return {
                ...state,
                setpassword: action.payload,
            };
        case PASSWORD_CLEAR:
            return {
                ...state,
                setpassword: [],
            }
        default:
            return state;
    }
}
export default verifyR;






