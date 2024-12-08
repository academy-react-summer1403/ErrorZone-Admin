import React from 'react';
import react , {useState } from 'react'
import { Link } from 'react-router-dom';
import useQueryGet from '../../../customHook/useQueryGet';
import { convertDateToPersian } from '../../../utility/hooks/date-helper.utils';
import { Edit } from 'react-feather';
//import Createassistance from './createassistance';
//import CreateClassRooem from './CreateClassRoom';

export const AssistanceCourseColumns = (toggleEditModal) =>  [
    {
        name: "ایدی کاربر",
        reorder: true,
        width:  "200px",
        cell: (row) => {
          // ** States
          const {data : list } = useQueryGet(["getAss"] , ("/AssistanceWork"))
          return (
            <Link className="d-flex align-items-center">
            
              <div className="text-truncate ms-1">
              {row?.userId}
              </div>
            </Link>
          );
        },
      },
   {
        name: "نام دوره",
        reorder: true,
        minWidth: "200px",
        cell: (row) => {
          return (

              <div className="user-info text-truncate ms-1">
                {row?.courseName}
              </div>
      
          );
        },
      },

   {
        name: "تاریخ انتشار",
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
        cell: (row) => 
        
        {
          const [selectedItem, setSelectedItem] = useState(null);                           
          const [show, setShow] = useState(false);  

          const toggle = () => {
            setShow(!show)
          }

          return (
            <> 
            <div style={{cursor: "pointer"}}  onClick={() => {setShow(true), setSelectedItem(row)}}>
            <Edit/>
       
          </div>

        {/* <Createassistance isOpen={show} toggle={toggle}  row={selectedItem} />     */}
       </>

          );
                          
        },
      },


      
  ];