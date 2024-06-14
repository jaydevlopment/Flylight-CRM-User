import {
    task, task_Success, task_Clear,
    Add_Edit_Task, Add_Edit_Task_Success, Add_Edit_Task_Clear,
} from '../Actions/actionTypes';

const initialState = {
    getList: [],
    addTask: []
};
const taskR = (state = initialState, action) => {
    switch (action.type) {
        case task:
            return {
                ...state,
            };
        case task_Success:
            return {
                ...state,
                getList: action.payload
            };
        case task_Clear:
            return {
                ...state,
                getList: []
            };
        case Add_Edit_Task:
            return {
                ...state,
            };
        case Add_Edit_Task_Success:
            return {
                ...state,
                addTask: action.payload
            };
        case Add_Edit_Task_Clear:
            return {
                ...state,
                addTask: []
            };
        default:
            return state;
    }
}
export default taskR;






