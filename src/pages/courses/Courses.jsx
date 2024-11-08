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
import useMutationPut from "../../customHook/useMutationPut";
import { Link, useNavigate } from "react-router-dom";
import useMutationDelete from "../../customHook/useMutationDelete";
import { deActiveCourseFn } from "../../core/utils/deActiveCourseFn";
import { onDeleteCourseFn } from "../../core/utils/onDeleteCourse";
import { deleteCourseFn } from "../../core/utils/deleteCourseFn";
import { activeCourseFn } from "../../core/utils/activeCourseFn";

const Courses = () => {
  const [pageNum, setPageNum] = useState(1);
  const { data } = useQueryGet(
    ["corses", pageNum],
    `/Course/CourseList?PageNumber=${
      pageNum ? pageNum : 1
    }&RowsOfPage=20&SortingCol=DESC&SortType=isActive`
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

  const navigate = useNavigate();
  return (
    <Card>
      <Table hover responsive>
        <thead>
          <tr>
            <th>دوره</th>
            <th>استاد</th>
            <th>سطح</th>
            <th>وضعیت</th>
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
                    navigate("/");
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
                  <td>
                    <Badge pill color="light-secondary" className="me-1">
                      {item.levelName}
                    </Badge>
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
                          color="danger"
                          size="sm"
                          caret
                          onClick={(e) => e.stopPropagation()}
                        >
                          حذف شده
                        </DropdownToggle>
                      ) : (
                        <DropdownToggle
                          color="success"
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
                    <UncontrolledDropdown>
                      <DropdownToggle
                        className="icon-btn hide-arrow"
                        color="transparent"
                        size="sm"
                        caret
                      >
                        <MoreVertical size={15} />
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem
                          href="/"
                          onClick={(e) => e.preventDefault()}
                        >
                          <Edit className="me-50" size={15} />{" "}
                          <span className="align-middle">Edit</span>
                        </DropdownItem>
                        <DropdownItem
                          href="/"
                          onClick={(e) => e.preventDefault()}
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
