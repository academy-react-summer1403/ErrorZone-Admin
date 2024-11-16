import React, { Fragment, useState } from "react";
import useQueryGet from "../../customHook/useQueryGet";
import AvatarGroup from "@components/avatar-group";
import notFoundImage from "../../assets/images/Image-not-found.png";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Badge,
  UncontrolledDropdown,
  Card,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Label,
  Input,
  Button,
} from "reactstrap";
import {
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Edit,
  Trash,
  ChevronDown,
  XSquare,
  CheckSquare,
} from "react-feather";
import ReactPaginate from "react-paginate";
import useMutationPut, {
  useMutationPutFormData,
} from "../../customHook/useMutationPut";
import { Link, useNavigate } from "react-router-dom";
import useMutationDelete from "../../customHook/useMutationDelete";
import { deActiveCourseFn } from "../../core/utils/deActiveCourseFn";
import { onDeleteCourseFn } from "../../core/utils/onDeleteCourse";
import { deleteCourseFn } from "../../core/utils/deleteCourseFn";
import { activeCourseFn } from "../../core/utils/activeCourseFn";
import changeCourseStatus from "../../core/utils/changeCourseStatus";
import Autocomplete from "../../@core/components/autocomplete";

const Courses = () => {
  const [pageNum, setPageNum] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  // get parts
  const { data } = useQueryGet(
    ["corses", pageNum, searchValue],
    `/Course/CourseList?PageNumber=${pageNum ? pageNum : 1}&RowsOfPage=20${
      !!searchValue ? `&Query=${searchValue}` : ""
    }&SortingCol=DESC&SortType=isActive`
  );

  //* mutations part *//
  const {
    mutate: activeDeActive,
    isSuccess: activeDeActiveDone,
    isError: activeDeActiveErr,
  } = useMutationPut("/Course/ActiveAndDeactiveCourse", ["corses"]);
  const {
    mutate: deleteOnDelete,
    isSuccess: deleteOnDeleteDone,
    isError: deleteOnDeleteErr,
  } = useMutationDelete("/Course/DeleteCourse", ["corses"]);
  const {
    mutate: changeStatus,
    isSuccess: changeStatusDone,
    isError: changeStatusErr,
  } = useMutationPutFormData("/Course/UpdateCourseStatus", ["corses"]);

  const navigate = useNavigate();
  return (
    <Card>
      <div className="w-25 ms-2">
        <Label className="me-1" for="search-input">
          جستوجو
        </Label>
        <Input
          className="dataTable-filter mb-50 "
          type="text"
          bsSize="sm"
          id="search-input"
          placeholder="جستوجو ..."
          onChange={(e) => {
            setTimeout(() => setSearchValue(e.target.value), 700);
          }}
        />
      </div>
      <Table hover responsive>
        <thead>
          <tr>
            <th>دوره</th>
            <th>استاد</th>
            <th>قیمت</th>
            <th>وضعیت برگزاری دوره</th>
            <th> وضعیت فعال بودن</th>
            <th>وضعیت حذف</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          {data ? (
            data.courseDtos.map((item, index) => {
              return (
                <tr
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/courseDetail/${item.courseId}`);
                  }}
                  key={index}
                >
                  {" "}
                  {/* give course deatil link to navigate function */}
                  <td>
                    {item.tumbImageAddress ? (
                      <img
                        className="me-75"
                        src={item.tumbImageAddress}
                        alt=""
                        height="48"
                        width="48"
                        style={{ borderRadius: "8px" }}
                      />
                    ) : (
                      <img
                        className="me-75"
                        src={notFoundImage}
                        alt=""
                        height="48"
                        width="48"
                        style={{ borderRadius: "8px" }}
                      />
                    )}
                    <span className="align-middle fw-bold">{item.title}</span>
                  </td>
                  <td>{item.fullName}</td>
                  <td>{Math.floor(item.cost)} تومان</td>
                  <td>
                    <UncontrolledButtonDropdown>
                      {item.statusName == "شروع ثبت نام" ? (
                        <DropdownToggle
                          color="none"
                          className="btn-gradient-info"
                          // className="fw-semibold"
                          size="sm"
                          caret
                          onClick={(e) => e.stopPropagation()}
                        >
                          شروع ثبت نام
                        </DropdownToggle>
                      ) : (
                        false
                      )}
                      {item.statusName == "درحال برگزاری" ? (
                        <DropdownToggle
                          color="none"
                          className="btn-gradient-secondary"
                          // className="fw-semibold"
                          size="sm"
                          caret
                          onClick={(e) => e.stopPropagation()}
                        >
                          درحال برگزاری
                        </DropdownToggle>
                      ) : (
                        false
                      )}
                      {item.statusName == "منقضی شده" ? (
                        <DropdownToggle
                          color="none"
                          className="btn-gradient-warning"
                          // className="fw-semibold"
                          size="sm"
                          caret
                          onClick={(e) => e.stopPropagation()}
                        >
                          منقضی شده
                        </DropdownToggle>
                      ) : (
                        false
                      )}

                      <DropdownMenu>
                        <DropdownItem
                          href="/"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            changeCourseStatus(
                              item,
                              1,
                              changeStatus,
                              changeStatusDone,
                              changeStatusErr,
                              "شروع ثبت نام "
                            );
                          }}
                          className="text-info"
                        >
                          <CheckSquare className="me-50" size={15} />
                          <span className="align-middle"> شروع ثبت نام </span>
                        </DropdownItem>
                        <DropdownItem
                          href="/"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            changeCourseStatus(
                              item,
                              2,
                              changeStatus,
                              changeStatusDone,
                              changeStatusErr,
                              "منقضی شده"
                            );
                          }}
                          className="text-warning"
                        >
                          <XSquare className="me-50" size={15} />{" "}
                          <span className="align-middle">منقضی شده</span>
                        </DropdownItem>
                        <DropdownItem
                          href="/"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            changeCourseStatus(
                              item,
                              3,
                              changeStatus,
                              changeStatusDone,
                              changeStatusErr,
                              "درحال برگزاری "
                            );
                          }}
                          className="text-secondary"
                        >
                          <XSquare className="me-50" size={15} />{" "}
                          <span className="align-middle"> درحال برگزاری </span>
                        </DropdownItem>
                        <DropdownItem divider></DropdownItem>
                        <DropdownItem
                          href="/"
                          tag="a"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                        >
                          <Link to="/login">صفحه ی تغییرات کورس</Link>
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledButtonDropdown>
                  </td>
                  <td>
                    <UncontrolledButtonDropdown>
                      {item.isActive ? (
                        <DropdownToggle
                          color="none"
                          className="btn-gradient-info"
                          // className="fw-semibold"
                          size="sm"
                          caret
                          onClick={(e) => e.stopPropagation()}
                        >
                          فعال
                        </DropdownToggle>
                      ) : (
                        <DropdownToggle
                          color="none"
                          className="btn-gradient-danger"
                          // className="fw-semibold"
                          size="sm"
                          caret
                          onClick={(e) => e.stopPropagation()}
                        >
                          غیر فعال
                        </DropdownToggle>
                      )}

                      <DropdownMenu>
                        <DropdownItem
                          href="/"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            activeCourseFn(
                              item,
                              activeDeActive,
                              activeDeActiveDone,
                              activeDeActiveErr
                            );
                          }}
                          className="text-info"
                        >
                          <CheckSquare className="me-50" size={15} />
                          <span className="align-middle"> فعال کردن</span>
                        </DropdownItem>
                        <DropdownItem
                          href="/"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            deActiveCourseFn(
                              item,
                              activeDeActive,
                              activeDeActiveDone,
                              activeDeActiveErr
                            );
                          }}
                          className="text-danger"
                        >
                          <XSquare className="me-50" size={15} />{" "}
                          <span className="align-middle">غیر فعال کردن</span>
                        </DropdownItem>
                        <DropdownItem divider></DropdownItem>
                        <DropdownItem
                          href="/"
                          tag="a"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                        >
                          <Link to="/login">صفحه ی تغییرات کورس</Link>
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledButtonDropdown>
                  </td>
                  <td>
                    <UncontrolledButtonDropdown>
                      {item.isdelete ? (
                        <DropdownToggle
                          color="none"
                          className="btn-gradient-danger"
                          size="sm"
                          caret
                          onClick={(e) => e.stopPropagation()}
                        >
                          حذف شده
                        </DropdownToggle>
                      ) : (
                        <DropdownToggle
                          color="none"
                          className="btn-gradient-success"
                          size="sm"
                          caret
                          onClick={(e) => e.stopPropagation()}
                        >
                          موجود
                        </DropdownToggle>
                      )}
                      <DropdownMenu>
                        <DropdownItem
                          href="/"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onDeleteCourseFn(
                              item,
                              deleteOnDelete,
                              deleteOnDeleteDone,
                              deleteOnDeleteErr
                            );
                          }}
                          className="text-success"
                        >
                          <CheckSquare className="me-50" size={15} />
                          <span className="align-middle"> موجود کردن</span>
                        </DropdownItem>
                        <DropdownItem
                          href="/"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            deleteCourseFn(
                              item,
                              deleteOnDelete,
                              deleteOnDeleteDone,
                              deleteOnDeleteErr
                            );
                          }}
                          className="text-danger"
                        >
                          <XSquare className="me-50" size={15} />{" "}
                          <span className="align-middle"> حذف کردن</span>
                        </DropdownItem>
                        <DropdownItem divider></DropdownItem>
                        <DropdownItem
                          href="/"
                          tag="a"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                        >
                          <Link to="/login">صفحه ی تغییرات کورس</Link>
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledButtonDropdown>
                  </td>
                  <td>
                    <UncontrolledDropdown direction="start">
                      <DropdownToggle
                        className="icon-btn hide-arrow"
                        color="transparent"
                        size="sm"
                        caret
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical size={15} />
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem
                          href="/"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                        >
                          <Edit className="me-50" size={15} />{" "}
                          <span className="align-middle">Edit</span>
                        </DropdownItem>
                        <DropdownItem
                          href="/"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                        >
                          <Trash className="me-50" size={15} />{" "}
                          <span className="align-middle">Delete</span>
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </td>
                </tr>
              );
            })
          ) : (
            <div className=""></div>
          )}
        </tbody>
      </Table>
      {/*  */}

      <ReactPaginate
        nextLabel=""
        pageCount={Math.ceil(data?.totalCount / 20)}
        breakLabel="..."
        previousLabel=""
        activeClassName="active"
        pageClassName="page-item"
        breakClassName="page-item"
        pageLinkClassName="page-link"
        nextLinkClassName="page-link"
        breakLinkClassName="page-link"
        previousLinkClassName="page-link"
        nextClassName="page-item next-item"
        previousClassName="page-item prev-item"
        containerClassName="pagination react-paginate justify-content-center"
        onPageChange={(e) => setPageNum(e.selected + 1)}
      />
      {/*  */}
    </Card>
  );
};

export default Courses;
