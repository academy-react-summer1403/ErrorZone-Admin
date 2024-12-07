import React from "react";
import CustomModal from "../CustomModal/CustomModal";
import { Badge } from "reactstrap";
import { convertDateToPersian } from "../../../utility/hooks/date-helper.utils";

const SchadualDetail = ({ show, setShow, selectedItem }) => {
  console.log("selectedItem", selectedItem);


  return (
    <CustomModal show={show} setShow={setShow}>
      <div style={{ display: "flex", gap: "50px" }}>
        <div>
          <div>
            <span> اطلاعات برگزاری </span>
            <div> تاریخ شروع : {convertDateToPersian(selectedItem?.startDate)} </div>
            <div>
              {" "}
              تاریخ پایان : <span> {convertDateToPersian(selectedItem?.endDate)} </span>{" "}
            </div>
            <div>  شروع کلاس: {selectedItem?.startTime} </div>
            <div>
              {" "}
              پایان کلاس : <span> {selectedItem?.endTime} </span>{" "}
            </div>
          </div>
        </div>
        <div>
          <div>
            <span> شرایط تشکیل جلسه </span>
            <div>
              {" "}
               تعداد کلاس در هفته : <span> {selectedItem?.weekNumber} </span>{" "}
            </div>
            <div>
              {" "}
                 شرایط برگزاری  : <span> {selectedItem?.forming  ? <Badge color="success">  تشکیل می شود  </Badge> : <Badge color="danger">  تشکیل نمی شود  </Badge>} </span>{" "}

            </div>
            <div>
              {" "}
                 شرایط برگزاری  : <span> {selectedItem?.lockToRaise ? <Badge color="success">  حضور و غیاب صورت میشود  </Badge> : <Badge color="danger">  حضور و غیاب صورت نمیگرد  </Badge>} </span>{" "}

            </div>                        
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default SchadualDetail;
