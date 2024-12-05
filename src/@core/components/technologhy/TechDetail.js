import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import useQueryGet from '../../../customHook/useQueryGet'
import blankthumbnail from '../../../@core/assets/images/portrait/small/blank-thumbnail.jpg'
const TechDetail = ({show , setShow , selectedItem}) => {
    console.log("selectedItemdetail" , selectedItem)

    const{data} = useQueryGet(["techdetails"] , `/Technology/${selectedItem.id}`)
    console.log("data" , data)

  return (
    <Modal isOpen={show} toggle={() => setShow(!show)}>
        <ModalHeader toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody>
            <div style={{display: "flex" , gap: " 5px"}}> 
            <span>  
                <img style={{width: "35px" , height: "35px", borderRadius: "10px"}} src={blankthumbnail}/>
           </span>  
            <span>  {data?.describe}  </span>  
            <span>  {data?.techName}  </span>  
          </div>
        </ModalBody>
    </Modal>
  )
}

export default TechDetail