// import Avatar from '@components/avatar'
// import avatarImg from '../../../assets/images/icons/amazon.png'
import {
  MoreVertical,
  Edit,
  Delete,
  Trash,
  FileText,
  Eye,
  CornerDownRight,
} from "react-feather";
import {
  Table,
  Badge,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";


import { Fragment, useEffect, useState } from "react";


import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { Navigate, useNavigate } from "react-router-dom";
import CommntNewsModal from "./comNewsModal";
import ReplyNewsComment from "./ReplyNewsCom";


const CourseComs = ({ newsCom, NewsRepById, repCom }) => {
  const navigate = useNavigate();
  const [repModal, setRepModal] = useState(false);
  const [comnttView, setComnttView] = useState(false);
  // console.log("newsCom",newsCom);
  return (
    <Fragment>
      <h3 className="mb-2"> کامنت ها</h3>

      <Card className="">
        <div className="react-dataTable">
          <Table hover>
            <thead>
              <tr className="">
                <th className=" ">کاربر</th>
                <th className=" px-0">عنوان کامنت</th>
                <th className=" px-0"> متن کامنت</th>
                {/* <th> نوع</th> */}
                <th className=" px-0"> پاسخ ها</th>
                {/* <th className=" px-0"> پاسخ دادن</th> */}
              </tr>
            </thead>
            <tbody>
              {newsCom &&
                newsCom.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td style={{ maxWidth: "120px" }} className=" px-1">
                        {item?.autor}
                      </td>
                      <td
                        className="px-0 "
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "120px",
                        }}
                      >
                        {item?.title}
                      </td>
                      <td style={{ maxWidth: "160px" }} className=" p-0">
                        {item.describe}
                      </td>

                      <td className=" px-1">
                        {item?.replyCount > 0 && (
                          <Eye
                            style={{ width: "18px", height: "18px" }}
                            onClick={() => {
                              setComnttView(!comnttView), NewsRepById(item?.id);
                            }}
                          />
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      </Card>
      <ReplyNewsComment repShow={repModal} setRepShow={setRepModal} />
      <CommntNewsModal setComModal={setComnttView} comModal={comnttView} repCom={repCom} />
    </Fragment>
  );
};

export default CourseComs;
