
import React from 'react';
import react , {useState } from 'react'
import { Link } from 'react-router-dom';
import useQueryGet from '../../../customHook/useQueryGet';
import { convertDateToPersian } from '../../../utility/hooks/date-helper.utils';
import { Edit } from 'react-feather';
import CreateClassRooem from './CreateClassRoom';
//import CreateAss from './createAss';


export const ClassRoomColumns = (toggleEditModal) =>  [
    {
        name: "نام کلاس",
        reorder: true,
        width:  "200px",
        cell: (row) => {
          // ** States
          const {data : list } = useQueryGet(["getAss"] , ("/AssistanceWork"))
          return (
            <Link className="d-flex align-items-center">
            
              <div className="text-truncate ms-1">
              {row?.classRoomName}
              </div>
            </Link>
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
                {convertDateToPersian(row?.insertDate)}
              </div>
      
          );
        },
      },

   {
        name: "نام ساختمان",
        reorder: true,
        minWidth: "200px",
        cell: (row) => {
          return (

              <div className="user-info text-truncate ms-1">
                 {row?.buildingName}
              </div>
      
          );
        },
      },
   {
        name: "ظرفیت ساختمان",
        reorder: true,
        minWidth: "200px",
        cell: (row) => {
          return (

              <div className="user-info text-truncate ms-1">
                  {row?.capacity}
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

          return (
            <> 
            <div style={{cursor: "pointer"}} onClick={(e) => {
                e.preventDefault()
                toggleEditModal();
                
                  }}>
            <Edit/>
       
          </div>

       <CreateClassRooem row={console.log("row2222222" ,row?.classRoomName)} />  
       </>

          );
                          
        },
      },


      
  ];