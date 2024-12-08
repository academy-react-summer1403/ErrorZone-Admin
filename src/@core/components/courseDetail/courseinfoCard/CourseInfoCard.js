// ** React Imports
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Badge, Button, Card, CardBody } from "reactstrap";
import { Briefcase, Check } from "react-feather";
import Avatar from "@components/avatar";
import "@styles/react/libs/react-select/_react-select.scss";
import { persianNumberFormatter } from "../../../../core/utility/persian-number-formatter-helper";
import { getCourseGroupAPI } from "../../../../core/services/Paper";
import { handleDeleteCourse } from "../../../../utility/hooks/deleteCourse";
import { handleActiveInactiveCourse } from "../../../../utility/hooks/activeCourse";
import useQueryGet from "../../../../customHook/useQueryGet";
import CourseSocialGroupModal from "../../coursesocialgroup/CourseSocialGroupModal";
import CourseDetailScadual from "./CourseDetailScadual";


const levelColors = {
  "فوق پیشرفته": "light-success",
  پیشرقته: "light-secondary",
  مبتدی: "light-warning",
};

const statusColors = {
  "شروع ثبت نام": "light-success",
  "درحال برگزاری": "light-secondary",
  "منقضی شده": "light-warning",
};

const CourseInfoCard = ({ course , refetch }) => {
  // ** States
  const [courseGroup, setCourseGroup] = useState();
  const [isDeleted, setIsDeleted] = useState(false);
  const [comModal, setComModal] = useState(false);
  const [show, setShow] = useState(false)

  const navigate = useNavigate();

  const {data :socialgroup , refetch: refetchGroup  } = useQueryGet(["GetDetailCourse"] , ("/CourseSocialGroup")) 

  const filtered = socialgroup?.filter((item) => item.courseId === course?.courseId )

  
  const renderCourseImg = () => {
    if (course?.imageAddress !== "undefined" && course?.imageAddress !== null) {
      return (
        <img
          height="110"
          width="200"
          alt="course-image"
          src={course?.imageAddress}
          className="img-fluid rounded mt-3 mb-2"
        />
      );
    } else {
      return (
        <Avatar
          initials
          color={course?.imageAddress || "light-primary"}
          className="rounded mt-3 mb-2"
          content={course?.title}
          contentStyles={{
            borderRadius: 0,
            fontSize: "calc(48px)",
            width: "100%",
            height: "100%",
          }}
          style={{
            height: "110px",
            width: "110px",
          }}
        />
      );
    }
  };

   const formattedCoursePrice = () => persianNumberFormatter(course?.cost);

   useEffect(() => {
     if (course) {
       const fetchCourseGroup = async () => {
         try {
           const getCourseGroup = await getCourseGroupAPI(
            course?.teacherId,
             course?.courseId
           );

           setCourseGroup(getCourseGroup[0]);
         } catch (error) {
           toast.error("مشکلی در دریافت گروه دوره به وجود آمد.");
         }
       };

       fetchCourseGroup();
     }
   }, [course]);

  return (
    <Fragment>
      <Card className="course-info-card">
        <CardBody>
          <div className="user-avatar-section">
            <div className="d-flex align-items-center flex-column">
              {renderCourseImg()}
              <div className="d-flex flex-column align-items-center text-center">
                <div className="user-info">
                  <h4>{course?.title}</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-around my-2 pt-75">
            <div className="d-flex align-items-start me-2">
              <Badge color="light-primary" className="rounded p-75">
                <Check className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{formattedCoursePrice()}</h4>
                <small>قیمت دوره</small>
              </div>
            </div>
            <div className="d-flex align-items-start">
              <Badge color="light-primary" className="rounded p-75">
                <Briefcase className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{courseGroup?.groupName}</h4>
                <small>نام گروه</small>
              </div>
            </div>
          </div>
          <h4 className="fw-bolder border-bottom pb-50 mb-1">اطلاعات دوره</h4>
          <div className="info-container">
            {course !== null ? (
              <ul className="list-unstyled">
                <li className="mb-75">
                  <span className="fw-bolder me-25">عنوان دوره:</span>
                  <span>{course?.title}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">استاد دوره:</span>
                  <span>{course?.teacherName}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">سطح دوره:</span>
                  <Badge
                    className="text-capitalize"
                    color={levelColors[course?.courseLevelName]}
                  >
                    {course?.courseLevelName}
                  </Badge>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">نوع دوره:</span>
                  <span>{course?.courseTypeName}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">وضعیت دوره:</span>
                  <Badge
                    className="text-capitalize"
                    color={statusColors[course?.courseStatusName]}
                  >
                    {course?.courseStatusName}
                  </Badge>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">نام کلاس:</span>
                  <span>{course?.courseClassRoomName}</span>
                </li>
                {course && course.courseTeches.length > 0 && (
                  <li className="mb-75 d-flex">
                    <span className="fw-bolder me-25">تکنولوژی های دوره :</span>
                    <div className="d-flex flex-wrap course-details-technologies-wrapper">
                      {course &&
                        course?.courseTeches.map((tech) => (
                          <Badge key={course.courseId} color="light-primary">
                            {tech}
                          </Badge>
                        ))}
                    </div>
                  </li>
                )}
                <li style={{display: "flex", flexFlow: "wrap" , gap: "3px"}}>
                  <span onClick={() => {  setComModal(!comModal);}} className="fw-bolder me-25" style={{cursor: "pointer"}}>گروه اجتماعی  دوره :</span>
                  {filtered?.map((item , index) => {
                    return (
                    
                       <  Badge color="light-primary">  {item.groupLink} </Badge>
                      
                     )
                  })}
                </li>
              </ul>
            ) : null}
          </div>
          <div className="" style={{display: "flex" , gap: "5px"}}>
            <div className="">
              <Button
                color="primary"
                tag={Link}
                to={`/courses/edit/${course?.courseId}`}
              >
                ویرایش
              </Button>
              </div>
               <div>
              <Button
                color="danger"

                onClick={() =>
                  handleDeleteCourse(isDeleted, course?.courseId, setIsDeleted)
                }
              >
                {isDeleted ? "بازگردانی " : "حذف "}
              </Button>
            </div>
            <div>
              <Button
                color="success"
                onClick={() =>
                  handleActiveInactiveCourse(
                    course?.isActive,
                    course?.courseId,
                    refetch()
                   // ChangeHandler={ChangeHandler}                 
                  )
                }
              >
                {course?.isActive ? "غیر فعال  " : "فعال  "}
              </Button>
            </div>
             <div>
              <Button
                color="warning"
                onClick={ () => setShow(!show)}
              >
                <span>  افزودن بازه زمانی   </span>
              </Button>
             </div>
          </div>
        </CardBody>
      </Card>
      <CourseSocialGroupModal 
         setComModal={setComModal}
         comModal={comModal}
         id={course?.courseId}
         refetch={refetchGroup}
      />
      <CourseDetailScadual show={show} setShow={setShow} course={course}/>
    </Fragment>
  );
};

export default CourseInfoCard;
