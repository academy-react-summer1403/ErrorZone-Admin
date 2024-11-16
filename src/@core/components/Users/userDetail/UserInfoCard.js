// ** React Imports
import { useState, Fragment } from "react";

// ** Reactstrap Imports
import { Card, CardBody, Button, Badge, Tooltip } from "reactstrap";

// ** Third Party Components
import Swal from "sweetalert2";
import { Check, Briefcase, X, Edit } from "react-feather";
import withReactContent from "sweetalert2-react-content";

// ** Custom Components
import avatarImg from "@src/assets/images/portrait/small/ee.jpg";
import avatarMenImg from "@src/assets/images/portrait/small/jpmen.jpg";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import { Link, useParams } from "react-router-dom";
import UserAddRole from "../../AddRoles/AddRoles";
import { ReserveToActive, deleteUser } from "../../../../core/services/Paper";



const MySwal = withReactContent(Swal);

const UserInfoCard = ({
  userDetails,
  setReftch,
  submitUserUpdate,
  setShow,
  show,
  reftch,
}) => {
  // ** State
  // const [show, setShow] = useState(false);
  const [modal, setModal] = useState(null);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const {id} = useParams()
  console.log("id1234" , id)

  const userRole = userDetails?.roles;

const ress=userDetails?.coursesReseves
const reservve=ress?.filter((item)=>{return(item.accept== false)})
  // console.log("ww",reservve?.length);


  // ** Delete user
  const toggleModal = (id) => {
    if (modal !== id) {
      setModal(id);
    } else {
      setModal(null);
    }
  };

  const handleAddRoleClick = () => {
    toggleModal(userDetails.id);
  };

   const handleDeleteUser = async (id) => {
     const userId = {
       userId: id,
     };
     const res = await deleteUser(userId);
     console.log("id", res);
   };

  const handleSuspendedClick = async (id) => {
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
        handleDeleteUser(id);
        MySwal.fire({
          icon: "error",
          title: "نا موفق!",
          text: "فقط ادمین اصلی سیتم میتواند این عملیات را انجام دهد ",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: "لغو گردید",
          text: "عملیات لغو گردیده است:)",
          icon: "error",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      }
    });
  };

  // ** ReverseToActive user

   const handleActiveUser = async (id) => {
     const userId = {
       userId: id,
     };
     try {
       ReserveToActive(userId);
     } catch (error) {
       throw new Error("ERROR: ", error);
     }
   };

  const handleUnsuspendedClick = async (id) => {
    return MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Suspend user!",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
    }).then(function (result) {
      if (result.value) {
        console.log(id);
        handleActiveUser(id);
        // MySwal.fire({
        //   icon: "success",
        //   title: "Suspended!",
        //   text: "User has been suspended.",
        //   customClass: {
        //     confirmButton: "btn btn-success",
        //   },
        // });
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: "Cancelled",
          text: "Cancelled Suspension :)",
          icon: "error",
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
                src={
                  userDetails?.currentPictureAddress != null &&
                  userDetails?.currentPictureAddress != "Not-set"
                    ? userDetails?.currentPictureAddress
                    : userDetails?.gender
                    ? avatarMenImg
                    : avatarImg
                }
                className="img-fluid rounded  mb-2"
              />
              <div className="d-flex flex-column align-items-center text-center">
                <div className="user-info">
                  <h4>{userDetails?.fName + " " + userDetails?.lName}</h4>
                  <div className="gap-1 d-flex flex-wrap mt-1">
                    {userRole &&
                      userRole?.map((item, index) => {
                        return (
                          <Badge
                            onClick={handleAddRoleClick}
                            key={index}
                            color="light-primary"
                            className="text-capitalize cursor-pointer"
                          >
                            {item.roleName}
                          </Badge>
                        );
                      })}
                    <Edit
                      onClick={handleAddRoleClick}
                      style={{ width: "18px", height: "18px" }}
                      className="cursor-pointer"
                      id="gi"
                    />{" "}
                    <Tooltip
                      placement="bottom"
                      isOpen={tooltipOpen}
                      toggle={() => setTooltipOpen(!tooltipOpen)}
                      target="gi"
                      innerClassName="table-tooltip"
                    >
                      {" "}
                      افزودن نقش
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-around my-2 pt-75">
            <div className="d-flex align-items-start me-2">
              <Badge color="light-primary" className="rounded p-75">
                <Check className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{userDetails?.courses?.length}</h4>
                <small>دوره ها</small>
              </div>
            </div>
            <div className="d-flex align-items-start">
              <Badge color="light-primary" className="rounded p-75">
                <Briefcase className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{reservve?.length}</h4>
                <small>دوره های رزرو</small>
              </div>
            </div>
          </div>
          <h4 className="fw-bolder border-bottom pb-50 mb-1">جزئیات</h4>
          <div className="info-container">
            {userDetails !== null ? (
              <ul className="list-unstyled">
                <li className="mb-75">
                  <span className="fw-bolder me-25">نام کاربری:</span>
                  <span>{userDetails?.userName}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">ایمیل:</span>
                  <span>{userDetails?.gmail}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">وضعیت:</span>
                  <Badge className="text-capitalize" color="light-primary">
                    {userDetails?.active != false ? "فعال" : "غیرفعال"}
                  </Badge>
                </li>
                <li className="d-flex mb-75">
                  <span className="fw-bolder me-25">درصد تکمیل پروفایل:</span>
                  <span className="d-flex gap-2">
                    {userDetails?.profileCompletionPercentage}%
                  </span>
                </li>
                <li className="d-flex mb-75">
                  <span className="fw-bolder me-25">جنسیت:</span>
                  <span className="d-flex gap-2">
                    {userDetails?.gender && userDetails.gender === true
                      ? "مرد"
                      : "زن"}
                  </span>
                </li>

                <li className="mb-75">
                  <span className="fw-bolder me-25">کدملی:</span>
                  <span>{userDetails?.nationalCode}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">شماره موبایل:</span>
                  <span>{userDetails?.phoneNumber}</span>
                </li>
              </ul>
            ) : null}
          </div>
          <div className="d-flex justify-content-center pt-2">
            <Link to={`/user/edit/${id}`}>
            <Button color="primary">
              ویرایش
            </Button>
            </Link>
            {userDetails?.active && userDetails?.active !== false ? (
              <Button
                className="ms-1"
                color="danger"
                outline
                value={userDetails.id}
                onClick={(e) => handleSuspendedClick(e.target.value)}
              >
                غیرفعال کردن
              </Button>
            ) : (
              <Button
                className="ms-1"
                color="warning"
                outline
                value={userDetails?.id}
                onClick={(e) => handleUnsuspendedClick(e.target.value)}
              >
                فعال کردن
              </Button>
            )}
          </div>
        </CardBody>
      </Card>
       <UserAddRole 
        modal={modal}
        id={userDetails?.id}
        userName={userDetails?.fname + " " + userDetails?.lname}
        toggleModal={toggleModal}
        userRoles={userDetails?.roles}
        setReftch={setReftch}
        reftch={reftch}
      /> 
    </Fragment>
  );
};

export default UserInfoCard;
