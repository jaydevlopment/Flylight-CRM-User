import {
    Dashboard, Dashboard_Success, Dashboard_Clear,
    Update_Token, Update_Token_Success, Update_Token_Clear,
    DashboardUp, DashboardUp_Success, DashboardUp_Clear,
} from '../Actions/actionTypes';

const initialState = {
    data: [],
    tokenData: [],
    new: []
};
const dashboardR = (state = initialState, action) => {
    switch (action.type) {
        case Dashboard:
            return {
                ...state,
            };
        case Dashboard_Success:
            return {
                ...state,
                data: action.payload
            };
        case Dashboard_Clear:
            return {
                data: []
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
        case DashboardUp:
            return {
                ...state,
            };
        case DashboardUp_Success:
            return {
                ...state,
                new: action.payload
            };
        case DashboardUp_Clear:
            return {
                new: []
            };
        default:
            return state;
    }
}
export default dashboardR;






