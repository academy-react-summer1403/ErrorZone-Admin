// ** Reducers Imports
import layout from "./layout";
import navbar from "./navbar";
import user from "./user";
import dashboardReport from "./dashboardReport";
import calendar from "../@core/components/calender/store";

const rootReducer = { navbar, layout , user , dashboardReport , calendar };

export default rootReducer;
