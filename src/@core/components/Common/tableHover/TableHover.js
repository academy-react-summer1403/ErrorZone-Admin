// ** Images
import angular from "@src/assets/images/icons/angular.svg";
import angular1 from "../../../../assets/images/new/44.jpg";

// ** Reactstrap Imports
import {
  Badge,
  Button,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Table,
  UncontrolledDropdown,
} from "reactstrap";

import { Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import Select from "react-select";
import { CustomPagination } from "../../pagination";
import { CheckCircle, Delete, Edit, MoreVertical } from "react-feather";

// import { selectThemeColors } from "@utils";

const colourOptions = [
  { value: "ocean", label: "نوع دوره" },
  { value: "blue", label: "مدرس دوره" },
  { value: "purple", label: "قیمت" },
  { value: "red", label: "سطح دوره" },
  { value: "orange", label: "وضعیت دوره" },
];

const TableHover = ({
  courses,
  setSearched,
  current,
  setCurrent,
  total,
  deleteCourses,
  activeOrDee,
}) => {

  // console.log("courses",courses);
  return (
    <>
      <div class="d-flex justify-content-between  h-25 mb-1">
        <div class=" w-25 ">
          <Select
            // theme={selectThemeColors}
            className="react-select  rounded-3"
            classNamePrefix="select"
            // defaultValue={colourOptions[0]}
            name="clear"
            options={colourOptions}
            isClearable
            placeholder="مرتب سازی"
          />
        </div>

        <div className="d-flex align-items-end  rounded-3" style={{ marginLeft: "80px"}}>
          <Formik initialValues={{}} onSubmit={(e) => setSearched(e.search)}>
            <Form className="border rounded d-flex bg-white" style={{ width: "200px" }}>
                  <Field
                    id="search-invoice"
                    name="search"
                    className="me-2 ms-1 border-0 focus-ring focus-ring-light bg-white"
                    type="text"
                    placeholder="جستجو"
                  />
              <Button color="primary" type="submit">
                جستجو
              </Button>
            </Form>
          </Formik>
        </div>
      </div>

      <Table hover style={{ overflow: "visible" }}>
        <thead>
          <tr>
            <th>نام دوره</th>
            <th> نوع دوره</th>
            <th>سطح دوره </th>
            <th className=" px-0">وضعیت فعال بودن </th>
            <th> وضعیت موجود بودن </th>
            <th>اقدام</th>
          </tr>
        </thead>
        <tbody>
          {courses &&
            courses.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <img
                      className="me-75 rounded-circle"
                      
                      src={item.tumbImageAddress==null ||item.tumbImageAddress=="undefined" ?angular1:item?.tumbImageAddress }
                      alt="angular"
                      height="25"
                      width="25"
                    />
                    <span className="align-middle fw-bold">
                      <Link
                        to={"/courses/view/" + item.courseId}
                        style={{ color: "#555" }}
                      >
                        {item.title}
                      </Link>
                    </span>
                  </td>
                  <td>{item.typeName}</td>
                  <td>{item.levelName} </td>
                  <td>
                    <Badge
                      pill
                      color={item.isActive ? "light-primary" : "light-danger"}
                      className="me-1"
                      onClick={() =>
                        activeOrDee(item.isActive ? false : true, item.courseId)
                      }
                    >
                      {item.isActive ? "فعال" : "غیرفعال"}
                    </Badge>
                  </td>
                  <td>
                    <Badge
                      pill
                      color={!item.isdelete ? "light-primary" : "light-danger"}
                      className="me-1"
                      onClick={() =>
                        deleteCourses(
                          item.isdelete ? false : true,
                          item.courseId
                        )
                      }
                    >
                      {item.isdelete ? "حذف شده" : "موجود"}
                    </Badge>
                  </td>
                  <td>
                    {/* <Link
                      to={"/courses/view/" + item.courseId}
                      style={{ color: "#555" }}
                    >
                      <Button>جزئیات</Button>
                    </Link> */}
                    <UncontrolledDropdown direction="start">
                      <DropdownToggle
                        className="icon-btn hide-arrow"
                        color="transparent"
                        size="sm"
                        caret
                      >
                        <MoreVertical size={15} />
                      </DropdownToggle>
                      <DropdownMenu
                        className="d-flex flex-column p-0 "
                        style={{ inset: "0" }}
                      >
                        <DropdownItem
                          onClick={() =>
                            deleteCourses(
                              item.isdelete ? false : true,
                              item.courseId
                            )
                          }
                        >
                          <CheckCircle className="me-50" size={15} />{" "}
                          <span className="align-middle">
                            {item.isdelete ? "موجود کردن " : " حذف کردن "}
                          </span>
                        </DropdownItem>
                        <DropdownItem
                          onClick={() =>
                            activeOrDee(
                              item.isActive ? false : true,
                              item.courseId
                            )
                          }
                        >
                          <Delete className="me-50" size={15} />{" "}
                          <span className="align-middle">
                            {item.isActive ? "غیرفعال کردن" : "فعال کردن"}
                          </span>
                        </DropdownItem>
                        <DropdownItem>
                          <Edit className="me-50" size={15} />{" "}
                          <span className="align-middle">
                            <Link
                              to={"/courses/view/" + item.courseId}
                              style={{ color: "#555" }}
                            >
                              جزئیات
                            </Link>
                          </span>
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>

      <CustomPagination
        total={total}
        current={current}
        setCurrent={setCurrent}
        rowsPerPage={10}
      />
    </>
  );
};

export default TableHover;
