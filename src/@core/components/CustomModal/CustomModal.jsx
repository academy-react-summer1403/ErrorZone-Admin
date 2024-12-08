import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

const CustomModal = ({show,setShow,children}) => {

  return (
    <Modal toggle={() => setShow(!show)} isOpen={show} >
        <ModalHeader toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody>{children}</ModalBody>
    </Modal>
  )
}

export default CustomModal