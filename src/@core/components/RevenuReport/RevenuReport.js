// ** React Imports
import { useEffect, useState } from 'react'

// ** Third Party Components
import axios from 'axios'
import Chart from 'react-apexcharts'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Button,
  CardTitle,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledButtonDropdown
} from 'reactstrap'
import useQueryGet from '../../../customHook/useQueryGet'

const RevenueReport = props => {
  
    const {data: getCourses } = useQueryGet(['getCourses'] , ("/Course/CourseList?PageNumber=1&RowsOfPage=10&SortingCol=DESC&SortType=Expire&Query"))

    console.log("getCourses" , getCourses)


    const payments = getCourses?.courseDtos

    const countPaymentsByMonth = () => {
        let countData = [];
    
        // Iterate through all months (Jan to Dec)
        for (let month = 0; month < 12; month++) {
          const monthData = {
            month: new Date(2024, month).toLocaleString('fa-IR', { month: 'long' }),
            payments: 0  
          };
    
          // فیلتر کردن پرداخت‌ها بر اساس ماه
          payments?.forEach((payment) => {
            const paymentDate = new Date(payment.cost);
            const paymentMonth = paymentDate.getMonth();
    
            // بررسی تطابق ماه
            if (paymentMonth === month) {
              monthData.payments++;
            }
          });
    
          countData.push(monthData);
        }
        return countData;
      };

      const paymentData = countPaymentsByMonth();



  // ** State
  const [data, setData] = useState(null)



  useEffect(() => {
      axios.get('/card/card-analytics/revenue-report').then(res => setData(res.data))
     return () => setData(null)
  }, [])

  const revenueOptions = {
      chart: {
        stacked: true,
        type: 'bar',
        toolbar: { show: false }
      },
      grid: {
        padding: {
          top: -20,
          bottom: -10
        },
        yaxis: {
          lines: { show: false }
        }
      },
      xaxis: {
        categories: [ 'اسفند' ,'بهمن' , 'دی' , 'اذر', 'ابان', 'مهر', 'شهریور', 'مرداد', 'تیر', 'خرداد', 'اردیبهشت', 'فروردین'],
        labels: {
          style: {
            colors: '#b9b9c3',
            fontSize: '0.86rem'
          }
        },
        axisTicks: {
          show: false
        },
        axisBorder: {
          show: false
        }
      },
      legend: {
        show: false
      },
      dataLabels: {
        enabled: false
      },
      colors: [props.primary, props.warning],
      plotOptions: {
        bar: {
          columnWidth: '17%',
          borderRadius: [4],
          borderRadiusWhenStacked: 'all',
          borderRadiusApplication: 'start'
        },
        distributed: true
      },
      yaxis: {
        labels: {
          style: {
            colors: '#b9b9c3',
            fontSize: '0.86rem'
          }
        }
      }
    },
    revenueSeries = [
      {
        name: 'دوره ها', 
        data: [95, 177, 284, 256, 105, 63, 168, 218, 72 , 100 , 120 , 150] 
      },
      {
        name: 'پرداختی ها',
        data: [-145, -80, -60, -180, -100, -60, -85, -75, -100  , -100 , -80 , -60]
      }
    ]


  return  (
    <Card className='' >
      <Row className='m'>
        <Col className='' md='8' xs='12'>
          <div className=''>
            <CardTitle className=''>  گزارشات </CardTitle>
            <div className=''>
              <div className='d-flex align-items-center me-2'>
                <span className='bullet bullet-primary me-50 cursor-pointer'></span>
                <span> وضعیت دوره ها </span>
              </div>
              <div className='d-flex align-items-center'>
                <span className='bullet bullet-warning me-50 cursor-pointer'></span>
                <span> وضعیت پرداختی ها </span>
              </div>
            </div>
          </div>
          <Chart id='revenue-report-chart' type='bar' height='230' width='150%' options={revenueOptions} series={revenueSeries} />
        </Col>
      </Row>
    </Card>
  ) 
}

export default RevenueReport