// ** React Imports
import { Fragment, lazy, useState } from "react";
import { Navigate } from "react-router-dom";
// ** Layouts
import BlankLayout from "@layouts/BlankLayout";
import VerticalLayout from "@src/layouts/VerticalLayout";
import HorizontalLayout from "@src/layouts/HorizontalLayout";
import LayoutWrapper from "@src/@core/layouts/components/layout-wrapper";

// ** Route Components
import PublicRoute from "@components/routes/PublicRoute";

// ** Utils
import { isObjEmpty } from "@utils";
import { getItem } from "../../core/services/common/storage.services";

import Blogs from "../../pages/Blog";
import PapperViews from "../../pages/PapperViews";
import CreatePapers from "../../pages/CreatePapper";
import CreateNewsPage from "../../pages/CreateNews";
import CategoriesPage from "../../pages/NewsCategories";
import CreateCategory from "../../pages/CreateCategory";
import EditCategoryPage from "../../pages/EditCategory";
import Comments from "../../pages/Comments";
import Users from "../../pages/User";
import UserDetail from "../../@core/components/Users/userDetail/userDetail";
import EditUserPage from "../../pages/EditUser";

import { useSelector } from "react-redux";
import CourseDetailsPage from "../../pages/CourseDetail";
import EditCourse from "../../pages/EditCourse";
import CourseReservedPage from "../../pages/CourseReserv";
import CreateCoursePage from "../../pages/CreateCourse";
import CourseGroupsPage from "../../pages/CourseGroup";
import EditCourseGroupPage from "../../pages/EditCourseGroup";
import CourseGroupDetailsPage from "../../pages/CourseGroupDetail";
import CreateCourseGroupPage from "../../pages/CreateCourseGroup";
import News from "../../pages/news/News";
import MyCoursesPages from "../../pages/MyCourses";
import Payment from "../../pages/Payment";
import CoursesPages from "../../pages/CoursePage";
import BlogsList from "../../pages/BlogsList";
import CalendarComponent from "../../pages/Calendar";
import CourseCommentsPage from "../../pages/CourseComments";
import NewsDetails from "../../pages/NewsDetailPage";
import EditNews from "../../pages/EditNews";
import GetNewsReplyCommentsModal from "../../@core/components/NewsDetailPage/GetNewsReplyCommentsModal";
import UserPaymentsDetail from "../../@core/components/Users/userDetail/UserPaymentsDetail";
import ClassRoom from "../../pages/ClassRoom";
import AssistanceCourse from "../../pages/AssistanceCourse";
//import CreateUserPage from "../../pages/CreateUser";
import Chat from "../../pages/chat/chat";

import Terms from "../../pages/Terms";
import SocialGroup from "../../pages/SocialGroup";
import CourseLevelPage from "../../pages/CourseLevelPage";
import CourseStatus from "../../pages/CourseStatus";
import Technologhy from "../../pages/Technologhy";
import Jobs from "../../pages/Jobs";
import Department from "../../pages/Department";

import AdminScheduals from "../../pages/Schedual/AdminSheduals/AdminScheduals";
import TeacherSheduals from "../../pages/Schedual/TeacherSheduals/TeacherSheduals";

// import AppChat from "../../pages/chat";

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />,
};

// ** Document title
const TemplateTitle = "%s - Error Zone React Admin Template";

// ** Default Route
const DefaultRoute = "/home";
const DefaulNotLogintRoute = "/login";

const Home = lazy(() => import("../../pages/Home"));
const SecondPage = lazy(() => import("../../pages/SecondPage"));
const Login = lazy(() => import("../../pages/Login"));
const Register = lazy(() => import("../../pages/Register"));
const ForgotPassword = lazy(() => import("../../pages/ForgotPassword"));
const Error = lazy(() => import("../../pages/Error"));
const Sample = lazy(() => import("../../pages/Sample"));
const Courses = lazy(() => import("../../pages/courses/Courses"));
//const CourseDetail = lazy(() => import("../../pages/courses/CourseDetail"));
const CreateUserPage = lazy(() => import("../../pages/CreateUser"));
// ** login situation

// console.log(useSelector((state) => state.islogin.isLogin));

const isLogin = Boolean(getItem("Token1"));

