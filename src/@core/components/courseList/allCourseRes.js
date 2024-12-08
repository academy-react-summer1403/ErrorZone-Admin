// ** Images
import angular from "@src/assets/images/icons/angular.svg";
import angular1 from "../../assets/images/portrait/small/blank-thumbnail.jpg";


// ** Reactstrap Imports
import { Table, Badge, Button } from "reactstrap";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { getAllRes } from "../../../core/services/Paper";


// **start
const AllRes = () => {
  const [allCrs, setAllCrs] = useState([]);
// console.log("allCrs",allCrs);
  // **API
  const getAllRess = async () => {
    try {
      const responses = await getAllRes();
      const resFilter = responses.filter((e) => {
        return e.accept == false;
      });
      setAllCrs(resFilter);
    } catch (error) {
      throw new Error("ERROR: ", error);
    }
  };

  // **useEfect
  useEffect(() => {
    getAllRess();
  }, []);

  return (
    <>
      <Table hover>
        <thead>
          <tr>
            <th>نام دوره</th>
            <th> نام دانشجو</th>
            <th>تاریخ رزرو </th>
            <th>وضعیت </th>
            <th>اقدام</th>
          </tr>
        </thead>
        <tbody>
          {allCrs &&
            allCrs.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <img
                      className="me-75"
                      src={item.tumbImageAddress==null ||item.tumbImageAddress=="undefined" ?angular1:item?.tumbImageAddress }

                      // src={angular}
                      alt="angular"
                      height="20"
                      width="20"
                    />

                    <span className="align-middle fw-bold">
                      <Link
                        to={"courseDetail/" + item.courseId}
                        style={{ color: "#555" }}
                      >
                        {" "}
                        {item.courseName}{" "}
                      </Link>
                    </span>
                  </td>
                  <td>{item.studentName}</td>
                  <td>{item.reserverDate}</td>
                  <td>
                    <Badge pill color="light-danger" className="me-1">
                      {/* {item.isActive == true ? "فعال" : "غیرفعال"} */}
                      تایید نشده
                    </Badge>
                  </td>
                  <td>
                    <Link to={"courseDetail/" + item.courseId}>
                      <Button>جزئیات</Button>
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
};

export default AllRes;
