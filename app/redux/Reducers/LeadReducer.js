import {
    Lead, Lead_Success, Lead_Clear,
    Update_Token, Update_Token_Success, Update_Token_Clear,
    LeadDetail, LeadDetail_Success, LeadDetail_Clear,
    LeadStatus, LeadStatus_Success, LeadStatus_Clear,
    LeadEdit, LeadEdit_Success, LeadEdit_Clear
} from '../Actions/actionTypes';

const initialState = {
    data: [],
    detail: [],
    status: [],
    edit: [],
    tokenData: []
};
const dashboardR = (state = initialState, action) => {
    switch (action.type) {
        case Lead:
            return {
                ...state,
            };
        case Lead_Success:
            return {
                ...state,
                data: action.payload
            };
        case Lead_Clear:
            return {
                data: []
            };
        case LeadDetail:
            return {
                ...state,
            };
        case LeadDetail_Success:
            return {
                ...state,
                detail: action.payload
            };
        case LeadDetail_Clear:
            return {
                detail: []
            };

        case LeadStatus:
            return {
                ...state,
            };
        case LeadStatus_Success:
            return {
                ...state,
                status: action.payload
            };
        case LeadStatus_Clear:
            return {
                status: []
            };

        case LeadEdit:
            return {
                ...state,
            };
        case LeadEdit_Success:
            return {
                ...state,
                edit: action.payload
            };
        case LeadEdit_Clear:
            return {
                edit: []
            };

        case Update_Token:
            return {
                ...state,
            };
        case Update_Token_Success:
            return {
                ...state,
                tokenData: action.payload
            };
        case Update_Token_Clear:
            return {
                tokenData: []
            };
        default:
            return state;
    }
}
export default dashboardR;






