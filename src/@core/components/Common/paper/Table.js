import Avatar from "@components/avatar";
import Avatarrr from "../../../assets/images/new/55.jpg";

// import avatarImg from "src/@core/assets/images/avatar-blank.png";
// import avatarImg from "../../../@core/assets/images/avatar-blank.png";

import { Edit, FileText, MoreVertical, Trash , CheckCircle , Trash2 } from "react-feather";
import {
  Badge,
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Table,
  UncontrolledDropdown,
  UncontrolledTooltip
} from "reactstrap";

import Spinner from './../../spinner/Fallback-spinner';

// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Third Party Components
import Select from "react-select";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Label,
  Row,
  Tooltip
} from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

import { Link} from "react-router-dom";
import { Field, Form, Formik } from "formik";

import { DeleteNews, adminNewsFilterListAPI, getPapers } from "../../../../core/services/Paper";
import { CustomPagination } from "../../pagination";
import { activeNews, getNewsDet } from "../../../../core/services/detailNews";
import TooltipPosition from "./TooltipPositions";
import BreadCrumbs from "../../breadcrumbs";
import StatsHorizontal from "../../StatsHorizontal";
import useQueryGet from "../../../../customHook/useQueryGet";

const PaperTable = () => {
  // ** States
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [allnews, setAllnews] = useState([]);
  const [searchee, setSearchee] = useState("");
  const [totalCont, setTotalCont] = useState(null);
  const [pageCon, setPageCon] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [detail, setDetail] = useState([])
  const [tooltipOpenn, setTooltipOpenn] = useState({});
  const [activeNews, setActiveNews] = useState();
 const [deleteNews, setDeleteNews] = useState([])
 const [newsActive, setNewsActive] = useState(true)
  // ** Function to fetch papers

  const { data:getPaper} = useQueryGet(
    ["getPaper"] , `/News/AdminNewsFilterList?PageNumber=${pageCon}&RowsOfPage=10&SortingCol=InsertDate&SortType=DESC${searchee ? `&Query=${searchee}` : ""}&${newsActive ? "IsActive=true" : "IsActive=false"}`
  )
  const allPaper =  () => {

    //try {
      //  const getPaper = await getPapers(searchee, pageCon, selectedStatus , newsActive );
         
      setTotalCont(getPaper?.totalCount);
      setActiveNews(getPaper)

   // } catch (error) {
      // throw new Error("ERROR: ", error);
   // }
  };

const DeleteNewsList = async () => {
  const res = await DeleteNews()
  console.log('123456789' , res)
  setDeleteNews(res)
  

}

  useEffect(() => {
    allPaper();
    DeleteNewsList()
  }, [searchee, pageCon, selectedStatus , newsActive]);
  
  console.log('allnews1' , getPaper?.news)


  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // ** User filter options
  const isActiveOptions = [
    { value: true, label: "فعال" },
    { value: false, label: "غیرفعال" },
  ];

  console.log('allnews' , getPaper?.news )

  
  return (
    <Fragment>
              <BreadCrumbs
        title="لیست اخبار"
        data={[
          { title: "مدیریت اخبار", link: "/papers" },
          { title: "لیست اخبار" },
        ]}
      />
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
               onClick={() => setNewsActive(true)}
               className="cursor-pointer"
               backgroundColor={newsActive === true && "rgb(0 0 0 / 23%)"}     
      />
      </Col>
      <Col lg="3" sm="6">
      <StatsHorizontal 
               color="danger"
               statTitle="اخبار غیر فعال"
               icon={<Trash2 size={20} />}
               renderStats={
                 <h3 className="fw-bolder mb-75">
                   {deleteNews?.totalCount || 0}
                 </h3>
               }
               onClick={() => setNewsActive(false)}
               className="cursor-pointer"
               backgroundColor={newsActive === false && "rgb(0 0 0 / 23%)"}     
      />
      </Col>    
        </Row> 
  
      {getPaper?.news ? (
        <>
          <div className="d-flex mb-2 justify-content-between">
            <div className="w-25">
              {/* <Select
                className="react-select rounded-3 "
                classNamePrefix="select"
                defaultValue={isActiveOptions[0]}
                name="clear"
                options={isActiveOptions}
                // isClearable
                placeholder="وضعیت"
                onChange={(option) =>
                  setSelectedStatus(option ? option.value : null)
                }
              /> */}
       

   
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row-reverse",
                marginLeft: "80px",
              }}
            >
              <Formik
                initialValues={{}}
                onSubmit={(e) => setSearchee(e.search)}
              >
                <Form className="border rounded d-flex bg-white" style={{ width: "240px" }}>
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
          <Card className="overflow-hidden">
            <div className="react-dataTable">
              <Table hover>
                <thead className="text-center">
                  <tr>
                    <th className="px-0"></th>
                    <th className="px-0">نویسنده</th>
                    <th className="px-0">عنوان خبر</th>
                    <th className="px-0">دسته بندی خبر</th>
                    <th className="px-0">توضیحات کوتاه</th>
                    <th className="px-0"> 
                    
                    <span style={{marginRight: "100px"}} >  وضعیت </span>
                    </th>
                    <th className="px-0"></th>
                  </tr>
                </thead>
                <tbody >
                  {getPaper?.news &&
                    getPaper?.news?.map((item) => (
                      <tr className="text-center px-0 " key={item.id} >
                        <td className="px-0" style={{paddingRight: "500px"}}>
                          {item.currentImageAddressTumb == null ||
                          item.currentImageAddressTumb == "undefined" ? (
                            <Avatar img={Avatarrr} />
                          ) : (
                            <Avatar img={item.currentImageAddressTumb} />
                          )}
                        </td>
                        <td className="px-0"  >
                          <span className="align-middle fw-bold">
                            <Link
                              to={"/papers/view/" + item.id}
                              style={{ color: "#555" }}
                            >
                              {item.addUserFullName}
                            </Link>
                          </span>
                        </td>
                        <td
                          className="px-0"
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "150px",
                            
                          }}
                        >
                          {item.title}
                        </td>
                        <td className="px-0">{item.newsCatregoryName}</td>
                        <td
                          className="px-0"
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "150px",
                            
                          }}
                        >
                          {item.miniDescribe}
                        </td>
                        <td className="px-0">
                          <Badge
                            pill
                            color={
                              item.isActive ? "light-primary" : "light-danger"
                            }
                            style={{marginRight: "100px"}}
                          >
                            {item.isActive ? "فعال" : "غیرفعال"}
                            
                          </Badge>
                        </td>
                        <td>
                          <td >
                             <TooltipPosition id={item.id} />
                          </td>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
            <CustomPagination
              total={totalCont}
              current={pageCon}
              setCurrent={setPageCon}
              rowsPerPage={10}
            />
          </Card>
        </>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default PaperTable;
