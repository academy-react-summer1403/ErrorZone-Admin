// import react , {useState , useEffect , Fragment} from 'react'
// // ** Icons Imports
// import { MoreVertical, Edit, Trash, Eye, FileText , CheckCircle , Trash2, Edit2 } from 'react-feather'
// import {
//     Table,
//     Row,
//     Col,
//     Label,
//     Badge,
//     UncontrolledDropdown,
//     DropdownMenu, 
//    DropdownItem, 
//    DropdownToggle ,  
//     CardBody,
//    CardTitle,
//    CardHeader, 
//    Card,
//    Tooltip,
//  } from 'reactstrap'

// import Select from "react-select";
// import blanckthumbnail from "./../@core/assets/images/portrait/small/blank-thumbnail.jpg"
// import useQueryGet from '../customHook/useQueryGet'
// import { CustomPagination } from '../@core/components/pagination';
// import CustomHeader from '../@core/components/customheader/CustomHeader';
// import Avatar from '../@core/components/avatar';
// import { convertDateToPersian } from '../utility/hooks/date-helper.utils';
// import { selectThemeColors } from '../utility/Utils';
// import BreadCrumbs from '../@core/components/breadcrumbs';
// import StatsHorizontal from '../@core/components/StatsHorizontal';
// import useMutationPut from '../customHook/useMutationPut';
// import withReactContent from "sweetalert2-react-content";
// import Swal from "sweetalert2";
// import CustomBuildinHeader from '../@core/components/building/buildingHeader';
// import CreateBuilding from '../@core/components/building/CreateBuilding';
// import UpdatingBuilding from '../@core/components/building/UpdatingBuilding';
// const Building = () => {
// const [rowsPerPage, setRowPerPage] = useState("10");
// const [currentPage, setCurrentPage] = useState("1");
// const [editModal, setEditModal] = useState(false);
// const toggleEditModal = () => setEditModal(!editModal);


// const MySwal = withReactContent(Swal);

// const {data: list } = useQueryGet(["list"] , ("/Building"))

// const ActiveBuilding = list?.filter((item) => item.active === true)


// const DeactiveBuilding = list?.filter((item) => !item.active === true)

// const handlePerPage = (e) => {
//     const value = parseInt(e.currentTarget.value);
//     setRowPerPage(value);
//   };

// const { mutate } = useMutationPut(("/Building/Active") , ["activeBuliding"] )

// const handleSuspendClick = (boolean, id) => {
//  return MySwal.fire({
//     title: "آیا مطمعن هستید؟",
//     text: "البته امکان بازگشت نیز وجود دارد ",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonText: " بله ",
//     cancelButtonText: " لغو ",

//     customClass: {
//       confirmButton: "btn btn-primary",
//       cancelButton: "btn btn-outline-danger ms-1",
//     },
//     buttonsStyling: false,
//  }).then(function(result){
//     if (result.value) {
//         mutate({ active: boolean, id: id });
//         MySwal.fire({
//           icon: "success",
//           title: "موفقیت ",
//           text: "عملیات با موفقیت انجام گردید",
//           confirmButtonText: " باشه ",

//           customClass: {
//             confirmButton: "btn btn-success",
//           },
//         });
//       }else if(result.dismiss === MySwal.DismissReason.cancel){
//         MySwal.fire({
//             title: "لغو",
//             text: "عملیات لغو شد",
//             icon: "error",
//             confirmButtonText: " باشه ",
  
//             customClass: {
//               confirmButton: "btn btn-success",
//             },
//           });
//       }
//  })
// }

//   return (
//     <Fragment>
//         <div>
//         <BreadCrumbs
//         title=" مدیریت بخش ها"
//         data={[
//           { title: " لیست ها", link: "/news" },
//           { title: "لیست ساختمان ها" },
//         ]}
//       />
//             <div className="app-user-list w-100">
//         <Row>
//         <Col lg="3" sm="6">
//             <StatsHorizontal
//               color="success"
//               statTitle="همه ی ساختمان ها"
//               icon={<CheckCircle />}
//               renderStats={
//                 <h3 className="fw-bolder mb-75">
//                    {list?.length || 0} 
//                 </h3>
//               }
//             //   onClick={() => setActive(true)}
//               className="cursor-pointer"
//               backgroundColor={"rgb(0 0 0 / 23%)"}
//             />
//           </Col>

