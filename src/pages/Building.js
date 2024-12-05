import react , {useState , useEffect , Fragment} from 'react'
// ** Icons Imports
import { MoreVertical, Edit, Trash, Eye, FileText , CheckCircle , Trash2, Edit2 } from 'react-feather'
import {
    Table,
    Row,
    Col,
    Label,
    Badge,
    UncontrolledDropdown,
    DropdownMenu, 
   DropdownItem, 
   DropdownToggle ,  
    CardBody,
   CardTitle,
   CardHeader, 
   Card,
   Tooltip,
 } from 'reactstrap'

import Select from "react-select";
import blanckthumbnail from "./../@core/assets/images/portrait/small/blank-thumbnail.jpg"
import useQueryGet from '../customHook/useQueryGet'
import { CustomPagination } from '../@core/components/pagination';
import CustomHeader from '../@core/components/customheader/CustomHeader';
import Avatar from '../@core/components/avatar';
import { convertDateToPersian } from '../utility/hooks/date-helper.utils';
import { selectThemeColors } from '../utility/Utils';
import BreadCrumbs from '../@core/components/breadcrumbs';
import StatsHorizontal from '../@core/components/StatsHorizontal';
import useMutationPut from '../customHook/useMutationPut';
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import CustomBuildinHeader from '../@core/components/building/buildingHeader';
import CreateBuilding from '../@core/components/building/CreateBuilding';
import UpdatingBuilding from '../@core/components/building/UpdatingBuilding';
const Building = () => {
const [rowsPerPage, setRowPerPage] = useState("10");
const [currentPage, setCurrentPage] = useState("1");
const [editModal, setEditModal] = useState(false);

const toggleEditModal = () => setEditModal(!editModal);


const MySwal = withReactContent(Swal);

const {data: list } = useQueryGet(["list"] , ("/Building"))

const ActiveBuilding = list?.filter((item) => item.active === true)


const DeactiveBuilding = list?.filter((item) => !item.active === true)

const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowPerPage(value);
  };

const { mutate } = useMutationPut(("/Building/Active") , ["activeBuliding"] )

