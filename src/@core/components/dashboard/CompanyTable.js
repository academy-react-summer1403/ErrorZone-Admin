// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Table, Card } from 'reactstrap'

// ** Icons Imports
import { Monitor, Coffee, Watch, TrendingUp, TrendingDown } from 'react-feather'

import useQueryGet from '../../../customHook/useQueryGet'
// import { data } from 'jquery'
// import front from '../../../@core/assets/images/dahsboard/front.png'
// import back from '../../../@core/assets/images/dahsboard/back.png'
// import next from '../../../@core/assets/images/dahsboard/nextjs.png'
// import react from '../../../@core/assets/images/dahsboard/react.png'
// import program from '../../../@core/assets/images/dahsboard/program.png'
import nophoto from '../../../@core/assets/images/portrait/small/blank-thumbnail.jpg'

const CompanyTable = () => {

 const {data:getTech} = useQueryGet(["getTech"] , ("/Report/DashboardTechnologyReport"))
 const data = getTech

   console.log("data" , data)

   const {data:getAllCourse } = useQueryGet(["getAllCourse"] , ("/Home/GetCoursesWithPagination?PageNumber=1&RowsOfPage=200"))

   console.log('12122122112' , getAllCourse?.courseFilterDtos);

   const groupedUser = getAllCourse?.courseFilterDtos?.reduce((previousValue , currentValue) => {
    if(currentValue.technologyList){
      const cat = currentValue.technologyList;
      if(cat === "ّفرانت اند"){
        previousValue.FrontEnd.push(currentValue)
      }
      else if(cat === "ّبک اند"){
        previousValue.BackEnd.push(currentValue)
      }
      else if(cat === "ّReact"){
        previousValue.React.push(currentValue)
      }
      else if(cat === "ّNextJs"){
        previousValue.NextJs.push(currentValue)
      }
    }
    return previousValue
  } , {FrontEnd : [] , BackEnd : [] , React : []  , NextJs : [] })


  const FrontEnd = groupedUser?.FrontEnd.length / getAllCourse?.totalCount * 100
  const BackEnd = groupedUser?.BackEnd?.length / getAllCourse?.totalCount * 100
  const React = groupedUser?.React.length / getAllCourse?.totalCount * 100
  const NextJs = groupedUser?.NextJs.length / getAllCourse?.totalCount * 100




  const colorsArr = {
    Technology: 'light-primary',
    Grocery: 'light-success',
    Fashion: 'light-warning'
  }

  const renderData = () => {
    return data?.map(col => {
      const IconTag = col.salesUp ? (
        <TrendingUp size={15} className='text-success' />
      ) : (
        <TrendingDown size={15} className='text-danger' />
      )

      return (
        <tr key={col.name}>
          <td>
            <div className='d-flex align-items-center'>
              <div className='avatar rounded'>
                <div className='avatar-content'>
                  <img src={col?.img ? col?.img : nophoto} alt={col.name} style={{width: "35px" , height: "35px" , borderRadius: "10px"}} />
                </div>
              </div>
              <div>
                <div className='fw-bolder' style={{paddingRight: "10px"}}>{col?.techName}</div>
              </div>
            </div>
          </td>
          <td>
            <div className='d-flex align-items-center'>
              <span style={{paddingRight: "20px"}}>{col.countUsed}</span>
            </div>
          </td>
          <td>
            <div className='d-flex align-items-center'>
              <span className='fw-bolder me-1' style={{paddingRight: "20px"}}>{col.sales}%</span>
              {IconTag}
            </div>
          </td>
        </tr>
      )
    })
  }

  return (
    <Card className='card-company-table'>
      <Table responsive>
        <thead>
          <tr>
            <th>دسته بندی دوره</th>
            <th>تعداد شرکت کننده</th>
            <th >میزان فروش دوره</th>
          </tr>
        </thead>
        <tbody>{renderData()}</tbody>
      </Table>
    </Card>
  )
}

export default CompanyTable
