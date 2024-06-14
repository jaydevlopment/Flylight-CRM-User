
import {Lead,Lead_Success,Lead_Clear,
    Update_Token, Update_Token_Success, Update_Token_Clear,
    LeadDetail,LeadDetail_Success,LeadDetail_Clear,
    LeadStatus,LeadStatus_Success,LeadStatus_Clear,
    LeadEdit,LeadEdit_Success,LeadEdit_Clear} from './actionTypes';
import { BaseUrl, Base_NodeUrl } from '../../../const'
export const LeadList = (data, token,) => {
    return (dispatch) => {
        dispatch({ type: Lead })
        fetch(`${Base_NodeUrl}/getLeadList`,
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
                console.log('.........',responseData.data.length)
                dispatch({ type: Lead_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};

export const GetDetail = (data, token,) => {
    return (dispatch) => {
        dispatch({ type: LeadDetail })
        fetch(`${Base_NodeUrl}/getleadDetails`,
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
                dispatch({ type:LeadDetail_Success, payload: responseData })
                // console.log('lead deatail',responseData)
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};


export const leadStatus = (data, token,) => {
    return (dispatch) => {
        dispatch({ type: LeadStatus })
        fetch(`${BaseUrl}/leadStatus`,
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
                dispatch({ type:LeadStatus_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};


export const Editlead = (data, token,) => {
    return (dispatch) => {
        dispatch({ type: LeadEdit })
        fetch(`${BaseUrl}/editLead`,
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
                dispatch({ type:LeadEdit_Success, payload: responseData })
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
        type: Lead_Clear,
        type: LeadDetail_Clear,
        type: LeadStatus_Clear,
        type: LeadEdit_Clear,
        // type: Update_Token_Clear
    };
};


