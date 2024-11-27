import React from 'react'
import { MoreVertical, Edit, X, Eye,} from 'react-feather'
import { Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import useQueryGet from '../../../../customHook/useQueryGet'
import { convertDateToPersian } from '../../../../utility/hooks/date-helper.utils'
import { persianNumberFormatter } from '../../../../core/utility/persian-number-formatter-helper'
import { Link } from 'react-router-dom'

const UserPayments = ({userDetails}) => {
    console.log("detail1234" , userDetails)

     const {data: getPayments} = useQueryGet(["getPayments"] , (`/CoursePayment/UserPayList?StudentId=${userDetails?.id}`))

     console.log("getPayments" , getPayments)
    //console.log("coursees1234" , userDetails?.courses.courseId )
  return (
    <div>
              <thead>
        <tr style={{display: "flex", gap: "150px", paddingRight: "17px"}}>
          <th style={{width: "100px"}}>  نام گروه </th>
          <th style={{width: "100px"}}>  مبلغ پرداخت </th>
          <th style={{width: "100px"}}> تاریخ پرداخت </th>
          <th style={{width: "100px"}}> اقدام </th>
        </tr>
      </thead>
      <tbody>

          {/* <tr>
            <td colSpan="6" className="text-center">
              هیچ پرداختی ثبت نشده است
            </td>
          </tr> */}
          


          {getPayments?.map((item , index) => {    
            return(
            <tr key={index}  style={{display: "flex", gap: "150px" , paddingRight: "17px", paddingTop: "10px"}}>
              <td style={{width: "100px"}}> {item?.groupName}  </td>
              <td  style={{width: "100px"}}>  {persianNumberFormatter(item?.paid)}     </td>
              <td style={{width: "100px"}}>  {convertDateToPersian(item?.peymentDate)}  </td>
              <td style={{width: "100px"}} >  <Link to={`/users/Payments/${item?.paymentId}`}>  <Eye size={16}/>  </Link>   </td>
            </tr> 
            )            
          })}

 
      </tbody>
    </div>
  )
}

export default UserPayments