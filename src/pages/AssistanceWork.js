import react , {useState , useEffect , Fragment} from 'react'
import ReactPaginate from "react-paginate";

import DataTable from "react-data-table-component";

import { ChevronDown } from "react-feather";

import "@styles/react/libs/tables/react-dataTable-component.scss";

// ** Reactstrap Imports
import { Button, Card, CardHeader, Col, Input, Label, Row } from "reactstrap";
import { Columns } from '../@core/components/assistanceWork/asscolumns';

import useQueryGet from '../customHook/useQueryGet'
//import { CustomPagination } from '../@core/components/pagination';
//import { convertDateToPersian } from '../utility/hooks/date-helper.utils';
//import BreadCrumbs from '../@core/components/breadcrumbs';
//import StatsHorizontal from '../@core/components/StatsHorizontal';
//import useMutationPut from '../customHook/useMutationPut';
//import CustomAssHeader from '../@core/components/assistanceWork/assistanceWork';
import CreateAss from '../@core/components/assistanceWork/createAss';

const AssistanceWork = () => {
  // ** States
  const [currentPage, setCurrentPage] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [changeFlage, setChangeFlage] = useState([])
  const [editModal, setEditModal] = useState(false);

  const toggleEditModal = () => setEditModal(!editModal);


  const {data : list } = useQueryGet(["getAss"] , ("/AssistanceWork"))

  const endOffset = itemOffset + rowsPerPage;
  const currentItems = list?.slice(itemOffset, endOffset);

  // ** Function to handle filter
  const handleFilter = (e) => {
    const value = e.target.value;
    let updatedData = [];
    setSearchValue(value);

    if (value.length) {
      updatedData = list?.filter((reserve) => {
        const startsWith = reserve.worktitle
          .toLowerCase()
          .startsWith(value.toLowerCase());

        const includes = reserve.worktitle
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
    <Card>
      <CardHeader tag="h4">  تسک ها </CardHeader>
      <div className="react-dataTable user-view-account-projects">
        {list?.length === 0 ? (
          <span className="no-user-course-reserve-found-text">
                    متاسفانه تسکی پیدا نشد
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
              <Button  color='primary'  onClick={(e) => {
               e.preventDefault();
               toggleEditModal();
                 }}>
                  افزودن تسک 
                <CreateAss  isOpen={editModal}  toggle={toggleEditModal}/>
             </Button>                
              </Col>   
      


            </Row>
            <DataTable
              noHeader
              pagination
              data={searchValue.length ? filteredData : currentItems}
              columns={Columns(toggleEditModal)}
              className="react-dataTable"
              sortIcon={<ChevronDown size={10} />}
              paginationComponent={CustomPagination}
              paginationDefaultPage={currentPage + 1}
            />
          </>
        )}
      </div>
    </Card>
  );














//     const [rowsPerPage, setRowPerPage] = useState("10");
//     const [currentPage, setCurrentPage] = useState("1");
//     const [editModal, setEditModal] = useState(false);

//    const toggleEditModal = () => setEditModal(!editModal);

//     const {data : list } = useQueryGet(["getAss"] , ("/AssistanceWork"))
    
//     console.log("list" , list)

//     const handlePerPage = (e) => {
//         const value = parseInt(e.currentTarget.value);
//         setRowPerPage(value);
//       };
    

    // <Fragment>
    //     <div>
    //     <BreadCrumbs
    //     title="لیست تسک ها"
    //     data={[
    //       { title: " تسک ها", link: "/news" },
    //       { title: "لیست تسک ها" },
    //     ]}
    //   />
    //         <div className="app-user-list w-100">
    //     <Row>
    //     <Col lg="3" sm="6">
    //         <StatsHorizontal
    //           color="success"
    //           statTitle="همه ی تسک ها"
    //           icon={<CheckCircle />}
    //           renderStats={
    //             <h3 className="fw-bolder mb-75">
    //              {list?.length || 0} 
    //             </h3>
    //           }
    //         //   onClick={() => setActive(true)}
    //           className="cursor-pointer"
    //           backgroundColor={"rgb(0 0 0 / 23%)"}
    //         />
    //       </Col>
    //     </Row>
    //   </div>
    //     </div>

    //   <Card>
    //     <div className="react-dataTable">
    //       <CustomAssHeader
    //          handlePerPage={handlePerPage}
    //          rowsPerPage={rowsPerPage}
    //          setRowPerPage={setRowPerPage}
    //          isOpen={editModal}
    //          toggle={toggleEditModal}
    //       />
    //       <Table hover>
    //         <thead>
    //           <tr>
    //             <th>نام دوره</th>
    //             <th>  توضیحات تسک </th>
    //             <th> ناشر تسک </th>
    //             <th>  تاریخ انتشار </th>
    //             <th> تاریخ انجام تسک </th>
    //             <th > اقدام</th>
    //           </tr>
    //         </thead>
    //      <tbody >
    //         {list &&
    //           list?.map((item, index) => {
    //             const tooltipId = `tooltip-${index}`;
    //             return (
         
    //                 <tr>
    //                   <td
    //                     className="  "
    //                     style={{
    //                       paddingRight: "40px"
    //                     }}
    //                   >
    //                     <td>  {item?.worktitle} </td> 
    //                   </td>
    //                   <td className="pr-0 pl-1" style={{ maxWidth: "150px" }}>
    //                   {item?.workDescribe}
    //                   </td>
    //                   <td
    //                     className="pr-0 pl-1"
    //                     id={tooltipId}
    //                     style={{
    //                       maxWidth: "200px",
    //                       whiteSpace: "nowrap",
    //                       overflow: "hidden",
    //                       textOverflow: "ellipsis",
    //                     }}
    //                   >
    //                     {item?.assistanceName}
    //                   </td>
    //                   <td >   {convertDateToPersian(item?.inserDate)} </td>
    //                   <td>
    //                     {convertDateToPersian(item?.workDate)}
    //                   </td>
    //                   <td >
    //                     <tr
    //                     style={{paddingLeft: "50px"}}
    //                         onClick={(e) => {
    //                          e.preventDefault();
    //                          toggleEditModal();
    //                          console.log("1223" , item);
    //                          <CreateAss  
    //                             item={item}        
    //                             isOpen={editModal}
    //                             toggle={toggleEditModal}
    //                           />  
                                                                    
    //                              }}

    //                           >
    //                             <Edit2 className="me-50" size={15} />{" "}
    //                               ویرایش
 
    //                           </tr>
    //                   </td>
    //                 </tr>
            
    //             );
    //           })}
    //                 </tbody>
    //       </Table>
    //     </div>
    //   </Card>
    //    <CustomPagination
    //      total={list?.length}
    //      current={currentPage}
    //      setCurrent={setCurrentPage}
    //      rowsPerPage={rowsPerPage}
    //   /> 
    // </Fragment>
   
  
}

export default AssistanceWork