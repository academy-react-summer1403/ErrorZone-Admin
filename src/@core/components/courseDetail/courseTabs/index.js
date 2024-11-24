// ** React Imports
import { Fragment } from "react";

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

// ** Icons Imports
import { Bell, Bookmark, User , CreditCard } from "react-feather";

// ** Course Components
//import CourseComments from "./CourseComments";
import CourseData from "./CourseData";
import CourseReserve from "./CourseReserve";
import CourseComments from "./CourseComments";
import Payments from "./CoursePayment";
import GroupListCourse from "./CourseGroup";


const CourseTabs = ({ active, toggleTab, course , allPayments }) => {
  return (
    <Fragment>
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink active={active === "1"} onClick={() => toggleTab("1")}>
            <Bell className="font-medium-3 me-50" />
            <span className="fw-bold">اطلاعات دوره</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "2"} onClick={() => toggleTab("2")}>
            <Bookmark className="font-medium-3 me-50" />
            <span className="fw-bold">رزور کنندگان</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "3"} onClick={() => toggleTab("3")}>
            <User className="font-medium-3 me-50" />
            <span className="fw-bold">نظرات</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "4"} onClick={() => toggleTab("4")}>
            <CreditCard className="font-medium-3 me-50" />
            <span className="fw-bold">پرداختی ها</span>
          </NavLink>
        </NavItem> 
        <NavItem>
          <NavLink active={active === "5"} onClick={() => toggleTab("5")}>
            <CreditCard className="font-medium-3 me-50" />
            <span className="fw-bold"> گروه ها</span>
          </NavLink>
        </NavItem>                
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <CourseData
            courseUserTotal={course?.courseUserTotal || 0}
            courseCommentTotal={course?.courseCommentTotal || 0}
            paymentDoneTotal={course?.paymentDoneTotal || 0}
            courseLikeTotal={course?.courseLikeTotal || 0}
            describe={course?.describe}
            course={course}
          />
        </TabPane>
        <TabPane tabId="2">
         <CourseReserve />
        </TabPane>
        <TabPane tabId="3">
          <CourseComments />
        </TabPane>
        <TabPane tabId="4">
          <Payments allPayments={allPayments} />
        </TabPane> 
        <TabPane tabId="5">
          <GroupListCourse Course={course} />
        </TabPane>
      </TabContent>
    </Fragment>
  );
};
export default CourseTabs;
