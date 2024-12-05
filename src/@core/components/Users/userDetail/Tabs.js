// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Reactstrap Imports
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";

// ** Icons Imports
import { User, Lock, Link, Bell } from "react-feather";
import UserComments from "./Comment";
import useQueryGet from "../../../../customHook/useQueryGet";
import UserProjectsList from "./UserProjectsList";
import MoreInfo from "./MoreInfo";
import Connection from "./Connections";
import UserCourses from "./UserCourses";
import UserCourseReserve from "./UserCourseReserves";
import { acceptComment, deleteComments, rejectComment } from "../../../../core/services/Paper";
import { useQueryClient } from "@tanstack/react-query";
import UserAddRoles from "./UserAddRoles";
import UserPayments from "./UserPayments";
import StudentScheduals from "./StudentScheduals";


//import UserProjectsList from "./UserProjectsList";
//import Connections from "./Connections";
//import MoreInfo from "./MoreInfo";
//import UserReserveCourses from "./UserReserveCourses";
//import CourseCom from "../../DetailCourse/courseGroups/comment/Comment";


// import { getCoursesListtt } from "../../../../core/services/api/course";

const UserTabs = ({ active, toggleTab, userDetails }) => {
  const [userCmnt, setUserCmnt] = useState([]);
  const [refetchUserCom, setRefetchUserCom] = useState(1);
  const id = userDetails?.id

  const queryclient = useQueryClient()

  const { data: getComment } = useQueryGet(["getComment"], `/Course/CommentManagment?userId=${id}`)

  const { data: courseList } = useQueryGet(["courseList"], "courseList")

  const { data: reserveCourse } = useQueryGet(["reserveCourse"], "/CourseReserve")

  // const getCmnts = async () => {
  //   try {
  //     const responses = await getComments(userDetails.id);
  //     setUserCmnt(responses.comments);
  //   } catch (error) {
  //     throw new Error("ERROR: ", error);
  //   }
  // };

  const accptCmnt = async (id) => {
    try {
      const responses = await acceptComment(id);
      // console.log("object",responses);
      responses.success ? setRefetchUserCom(refetchUserCom + 1) : "";
      responses.success ? toast.success(responses.message) : "";

    } catch (error) {
      throw new Error("ERROR: ", error);
    }
  };

  const rejCmnt = async (id) => {
    try {
      const responses = await rejectComment(id);
      responses.success ? setRefetchUserCom(refetchUserCom + 1) : "";
      responses.success ? toast.success(responses.message) : "";

    } catch (error) {
      throw new Error("ERROR: ", error);
    }
  };

  const delCmnts = async (id) => {
    try {
      const responses = await deleteComments(id);
      responses.success ? setRefetchUserCom(refetchUserCom + 1) : "";
      responses.success ? toast.success(responses.message) : "";

    } catch (error) {
      throw new Error("ERROR: ", error);
    }
  };


console.log(userDetails);
  // **useEffect

  return (
    <Fragment>
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink
            active={active === "1"}
            onClick={() => toggleTab("1")}
            className="px-1"
          >
            <User className="font-medium-3 me-50" />
            <span className="fw-bold">دوره ها</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === "2"}
            onClick={() => toggleTab("2")}
            className="px-1"
          >
            <User className="font-medium-3 me-50" />
            <span className="fw-bold">دوره های رزرو</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === "3"}
            onClick={() => toggleTab("3")}
            className="px-1"
          >
            <Lock className="font-medium-3 me-50" />
            <span className="fw-bold">کامنت ها</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === "4"}
            onClick={() => toggleTab("4")}
            className="px-1"
          >
            <Link className="font-medium-3 me-50" />
            <span className="fw-bold">سایر اطاعات کاربر</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === "5"}
            onClick={() => toggleTab("5")}
            className="px-1"
          >
            <User className="font-medium-3 me-50" />
            <span className="fw-bold"> برنامه های کاربر </span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === "6"}
            onClick={() => toggleTab("6")}
            className="px-1"
          >
            <Bell className="font-medium-3 me-50" />
            <span className="fw-bold">  دسترسی </span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === "7"}
            onClick={() => toggleTab("7")}
            className="px-1"
          >
            <Bell className="font-medium-3 me-50" />
            <span className="fw-bold">  پرداختی ها </span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          {/* <UserProjectsList /> */}
          <UserCourses userCourses={userDetails?.courses} />
        </TabPane>
        <TabPane tabId="2">
          {/* <UserReserveCourses /> */}
          <UserCourseReserve courseReserve={userDetails?.coursesReseves} />
        </TabPane>
        <TabPane tabId="3">
          <UserComments
            queryclient={queryclient}
            comList={getComment?.comments}
            onvan="نام دوره"
            accptCmnt={accptCmnt}
            rejCmnt={rejCmnt}
            delCmnt={delCmnts}
          />
        </TabPane>
        <TabPane tabId="4">
          <MoreInfo userDetails={userDetails} />
          <Connection userDetails={userDetails} />

        </TabPane>
        <TabPane tabId="5">
          <StudentScheduals studentId={userDetails?.id} />
        </TabPane>
        <TabPane tabId="6">
          <UserAddRoles user={userDetails} />
        </TabPane>
        <TabPane tabId="7">
          <UserPayments userDetails={userDetails} />
        </TabPane>

      </TabContent>
    </Fragment>
  );
};
export default UserTabs;
