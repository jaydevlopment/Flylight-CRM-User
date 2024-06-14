import { combineReducers } from "redux";
import authReducer from './authReducer'
import dashboardReducer from './dashboardReducer'
import userReducer from './userReducer'
import organizationReducer from "./organizationReducer"
import callReducer from './callReducer'
import historyReducer from './historyReducer'
import LeadReducer from './LeadReducer'
import changePassReducer from './changePassReducer'
import taskReducer from './taskReducer'

export default combineReducers({
    auth: authReducer,
    dashboard: dashboardReducer,
    user: userReducer,
    organization: organizationReducer,
    call: callReducer,
    history: historyReducer,
    lead: LeadReducer,
    changePassword: changePassReducer,
    task:taskReducer,
}); 