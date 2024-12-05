import React from 'react';
import react , {useState } from 'react'
import { Link } from 'react-router-dom';
import {  Delete, Edit, Info, MoreVertical, Plus, } from 'react-feather';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { convertDateToPersian } from '../../../../utility/hooks/date-helper.utils';

export const CourseMentorColumns = ( refetch) =>  [
    {
        name: "id",
        reorder: true,
        width:  "200px",
        cell: (row) => {
            console.log("row1212212" , row)
          return (
            <Link className="">
            
              <div className="">
             #{row?.userId} 
              </div>
            </Link>
          );
        },
      },
    
    {
        name: "نام منتور",
        reorder: true,
        width:  "200px",
        cell: (row) => {
          return (
            <Link className="">
            
              <div className="">
              {row?.assistanceName} 
              </div>
            </Link>
          );
        },
      },
   {
        name: "تاریخ ایجاد",
        reorder: true,
        minWidth: "200px",
        cell: (row) => {
          return (

              <div className="user-info text-truncate ms-1">
                {convertDateToPersian(row?.inserDate)}
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
                </DropdownMenu>
            </UncontrolledDropdown> 

       
                {/* {show && <UpdateJobs  show={show} setShow={setShow}  selectedItem={selectedItem} refetch={refetch} />   }  */}
   
               {/* {showDetail && <TechDetail  show={showDetail} setShow={setShowDetail}  selectedItem={detailselectedItem} refetch={refetch} />   }                        */}
            </>
          );
                           
        },      
      },     
  ];