const handleSuspendClick = (boolean, id) => {
 return MySwal.fire({
    title: "آیا مطمعن هستید؟",
    text: "البته امکان بازگشت نیز وجود دارد ",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: " بله ",
    cancelButtonText: " لغو ",

    customClass: {
      confirmButton: "btn btn-primary",
      cancelButton: "btn btn-outline-danger ms-1",
    },
    buttonsStyling: false,
 }).then(function(result){
    if (result.value) {
        mutate({ active: boolean, id: id });
        MySwal.fire({
          icon: "success",
          title: "موفقیت ",
          text: "عملیات با موفقیت انجام گردید",
          confirmButtonText: " باشه ",

          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      }else if(result.dismiss === MySwal.DismissReason.cancel){
        MySwal.fire({
            title: "لغو",
            text: "عملیات لغو شد",
            icon: "error",
            confirmButtonText: " باشه ",
  
            customClass: {
              confirmButton: "btn btn-success",
            },
          });
      }
 })
}

  return (
    <Fragment>
        <div>
        <BreadCrumbs
        title=" مدیریت بخش ها"
        data={[
          { title: " لیست ها", link: "/news" },
          { title: "لیست ساختمان ها" },
        ]}
      />
            <div className="app-user-list w-100">
        <Row>
        <Col lg="3" sm="6">
            <StatsHorizontal
              color="success"
              statTitle="همه ی ساختمان ها"
              icon={<CheckCircle />}
              renderStats={
                <h3 className="fw-bolder mb-75">
                   {list?.length || 0} 
                </h3>
              }
            //   onClick={() => setActive(true)}
              className="cursor-pointer"
              backgroundColor={"rgb(0 0 0 / 23%)"}
            />
          </Col>

          <Col lg="3" sm="6">
            <StatsHorizontal
              color="success"
              statTitle="ساختمان فعال"
              icon={<CheckCircle />}
              renderStats={
                <h3 className="fw-bolder mb-75">
                   {ActiveBuilding?.length || 0} 
                </h3>
              }
            //   onClick={() => setActive(true)}
              className="cursor-pointer"
              backgroundColor={"rgb(0 0 0 / 1%)"}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="danger"
              statTitle="ساختمان غیر فعال"
              icon={<Trash2 size={20} />}
              renderStats={
                <h3 className="fw-bolder mb-75">
                   {DeactiveBuilding?.length || 0} 
                </h3>
              }
            //   onClick={() => setActive(false)}
              className="cursor-pointer"
              backgroundColor={"rgb(0 0 0 / 1%)"}
            />
          </Col>
        </Row>
      </div>
        </div>

      <Card>
        <div className="react-dataTable">
          <CustomBuildinHeader
             handlePerPage={handlePerPage}
             rowsPerPage={rowsPerPage}
             setRowPerPage={setRowPerPage}
             isOpen={editModal}
             toggle={toggleEditModal}
          />
          <Table hover>
            <thead>
              <tr>
                <th>شماره</th>
                <th> نام ساختمان</th>
                <th> تعداد طبقه</th>
                <th>تایم کاری  </th>
                <th> وضعیت </th>
                <th className="px-0"> نشانی ها</th>
                <th> اقدام</th>
              </tr>
            </thead>
         <tbody >
            {list &&
              list?.map((item, index) => {
                const tooltipId = `tooltip-${index}`;
                return (
         
                    <tr>
                      <td
                        className="  "
                        style={{
                          paddingRight: "40px"
                        }}
                      >
                        <td>  {item?.id} </td> 
                      </td>
                      <td className="pr-0 pl-1" style={{ maxWidth: "150px" }}>
                        {item.buildingName}
                      </td>
                      <td
                        className="pr-0 pl-1"
                        id={tooltipId}
                        style={{
                          maxWidth: "200px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          paddingRight: "50px"
                        }}
                      >
                        {item.floor}
                      </td>
                      <td >{convertDateToPersian(item.workDate)}</td>
                      <td>
                        {item.active === true ? (
                          <Badge pill color="light-success" className="me-1">
                            تایید شده
                          </Badge>
                        ) : (
                          <Badge pill color="light-warning" className="me-1">
                            تایید نشده
                          </Badge>
                        )}
                      </td>
                      <td
                        className="p-0 text-center"
                        style={{
                          maxWidth: "20px",
                          minWidth: "20px",
                        }}
                      >
                         
                      </td>
                      <td >
                         <UncontrolledDropdown direction="start">
                          <DropdownToggle
                            className="icon-btn hide-arrow"
                            color="transparent"
                            size="sm"
                            caret
                          >
                            <MoreVertical size={15} />
                          </DropdownToggle>
                            <DropdownMenu className="d-flex flex-column p-0  ">
                              <DropdownItem
                                  onClick={(e) => {
                                    e.preventDefault();
                                    item.active  ? handleSuspendClick(false, item?.id) : handleSuspendClick(true, item?.id);
                                    }}
                              >
                                <FileText className="me-50" size={15} />{" "}
                                <span className="align-middle">   {item.active ? "غیرفعال" : "فعال"} </span>
                              </DropdownItem>

                              <DropdownItem
                                 onClick={(e) => {
                                    console.log('e' , e)
                                    e.preventDefault();
                                    console.log("1223" , item);
                                      
                                 }}
                                 

                              >
                                <Edit2 className="me-50" size={15} />{" "}
                                  ویرایش
                                   <UpdatingBuilding  
                                    item={item}        

                                  />  
                              </DropdownItem>
                            </DropdownMenu>
                          
                        </UncontrolledDropdown> 

                      </td>
                    </tr>
            
                );
              })}
                    </tbody>
          </Table>
        </div>
      </Card>
       <CustomPagination
         total={list?.length}
         current={currentPage}
         setCurrent={setCurrentPage}
         rowsPerPage={rowsPerPage}
      /> 
    </Fragment>
  )
}

export default Building