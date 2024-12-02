// ** Reactstrap Imports
import { Card, CardBody, Col, Row , CardHeader , Label , Input } from "reactstrap";
import { useState } from 'react'
import Select from 'react-select'
// ** Context
import toast from 'react-hot-toast'
// ** Custom Components
import StatsVertical from "@components/widgets/stats/StatsVertical";
import DataTable from "react-data-table-component";
// ** Icons Imports
import { Eye, Heart, MessageSquare, ShoppingBag , ChevronDown } from "react-feather";
import useQueryGet from "../../../../customHook/useQueryGet";
import { AddTech, ChangeStatusCourse } from "../../../../core/services/Paper";
import { useParams } from "react-router-dom";
import { COURSE_USERS_COLUMNS } from "../../courseColumns/course-users-columns";
import CourseReserve from "./CourseReserve";
import CourseUserPage from "./CourseUserPages";

const CourseData = ({
  courseUserTotal,
  courseCommentTotal,
  paymentDoneTotal,
  courseLikeTotal,
  describe,
  course,
  refetch

}) => {
  const {data: Category, refetch: refetchCat, isLoading: isLoadingCat} = useQueryGet(['GetDetailCourse'], "/Home/GetTechnologies")
  const [currentStatus, setCurrentStatus] = useState({value: '', label: course?.courseStatusName || 'انتخاب کنید'})
  
  const [currentCat, setCurrentCat] = useState({value: '', label: course?.courseTeches[1] || 'انتخاب کنید'})
  const CatOption = Category?.map(cat => ({value: cat.id, label: cat.techName}))

  const {id} = useParams()

  let convertedDescribe = "";

  const statusOptions = [
    { value: '', label: 'انتخاب کنید' },
    { value: 1, label: "شروع ثبت نام" },
    { value: 3, label: "درحال برگزاری" },
    { value: 2, label: "منقضی شده" },
  ]

  try {
    const convertDescribe = JSON.parse(describe);

    convertedDescribe = convertDescribe;
  } catch (error) {
    convertedDescribe = describe;
  }

  const loadContent = () => {
    return convertedDescribe?.blocks?.map((block, ind) => {
      switch (block.type) {
        case "header":
          return <h3 key={ind}>{block.data.text}</h3>;

        case "paragraph":
          return (
            <p key={ind} className="news-details-paragraph">
              {block.data.text}
            </p>
          );

        default:
          return null;
      }
    });
  };

  return (
    <>
      <Row>
        <Col xl="3" md="4" sm="6">
          <StatsVertical
            icon={<Eye size={21} />}
            color="info"
            stats={courseUserTotal}
            statTitle="دانشجو"
          />
        </Col>
        <Col xl="3" md="4" sm="6">
          <StatsVertical
            icon={<MessageSquare size={21} />}
            color="warning"
            stats={courseCommentTotal}
            statTitle="نظر"
          />
        </Col>
        <Col xl="3" md="4" sm="6">
          <StatsVertical
            icon={<ShoppingBag size={21} />}
            color="danger"
            stats={paymentDoneTotal}
            statTitle="سفارش"
          />
        </Col>
        <Col xl="3" md="4" sm="6">
          <StatsVertical
            icon={<Heart size={21} />}
            color="primary"
            stats={courseLikeTotal}
            statTitle="لایک"
          />
        </Col>
      </Row>
      <Card>
        <CardBody>
          <h4>توضیحات دوره</h4>
          <div className="mt-2">{loadContent()}</div>
        </CardBody>
      </Card>

      <Card>
        <h4 style={{marginRight: "10px" , marginTop: "10px"}}>  تکنولوژی:  </h4>
        <CardBody>
           <div style={{display: "flex" , gap: "20px"}}>
            <div style={{width: "500px",}}> 
            <Select            
             isClearable={false}
            id='tech'
            name='tech'
            value={currentCat}
            options={CatOption}
            className='react-select'
            classNamePrefix='select'
            theme=''
            onChange={async (data) => {
              setCurrentCat(data)
              const response = await AddTech(id, data.value)
              if(response.success == true){
                if(response.message.match('تکنولوژی برای این کورس قبلا افزوده شده.عملیات با موفقیت انجام شد.')){
                  toast.error(' این تکنولوژی قبلا برای این دوره ثبت شده است ')
                  refetch()
                }
                else{
                  toast.success(response.message)                }
              }
            }}/>
            </div>
            <div style={{width: "500px"}}>             
            <Select           
            isClearable={false}
          value={currentStatus}
          options={statusOptions}
          className='react-select'
          classNamePrefix='select'
          theme=''
          onChange={async (data) => {
            setCurrentStatus(data)
            const dataObj = new FormData()
            dataObj.append('CourseId', course.courseId)
            dataObj.append('StatusId', data.value)
            const response = await ChangeStatusCourse(dataObj)
            if(response.success == true){
              toast.dismiss()
              toast.success(response.message)
              refetch()
            }
          }}/>
          </div>
          </div>
        </CardBody>
      </Card>
      <Card>
        <CourseUserPage />
      </Card>
    </>
  );
};

export default CourseData;
