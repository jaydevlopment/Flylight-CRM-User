import { LOGIN, LOGIN_SUCCESS, LOGIN_CLEAR } from '../Actions/actionTypes';

const initialState = {
    data: [],
    isLoged: false
};

const loginR = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isLoged: false
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                // isLoged: true,
                data: action.payload,
               
            };
        case LOGIN_CLEAR:
            return {
                data: [],
                isLoged: false
            };
        default:
            return state;
    }
}
export default loginR;






