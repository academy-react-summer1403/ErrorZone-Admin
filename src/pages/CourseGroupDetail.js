// ** React Imports
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

// ** Reactstrap Imports
import { Col, Row } from "reactstrap";

// ** Core Imports

import CourseGroupInfoCard from "../@core/components/courseGroupdetails/CourseGroupInfoCard";
import { getCourseGroupDetailsAPI } from "../core/services/Paper";
import CourseGroupDetailsTab from "./CourseGroupDetailsTab";


//import CourseGroupDetailsTab from "../@core/components/CourseGroupDetails/Tabs";

const CourseGroupDetailsPage = () => {
  // ** States
  const [courseGroup, setCourseGroup] = useState();
  const [active, setActive] = useState("1");

  // ** Hooks
  const { id } = useParams();

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  useEffect(() => {
    const fetchCourseGroup = async () => {
      try {
        const getCourseGroup = await getCourseGroupDetailsAPI(id);

        setCourseGroup(getCourseGroup);
      } catch (error) {
        toast.error("مشکلی در دریافت گروه دوره به وجود آمد !");
      }
    };

    fetchCourseGroup();
  }, []);


  console.log(courseGroup,"xconPCHioca");

  return (
    <div className="app-user-view">
      <Row>
        <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <CourseGroupInfoCard group={courseGroup} />
        </Col>
        <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <CourseGroupDetailsTab shedualsData={courseGroup?.courseSchedules} toggleTab={toggleTab} active={active} />

        </Col>
      </Row>
    </div>
  );
};

export default CourseGroupDetailsPage;