//           <Col lg="3" sm="6">
//             <StatsHorizontal
//               color="success"
//               statTitle="ساختمان فعال"
//               icon={<CheckCircle />}
//               renderStats={
//                 <h3 className="fw-bolder mb-75">
//                    {ActiveBuilding?.length || 0} 
//                 </h3>
//               }
//             //   onClick={() => setActive(true)}
//               className="cursor-pointer"
//               backgroundColor={"rgb(0 0 0 / 1%)"}
//             />
//           </Col>
//           <Col lg="3" sm="6">
//             <StatsHorizontal
//               color="danger"
//               statTitle="ساختمان غیر فعال"
//               icon={<Trash2 size={20} />}
//               renderStats={
//                 <h3 className="fw-bolder mb-75">
//                    {DeactiveBuilding?.length || 0} 
//                 </h3>
//               }
//             //   onClick={() => setActive(false)}
//               className="cursor-pointer"
//               backgroundColor={"rgb(0 0 0 / 1%)"}
//             />
//           </Col>
//         </Row>
//       </div>
//         </div>

//       <Card>
//         <div className="react-dataTable">
//           <CustomBuildinHeader
//              handlePerPage={handlePerPage}
//              rowsPerPage={rowsPerPage}
//              setRowPerPage={setRowPerPage}
//              isOpen={editModal}
//              toggle={toggleEditModal}
//           />
//           <Table hover>
//             <thead>
//               <tr>
//                 <th>شماره</th>
//                 <th> نام ساختمان</th>
//                 <th> تعداد طبقه</th>
//                 <th>تایم کاری  </th>
//                 <th> وضعیت </th>
//                 <th className="px-0"> نشانی ها</th>
//                 <th> اقدام</th>
//               </tr>
//             </thead>
//          <tbody >
//             {list &&
//               list?.map((item, index) => {
//                 const tooltipId = `tooltip-${index}`;
//                 return (
         
//                     <tr>
//                       <td
//                         className="  "
//                         style={{
//                           paddingRight: "40px"
//                         }}
//                       >
//                         <td>  {item?.id} </td> 
//                       </td>
//                       <td className="pr-0 pl-1" style={{ maxWidth: "150px" }}>
//                         {item.buildingName}
//                       </td>
//                       <td
//                         className="pr-0 pl-1"
//                         id={tooltipId}
//                         style={{
//                           maxWidth: "200px",
//                           whiteSpace: "nowrap",
//                           overflow: "hidden",
//                           textOverflow: "ellipsis",
//                           paddingRight: "50px"
//                         }}
//                       >
//                         {item.floor}
//                       </td>
//                       <td >{convertDateToPersian(item.workDate)}</td>
//                       <td>
//                         {item.active === true ? (
//                           <Badge pill color="light-success" className="me-1">
//                             تایید شده
//                           </Badge>
//                         ) : (
//                           <Badge pill color="light-warning" className="me-1">
//                             تایید نشده
//                           </Badge>
//                         )}
//                       </td>
//                       <td
//                         className="p-0 text-center"
//                         style={{
//                           maxWidth: "20px",
//                           minWidth: "20px",
//                         }}
//                       >
                         
//                       </td>
//                       <td >
//                          <UncontrolledDropdown direction="start">
//                           <DropdownToggle
//                             className="icon-btn hide-arrow"
//                             color="transparent"
//                             size="sm"
//                             caret
//                           >
//                             <MoreVertical size={15} />
//                           </DropdownToggle>
//                             <DropdownMenu className="d-flex flex-column p-0  ">
//                               <DropdownItem
//                                   onClick={(e) => {
//                                     e.preventDefault();
//                                     item.active  ? handleSuspendClick(false, item?.id) : handleSuspendClick(true, item?.id);
//                                     }}
//                               >
//                                 <FileText className="me-50" size={15} />{" "}
//                                 <span className="align-middle">   {item.active ? "غیرفعال" : "فعال"} </span>
//                               </DropdownItem>

//                               <DropdownItem
//                                  onClick={(e) => {
//                                     console.log('e' , e)
//                                     e.preventDefault();
//                                     console.log("1223" , item);
                                      
