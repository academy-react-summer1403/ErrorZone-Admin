// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Reactstrap Imports
import { Col, Row, TabContent, TabPane } from "reactstrap";

import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import UsersList from "../@core/components/courseList";
import TableHover from "../@core/components/courseList/TableHover";
import { ActiveOrDeactive, delCourse, getCoursesList, getStatictic } from "../core/services/Paper";
import AllRes from "../@core/components/courseList/allCourseRes";

const CoursesPages = () => {
  // ** States
  const [activeTab, setActiveTab] = useState("1");
  const [courses, setCourses] = useState([]);
  const [searched, setSearched] = useState("");
  const [currentPg, setCurrentPg] = useState("1");
  const [totalPg, setTotalPg] = useState(10);
  const [reFechGetCrs, setReFechGetCrs] = useState(1);
  const [staticc, setStaticc] = useState([]);

  
  // console.log("searched", deletee);


  const toggleTab = (tab) => {
    setActiveTab(tab);
  };
  const MySwal = withReactContent(Swal);

  // **API
  const Statictic = async () => {
    try {
      const response = await getStatictic();
      // console.log("response", response.courseDtos.length);
      setStaticc(response.courseDtos)
    } catch (error) {
      throw new Error("ERROR: ", error);
    }
  };

  const allCourses = async (search, page, sort) => {
    try {
      const getCoursesListt = await getCoursesList(searched, page);
      setCourses(getCoursesListt.courseDtos);
      setTotalPg(getCoursesListt.totalCount);
    } catch (error) {
      throw new Error("ERROR: ", error);
    }
  };

  const handleDeleteCourses = (A, I) => {
    // console.log("object", A , I);
    return MySwal.fire({
      title: "آیا مطمعن هستید؟",
      text: "البته امکان بازگشت نیز وجود دارد ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: " بله ",
      cancelButtonText: " لغو ",

      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
    }).then(function (result) {
      if (result.value) {
        const deleteCourses = async () => {
          const data = {
            active: A,
            id: I,
          };
          const res = await delCourse(data);
          res.success
            ? MySwal.fire({
                icon: "success",
                title: "موفقیت ",
                text: "عملیات با موفقیت انجام گردید",
                confirmButtonText: " باشه ",

                customClass: {
                  confirmButton: "btn btn-success",
                },
              }) && setReFechGetCrs(reFechGetCrs + 1)
            : MySwal.fire({
                icon: "error",
                title: "شکست ",
                text: "عملیات با شکست مواجهه گردید",
                confirmButtonText: " باشه ",

                customClass: {
                  confirmButton: "btn btn-success",
                },
              });
        };
        deleteCourses();
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: "لغو",
          text: "عملیات لغو شد :)",
          icon: "error",
          confirmButtonText: " باشه ",

          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      }
    });
  };

  const handleActiveOrDee = (A, I) => {
    return MySwal.fire({
      title: "آیا مطمعن هستید؟",
      text: "البته امکان بازگشت نیز وجود دارد ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: " بله ",
      cancelButtonText: " لغو ",

      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
    }).then(function (result) {
      if (result.value) {
        const activeOrDee = async () => {
          const courseA = {
            active: A,
            id: I,
          };
          const responses = await ActiveOrDeactive(courseA);
          responses.success
            ? MySwal.fire({
                icon: "success",
                title: "موفقیت ",
                text: "عملیات با موفقیت انجام گردید",
                confirmButtonText: " باشه ",

                customClass: {
                  confirmButton: "btn btn-success",
                },
              }) && setReFechGetCrs(reFechGetCrs + 1)
            : MySwal.fire({
                icon: "error",
                title: "شکست ",
                text: "عملیات با شکست مواجهه گردید",
                confirmButtonText: " باشه ",

                customClass: {
                  confirmButton: "btn btn-success",
                },
              });
        };
        activeOrDee();
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: "لغو",
          text: "عملیات لغو شد :)",
          icon: "error",
          confirmButtonText: " باشه ",

          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      }
    });
  };

  // **useEffect
  useEffect(() => {
    allCourses(searched, currentPg);
  }, [searched, currentPg, reFechGetCrs]);

useEffect(() => {
  Statictic()
}, []);

  return (
    <Fragment>
      <Row>
        <Col xs={12}>
          {/* <Tabs className="mb-2" activeTab={activeTab} toggleTab={toggleTab} /> */}
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <UsersList staticc={staticc} />
              {/* <Filter /> */}
              <TableHover
                courses={courses}
                setSearched={setSearched}
                current={currentPg}
                setCurrent={setCurrentPg}
                total={totalPg}
                deleteCourses={handleDeleteCourses}
                activeOrDee={handleActiveOrDee}
              />
            </TabPane>
            <TabPane tabId="2">
              <UsersList staticc={staticc}/>
              <AllRes />
              {/* <Filter /> */}
              {/* <TableHover /> */}
            </TabPane>
            <TabPane tabId="3">
              <UsersList staticc={staticc}/>
              {/* <AllTeachCrs /> */}
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </Fragment>
  );
};
export default CoursesPages;