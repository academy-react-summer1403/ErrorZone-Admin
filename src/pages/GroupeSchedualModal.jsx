import React, { Fragment, useState } from "react";
import CustomModal from "../@core/components/CustomModal/CustomModal";
import { Edit } from "react-feather";

const GroupeSchedualModal = () => {
  const [show, setShow] = useState(false);
  return (
    <Fragment>
      <Edit size={20} onClick={() => setShow(true)} />
      <CustomModal show={show} setShow={setShow}>
        
      </CustomModal>
    </Fragment>
  );
};

export default GroupeSchedualModal;
