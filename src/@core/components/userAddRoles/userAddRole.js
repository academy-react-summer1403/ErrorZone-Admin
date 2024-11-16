import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import { Button, Label, Modal, ModalBody, ModalHeader } from "reactstrap";

import { addUserAccessAPI } from "../../../core/services/Paper";
import { userRoles } from "../../../core/data/userRoles";
import { selectThemeColors } from "../../../core/utility/Utils";

const UserAddRole = ({ modal, id, toggleModal, redirectUrl }) => {
  // ** States
  const [role, setRole] = useState();

  // ** Hooks
  const navigate = useNavigate();

  const animatedComponents = makeAnimated();

  const handleAddRole = async () => {
    try {
      const changeRole = await addUserAccessAPI(true, role, id);

      if (changeRole.success) {
        toast.success("دسترسی با موفقیت تغییر کرد !");

        navigate(redirectUrl);
      } else {
        const addRole = await addUserAccessAPI(false, role, id);
        if (addRole.success) {
          toast.success("دسترسی با موفقیت تغییر کرد !");

          navigate(redirectUrl);
        }
      }
    } catch (error) {
      toast.error("مشکلی در تغییر دسترسی به وجود آمد !");
    }
  };

  return (
    <Modal
      isOpen={modal === id}
      toggle={() => toggleModal(id)}
      className="modal-dialog-centered"
      key={id}
    >
      <ModalHeader toggle={() => toggleModal(id)}>
        در این بخش میتونید دسترسی های لازم را به کاربر بدهید.
      </ModalHeader>
      <ModalBody>
        <Label>انتخاب نقش</Label>
        <Select
          theme={selectThemeColors}
          className="react-select"
          classNamePrefix="select"
          name="courseLevel"
          options={userRoles}
          isClearable
          isSearchable
          components={animatedComponents}
          onChange={(e) => setRole(e?.value)}
        />
        <Button
          color="primary"
          className="mt-1"
          disabled={!role}
          onClick={handleAddRole}
        >
          افزودن نقش
        </Button>
      </ModalBody>
    </Modal>
  );
};

export default UserAddRole;
