import {
    Record_Action, Record_Action_Sucess, Record_Action_Clear,
    Record_Status, Record_Status_Sucess, Record_Status_Clear,
    Record_Task, Record_Task_Sucess, Record_Task_Clear,
    Record_Feedback, Record_Feedback_Sucess, Record_Feedback_Clear,
    Record_AgentStatus,Record_AgentStatus_Sucess,Record_AgentStatus_Clear,
} from './actionTypes';
import { BaseUrl, Base_NodeUrl } from '../../../const'

export const ActionList = (data, token,) => {
    return (dispatch) => {
        dispatch({ type: Record_Action })
        fetch(`${BaseUrl}/action-list`,
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
                dispatch({ type: Record_Action_Sucess, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};

export const AgentStatusList = (data, token,) => {
    return (dispatch) => {
        dispatch({ type: Record_AgentStatus })
        fetch(`${BaseUrl}/agentStatusList`,
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
                dispatch({ type: Record_AgentStatus_Sucess, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};

export const StatusList = (data, token,) => {
    return (dispatch) => {
        dispatch({ type: Record_Status })
        fetch(`${BaseUrl}/feedbackStatusList`,
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
                dispatch({ type: Record_Status_Sucess, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};
export const TaskList = (data, token,) => {
    return (dispatch) => {
        dispatch({ type: Record_Task })
        fetch(`${BaseUrl}/task-list`,
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
                dispatch({ type: Record_Task_Sucess, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};

export const RecordFeedback = (data, token,) => {
    console.log(data)
    return (dispatch) => {
        dispatch({ type: Record_Feedback })
        fetch(`${BaseUrl}/add-feedback`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + token
                },
                body: data,
            })
            .then(response => response.json())
            .then(responseData => {
                console.log('.............>>>>>>>>>>>>>>',responseData)
                dispatch({ type: Record_Feedback_Sucess, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);

            })
    }
};

export const clearResponse = () => {
    return {
        type: Record_Action_Clear,
        type: Record_Status_Clear,
        type: Record_Task_Clear,
        type: Record_Feedback_Clear,
        type: Record_AgentStatus_Clear,
    };
};


