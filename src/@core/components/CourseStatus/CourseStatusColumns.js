
import React from 'react';
import react , {useState } from 'react'
import { Link } from 'react-router-dom';
import {  Edit, } from 'react-feather';
import UpdateCourseStatus from './UpdateCourseStatus';
export const CourseStatusColumns = ( refetch) =>  [
    
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
                {row?.statusName}
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
            const [show, setShow] = useState(false);  

          return (
            <>   
             <div onClick={() => {setShow(true), setSelectedItem(row)}}>      
                 <Edit size={18} style={{cursor: "pointer"}} />
             </div>
       
              {show && <UpdateCourseStatus  show={show} setShow={setShow}  selectedItem={selectedItem} refetch={refetch} />   }      
            </>
          );

    
                           
        },
        
      },


      
  ];