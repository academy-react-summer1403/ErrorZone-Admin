
import React from 'react';
import react , {useState } from 'react'
import { Link } from 'react-router-dom';
import useQueryGet from '../../../customHook/useQueryGet';
import { convertDateToPersian } from '../../../utility/hooks/date-helper.utils';
import { Calendar, Edit, MoreVertical, Plus } from 'react-feather';
//import CreateClassRooem from './CreateClassRoom';
//import CreateAss from './createAss';
import { Badge,  UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem  } from 'reactstrap';
import UpdateTerm from './UpdateTerm';
import DateModal from './DateModal';

export const TermColumns = (  refetch) =>  [
    
    {
        name: "نام ترم",
        reorder: true,
        width:  "200px",
        cell: (row) => {
          // ** States
          const {data : list } = useQueryGet(["getAss"] , ("/AssistanceWork"))
          return (
            <Link className="">
            
              <div className="">
              {row?.termName}
              </div>
            </Link>
          );
        },
      },
   {
        name: "نام بخش",
        reorder: true,
        minWidth: "200px",
        cell: (row) => {
          return (

              <div className="user-info text-truncate ms-1">
                {row?.departmentName}
              </div>
      
          );
        },
      },

   {
        name: "وضعیت",
        reorder: true,
        minWidth: "200px",
        cell: (row) => {
          return (
            <Badge color={row.expire ? 'danger' : 'success'} >{row.expire ? 'منقضی شده' : 'فعال'}</Badge> 
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
        name: "تاریخ شروع",
        reorder: true,
        minWidth: "200px",
        cell: (row) => {
          return (

              <div className="user-info text-truncate ms-1">
                 {convertDateToPersian(row?.startDate)}
              </div>
      
          );
        },
      },
   {
        name: "تاریخ پایان",
        reorder: true,
        minWidth: "200px",
        cell: (row) => {
          return (

              <div className="user-info text-truncate ms-1">
                 {convertDateToPersian(row?.endDate)}
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
            const [selectedItem3, setSelectedItem3] = useState(null);                
            const [show, setShow] = useState(false);  
            const [show3, setShow3] = useState(false);
     
          return (
            <> 
                      <UncontrolledDropdown className='position-static'>
                          <DropdownToggle tag='div' className='btn btn-sm'>
                            <MoreVertical size={14} className='cursor-pointer' />
                          </DropdownToggle>
                          <DropdownMenu positionFixed >
                            <DropdownItem
                              className='w-100 cursor-pointer'
                              onClick={() => {setShow(true), setSelectedItem(row)}}
                            >
                              <Edit size={14} className='me-50' />
                              <span className='align-middle'> تغییر مشخصات </span>
                              
                            </DropdownItem>
                            <DropdownItem
                              className='w-100 cursor-pointer'
                              onClick={() => {setShow3(true), setSelectedItem3(row)}}
                            >
                              <Calendar size={14} className='me-50' />
                              <span className='align-middle '>  تغییر تاریخ </span>
                              
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
       
           {show && <UpdateTerm  show={show} setShow={setShow} refetch={refetch}  selectedItem={selectedItem}/>    }     
           {show3 && <DateModal show={show3} refetch={refetch} setShow={setShow3} selectedItem={selectedItem3} />}      
            </>
          );

    
                           
        },
        
      },


      
  ];