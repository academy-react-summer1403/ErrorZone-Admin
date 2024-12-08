import React from 'react';
import react , {useState } from 'react'
import { Link } from 'react-router-dom';
import {  Edit, Info, MoreVertical,  } from 'react-feather';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { convertDateToPersian } from '../../../utility/hooks/date-helper.utils';
import UpdateDepartment from './UpdateDepartment';

export const DepartmentColumns = ( refetch) =>  [
    {
        name: "Id",
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
        name: "نام بخش",
        reorder: true,
        width:  "200px",
        cell: (row) => {
          return (
            <Link className="">
            
              <div className="">
              {row?.depName} 
              </div>
            </Link>
          );
        },
      },
   {
        name: "ساختمان",
        reorder: true,
        minWidth: "200px",
        cell: (row) => {
          return (

              <div>
                {row?.buildingName}
              </div>
      
          );
        },
      },
      
      {
        name: "تاریخ ",
        reorder: true,
        minWidth: "200px",
        cell: (row) => {
          return (

              <div>
                {convertDateToPersian(row?.insertDate)}
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
            console.log("row22222" , row)
            
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

       
                {show && <UpdateDepartment  show={show} setShow={setShow}  selectedItem={selectedItem} refetch={refetch} />   } 
   
               {/* {showDetail && <TechDetail  show={showDetail} setShow={setShowDetail}  selectedItem={detailselectedItem} refetch={refetch} />   }                        */}
            </>
          );

    
                           
        },
        
      },


      
  ];