//                                  }}
                                 

//                               >
//                                 <Edit2 className="me-50" size={15} />{" "}
//                                   ویرایش
//                                    <UpdatingBuilding  
//                                     item={item}        

//                                   />  
//                               </DropdownItem>
//                             </DropdownMenu>
                          
//                         </UncontrolledDropdown> 

//                       </td>
//                     </tr>
            
//                 );
//               })}
//                     </tbody>
//           </Table>
//         </div>
//       </Card>
//        <CustomPagination
//          total={list?.length}
//          current={currentPage}
//          setCurrent={setCurrentPage}
//          rowsPerPage={rowsPerPage}
//       /> 
//     </Fragment>
//   )
// }

// export default

import react, { useState, useEffect, Fragment } from "react";
import ReactPaginate from "react-paginate";

import DataTable from "react-data-table-component";

import { CheckCircle, ChevronDown, X } from "react-feather";

import "@styles/react/libs/tables/react-dataTable-component.scss";

// ** Reactstrap Imports
import { Button, Card, CardHeader, Col, Input, Label, Row } from "reactstrap";
import useQueryGet from "../customHook/useQueryGet";
import CreateTech from "../@core/components/technologhy/CreateTech";
import { JobsColumns } from "../@core/components/jobsPage/JobsColumns";
import CreateJobs from "../@core/components/jobsPage/CreateJobs";
import BreadCrumbs from "../@core/components/breadcrumbs";
import StatsHorizontal from "../@core/components/StatsHorizontal";
import { BuildingColumns } from "../@core/components/building/BuildingColumns";
import CreateBuilding from "../@core/components/building/CreateBuilding";

const Building = () => {
  // ** States
  const [currentPage, setCurrentPage] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [show, setShow] = useState(false);

  const { data: list } = useQueryGet(
    ["Building"],
    "/Building"
  );

  console.log("list1245r1111", list);

  const filterdeactive = list?.filter((item) => item?.inWork === false)

  const filteractive = list?.filter((item) => item?.inWork === true)  

  const endOffset = itemOffset + rowsPerPage;
  const currentItems = list?.slice(itemOffset, endOffset);

  // ** Function to handle filter
  const handleFilter = (e) => {
    const value = e.target.value;
    let updatedData = [];
    setSearchValue(value);

    if (value.length) {
      updatedData = list?.filter((reserve) => {
        const startsWith = reserve.techName
          .toLowerCase()
          .startsWith(value.toLowerCase());

        const includes = reserve.techName
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
          title="مدیریت کاربران"
          data={[
            { title: " لیست ها", link: "/news" },
            { title: "لیست مشاغل " },
          ]}
        />
        <div className="app-user-list w-100">
          <Row>
            <Col lg="3" sm="6">
              <StatsHorizontal
                color="success"
                statTitle="همه ی مشاغل "
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
                statTitle="مشاغل فعال"
                icon={<CheckCircle />}
                renderStats={
                  <h3 className="fw-bolder mb-75"> {filteractive?.length || 0} </h3>
                }
                className="cursor-pointer"
                backgroundColor={"rgb(0 0 0 / 5%)"}
              />
            </Col>
            <Col lg="3" sm="6">
              <StatsHorizontal
                color="success"
                statTitle="مشاغل غیرفعال"
                icon={<X />}
                renderStats={
                  <h3 className="fw-bolder mb-75"> {filterdeactive?.length || 0} </h3>
                }
                className="cursor-pointer"
                backgroundColor={"rgb(0 0 0 / 5%)"}
              />
            </Col>                        
          </Row>
        </div>

        
      </div>
      <Card>
        <CardHeader tag="h4"> شغل ها </CardHeader>
        <div className="react-dataTable user-view-account-projects">
          {list?.length === 0 ? (
            <span className="no-user-course-reserve-found-text">
              متاسفانه شغلی پیدا نشد
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
                    {/* افزودن شغل
                    <CreateBuilding
                      show={show}
                      setShow={setShow}
               
                    /> */}
                  </Button>
                </Col>
              </Row>
              <DataTable
                noHeader
                pagination
                data={searchValue.length ? filteredData : currentItems}
                columns={BuildingColumns()}
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

export default Building;

