import react , {useState} from "react";
import { Col, Row } from "reactstrap";

// ** Icon Imports
import { Book, CheckCircle, Trash2 } from "react-feather";


import BreadCrumbs from "../@core/components/breadcrumbs";
import StatsHorizontal from "../@core/components/StatsHorizontal";
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import useQueryGet from "../customHook/useQueryGet";
import CourseAdminComments from "../@core/components/CourseCommentsPages/CourseCommentsPage";

const CourseCommentsPage = () => {
const [isActive, setIsActive] = useState(true)


const { data:ActiveOrDeactive } = useQueryGet(["active"] , (`/Course/CommentManagment?PageNumber=1&Accept=${isActive}`)) 

console.log("isactive" , ActiveOrDeactive)


  return (
    <div className="invoice-list-wrapper">
      <BreadCrumbs
        title="لیست رزرو ها"
        data={[
          { title: "مدیریت دوره ها", link: "/courses" },
          { title: "کامنت های دوره" },
        ]}
      />
      <div className="app-user-list w-100">
        <Row>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="primary"
              statTitle="همه کامنت ها"
              icon={<Book />}
              renderStats={
                <h3 className="fw-bolder mb-75"> 868</h3>
              }

              className="cursor-pointer"
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="success"
              statTitle="کامنت های های تایید شده"
              icon={<CheckCircle />}
              renderStats={
                <h3 className="fw-bolder mb-75">
                 {ActiveOrDeactive?.totalCount}
                </h3>
              }

              className="cursor-pointer"

            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="danger"
              statTitle="کامنت ها های تایید نشده"
              icon={<Trash2 size={20} />}
              renderStats={
                <h3 className="fw-bolder mb-75">
                  278
                </h3>
              }
              className="cursor-pointer"

            />
          </Col>
        </Row>
      </div>
       <CourseAdminComments />
      </div>
  );
};

export default CourseCommentsPage;