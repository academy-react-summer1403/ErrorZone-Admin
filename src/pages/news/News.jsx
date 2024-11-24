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
  Col, 
  Row 
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
  CheckCircle,
  Trash2,
} from "react-feather";
import ReactPaginate from "react-paginate";
import useMutationPut, {
  useMutationPutFormData,
} from "../../customHook/useMutationPut";
import { Link, useNavigate } from "react-router-dom";
import useMutationDelete from "../../customHook/useMutationDelete";
import changeCourseStatus from "../../core/utils/changeCourseStatus";
import Autocomplete from "../../@core/components/autocomplete";
import { convertDateToPersian } from "../../utility/hooks/date-helper.utils";
import BreadCrumbs from "../../@core/components/breadcrumbs";
import StatsHorizontal from "../../@core/components/StatsHorizontal";
import { deActiveNewsFn } from "../../core/newsUtility/deActiveNewsFn";
import { onDeletNewsFn } from "../../core/newsUtility/onDeleteNews";
import { activeNewsFn } from "../../core/newsUtility/activeNewsFn";


const News = () => {
  const [pageNum, setPageNum] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [activeNews, setActiveNews] = useState();
  const [active, setActive] = useState(true);
  const [deletedNews, setDeletedNews] = useState();
  // get parts
  const { data } = useQueryGet(
    ["news", pageNum, searchValue],
    `/News/AdminNewsFilterList?PageNumber=${pageNum ? pageNum : 1}&RowsOfPage=20${
      !!searchValue ? `&Query=${searchValue}` : ""
    }&SortingCol=DESC&SortType=isActive`
  );

  //* mutations part *//
  const {
    mutate: activeDeActive,
    isSuccess: activeDeActiveDone,
    isError: activeDeActiveErr,
  } = useMutationPut("/News/ActiveDeactiveNews", ["news"]);
  const {
    mutate: deleteOnDelete,
    isSuccess: deleteOnDeleteDone,
    isError: deleteOnDeleteErr,
  } = useMutationDelete("/Course/DeleteCourse", ["news"]);
  const {
    mutate: changeStatus,
    isSuccess: changeStatusDone,
    isError: changeStatusErr,
  } = useMutationPutFormData("/Course/UpdateCourseStatus", ["news"]);

  const navigate = useNavigate();


  return (
    <> 
    <BreadCrumbs
        title="لیست اخبار"
        data={[
          { title: "مدیریت اخبار", link: "/papper" },
          { title: "لیست اخبار" },
        ]}
      />
    <div className="app-user-list w-100">
    <Row>
      <Col lg="3" sm="6">
        <StatsHorizontal
          color="success"
          statTitle="اخبار فعال"
          icon={<CheckCircle />}
          renderStats={
            <h3 className="fw-bolder mb-75">
              {activeNews?.totalCount || 0}
            </h3>
          }
          onClick={() => setActive(true)}
          className="cursor-pointer"
          backgroundColor={active === true && "rgb(0 0 0 / 23%)"}
        />
      </Col>
      <Col lg="3" sm="6">
        <StatsHorizontal
          color="danger"
          statTitle="اخبار غیر فعال"
          icon={<Trash2 size={20} />}
          renderStats={
            <h3 className="fw-bolder mb-75">
              {deletedNews?.totalCount || 0}
            </h3>
          }
          onClick={() => setActive(false)}
          className="cursor-pointer"
          backgroundColor={active === false && "rgb(0 0 0 / 23%)"}
        />
      </Col>
    </Row>
  </div>





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
            <th>دسته بندی</th>
            <th>اخرین اپدیت</th>
            <th> تعداد بازدید </th>
            <th> وضعیت فعال بودن</th>
            <th>وضعیت حذف</th>
            <th> عملیات </th>
          </tr>
        </thead>
        <tbody>
          {data ? (
            data?.news?.map((item, index) => {
              return (
                <tr
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/papers/view/${item.id}`);
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
                  <td>{item.newsCatregoryName}</td>
                  <td> {convertDateToPersian(item.updateDate)} </td>
                  <td>
                    {item.currentView}
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
                            activeNewsFn(
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
                            deActiveNewsFn(
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
                            onDeletNewsFn(
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
    </>
  );
};

export default News;
