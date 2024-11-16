// import Avatar from '@components/avatar'
// import avatarImg from '../../../assets/images/icons/amazon.png'
import { MoreVertical, Edit, Delete, Trash, FileText } from "react-feather";
import {
  Table,
  Badge,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";

// ** React Imports
import { Fragment, useEffect, useState } from "react";

// // ** Invoice List Sidebar
// import Sidebar from './Sidebar'

// // ** Third Party Components
// import Select from 'react-select'

// // ** Utils
// import { selectThemeColors } from '@utils'

// // ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { Navigate, useNavigate } from "react-router-dom";
// import { getComment } from '../../../core/services/api/panelAdmin'
// import { Field, Form, Formik } from 'formik'
// import CustomHeader from './CustomHeader/CustomHeader'
// import { setItem } from '../../../core/services/common/storage.services'

const UserComments = ({ comList, accptCmnt, rejCmnt, delCmnt , onvan , queryclient }) => {
  const navigate = useNavigate();
 console.log("comList",comList);
 queryclient.invalidateQueries({ queryKey: ['getComment'] })
  return (
    <Fragment>
      <Card className="">
        <div className="react-dataTable">
          <Table hover>
            <thead>
              <tr>
                <th className=" px-0">{onvan}</th>
                <th className=" px-0">عنوان کامنت</th>
                <th className=" px-0"> متن کامنت</th>
                {/* <th> نوع</th> */}
                <th className=" px-0"> وضعیت</th>
                <th className=" px-0">  اقدام</th>
              </tr>
            </thead>
            {comList &&
              comList?.map((item, index) => {
                return (
                  <tbody key={index}>
                    <tr>
                      <td style={{maxWidth:"160px"}} className=" px-1" >{item.author ?item.author:item.courseTitle}</td>
                      <td
                        className=" px-0"
                        style={{whiteSpace:"nowrap", 
                          overflow:"hidden",
                          textOverflow:"ellipsis",
                          maxWidth:"130px"
                        }}
                        //   onClick={()=>{navigate('/users/view')}}
                      >
                        {item.title?item.title:item.commentTitle}
                      </td>
                      <td style={{maxWidth:"220px"}} className=" p-0">{item.describe}</td>
                      {/* <td>
            ریپلی
          </td> */}
                      <td className=" p-0" 
                      onClick={item.accept === true ? () => rejCmnt(item.id? item.id:item.commentId): () => accptCmnt(item.id? item.id:item.commentId)}
                      >
                        <Badge pill color={item.accept  ?"light-primary" : "light-danger"} className="me-1">
                          {item.accept === true ? "تایید شده" : " تایید نشده"}
                        </Badge>
                      </td>
                      <td className=" p-0">
                        <UncontrolledDropdown direction="start">
                          <DropdownToggle
                            className="icon-btn hide-arrow"
                            color="transparent"
                            size="sm"
                            caret
                          >
                            <MoreVertical size={15} />
                          </DropdownToggle>
                          <DropdownMenu className="d-flex flex-column p-0">
                            {item.accept ? (
                              <DropdownItem
                               onClick={() => rejCmnt(item.id? item.id:item.commentId)}
                               >
                                <Delete className="me-50" size={15} />{" "}
                                <span className="align-middle"> عدم تایید</span>
                              </DropdownItem>
                            ) : (
                              <DropdownItem
                               onClick={() => accptCmnt(item.id? item.id:item.commentId)}
                               >
                                <Edit className="me-50" size={15} />{" "}
                                <span className="align-middle">تایید</span>
                              </DropdownItem>
                            )}
                            <DropdownItem divider className="p-0 m-0" />

                            <DropdownItem 
                            onClick={() => delCmnt(item.id? item.id:item.commentId)}
                            >
                              <Delete className="me-50" size={15} />{" "}
                              <span className="align-middle"> حذف </span>
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
          </Table>
        </div>
      </Card>

      {/* <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} /> */}
    </Fragment>
  );
};

export default UserComments;
