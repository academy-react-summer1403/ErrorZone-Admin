// ** React Imports
import { Fragment, useState } from "react";
import Avatarrr from "../../assets/images/new/55.jpg";

// ** Reactstrap Imports
import {
  Badge,
  Button,
  Card,
  CardBody,
  Col,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";

// ** Third Party Components
import { Briefcase, Check } from "react-feather";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import { Field, Form, Formik } from "formik";

const MySwal = withReactContent(Swal);

const NewsInfoCard = ({ newsDet , setEditModal , activeOrDeactive }) => {


  // ** State
  const [show, setShow] = useState(false);

  // ** Hook
  const {
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      lastName: "mohsen",
      firstName: "mohsen",
    },
  });



  let typeId;

  const type = (v) => {
    if (v.courseTypeName === "حضوری") {
      return (typeId = 1);
    }
    if (v.courseTypeName === "آنلاین") {
      return (typeId = 2);
    }
    if (v.courseTypeName === "حضوری آنلاین") {
      return (typeId = 3);
    }
    return typeId;
  };

  const handleClick = async (boolean) => {
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
        activeOrDeactive(boolean);
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
          text: "عملیات لغو شد :)",
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
    <Fragment>
      <Card>
        <CardBody>
          <div className="user-avatar-section">
            <div className=" d-flex align-items-center flex-column">
              <img
                height="100"
                width="100"
                alt="user-avatar"
                src={
                  newsDet?.currentImageAddressTumb == null ||
                  newsDet?.currentImageAddressTumb == "undefined"
                    ? Avatarrr
                    : newsDet.currentImageAddressTumb
                }
                className="img-fluid rounded mt- mb-1"
              />
              <div className="d-flex flex-column align-items-center text-center">
                <div className="user-info">
                  <h4> {newsDet?.title} </h4>
                  <Badge
                    pill
                    color={newsDet?.active ? "light-primary" : "light-danger"}
                  >
                    {newsDet?.active ? "فعال" : "غیرفعال"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          <div className=" d-flex justify-content-around my-1 pt-">
            <div className="d-flex align-items-start me-2">
              <Badge color="light-primary" className="rounded p-75">
                <Check className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0"> {newsDet?.currentView} </h4>
                <small> بازدید ها</small>
              </div>
            </div>
            <div className="d-flex align-items-start">
              <Badge color="light-primary" className="rounded p-75">
                <Briefcase className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{ newsDet?.commentsCount}</h4>
                <small>کامنت ها</small>
              </div>
            </div>
          </div>
          <h4 className="fw-bolder border-bottom pb-50 mb-1">جزئیات</h4>
          <div className="info-container">
            <ul className="list-unstyled">
              <li className="mb-75">
                <span className="fw-bolder me-25">نام نویسنده:</span>
                <span> { newsDet?.addUserFullName} </span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">دسته بندی :</span>
                <span> { newsDet?.newsCatregoryName} </span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">عنوان کوتاه :</span>
                <span>{ newsDet?.miniDescribe}</span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">عنوان گوگل:</span>
                <span className="text-capitalize">
                  
                  { newsDet?.googleTitle}
                </span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">تاریخ ایجاد:</span>
                <span>{ newsDet?.insertDate}</span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">تاریخ بروز رسانی :</span>
                <span>{ newsDet?.updateDate} </span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">توضیحات دوره:</span>
                <span>{ newsDet?.describe}</span>
              </li>
            </ul>
          </div>
          <div className="d-flex justify-content-center pt-2">
            <Button
              color="primary"
              onClick={() => setEditModal((old)=>!old)}
            >
              ویرایش
            </Button>
            <Button
              className="ms-1"
              color="danger"
              outline
              onClick={()=>handleClick(newsDet?.active ? false : true)}
            >
              {newsDet?.active ? "غیر فعال کردن" : "فعال کردن"}

            </Button>
          </div>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default NewsInfoCard;
