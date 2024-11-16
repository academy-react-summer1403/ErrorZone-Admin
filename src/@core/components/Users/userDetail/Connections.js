// ** React Imports
import { Fragment } from "react";
import { Linkedin, Twitter } from "react-feather";

// ** Reactstrap Imports
import { Card, CardBody, CardTitle } from "reactstrap";



const Connection = ({userDetails}) => {

  return (
    <Fragment>
      <Card>
        <CardBody>
          <CardTitle className="mb-75">شبکه های اجتماعی</CardTitle>

          <div className="d-flex mt-2">
            <div className="flex-shrink-0">
              <Twitter  size={20}/>
            </div>
            <div className="d-flex align-item-center justify-content-between flex-grow-1"   style={{marginRight: "10px"}}>
              <div className="me-1">
                <p className="fw-bolder mb-0">Telegram Id</p>
                <span>
                  {userDetails?.telegramLink && userDetails?.telegramLink !== null
                    ? userDetails?.telegramLink
                    : "تکمیل نشده"}
                </span>
              </div>
            </div>
          </div>
          <div className="d-flex mt-2">
            <div className="flex-shrink-0">
              <Linkedin  size={20}/>
            </div>
            <div className="d-flex align-item-center justify-content-between flex-grow-1"   style={{marginRight: "10px"}}>
              <div className="me-1">
                <p className="fw-bolder mb-0">linkedin Profile</p>
                <span>
                  {userDetails?.linkdinProfile && userDetails?.linkdinProfile !== null
                    ? userDetails?.linkdinProfile
                    : "تکمیل نشده"}
                </span>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default Connection;
