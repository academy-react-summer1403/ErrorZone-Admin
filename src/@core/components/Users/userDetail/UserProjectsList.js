import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// ** Reactstrap Imports
import { Button, Card, CardHeader, Col, Progress } from "reactstrap";

// ** Third Party Components
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";

// ** Custom Components
import Avatar from "@components/avatar";
import AvatarPic from "./../../../assets/images/portrait/small/avatar-s-1.jpg";


// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";
import classNames from "classnames";

const UserProjectsList = ({ setCenteredModall, allCoursess }) => {
  //const userInfo = useSelector((state) => state.userList.usersDetails);
  //const usersCourse = userInfo.courses;
  // console.log(usersCourse);

  const navigate = useNavigate();

  const columns = [
    {
      sortable: true,
      maxWidth: "300px",
      name: "نام دوره",
      selector: (row) => row.title,
      cell: (row) => {
        // console.log("roww",row);
        return (
          <div className="d-flex justify-content-left align-items-center">
            <div className="avatar-wrapper">
              {row.tumbImageAddress != null ?
              <Avatar
              className="me-1"
              img={row.tumbImageAddress}
              alt="#"
              imgWidth="32"
              />:
              <Avatar
              className="me-1"
              img={AvatarPic}
              alt="#"
              imgWidth="32"
              />
            }
            </div>
            <span
              className="text-truncate fw-bolder"
              onClick={() => {
                navigate("/courses/view/" + row.courseId);
              }}
            >
              {row.title}
            </span>
          </div>
        );
      },
    },
    {
      name: "توضیحات دوره",
      maxWidth: "200px",
      selector: (row) => row.describe,
    },
    {
      name: "تاریخ آخرین بروزرسانی",
      maxWidth: "180px",
      selector: (row) => {
        row.lastUpdate;
        let sYear = row.lastUpdate && row.lastUpdate.substring(0, 4);
        let sMonth = row.lastUpdate && row.lastUpdate.substring(5, 7);
        let sDay = row.lastUpdate && row.lastUpdate.substring(8, 10);
        let stTime = sYear + "/" + sMonth + "/" + sDay;
        return stTime;
      },
    },
  ];

  return (
    <>
      <Card>
        {/* <CardHeader tag="h4">لیست دوره های کاربر</CardHeader> */}
        <div className="react-dataTable user-view-account-projects">
          <DataTable
            noHeader
            responsive
            columns={columns}
            //data={usersCourse}
            className="react-dataTable"
            sortIcon={<ChevronDown size={10} />}
          />
        </div>
      </Card>
    </>
  );
};

export default UserProjectsList;
