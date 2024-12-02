
import React from 'react';
import react , {useState } from 'react'
import { Link } from 'react-router-dom';
import useQueryGet from '../../../customHook/useQueryGet';
import { convertDateToPersian } from '../../../utility/hooks/date-helper.utils';
import { Edit } from 'react-feather';
import { Tooltip } from 'reactstrap';
import CreateAss from './createAss';


export const Columns = (toggleEditModal) =>  [
    {
        name: "نام دوره",
        reorder: true,
        width:  "200px",
        cell: (row) => {
          // ** States
          const {data : list } = useQueryGet(["getAss"] , ("/AssistanceWork"))
          return (
            <Link className="d-flex align-items-center">
            
              <div className="text-truncate ms-1">
              {row?.worktitle}
              </div>
            </Link>
          );
        },
      },
   {
        name: "توضیحات تسک",
        reorder: true,
        minWidth: "200px",
        cell: (row) => {
          return (

              <div className="user-info text-truncate ms-1">
                {row?.workDescribe}
              </div>
      
          );
        },
      },

   {
        name: "  ناشر تسک",
        reorder: true,
        minWidth: "200px",
        cell: (row) => {
          return (

              <div className="user-info text-truncate ms-1">
                 {row?.assistanceName}
              </div>
      
          );
        },
      },
   {
        name: " تاریخ انتشار",
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
        name: " تاریخ انجام تسک",
        reorder: true,
        minWidth: "200px",
        cell: (row) => {
          return (

              <div className="user-info text-truncate ms-1">
                 {convertDateToPersian(row?.workDate)}
              </div>
      
          );
        },
      },
   {
        name: "اقدام",
        reorder: true,
        minWidth: "200px",
        cell: (row) => {
          return (

            <div onClick={(e) => {
  
                toggleEditModal();
                
                  }}>
            <Edit/>
            <CreateAss row={ console.log("row1111111" , row)  } />
          </div>
      
          );
        },
      },


      
  ];