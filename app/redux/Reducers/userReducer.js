import {
    Get_Profile, Profile_Suceess, Profile_Clear,
    Get_Notification, Notification_Suceess, Notification_Clear,
} from '../Actions/actionTypes';

const initialState = {
    userDetail: [],
    userImage: [],
    userNotification: [],
};
const profileR = (state = initialState, action) => {
    switch (action.type) {
        case Get_Profile:
            return {
                ...state,
            };
        case Profile_Suceess:
            return {
                ...state,
                userDetail: action.payload
            };
        case Profile_Clear:
            return {
                ...state,
                userDetail: []
            };
        case Get_Notification:
            return {
                ...state,
            };
        case Notification_Suceess:
            return {
                ...state,
                userNotification: action.payload
            };
        case Notification_Clear:
            return {
                ...state,
                userNotification: []
            };


        default:
            return state;
    }
}
export default profileR;






