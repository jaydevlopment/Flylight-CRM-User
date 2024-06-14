import {
    Record_Action, Record_Action_Sucess, Record_Action_Clear,
    Record_Status, Record_Status_Sucess, Record_Status_Clear,
    Record_Task, Record_Task_Sucess, Record_Task_Clear,
    Record_Feedback,Record_Feedback_Sucess,Record_Feedback_Clear,
    Record_AgentStatus,Record_AgentStatus_Sucess,Record_AgentStatus_Clear,
} from '../Actions/actionTypes';

const initialState = {
    actions: [],
    agentStatus: [],
    status: [],
    tasks: [],
    addFeedback:[]
};

const  CallListR = (state = initialState, action) => {
    // console.log(">............")
    switch (action.type) {
        case Record_Action:
            return {
                ...state,
            };
        case Record_Action_Sucess:
            return {
                ...state,
                actions: action.payload,
            };
        case Record_Action_Clear:
            return {
                actions: [],
            };
        case Record_Status:
            return {
                ...state,
            };
        case Record_Status_Sucess:
            return {
                ...state,
                status: action.payload,
            };
        case Record_Status_Clear:
            return {
                status: [],
            };

        case Record_Task:
            return {
                ...state,
            };
        case Record_Task_Sucess:
            return {
                ...state,
                tasks: action.payload,
            };
        case Record_Task_Clear:
            return {
                tasks: [],
            };

        case Record_Feedback:
            return {
                ...state,
            };
        case Record_Feedback_Sucess:
            return {
                ...state,
                addFeedback: action.payload,
            };
        case Record_Feedback_Clear:
            return {
                addFeedback: [],
            };
        case Record_AgentStatus:
            return {
                ...state,
            };
        case Record_AgentStatus_Sucess:
            return {
                ...state,
                agentStatus: action.payload,
            };
        case Record_AgentStatus_Clear:
            return {
                agentStatus: [],
            };
        default:
            return state;
    }
}
export default  CallListR;






