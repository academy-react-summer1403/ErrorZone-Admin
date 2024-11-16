// ** React Imports
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// ** Reactstrap Imports
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";

// ** Icon Imports
import { Check, X } from "react-feather";
import { addUserAccessAPI } from "../../../core/services/Paper";



const CustomLabel = ({ htmlFor }) => {
  return (
    <Label className="form-check-label" htmlFor={htmlFor}>
      <span className="switch-icon-left">
        <Check size={14} />
      </span>
      <span className="switch-icon-right">
        <X size={14} />
      </span>
    </Label>
  );
};

const UserAddRole = ({
  modal,
  id,
  toggleModal,
  userRoles,
  userName,
  setReftch,
  reftch,
}) => {
  // console.log("ww", id);
  const userRoless = userRoles && userRoles.map((item) => item?.roleName);

  // ** States
  const [isAdmin, setIsAdmin] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [isStudent, setIsStudent] = useState(false);

  useEffect(() => {
    if (userRoless?.includes("Administrator")) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
    if (userRoless?.includes("Teacher")) {
      setIsTeacher(true);
    } else {
      setIsTeacher(false);
    }
    if (userRoless?.includes("Student")) {
      setIsStudent(true);
    } else {
      setIsStudent(false);
    }
  }, [userRoless, reftch]);
  //
  const handleChangeAccess = async (
    isRoleChecked,
    roleId,
    setIsRoleChecked
  ) => {
    try {
      const changeRole = await addUserAccessAPI(!isRoleChecked, roleId, id);
      // console.log("ww",changeRole);

      if (changeRole?.success) {
        toast.success("دسترسی با موفقیت تغییر کرد !");
        setIsRoleChecked((prev) => !prev);
        setReftch((old) => !old);
      } else {
        toast.error("مشکلی در تغییر دسترسی به وجود آمد !");
      }
    } catch (error) {
      console.log(error);
      toast.error("مشکلی در تغییر دسترسی به وجود آمد !");
    }
  };

  return (
    <Modal
      isOpen={modal === id}
      userName={userName}
      toggle={() => toggleModal(id)}
      className="modal-dialog-centered modal-xs"
      key={id}
    >
      <ModalHeader toggle={() => toggleModal(id)}>
        در این بخش میتونید دسترسی های لازم را به {userName} بدهید.
      </ModalHeader>
      <ModalBody>
        <Card>
          <CardHeader className="add-user-role-card-header">
            <Badge color={isAdmin ? "success" : "danger"}>
              {isAdmin ? "فعال" : "غیر فعال"}
            </Badge>

            <CardBody className="d-flex justify-content-center">
              <div className="d-flex align-items-center gap-1">
                <Label
                  for="admin"
                  className="form-check-label select-role-switch"
                >
                  ادمین
                </Label>
                <div className="form-switch form-check-success">
                  <Input
                    type="switch"
                    checked={isAdmin}
                    id="admin"
                    name="admin"
                    onChange={() => handleChangeAccess(isAdmin, 1, setIsAdmin)}
                  />
                  <CustomLabel htmlFor="admin" />
                </div>
              </div>
            </CardBody>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="add-user-role-card-header">
            <Badge color={isTeacher ? "success" : "danger"}>
              {isTeacher ? "فعال" : "غیر فعال"}
            </Badge>

            <CardBody className="d-flex justify-content-center">
              <div className="d-flex align-items-center gap-1">
                <Label
                  for="teacher"
                  className="form-check-label select-role-switch"
                >
                  استاد
                </Label>
                <div className="form-switch form-check-success">
                  <Input
                    type="switch"
                    checked={isTeacher}
                    id="teacher"
                    name="teacher"
                    onChange={() =>
                      handleChangeAccess(isTeacher, 2, setIsTeacher)
                    }
                  />
                  <CustomLabel htmlFor="teacher" />
                </div>
              </div>
            </CardBody>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="add-user-role-card-header">
            <Badge color={isStudent ? "success" : "danger"}>
              {isStudent ? "فعال" : "غیر فعال"}
            </Badge>

            <CardBody className="d-flex justify-content-center">
              <div className="d-flex align-items-center gap-1">
                <Label
                  for="student"
                  className="form-check-label select-role-switch"
                >
                  دانشجو
                </Label>
                <div className="form-switch form-check-success">
                  <Input
                    type="switch"
                    checked={isStudent}
                    id="student"
                    name="student"
                    onChange={() =>
                      handleChangeAccess(isStudent, 5, setIsStudent)
                    }
                  />
                  <CustomLabel htmlFor="student" />
                </div>
              </div>
            </CardBody>
          </CardHeader>
        </Card>
      </ModalBody>
    </Modal>
  );
};

export default UserAddRole;