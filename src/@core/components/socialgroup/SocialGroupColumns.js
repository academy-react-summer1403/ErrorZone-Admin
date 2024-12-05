
import React from 'react';
import react , {useState } from 'react'
import { Link } from 'react-router-dom';
import useQueryGet from '../../../customHook/useQueryGet';
import { convertDateToPersian } from '../../../utility/hooks/date-helper.utils';
import { Calendar, Edit, MoreVertical, Plus } from 'react-feather';
import { Badge,  UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem  } from 'reactstrap';
import CreateGroup from './CreateGroup';

export const SocialGroupColumns = (  refetch) =>  [
    
    {
        name: "نام گروه",
        reorder: true,
        width:  "200px",
        cell: (row) => {
          // ** States
          const {data : list } = useQueryGet(["getAss"] , ("/AssistanceWork"))
          return (
            <Link className="">
            
              <div className="">
              {row?.groupName}
              </div>
            </Link>
          );
        },
      },
   {
        name: "لینک گروه",
        reorder: true,
        minWidth: "200px",
        cell: (row) => {
          return (

              <div className="user-info text-truncate ms-1">
                {row?.groupLink}
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
       
             {show && <CreateGroup  show={show} setShow={setShow}  row={selectedItem}/>    }     
            </>
          );

    
                           
        },
        
      },


      
  ];