// ** Merge Routes
const Routes = [
  {
    path: "/",
    index: true,
    element: (
      <Navigate replace to={isLogin ? DefaultRoute : DefaulNotLogintRoute} />
    ),
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/courses",
    //element: <CoursesPages />,
    element: <Courses />,
  },
  {
    path: "/courseDetail/:id",
    element: <CourseDetailsPage />,
  },
  {
    path: "/courses/edit/:id",
    element: <EditCourse />,
  },
  {
    path: "/coursereserved",
    element: <CourseReservedPage />,
  },
  {
    path: "/createcourse",
    element: <CreateCoursePage />,
  },
  {
    path: "/terms",
    element: <Terms />,
  },  
  {
    path: "/coursegroups",
    element: <CourseGroupsPage />,
  },

  {
    path: "/mycourses",
    element: <MyCoursesPages />,
  },
  {
    path: "/createcoursegroup",
    element: <CreateCourseGroupPage />,
  },

  {
    path: "/coursepayment",
    element: <Payment />,
  },

  {
    path: "/classes",
    element: <ClassRoom />,
  },
  {
    path: "/coursecomments",
    element: <CourseCommentsPage />,
  },
  {
    path: "/coursegroups/:id",
    element: <CourseGroupDetailsPage />,
  },
  {
    path: "/coursegroups/edit/:id",
    element: <EditCourseGroupPage />,
  },
   {
    path: "/courselevel",
    element: <CourseLevelPage />,
  }, 
   {
    path: "/coursestatus",
    element: <CourseStatus />,
  },   
  {
    path: "/users",
    element: <Users />,
  },

  {
    path: "/users/:id",
    element: <UserDetail />,
  },
  {
    path: "/users/Payments/:id",
    element: <UserPaymentsDetail />,
  },
  {
    path: "/user/edit/:id",
    element: <EditUserPage />,
  },

  {
    path: "create-user",
    element: <CreateUserPage />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },  
  {
    path: "/assistancecourse",
    element: <AssistanceCourse />,
  },
  {
    path: "/papers",
    //element: <Blogs />
    //element: <News />
    element: <BlogsList />,
  },

  {
    path: "/papers/view/:id",
    //element: <PapperViews />
    element: <NewsDetails />,
  },
  {
    path: "/papers/edit/:id",
    element: <EditNews />,
  },
  {
    path: "/papers/commentsreply/:id",
    element: <GetNewsReplyCommentsModal />,
  },
  {
    path: "/createPapers",
    element: <CreateNewsPage />,
  },

  {
    path: "/newsCategory",
    element: <CategoriesPage />,
  },

  {
    path: "/create-category",
    element: <CreateCategory />,
  },

  {
    path: "/create-category/edit/:id",
    element: <EditCategoryPage />,
  },

  {
    path: "/comments",
    element: <Comments />,
  },


  {
    path: "/departmemnt",
    element: <Department />,
  },

   {
    path: "/admin-schedual",
    element: <AdminScheduals />,
  }, 
   {
    path: "/teacher-schedual",
    element: <TeacherSheduals />,
  }, 

  {
    path: "/calendar",
    element: <CalendarComponent />,
  },

  {
    path: "/chat",
    element: <Chat />,
  },
  {
    path: "/socialgrouop",
    element: <SocialGroup />,
  },  
   {
    path: "/technologhy",
    element: <Technologhy />,
  },   
  {
    path: "/login",
    element: <Login />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/register",
    element: <Register />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/error",
    element: <Error />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "*",
    element: <Error />,
    meta: {
      layout: "blank",
    },
  },
];

const getRouteMeta = (route) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta };
    } else {
      return {};
    }
  }
};

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = [];

  if (Routes) {
    Routes.filter((route) => {
      let isBlank = false;
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) &&
          defaultLayout === layout)
      ) {
        const RouteTag = PublicRoute;

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === "blank" ? (isBlank = true) : (isBlank = false);
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
                LayoutWrapper
              : Fragment;

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          );
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route);
      }
      return LayoutRoutes;
    });
  }
  return LayoutRoutes;
};

const getRoutes = (layout) => {
  const defaultLayout = layout || "vertical";
  const layouts = ["vertical", "horizontal", "blank"];

  const AllRoutes = [];

  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout);

    AllRoutes.push({
      path: "/",
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes,
    });
  });
  return AllRoutes;
};

export { DefaultRoute, TemplateTitle, Routes, getRoutes };
