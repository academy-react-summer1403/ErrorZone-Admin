import React from "react";
import react, { useState } from "react";
import { Link } from "react-router-dom";
import { Delete, Edit, Info, MoreVertical, Plus } from "react-feather";
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { convertDateToPersian } from "../../../utility/hooks/date-helper.utils";
import { persianNumberFormatter } from "../../../core/utility/persian-number-formatter-helper";
import UpdatePayments from "./UpdatePayments";

export const PaymentsColumns = (refetch ) => [
    
  {
    name: "موضوع",
    reorder: true,
    width: "200px",
    cell: (row) => {
      return (
        <Link className="">
          <div className="">{row.title}</div>
        </Link>
      );
    },
  },

  {
    name: "نام دانش اموز",
    reorder: true,
    width: "200px",
    cell: (row) => {
      return (
        <Link className="">
          <div className="">{row.studentName}</div>
        </Link>
      );
    },
  },
  {
    name: " پرداخت ها",
    reorder: true,
    minWidth: "200px",
    cell: (row) => {
      return <div >{persianNumberFormatter(row.paid)}</div>;
    },
  },

  {
    name: "نام گروه",
    reorder: true,
    minWidth: "200px",
    cell: (row) => {
      return (
        <div >{row.groupName}</div>
      );
    },
  },
  {
    name: "تاریخ پرداخت",
    reorder: true,
    minWidth: "200px",
    cell: (row) => {
      return (
        <div >{convertDateToPersian(row.peymentDate)}</div>
      );
    },
  },
  {
    name: "وضعیت پرداختی ها",
    reorder: true,
    minWidth: "200px",
    cell: (row) => {
      return (
        <div >
          {row.accept ? (
            <Badge color="success"> پرداخت شده </Badge>
          ) : (
            <Badge color="danger"> پرداخت نشده </Badge>
          )}
        </div>
      );
    },
  },

  {
    name: "اقدام",
    reorder: true,
    minWidth: "200px",
    cell: (row) => {
      const [selectedItem, setSelectedItem] = useState(null);
      const [detailselectedItem, setDetailSelectedItem] = useState(null);
      const [show, setShow] = useState(false);
      const [showDetail, setShowDetail] = useState(false);

      return (
        <>
          <UncontrolledDropdown>
            <DropdownToggle color="transparent" className="icon-btn hide-arrow">
              <MoreVertical size={14} />
            </DropdownToggle>
            <DropdownMenu className="d-flex flex-column p-0  ">
              <DropdownItem>
                <div
                  style={{ width: "100%" }}
                  onClick={() => {
                    setShow(true), setSelectedItem(row);
                  }}
                >
                  <Edit size={18} style={{ cursor: "pointer" }} />
                  <span style={{ paddingRight: "5px" }}> ویرایش </span>
                </div>
              </DropdownItem>
              <DropdownItem>
                <div
                  style={{ width: "100%" }}
                  onClick={() => {
                    setShowDetail(true), setDetailSelectedItem(row);
                  }}
                >
                  <Info size={18} style={{ cursor: "pointer" }} />
                  <span style={{ paddingRight: "5px" }}> جزییات </span>
                </div>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>

           {show && <UpdatePayments  show={show} setShow={setShow}  course={selectedItem} refetch={refetch}  />   }  

          {/* {showDetail && <TechDetail  show={showDetail} setShow={setShowDetail}  selectedItem={detailselectedItem} refetch={refetch} />   }                        */}
        </>
      );
    },
  },
];
