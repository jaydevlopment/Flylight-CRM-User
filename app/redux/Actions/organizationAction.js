import { Organization_List,Organization_List_Clear,Organization_List_Success } from './actionTypes';
import { BaseUrl, Base_NodeUrl } from '../../../const'

export const OrganizationList = (data,token,) => {
    return (dispatch) => {
        dispatch({ type: Organization_List })

        fetch(`${BaseUrl}/getOrganizationList`,
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
                dispatch({ type: Organization_List_Success, payload: responseData })
            })
            .catch((error) => {
                console.log("error" + error);
            })
    }
};


export const clearResponse = () => {
    return {
        type: Organization_List_Clear,
    };
};


