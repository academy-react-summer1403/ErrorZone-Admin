
import React from 'react';
import react , {useState } from 'react'
import { Link } from 'react-router-dom';
import {  Delete, Edit, Info, MoreVertical, Plus, } from 'react-feather';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { convertDateToPersian } from '../../../utility/hooks/date-helper.utils';
import useQueryGet from '../../../customHook/useQueryGet';
import useMutationPost from '../../../customHook/useMutationPost';
import toast from 'react-hot-toast';
import UpdateJobs from './UpdateJobs';
import useMutationDelete from '../../../customHook/useMutationDelete';


export const JobsColumns = ( refetch) =>  [
    {
        name: "نام کاربر",
        reorder: true,
        width:  "200px",
        cell: (row) => {

            const {data: user} = useQueryGet(["getUser"] , "/User/UserMannage?PageNumber=0&RowsOfPage=1000")
     
            const getUser = user?.listUser?.filter((item) => {return (item.id === row.id)})

          return (
            <Link className="">
            
              <div className="">
              {row?.jobTitle} 
              </div>
            </Link>
          );
        },
      },
    
    {
        name: "نام شغل",
        reorder: true,
        width:  "200px",
        cell: (row) => {
          return (
            <Link className="">
            
              <div className="">
              {row?.jobTitle} 
              </div>
            </Link>
          );
        },
      },
   {
        name: "درباره شغل",
        reorder: true,
        minWidth: "200px",
        cell: (row) => {
          return (

              <div className="user-info text-truncate ms-1">
                {row?.aboutJob}
              </div>
      
          );
        },
      },
      
   {
        name: "شرکت",
        reorder: true,
        minWidth: "200px",
        cell: (row) => {
          return (

              <div className="user-info text-truncate ms-1">
                {row?.companyName}
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

              <div className="user-info text-truncate ms-1">
                {row?.inWork ? <Badge color='success'>  در حال انجام کار </Badge> : <Badge color='danger'>  پایان کار </Badge>}
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
                {convertDateToPersian(row?.workStartDate)}
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
                {convertDateToPersian(row?.workEndDate)}
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
            
            // const { mutate } = useMutationPost(`/SharePanel/HistoryToIndex?JobId=${row.id}8&show=${row.showInFirstPage ? false : true}` )
            const {mutate, isSuccess} = useMutationPost(`/SharePanel/HistoryToIndex?JobId=${row.id}&show=${row.showInFirstPage ? false : true}`, ["jobs"])
            if (isSuccess) toast.success("عملیات با موفقیت اجرا شده است")

            const {mutate :handleDelete ,isError } = useMutationDelete(`/SharePanel/DeleteJobHistory?HistoryId=${row.id}` , ["jobs"])
             if (isError) toast.error("خطا در انجام عملیات")
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
                    <DropdownItem>
                      <div color='danger' style={{width: "100%"}} onClick={() => handleDelete()} >                          
                         <Delete size={18} style={{cursor: "pointer"}} />
                         <span style={{paddingRight: "5px"}}>  حذف کردن  </span>    
                     </div>                         
                    </DropdownItem>                    
                    <DropdownItem>
                      <div style={{width: "100%"}} onClick={ () => mutate()} >                          
                         <Plus size={18} style={{cursor: "pointer"}} />
                         <span style={{paddingRight: "5px"}}>  اضافه کردن به ایندکس  </span>    
                     </div>                         
                    </DropdownItem>                    
                </DropdownMenu>
            </UncontrolledDropdown> 

       
                {show && <UpdateJobs  show={show} setShow={setShow}  selectedItem={selectedItem} refetch={refetch} />   } 
   
               {/* {showDetail && <TechDetail  show={showDetail} setShow={setShowDetail}  selectedItem={detailselectedItem} refetch={refetch} />   }                        */}
            </>
          );

    
                           
        },
        
      },      
  ];