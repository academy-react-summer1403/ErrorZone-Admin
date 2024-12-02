import React from 'react';
import { Card, CardBody, CardText, Row, Col, Button, Badge, CardHeader } from 'reactstrap';
import blankthumbnail from "../../../../@core/assets/images/portrait/small/blank-thumbnail.jpg";
import { useParams } from 'react-router-dom';
import useQueryGet from '../../../../customHook/useQueryGet';
import { convertDateToPersian } from '../../../../utility/hooks/date-helper.utils';
import { persianNumberFormatter } from '../../../../core/utility/persian-number-formatter-helper';

const UserPaymentsDetail = () => {
    const params = useParams()
    console.log("paymentId" , params)
 
    const {data: paymentsDetail } = useQueryGet(["paymentsDetail"] , (`/CoursePayment/${params.id}`))

    console.log("paymentsDetail" , paymentsDetail)

  return (
    <div >

        <Card style={{width: "100%" , height: "auto"}}>
           <CardBody style={{width: "100%" , height: "50%"  , display: "flex", gap : "100px"}}> 
              <img 
                src={paymentsDetail?.paymentInvoiceImage ? paymentsDetail?.paymentInvoiceImage : blankthumbnail} 
                alt="Payment" 
                style={{ maxWidth: '400px', height: '200px', marginRight: "20px" , marginTop: "20px"  }} 
               />
               <div style={{marginTop: "20px"}}>
                 <h4>
                    پرداختی :<span className='invoice-number'>{paymentsDetail?.id}</span>
                </h4>
               <div style={{display: "flex", gap:"3px" }}>
                 <p >تاریخ پرداخت :</p>
                 <p >{convertDateToPersian(paymentsDetail?.peymentDate)}</p>
               </div>
                <div>
                <h6 className=''> جزییات پرداخت شما :</h6>
                <Col className='d-flex ' style={{flexFlow:'column wrap', marginTop: "10px"}}>
                  <Badge  color={paymentsDetail?.accept ? 'success' : 'warning'} style={{width: "100px"}}>
                  {paymentsDetail?.accept ? 'تایید شده' : 'در انتظار تایید'}
                 </Badge>
                 <span>مبلغ پرداختی : {persianNumberFormatter(paymentsDetail?.paid)} </span>
            </Col>
                </div>
              </div>

            <div style={{marginTop: "20px", marginRight: "20px"}}>
                <p>   اطلاعات بیشتر </p>
                <h6 className='mb-25'>نام گروه : {paymentsDetail?.groupName} </h6>            
                <h6 className='mb-25'>آیدی دوره : {paymentsDetail?.courseUserId} </h6>
                <h6 className='mb-25'>نام دوره : {paymentsDetail?.title} </h6>        
                <h6 className='mb-25'>استاد دوره : {paymentsDetail?.studentName} </h6>                            
            </div>

           </CardBody>
        </Card>
    </div>
  )
}

export default UserPaymentsDetail