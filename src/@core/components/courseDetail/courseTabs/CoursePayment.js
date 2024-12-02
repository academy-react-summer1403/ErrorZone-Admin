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


const Payments = ({ allPayments }) => {
 
  return (
    <Fragment>
      <Card className="">
        <div className="react-dataTable">
          <Table hover >
            <thead>
              <tr className="text-center">
                <th className=" px-0"> نام کاربر</th>
                <th className=" px-0">گروه دوره </th>
                <th className=" px-0"> وضعیت پرداختی</th>
              </tr>
            </thead>
            {allPayments &&
              allPayments?.map((item, index) => {
                return (
                  <tbody key={index}>
                    <tr className="text-center">
                      <td  className=" px-0">
                        {item?.studentName}
                      </td>

                      <td  className=" px-0">
                        {item?.groupName}
                      </td>

                      <td className=" px-0">
                        <Badge
                          pill
                          color={item?.peymentDone  ?"light-primary" : "light-danger"}
                          className="me-1"
                        >
                          {item?.peymentDone ? " پرداخت شده" : "پرداخت نشده"}
                        </Badge>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
          </Table>
        </div>
      </Card>
    </Fragment>
  );
};

export default Payments;
