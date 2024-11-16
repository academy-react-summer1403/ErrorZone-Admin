// ** React Imports
import { Fragment } from "react";

// ** Reactstrap Imports
import { Card, CardBody, CardTitle } from "reactstrap";

// ** Social Icon Imports
import slackIcon from "../../../assets/images/icons/social/slack.png";
import asanaIcon from "../../../assets/images/icons/social/asana.png";
import googleIcon from "../../../assets/images/icons/social/google.png";
import githubIcon from "../../../assets/images/icons/social/github.png";
import mailchimpIcon from "../../../assets/images/icons/social/address.png";
import { Calendar, Lock, Mail, MapPin, MessageCircle, User } from "react-feather";


const MoreInfo = ({userDetails}) => {
  //const userInfo = useSelector((state) => state.userList.usersDetails);
  //console.log(userInfo);
  

  return (
    <Fragment>
      <Card>
        <CardBody>
          <CardTitle className="mb-75">سایر اطاعات کاربر</CardTitle>
          <p>Display content from your connected accounts on your site</p>
          <div className="d-flex mt-2">
            <div className="flex-shrink-0">
              <User size={20}/>
            </div>
            <div className="d-flex align-item-center justify-content-between flex-grow-1 " style={{marginRight: "10px"}}>
              <div className="me-1">
                <p className="fw-bolder mb-0">درباره کاربر</p>
                <span>
                   {userDetails?.userAbout && userDetails?.userAbout !== null
                    ? userDetails?.userAbout
                    : "تکمیل نشده"} 
                </span>
              </div>
            </div>
          </div>
          <div className="d-flex mt-2">
            <div className="flex-shrink-0">
              <MapPin size={20}/>
            </div>
            <div className="d-flex align-item-center justify-content-between flex-grow-1"  style={{marginRight: "10px"}}>
              <div className="me-1">
                <p className="fw-bolder mb-0">آدرس محل سکونت</p>
                <span>
                   {userDetails?.homeAdderess && userDetails?.homeAdderess !== null
                    ? userDetails?.homeAdderess
                    : "تکمیل نشده"} 
                </span>
              </div>
            </div>
          </div>
          <div className="d-flex mt-2">
            <div className="flex-shrink-0">
              <Calendar size={20}/>
            </div>
            <div className="d-flex align-item-center justify-content-between flex-grow-1"  style={{marginRight: "10px"}}>
              <div className="me-1">
                <p className="fw-bolder mb-0">تاریخ تولد</p>
                <span>
                   {userDetails?.birthDay &&
                  userDetails?.birthDay !== "0001-01-01T00:00:00"
                    ? userDetails?.birthDay
                    : "تکمیل نشده"} 
                </span>
              </div>
            </div>
          </div>
          <div className="d-flex mt-2">
            <div className="flex-shrink-0">
            <User size={20}/>
            </div>
            <div className="d-flex align-item-center justify-content-between flex-grow-1"  style={{marginRight: "10px"}}>
              <div className="me-1">
                <p className="fw-bolder mb-0">آی دی کاربر</p>
                <span>{userDetails?.id} </span>
              </div>
            </div>
          </div>
          <div className="d-flex mt-2">
            <div className="flex-shrink-0">
            <Calendar size={20}/>
            </div>
            <div className="d-flex align-item-center justify-content-between flex-grow-1"  style={{marginRight: "10px"}}>
              <div className="me-1">
                <p className="fw-bolder mb-0">تاریخ ایجاد حساب کاربری</p>
                <span>{userDetails?.insertDate}</span>
              </div>
            </div>
          </div>
          <div className="d-flex mt-2">
            <div className="flex-shrink-0">
              <Lock size={20}/>
            </div>
            <div className="d-flex align-item-center justify-content-between flex-grow-1"  style={{marginRight: "10px"}}>
              <div className="me-1">
                <p className="fw-bolder mb-0">اعتبارسنجی دو مرحله ای</p>
                <span>
                   {userDetails?.twoStepAuth && userDetails?.twoStepAuth !== false
                    ? "فعال"
                    : "غیرفعال"} 
                </span>
              </div>
            </div>
          </div>
          <div className="d-flex mt-2">
            <div className="flex-shrink-0">
              <Mail size={20}/>
            </div>
            <div className="d-flex align-item-center justify-content-between flex-grow-1" style={{marginRight: "10px"}}>
              <div className="me-1">
                <p className="fw-bolder mb-0">ایمیل بازیابی</p>
                <span>
                   {userDetails?.recoveryEmail && userDetails?.recoveryEmail !== null
                    ? userDetails?.recoveryEmail
                    : "تکمیل نشده"} 
                </span>
              </div>
            </div>
          </div>
          <div className="d-flex mt-2">
            <div className="flex-shrink-0">
               <MessageCircle size={20}/>
            </div>
            <div className="d-flex align-item-center justify-content-between flex-grow-1"  style={{marginRight: "10px"}}>
              <div className="me-1">
                <p className="fw-bolder mb-0">دریافت پیام رویدادها</p>
                <span>
                   {userDetails?.receiveMessageEvent &&
                  userDetails?.receiveMessageEvent !== false
                    ? "فعال"
                    : "غیرفعال"} 
                </span>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default MoreInfo;
