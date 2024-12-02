// ** React Imports
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

// ** Reactstrap Imports
import { Col, Row } from "reactstrap";


import "@styles/react/apps/app-users.scss";
import CourseInfoCard from "../@core/components/courseDetail/courseinfoCard/CourseInfoCard";
import { getCourseByIdAPI, getPayment } from "../core/services/Paper";
import CourseTabs from "../@core/components/courseDetail/courseTabs";
import useQueryGet from "../customHook/useQueryGet";
import { useQuery } from '@tanstack/react-query'

const CourseDetailsPage = () => {
  // ** States
  //const [course, setCourse] = useState();
  const [active, setActive] = useState("1");
  const { id } = useParams();
 const [changeFlag, setChangeFlag] = useState([])
  //const navigate = useNavigate();

  const ChangeHandler = () => {
    setChangeFlag(!changeFlag)
  }

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };


  const {data: course, refetch, isLoading} = useQuery({queryKey: ['GetDetailCourse', id], queryFn: () => getCourseByIdAPI(id)})
 // const {data: course , refetch} = useQueryGet(["getDetail" ] , `/Course/${id}`)




  // ** Get Course
  //  useEffect(() => {
  //    const fetchCourse = async () => {
  //      try {
  //        const getCourse = await getCourseByIdAPI(id);

  //        setCourse(getCourse);
  //      } catch (error) {
  //        toast.error("مشکلی در دریافت دوره به وجود آمد !");
  //      }
  //    };
  //   //getPay()
  //    fetchCourse();
  //  }, [changeFlag]);

  //if (!course) navigate("/courses");

const { data:getpayment } = useQueryGet(["getpayment"] , `/CoursePayment/ListOfWhoIsPay?CourseId=${id}`)

const getAllPayments = getpayment?.notDonePays


  //setUnpay(getpayment?.notDonePays)
  //setPay(getpayment?.donePays);

// useEffect(() => {
//   getPay()

// }, [])

  //  const getPay = async () => {
  //    try {
  //      const responses = await getPayment(id);
  //      setPay(responses.donePays);
  //      setUnpay(responses.notDonePays)
  //    } catch (error) {
  //      throw new Error("ERROR: ", error);
  //    }
  //  };

  return (
    <div className="app-user-view">
      <Row>
        <Col xl="4" lg="5.2" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <CourseInfoCard course={course} refetch={refetch} />
        </Col>
        <Col
          xl="8"
          lg="7"
          xs={{ order: 0 }}
          md={{ order: 1, size: 7 }}
          className="course-tabs-wrapper"
        >
          <div class="course-tabs">
             <CourseTabs active={active} toggleTab={toggleTab} course={course} allPayments={getAllPayments} refetch={refetch} /> 
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CourseDetailsPage;