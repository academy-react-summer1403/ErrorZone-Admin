import React from "react";
import react, { useState } from "react";
import { Link } from "react-router-dom";
import useQueryGet from "../../../customHook/useQueryGet";
import { convertDateToPersian } from "../../../utility/hooks/date-helper.utils";
import { Calendar, Edit, MoreVertical, Plus } from "react-feather";
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import useMutationPut from "../../../customHook/useMutationPut";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content"
import { useQueryClient } from "@tanstack/react-query";
import UpdatingBuilding from "./UpdatingBuilding";

export const BuildingColumns = (refetch) => [
  {
    name: "نام ساختمان",
    reorder: true,
    width: "200px",
    cell: (row) => {
      return (
        <Link className="">
          <div className="">{row?.buildingName}</div>
        </Link>
      );
    },
  },
  {
    name: "تاریخ افزودن",
    reorder: true,
    minWidth: "200px",
    cell: (row) => {
      return (
        <div className="user-info text-truncate ms-1">
          {convertDateToPersian(row?.workDate)}
        </div>
      );
    },
  },

  {
    name: "طبقه",
    reorder: true,
    minWidth: "200px",
    cell: (row) => {
      return <div className="user-info text-truncate ms-1">{row?.floor}</div>;
    },
  },
  {
    name: " وضعیت",
    reorder: true,
    minWidth: "200px",
    cell: (row) => {
      return (
        <Badge color={row.active ? "danger" : "success"}>
          {row.active ? "غیر فعال" : "فعال"}
        </Badge>
      );
    },
  },

  {
    name: "اقدام",
    reorder: true,
    minWidth: "200px",
    cell: (row) => {
      const [selectedItem, setSelectedItem] = useState(null);
      const [show, setShow] = useState(false);
      const MySwal = withReactContent(Swal);

      ///const queryclient = useQueryClient()

      const { mutate , isSuccess } = useMutationPut("/Building/Active", ["updateBuilding"]);

      if(isSuccess){
        //queryclient.invalidateQueries(['Building'])
      }

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
        }).then(function (result) {
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
          } else if (result.dismiss === MySwal.DismissReason.cancel) {
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
        });
      };

      return (
        <>
          <UncontrolledDropdown className="position-static">
            <DropdownToggle tag="div" className="btn btn-sm">
              <MoreVertical size={14} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu positionFixed>
              <DropdownItem
                onClick={(e) => {
                  e.preventDefault();
                  row?.active
                    ? handleSuspendClick(false, row?.id)
                    : handleSuspendClick(true, row?.id);
                }}
              >
                <Edit size={14} className="me-50" />
                <span className="align-middle"> فعال کردن </span>
              </DropdownItem>
              <DropdownItem
                className="w-100 cursor-pointer"

              >
                <Calendar size={14} className="me-50" />
                <span className="align-middle " onClick={() => {setShow(true), setSelectedItem(row)}}>  ویرایش </span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>

          {show && <UpdatingBuilding  show={show} setShow={setShow} refetch={refetch}  item={selectedItem}/>    }

          {/* {show && <UpdateTerm  show={show} setShow={setShow} refetch={refetch}  selectedItem={selectedItem}/>    }     
           {show3 && <DateModal show={show3} refetch={refetch} setShow={setShow3} selectedItem={selectedItem3} />}       */}
        </>
      );
    },
  },
];
