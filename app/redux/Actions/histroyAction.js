
import {
    Add_callhistory, Add_callhistory_Success, Add_callhistory_Clear,
    callhistory, callhistory_Success, callhistory_Clear,
    Campaign, Campaign_Success, Campaign_Clear,
    lead_status, lead_status_Success, lead_status_Clear,
    historyDetail, historyDetail_Success, historyDetail_Clear,
    Report_List, Report_List_Success, Report_List_Clear
} from './actionTypes';
import { BaseUrl, Base_NodeUrl } from '../../../const'

export const AddCallHistory = (data, token,) => {
    return (dispatch) => {
        dispatch({ type: Add_callhistory })
        fetch(`${BaseUrl}/addCallhistory`,
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
            console.log('Add call History',responseData)
            dispatch({ type: Add_callhistory_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};



export const HistoryList = (data, token,) => {
    return (dispatch) => {
        dispatch({ type: callhistory })
        // fetch(`http://3.23.113.168:3000/getCallHistoryList`,
        fetch(`${Base_NodeUrl}/getFeedbackList`,
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
                dispatch({ type: callhistory_Success, payload: responseData })
            //   console.log('historydata.....',responseData)
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};

export const CampaignList = (data, token,) => {
    return (dispatch) => {
        dispatch({ type: Campaign })
        // fetch(`${BaseUrl}/campaign-list`,
        fetch(`${Base_NodeUrl}/getCampaignList`,
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
                dispatch({ type: Campaign_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};

export const LeadStatusList = (data, token,) => {
    return (dispatch) => {
        dispatch({ type: lead_status })
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
                dispatch({ type: lead_status_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};

export const HistoryDetail = (data, token,) => {
    return (dispatch) => {
        dispatch({ type: historyDetail })
        fetch(`${Base_NodeUrl}/getCallHistoryList`,
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
                // console.log(responseData)
                dispatch({ type: historyDetail_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};

export const reportList = (data, token) => {
    return (dispatch) => {
        dispatch({ type: Report_List })
        fetch(`${Base_NodeUrl}/leadReport`,
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
                dispatch({ type: Report_List_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};

export const clearResponse = () => {
    return {
        type: Add_callhistory_Clear,
        type: callhistory_Clear,
        type: Campaign_Clear,
        type: lead_status_Clear,
        type: historyDetail_Clear,
        type: Report_List_Clear,
    };
};


