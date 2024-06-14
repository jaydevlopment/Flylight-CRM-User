
import {
    Get_Profile, Profile_Suceess, Profile_Clear,
    Get_Notification,Notification_Suceess,Notification_Clear,
} from './actionTypes';
import { BaseUrl, Base_NodeUrl } from '../../../const'

export const profile = (data, Token,) => {
    return (dispatch) => {
        dispatch({ type: Get_Profile })
        fetch(`${BaseUrl}/getUser`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Token,
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(responseData => {
                dispatch({ type: Profile_Suceess, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};


export const notification = (data, Token,) => {
    return (dispatch) => {
        dispatch({ type: Get_Notification })
        fetch(`${BaseUrl}/getNotificationList`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Token,
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(responseData => {
                dispatch({ type: Notification_Suceess, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};

export const clearResponse = () => {
    return {
        type: Profile_Clear,
         type: Notification_Clear
    };
};


