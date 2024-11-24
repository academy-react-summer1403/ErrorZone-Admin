// ** React Importsco
import { Fragment, useState } from "react";
import {
  Delete,
  Edit,
  FileText,
  MoreVertical,
  Trash,
  Trash2,
} from "react-feather";
import Avatar from "@components/avatar";
import avatarImg from "./../../../assets/images/portrait/small/avatar-s-1.jpg";
import avatar1 from './../../../assets/images/portrait/small/jpmen.jpg'
// ** Reactstrap Imports
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
  Table,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
  Tooltip,
} from "reactstrap";
import ReplyComment from "../commentReply/commentReply";
import useQueryGet from "../../../../customHook/useQueryGet";
import { addReply } from "../../../../core/services/Paper";
import toast from "react-hot-toast";


const CommentModal = ({
  comModal,
  setComModal,
  repCom,
  handleAcceptComment,
  handleDeclineComment,
  handleDeleteComment,
  describe,
}) => {
  // ** States
  const [centeredModal, setCenteredModal] = useState(false);
  const [tooltipOpenn, setTooltipOpenn] = useState({});
  const [repComm, setRepComm] = useState(false);
  const [coursid, setCoursid] = useState(null);
  const [comntid, setComntid] = useState(null);

  //  console.log("object", repCom);
  const toggleTooltipp = (id) => {
    setTooltipOpenn({ ...tooltipOpenn, [id]: !tooltipOpenn[id] });
  };

  const addReplyCommentt = async (e) => {
    try {
      const dataa = { ...e, CourseId: coursid, CommentId: comntid };
      const data = new FormData();
      const keys = Object.keys(dataa);
      keys.forEach((key) => {
        const item = dataa[key];
        data.append(key, item);
      });
      const res = await addReply(data);
      res.success? toast.success(res.message): toast.error(res.message)
      
      // console.log("object", res);

    } catch (error) {
      console.error("ERROR: ", error);
    }
  };
  return (
    <div className="demo-inline-spacing">
      <div className="vertically-centered-modal">
        {/* <Button color='primary' outline onClick={() => setCenteredModal(!centeredModal)}>
          Vertically Centered
        </Button> */}
        <Modal
          isOpen={comModal}
          toggle={() => setComModal(!comModal)}
          className="modal-dialog-centered "
          style={{ minWidth: "900px" }}
        >
          <ModalHeader toggle={() => setComModal(!comModal)} className="pt-2">
            کامنت: {describe}
          </ModalHeader>
          <ModalBody>
            <Table hover>
              <thead>
                <tr>
                  <th className="text-center">کاربر</th>
                  <th>عنوان کامنت</th>
                  <th>نمایش کامنت</th>
                  <th className="text-center"> وضعیت</th>
                  <th className="text-center"> اقدام</th>
                </tr>
              </thead>
              {repCom &&
                repCom.map((item, index) => {
                  const tooltipIdd = `tooltip-${index}`;

                  return (
                    <tbody key={index}>
                      <tr>
                        <td
                          className="px-0  border"
                          style={{ minWidth: "155px" }}
                        >
                          <span className="mx-1 border">
                            <Avatar img={avatarImg} />
                          </span>

                          <span className=" ">{item.author}</span>
                        </td>
                        <td
                          className="px-0 border"
                          style={{
                            maxWidth: "160px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.title}
                        </td>
                        <td
                          id={tooltipIdd}
                          className="px-0 border"
                          style={{ minWidth: "280px" }}
                        >
                          <Tooltip
                            placement="top"
                            isOpen={tooltipOpenn[tooltipIdd]}
                            toggle={() => toggleTooltipp(tooltipIdd)}
                            innerClassName="table-tooltip"
                            target={tooltipIdd}
                          >
                            {item.describe}
                          </Tooltip>
                          {item.describe}
                        </td>
                        <td
                          className="px-0 text-center border"
                          style={{ maxWidth: "20px" }}
                        >
                          {item.accept ? (
                            <Badge pill color="light-success" className="">
                              تایید شده
                            </Badge>
                          ) : (
                            <Badge pill color="light-warning" className="">
                              تایید نشده
                            </Badge>
                          )}
                        </td>
                        <td
                          className="px-0 text-center"
                          style={{ maxWidth: "10px" }}
                        >
                          <UncontrolledDropdown>
                            <DropdownToggle
                              className="icon-btn hide-arrow"
                              color="transparent"
                              size="sm"
                              caret
                            >
                              <MoreVertical size={15} />
                            </DropdownToggle>
                            {item.accept === false ? (
                              <DropdownMenu>
                                <DropdownItem
                                  onClick={() => handleAcceptComment(item.id)}
                                >
                                  <FileText className="me-50" size={15} />{" "}
                                  <span className="align-middle">تایید</span>
                                </DropdownItem>
                                {/* <DropdownItem
                                  href="/"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleDeclineComment(item.commentId);
                                  }}
                                >
                                  <Edit className="me-50" size={15} />{" "}
                                  <span className="align-middle">
                                    عدم تایید{" "}
                                  </span>
                                </DropdownItem> */}
                                <DropdownItem
                                  onClick={() => handleDeleteComment(item.id)}
                                >
                                  <Trash className="me-50" size={15} />{" "}
                                  <span className="align-middle">حذف</span>
                                </DropdownItem>
                              </DropdownMenu>
                            ) : (
                              <DropdownMenu>
                                {/* <DropdownItem
                                  href="/"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleAcceptComment(item.commentId);
                                  }}
                                >
                                  <FileText className="me-50" size={15} />{" "}
                                  <span className="align-middle">تایید</span>
                                </DropdownItem> */}
                                <DropdownItem
                                  onClick={() => handleDeclineComment(item.id)}
                                >
                                  <Edit className="me-50" size={15} />{" "}
                                  <span className="align-middle">
                                    عدم تایید{" "}
                                  </span>
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() => handleDeleteComment(item.id)}
                                >
                                  <Trash className="me-50" size={15} />{" "}
                                  <span className="align-middle">حذف</span>
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() => {
                                    setRepComm(!repComm);
                                    setCoursid(item.courseId);
                                    setComntid(item.id);
                                  }}
                                >
                                  <Trash className="me-50" size={15} />{" "}
                                  <span className="align-middle">پاسخ</span>
                                </DropdownItem>
                              </DropdownMenu>
                            )}
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
            </Table>
          </ModalBody>
          <ModalFooter>
            {/* <Button color='primary' onClick={() => setCenteredModal(!centeredModal)}>
              Accept
            </Button>{' '} */}
          </ModalFooter>
        </Modal>

        <ReplyComment
          repShow={repComm}
          setRepShow={setRepComm}
          addReplyComment={addReplyCommentt}
        />
      </div>
    </div>
  );
};
export default CommentModal;
