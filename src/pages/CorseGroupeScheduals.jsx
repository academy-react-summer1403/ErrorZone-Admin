import React, { Fragment, useState } from "react";
import Flatpickr from "react-flatpickr";
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import ReactPaginate from "react-paginate";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  Col,
  Input,
  Label,
  Row,
} from "reactstrap";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import useQueryGet from "../customHook/useQueryGet";
import { convertDateToPersian } from "../utility/hooks/date-helper.utils";
import useMutationPut from "../customHook/useMutationPut";
import { useQuery } from "@tanstack/react-query";
import http from "../core/services/interceptor"
import GroupeSchedualModal from "./GroupeSchedualModalEdit";
import GroupeSchedualModalEdit from "./GroupeSchedualModalEdit";

const CorseGroupeScheduals = ({shedualsData}) => {
  const [rowsPerPage, setrowsPerPage] = useState(10);
  const [Picker, setPicker] = useState("");
  const [itemOfsset, setItemOfsset] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  
  const {id} = useParams();

  const handlePerPage = (e) => {
    setrowsPerPage(parseInt(e.target.value));
  };

  const handlePagination = (e) => {
    setCurrentPage(e.selected + 1);
    const newOffset = filteredData.length
      ? (e.selected * rowsPerPage) % filteredData?.length
      : (e.selected * rowsPerPage) % dataToRender?.length;
    setItemOfsset(newOffset);
  };


  // api calls
  const { data: data } = useQueryGet(
    ["courseGroupDetail"],
    `/CourseGroup/Details?Id=${id}`
  );
  const { data: courseGroups } = useQueryGet(
    ["courseGroups"],
    "/CourseGroup?PageNumber=1&RowsOfPage=1000&SortingCol=DESC&SortType=Expire&Query="
  );

  const { mutate: changeForming, isSuccess: changeForminSucc } = useMutationPut(
    "/Schedual/SchedualFroming",
    ["adminsScheduals"]
  );
  const { mutate: changeLockToRaise, isSuccess: changeLockToRaiseSucc } =
    useMutationPut("/Schedual/LockToRiase", ["adminsScheduals"]);

  const dataToRender = data?.courseSchedules ;



  const endOffset = itemOfsset + rowsPerPage;
  const currentItem = filteredData.length
    ? filteredData?.slice(itemOfsset, endOffset)
    : dataToRender?.slice(itemOfsset, endOffset);

  const serverSideColumns = [
    {
      name: "گروه",
      minWidth: "200px",
      selector: (row) => groups(row),
    },
    {
      sortable: true,
      name: "تاریخ شروع",
      minWidth: "200px",
      selector: (row) => convertDateToPersian(row.startDate),
    },
    {
      sortable: true,
      name: "تاریخ پایان",
      minWidth: "200px",
      selector: (row) => convertDateToPersian(row.endDate),
    },
    {
      sortable: true,
      name: "ساعت شروع",
      minWidth: "150px",
      selector: (row) => row.startTime,
    },
    {
      sortable: true,
      name: "ُساعت پایان",
      minWidth: "150px",
      selector: (row) => row.endTime,
    },
    {
      sortable: true,
      name: "تعداد در هفته",
      minWidth: "100px",
      selector: (row) => row.weekNumber,
    },
    {
      name: "وضعیت تشکیل",
      minWidth: "200px",
      selector: (row) =>
        row.forming ? (
          <Button
            onClick={() => changeForming({ active: false, id: row.id })}
            color="relief-info"
            size="sm"
          >
            تشکیل شده
          </Button>
        ) : (
          <Button
            onClick={() => changeForming({ active: true, id: row.id })}
            color="relief-warning"
            size="sm"
          >
            تشکیل نشده
          </Button>
        ),
    },
    {
      name: "مجوز ورود",
      minWidth: "200px",
      selector: (row) =>
        row.lockToRaise ? (
          <Button
            onClick={() => changeLockToRaise({ active: false, id: row.id })}
            color="relief-info"
            size="sm"
          >
            مجاز
          </Button>
        ) : (
          <Button
            onClick={() => changeLockToRaise({ active: true, id: row.id })}
            color="relief-warning"
            size="sm"
          >
            غیر مجاز
          </Button>
        ),
    },
    {
        name: "ویرایش برنامه",
        minWidth: "100px",
        selector: (row) => {
            return(
                <GroupeSchedualModalEdit data={row} id={row.id} courseGroupId={id} currentCourseId={data?.courseGroupDto.courseId} />
            )
        },
      },
  ];

  const handleDateFilter = (range) => {
    const arr = [];
    let updatedData = [];
    const dataToFilter = range.map((i) => {
      const date = new Date(i);

      const year = date.getFullYear();

      let month = (1 + date.getMonth()).toString();
      month = month.length > 1 ? month : `0${month}`;

      let day = date.getDate().toString();
      day = day.length > 1 ? day : `0${day}`;

      arr.push(`${year}-${month}-${day}T00:00:00`);
      return true;
    });

    setPicker(range);

    if (range.length) {
      updatedData = dataToRender?.filter((item) => {
        return (
          new Date(item.startDate).getTime() >= new Date(arr[0]).getTime() &&
          new Date(item.endDate).getTime() <= new Date(arr[1]).getTime()
        );
      });
      setFilteredData([...updatedData]);
      setPicker(range);
    }
  };

  function groups(params) {
    const group = courseGroups?.courseGroupDtos?.find(
      (group) => group.groupId === params.courseGroupId
    );
    return (
      <Link className="text-primary" to={`/coursegroups/${group?.groupId}`}>
        {" "}
        {group?.groupName}{" "}
      </Link>
    );
  }

  const CustomPagination = () => {
    const count = filteredData.length
      ? Math.ceil(filteredData?.length / rowsPerPage)
      : Math.ceil(dataToRender?.length / rowsPerPage);

    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        breakLabel="..."
        pageCount={Math.ceil(count) || 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        activeClassName="active"
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={(page) => handlePagination(page)}
        pageClassName="page-item"
        breakClassName="page-item"
        nextLinkClassName="page-link"
        pageLinkClassName="page-link"
        breakLinkClassName="page-link"
        previousLinkClassName="page-link"
        nextClassName="page-item next-item"
        previousClassName="page-item prev-item"
        containerClassName={
          "pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
        }
      />
    );
  };

  if (changeForminSucc) toast.success("تغییر وضعیت تشکیل با موفقیت انجام شد !");
  if (changeLockToRaiseSucc) toast.success("تغییر مجوز با موفقیت انجام شد !");

  return (
    <Fragment>
      <Card>
        <CardHeader className="border-bottom">
          <CardTitle tag="h4">زمان بندی گروه دوره</CardTitle>
        </CardHeader>
        <Row className="mx-0 mt-1 mb-50">
          <Col sm="6">
            <div className="d-flex align-items-center">
              <Label for="sort-select">show</Label>
              <Input
                className="dataTable-select"
                type="select"
                id="sort-select"
                value={rowsPerPage}
                onChange={(e) => handlePerPage(e)}
              >
                <option value={7}>7</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={75}>75</option>
                <option value={100}>100</option>
              </Input>
              <Label for="sort-select">entries</Label>
            </div>
          </Col>
          <Col lg="4" md="6" className="mb-1">
            <Label className="form-label" for="date">
              فیلتر بر اساس تاریخ
            </Label>
            <Flatpickr
              className="form-control"
              id="date"
              value={Picker}
              options={{ mode: "range", dateFormat: "m/d/Y" }}
              onChange={(date) => handleDateFilter(date)}
            />
          </Col>
        </Row>
        <div className="react-dataTable">
          <DataTable
            noHeader
            pagination
            paginationServer
            className="react-dataTable"
            columns={serverSideColumns}
            sortIcon={<ChevronDown size={10} />}
            paginationComponent={CustomPagination}
            data={currentItem}
            paginationDefaultPage={currentPage + 1}
          />
        </div>
      </Card>
    </Fragment>
  );
};

export default CorseGroupeScheduals;
