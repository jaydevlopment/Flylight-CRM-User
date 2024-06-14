
import {
    Dashboard, Dashboard_Success, Dashboard_Clear,
    Update_Token, Update_Token_Success, Update_Token_Clear,
    DashboardUp, DashboardUp_Success, DashboardUp_Clear,
} from './actionTypes';

import { BaseUrl, Base_NodeUrl } from '../../../const'

export const dashboard = (data, token,) => {
    return (dispatch) => {
        dispatch({ type: Dashboard })
        // fetch(`${BaseUrl}/user-dashboard`,
        fetch(`${Base_NodeUrl}/leadChart`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(responseData => {
                // console.log('dashboard...................',responseData)
                dispatch({ type: Dashboard_Success, payload: responseData })
                // console.log('home screen ',responseData)
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};


export const UpcommingEvents = (data, token,) => {
    return (dispatch) => {
        dispatch({ type: DashboardUp })
        fetch(`${Base_NodeUrl}/getComingFeedbacklist`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(responseData => {
                dispatch({ type: DashboardUp_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};

export const UpdateToken = (uid, fcmtoken, Token) => {
    return (dispatch) => {
        dispatch({ type: Update_Token })
        fetch(`${BaseUrl}/v1/updatefcmToken`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Token,
                },
                body: JSON.stringify({
                    uid: uid,
                    fcm: fcmtoken
                }),
            })
            .then(response => response.json())
            .then(responseData => {
                dispatch({ type: Update_Token_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};

export const clearResponse = () => {
    return {
        type: Dashboard_Clear,
        type: DashboardUp_Clear
    };
};


