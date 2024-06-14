
import {
    GetOtp, GetOtp_SUCCESS, GetOtp_CLEAR,
    VerifyOtp, VerifyOtp_SUCCESS, VerifyOtp_CLEAR,
    PASSWORD, PASSWORD_SUCCESS, PASSWORD_CLEAR
} from './actionTypes';
import { BaseUrl, Base_NodeUrl } from '../../../const'

let Header = {
    Accept: "application/json",
    'Content-Type': 'application/json',
}

export const SendOtp = (data) => {
    return (dispatch) => {
        dispatch({ type: GetOtp })
        fetch(`${BaseUrl}/forgot-password`,
            {
                method: "POST",
                headers: Header,
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(responseData => {
                dispatch({ type: GetOtp_SUCCESS, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};

export const Verify = (data) => {
    return (dispatch) => {
        dispatch({ type: VerifyOtp })
        fetch(`${BaseUrl}/verify-forgot-password-otp`,
            {
                method: "POST",
                headers: Header,
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(responseData => {
                dispatch({ type: VerifyOtp_SUCCESS, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};

export const NewPassword = (data) => {
    return (dispatch) => {
        dispatch({ type: PASSWORD })
        fetch(`${BaseUrl}/reset-password`,
            {
                method: "POST",
                headers: Header,
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(responseData => {
                dispatch({ type: PASSWORD_SUCCESS, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};



export const clearResponse = () => {
    return {
        type: GetOtp_CLEAR,
        type: VerifyOtp_CLEAR,
        type: PASSWORD_CLEAR,
    };
};


