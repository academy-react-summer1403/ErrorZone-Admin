import react, { useState, useEffect, Fragment } from "react";
import ReactPaginate from "react-paginate";

import DataTable from "react-data-table-component";

import { CheckCircle, ChevronDown, Trash } from "react-feather";

import "@styles/react/libs/tables/react-dataTable-component.scss";

// ** Reactstrap Imports
import { Button, Card, CardHeader, Col, Input, Label, Row } from "reactstrap";
import useQueryGet from "../customHook/useQueryGet";
import BreadCrumbs from "../@core/components/breadcrumbs";
import StatsHorizontal from "../@core/components/StatsHorizontal";
import { PaymentsColumns } from "../@core/components/Payments/PaymentsColumns";
import AddPayments from "../@core/components/Payments/AddPayments";

const Payment = () => {
  // ** States
  const [currentPage, setCurrentPage] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [show, setShow] = useState(false);
  const toggleEditModal = () => setEditModal(!editModal);

  const { data: list, refetch } = useQueryGet(["coursePayments"], `/CoursePayment?CourseId=0ed74730-9012-ef11-b6c2-f4b229435c5d`);

  console.log("lost10101" , list)

  const deActiveCourses = list?.filter((course) => course.accept === true)
   const activeCourses = list?.filter((course) => course.accept === false)
  
  console.log("1111" , deActiveCourses)

  console.log("list1245r", list);

  const endOffset = itemOffset + rowsPerPage;
  const currentItems = list?.slice(itemOffset, endOffset);

  // ** Function to handle filter
  const handleFilter = (e) => {
    const value = e.target.value;
    let updatedData = [];
    setSearchValue(value);

    if (value.length) {
      updatedData = list?.filter((reserve) => {
        const startsWith = reserve.statusName
          .toLowerCase()
          .startsWith(value.toLowerCase());

        const includes = reserve.statusName
          .toLowerCase()
          .includes(value.toLowerCase());

        if (startsWith) {
          return startsWith;
        } else if (!startsWith && includes) {
          return includes;
        } else return null;
      });
      setFilteredData(updatedData);
      setSearchValue(value);
    }
  };

  // ** Function to handle Pagination
  const handlePagination = (event) => {
    setCurrentPage(event.selected + 1);
    const newOffset = (event.selected * rowsPerPage) % list?.length;

    setItemOffset(newOffset);
  };

  // ** Function to handle per page
  const handlePerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value));
  };

  // ** Custom Pagination
  const CustomPagination = () => {
    return (
      <ReactPaginate
        nextLabel=""
        breakLabel="..."
        previousLabel=""
        pageRangeDisplayed={2}
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        marginPagesDisplayed={2}
        activeClassName="active"
        pageClassName="page-item"
        breakClassName="page-item"
        nextLinkClassName="page-link"
        pageLinkClassName="page-link"
        breakLinkClassName="page-link"
        previousLinkClassName="page-link"
        nextClassName="page-item next-item"
        previousClassName="page-item prev-item"
        pageCount={
          searchValue.length
            ? Math.ceil(filteredData.length / rowsPerPage)
            : Math.ceil(list.length / rowsPerPage) || 1
        }
        onPageChange={(page) => handlePagination(page)}
        containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
      />
    );
  };

  return (
    <>
      <div>
        <BreadCrumbs
          title=" مدیریت دوره ها"
          data={[
            { title: " لیست ها", link: "/news" },
            { title: "  پرداخت ها" },
          ]}
        />
        <div className="app-user-list w-100">
          <Row>
            <Col lg="3" sm="6">
              <StatsHorizontal
                color="success"
                statTitle="همه ی بخش ها"
                icon={<CheckCircle />}
                renderStats={
                  <h3 className="fw-bolder mb-75"> {list?.length || 0} </h3>
                }
                className="cursor-pointer"
                backgroundColor={"rgb(0 0 0 / 23%)"}
              />
            </Col>
            <Col lg="3" sm="6">
              <StatsHorizontal
                color="success"
                statTitle=" شروع ثبت نام"
                icon={<CheckCircle />}
                renderStats={
                  <h3 className="fw-bolder mb-75"> {activeCourses?.length || 0} </h3>
                }
                className="cursor-pointer"
                backgroundColor={"rgb(0 0 0 / 5%)"}
              />
            </Col>            
            <Col lg="3" sm="6">
              <StatsHorizontal
                color="danger"
                statTitle="دوره های منقضی شده"
                icon={<Trash />}
                renderStats={
                  <h3 className="fw-bolder mb-75"> {deActiveCourses?.length || 0} </h3>
                }
                className="cursor-pointer"
                backgroundColor={"rgb(0 0 0 / 5%)"}
              />
            </Col>                         
          </Row>
        </div>
      </div>
      <Card>
        <CardHeader tag="h4"> وضعیت دوره ها </CardHeader>
        <div className="react-dataTable user-view-account-projects">
          {list?.length === 0 ? (
            <span className="no-user-course-reserve-found-text">
              متاسفانه وضعیتی پیدا نشد
            </span>
          ) : (
            <>
              <Row className="justify-content-end align-items-center mx-0 course-reserve-filters">
                <Col md="6" sm="12">
                  <div className="d-flex align-items-center">
                    <Label for="sort-select">تعداد نمایش در صفحه</Label>
                    <Input
                      className="dataTable-select course-reserve-rows-per-page-input"
                      type="select"
                      id="sort-select"
                      value={rowsPerPage}
                      onChange={(e) => handlePerPage(e)}
                    >
                      <option value={5}>5</option>
                      <option value={7}>7</option>
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                      <option value={75}>75</option>
                      <option value={100}>100</option>
                    </Input>
                  </div>
                </Col>
                <Col
                  md="6"
                  sm="12"
                  className="d-flex align-items-center justify-content-end course-reserve-filters-search "
                >
                  <Label className="me-1" for="search-input">
                    جستجو
                  </Label>
                  <Input
                    className="dataTable-filter mb-50"
                    type="text"
                    bsSize="sm"
                    id="search-input"
                    value={searchValue}
                    onChange={handleFilter}
                  />
                  <Button
                    color="primary"
                    size="sm"
                    style={{ marginRight: "10px", marginBottom: "5px" }}
                    onClick={(e) => {
                      e.preventDefault();
                      setShow(!show);
                    }}
                  >
                    پرداخت 
                     <AddPayments
                      show={show}
                      setShow={setShow}
                      refetch={refetch}
                      course={list}
                    /> 
                  </Button>
                </Col>
              </Row>
              <DataTable
                noHeader
                pagination
                data={searchValue.length ? filteredData : currentItems}
                columns={PaymentsColumns(refetch)}
                className="react-dataTable"
                sortIcon={<ChevronDown size={10} />}
                paginationComponent={CustomPagination}
                paginationDefaultPage={currentPage + 1}
              />
            </>
          )}
        </div>
      </Card>
    </>
  );
};

export default Payment;
