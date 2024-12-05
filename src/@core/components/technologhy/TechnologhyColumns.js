
import React from 'react';
import react , {useState } from 'react'
import { Link } from 'react-router-dom';
import {  Edit, Info, MoreVertical, } from 'react-feather';
import UpdateTech from './UpdateTech';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import TechDetail from './TechDetail';

export const TechnologhyColumns = ( refetch) =>  [
    
    {
        name: "id",
        reorder: true,
        width:  "200px",
        cell: (row) => {
          return (
            <Link className="">
            
              <div className="">
              #{row?.id} 
              </div>
            </Link>
          );
        },
      },
   {
        name: "وضعیت دوره",
        reorder: true,
        minWidth: "200px",
        cell: (row) => {
          return (

              <div className="user-info text-truncate ms-1">
                {row?.techName}
              </div>
      
          );
        },
      },
      
   {
        name: "توضیحات دوره",
        reorder: true,
        minWidth: "200px",
        cell: (row) => {
          return (

              <div className="user-info text-truncate ms-1">
                {row?.describe}
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
                    <MoreVertical size={14}/>
                </DropdownToggle>
                <DropdownMenu  className="d-flex flex-column p-0  ">
                    <DropdownItem>
                      <div style={{width: "100%"}}  onClick={() => {setShow(true), setSelectedItem(row)}}>                          
                         <Edit size={18} style={{cursor: "pointer"}} />
                         <span style={{paddingRight: "5px"}}>  ویرایش  </span>    
                     </div>                         
                    </DropdownItem>               
                    <DropdownItem>
                      <div style={{width: "100%"}}  onClick={() => {setShowDetail(true), setDetailSelectedItem(row)}}>                          
                         <Info size={18} style={{cursor: "pointer"}} />
                         <span style={{paddingRight: "5px"}}>  جزییات  </span>    
                     </div>                         
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown> 

       
               {show && <UpdateTech  show={show} setShow={setShow}  selectedItem={selectedItem} refetch={refetch} />   } 
   
               {showDetail && <TechDetail  show={showDetail} setShow={setShowDetail}  selectedItem={detailselectedItem} refetch={refetch} />   }                      
            </>
          );

    
                           
        },
        
      },


      
  ];