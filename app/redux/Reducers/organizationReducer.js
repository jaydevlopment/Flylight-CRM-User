import { Organization_List, Organization_List_Clear, Organization_List_Success } from  '../Actions/actionTypes';

const initialState = {
    getList: [],
};
const OrganizationR = (state = initialState, action) => {
    switch (action.type) {
        case Organization_List:
            return {
                ...state,
            };
        case Organization_List_Success:
            return {
                ...state,
                getList: action.payload
            };
        case Organization_List_Clear:
            return {
                ...state,
                getList: []
            };
        default:
            return state;
    }
}
export default OrganizationR;






