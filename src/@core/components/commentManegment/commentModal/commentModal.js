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



const CommentModal = ({
  comModal,
  setComModal,
  handleAcceptComment,
  handleDeclineComment,
  handleDelete,
  describe,
  courseId,
  commentId,
  acceptComments,
  rejectComments,
  addReplyComments,
}) => {

    const { data:repCom } = useQueryGet( ["repCom"] , `/Course/GetCourseReplyCommnets/${courseId}/${commentId}`)
//const repCom = []
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
                            <Avatar img={avatar1} />
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
                                  onClick={(e) => {
                                    e.preventDefault(e)
                                    acceptComments(item.id)}
                                  }
                                >
                                  <FileText className="me-50" size={15} />{" "}
                                  <span className="align-middle">تایید</span>
                                </DropdownItem>
 
                                <DropdownItem
                                  onClick={() => handleDelete(item.id)}
                                >
                                  <Trash className="me-50" size={15} />{" "}
                                  <span className="align-middle">حذف</span>
                                </DropdownItem>
                              </DropdownMenu>
                            ) : (
                              <DropdownMenu>
                                <DropdownItem
                                  onClick={() => rejectComments(item.id)}
                                >
                                  <Edit className="me-50" size={15} />{" "}
                                  <span className="align-middle">
                                    عدم تایید{" "}
                                  </span>
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() => handleDelete(item.id)}
                                >
                                  <Trash className="me-50" size={15} />{" "}
                                  <span className="align-middle">حذف</span>
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() => {
                                    setRepComm(!repComm);
                                    setCoursid(item.courseId);
                                    setComntid(item.id);
                                    addReplyComments()
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
          courseId={courseId}
          commentId={commentId}
        />
      </div>
    </div>
  );
};
export default CommentModal;
