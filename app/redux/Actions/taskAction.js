
import {
    task, task_Success, task_Clear,
    Add_Edit_Task, Add_Edit_Task_Success, Add_Edit_Task_Clear,
} from './actionTypes';
import { BaseUrl, Base_NodeUrl } from '../../../const'

export const TaskList = (data, token,) => {
    return (dispatch) => {
        dispatch({ type: task })
        fetch(`${Base_NodeUrl}/postTaskList`,
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
                dispatch({ type: task_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};

export const Add_EditTask = (data, token) => {
    return (dispatch) => {
        dispatch({ type: Add_Edit_Task })
        fetch(`${BaseUrl}/TaskAddEdit`,
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
                dispatch({ type: Add_Edit_Task_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};


export const clearResponse = () => {
    return {
        type: task_Clear,
        type: Add_Edit_Task_Clear,
    };
};


