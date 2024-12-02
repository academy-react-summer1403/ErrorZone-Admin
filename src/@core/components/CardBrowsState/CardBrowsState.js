import react , {useState} from 'react'
import Chart from 'react-apexcharts'
import { MoreVertical } from 'react-feather'

// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardHeader,
} from 'reactstrap'

// ** Icons Imports
import supportIcon from '../../../@core/assets/images/portrait/small/blank-thumbnail.jpg'
import admin from '../../../@core/assets/images/portrait/small/blank-thumbnail.jpg'
import refereeIcon from '../../../@core/assets/images/portrait/small/blank-thumbnail.jpg'
import EmployeeIcon from '../../../@core/assets/images/portrait/small/blank-thumbnail.jpg'
import teacherIcon from '../../../@core/assets/images/portrait/small/blank-thumbnail.jpg'
import useQueryGet from '../../../customHook/useQueryGet'

const CardBrowserState = ({ colors, trackBgColor }) => {
    const [query, setQuery] = useState([])

  const date =  new Date().toLocaleString('fa-IR')


const {data : user} = useQueryGet(['getUser']  , (`/User/UserMannage?PageNumber=1&RowsOfPage=200&Query=${query}`))

const {data : teacher} = useQueryGet(['getTeacher'], "/Home/GetTeachers")

  const groupedUser = user?.listUser?.reduce((previousValue , currentValue) => {
    if(currentValue.userRoles){
      const role = currentValue.userRoles.trim();
      if(role === 'Administrator'){
        previousValue.Admin.push(currentValue)
      }
      else if(role === 'Teacher'){
        previousValue.Teacher.push(currentValue)
      }
      else if(role === 'Employee.Admin'){
        previousValue.Employee.push(currentValue)
      }
      else if(role === "Referee"){
        previousValue.Referee.push(currentValue)
      }
      else if(role === "Support"){
        previousValue.Support.push(currentValue)
      }
    }
    return previousValue
  } , {Admin : [] , Teacher : [] , Employee : []  , Referee : [] , Support : []})
  const AdminCount = groupedUser?.Admin.length / user?.totalCount * 100
  const TeacherCount = teacher?.length / user?.totalCount * 100
  const EmployeeCount = groupedUser?.Employee.length / user?.totalCount * 100
  const RefereeCount = groupedUser?.Referee.length / user?.totalCount * 100
  const SupportCount = groupedUser?.Support.length / user?.totalCount * 100



  console.log("AdminCount" ,AdminCount);
  const statesArr = [
    {
        avatar: admin,
        title: 'تعداد کاربران ادمین' + groupedUser?.Admin.length  + 'نفر',
        value: AdminCount.toFixed(2) + ' ' + 'درصد',
        chart: {
          type: 'radialBar',
          series: [AdminCount],
          height: 30,
          width: 30,
          options: {
            grid: {
              show: false,
              padding: {
                left: -15,
                right: -15,
                top: -12,
                bottom: -15
              }
            },
            colors: [colors.primary.main],
            plotOptions: {
              radialBar: {
                hollow: {
                  size: '22%'
                },
                track: {
                  background: trackBgColor
                },
                dataLabels: {
                  showOn: 'always',
                  name: {
                    show: false
                  },
                  value: {
                    show: false
                  }
                }
              }
            },
            stroke: {
              lineCap: 'round'
            }
          }
        }
      },
    {
      avatar: teacherIcon,
      title: 'تعداد کاربر مدرس' + teacher?.length,
      value:  TeacherCount.toFixed(2) + ' ' + 'درصد',
      chart: {
        type: 'radialBar',
        series: [TeacherCount],
        height: 30,
        width: 30,
        options: {
          grid: {
            show: false,
            padding: {
              left: -15,
              right: -15,
              top: -12,
              bottom: -15
            }
          },
          colors: [colors.warning.main],
          plotOptions: {
            radialBar: {
              hollow: {
                size: '22%'
              },
              track: {
                background: trackBgColor
              },
              dataLabels: {
                showOn: 'always',
                name: {
                  show: false
                },
                value: {
                  show: false
                }
              }
            }
          },
          stroke: {
            lineCap: 'round'
          }
        }
      }
    },
    {
      avatar: EmployeeIcon,
      title: 'تعداد کاربر ادمین' + groupedUser?.Employee.length,
      value: EmployeeCount.toFixed(2) + ' ' + 'درصد',
      chart: {
        type: 'radialBar',
        series: [EmployeeCount],
        height: 30,
        width: 30,
        options: {
          grid: {
            show: false,
            padding: {
              left: -15,
              right: -15,
              top: -12,
              bottom: -15
            }
          },
          colors: [colors.secondary.main],
          plotOptions: {
            radialBar: {
              hollow: {
                size: '22%'
              },
              track: {
                background: trackBgColor
              },
              dataLabels: {
                showOn: 'always',
                name: {
                  show: false
                },
                value: {
                  show: false
                }
              }
            }
          },
          stroke: {
            lineCap: 'round'
          }
        }
      }
    },
    {
      avatar: refereeIcon,
      title: 'تعداد کاربر داور' +  groupedUser?.Referee.length,
      value: RefereeCount.toFixed(2) + ' ' + 'درصد',
      chart: {
        type: 'radialBar',
        series: [RefereeCount],
        height: 30,
        width: 30,
        options: {
          grid: {
            show: false,
            padding: {
              left: -15,
              right: -15,
              top: -12,
              bottom: -15
            }
          },
          colors: [colors.info.main],
          plotOptions: {
            radialBar: {
              hollow: {
                size: '22%'
              },
              track: {
                background: trackBgColor
              },
              dataLabels: {
                showOn: 'always',
                name: {
                  show: false
                },
                value: {
                  show: false
                }
              }
            }
          },
          stroke: {
            lineCap: 'round'
          }
        }
      }
    },
    {
      avatar: supportIcon,
      title: 'تعداد کاربر پشتیبان' + groupedUser?.Support.length ,
      value: SupportCount.toFixed(2) + ' ' + 'درصد',
      chart: {
        type: 'radialBar',
        series: [SupportCount],
        height: 30,
        width: 30,
        options: {
          grid: {
            show: false,
            padding: {
              left: -15,
              right: -15,
              top: -12,
              bottom: -15
            }
          },
          colors: [colors.danger.main],
          plotOptions: {
            radialBar: {
              hollow: {
                size: '22%'
              },
              track: {
                background: trackBgColor
              },
              dataLabels: {
                showOn: 'always',
                name: {
                  show: false
                },
                value: {
                  show: false
                }
              }
            }
          },
          stroke: {
            lineCap: 'round'
          }
        }
      }
    }
  ]

  const renderStates = () => {
    return statesArr.map(state => {
      return (
        <div key={state.title} className='browser-states'>
          <div className='d-flex'>
            <img className='rounded me-1' src={state.avatar} height='30' alt={state.title} />
            <h6 className='align-self-center mb-0'>{state.title}</h6>
          </div>
          <div className='d-flex align-items-center'>
            <div className='fw-bold text-body-heading me-1'>{state.value}</div>
            <Chart
              options={state.chart.options}
              series={state.chart.series}
              type={state.chart.type}
              height={state.chart.height}
              width={state.chart.width}
            />
          </div>
        </div>
      )
    })
  }


  return (
    <Card className='card-browser-states'>
      <CardHeader>
        <div>
          <CardTitle tag='h4'>کاربران سایت</CardTitle>
          <CardText className='font-small-2'>{user?.totalCount + ' ' + 'کاربر تا به ' + ' ' + date } </CardText>
        </div>
      </CardHeader>
      <CardBody>{renderStates()}</CardBody>
    </Card>
  )
}

export default CardBrowserState