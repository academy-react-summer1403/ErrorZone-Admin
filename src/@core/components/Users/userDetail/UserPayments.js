import React from 'react'
import { MoreVertical, Edit, X, Eye,} from 'react-feather'
import { Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Table } from 'reactstrap'
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
      <Table> 
       <thead>
         <tr >
          <th >  نام گروه </th>
          <th >  مبلغ پرداخت </th>
          <th> تاریخ پرداخت </th>
          <th > اقدام </th>
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
            <tr >
              <td > {item?.groupName}  </td>
              <td >  {persianNumberFormatter(item?.paid)}     </td>
              <td >  {convertDateToPersian(item?.peymentDate)}  </td>
              <td >  <Link to={`/users/Payments/${item?.paymentId}`}>  <Eye size={16}/>  </Link>   </td>
            </tr> 
            )            
          })}

 
      </tbody>
      </Table>
    </div>
  )
}

export default UserPayments