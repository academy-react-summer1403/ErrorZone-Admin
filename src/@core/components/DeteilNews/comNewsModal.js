// ** React Importsco
import Avatar from "@components/avatar";
import { useState } from "react";
import avatarImg from "./../../assets/images/new/55.jpg";

// ** Reactstrap Imports
import toast from "react-hot-toast";
import {
  Modal,
  ModalBody,
  ModalHeader,
  Table,
  Tooltip
} from "reactstrap";

const CommntNewsModal = ({
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
          <ModalHeader toggle={() => setComModal(!comModal)} >
            {/* کامنت: {describe} */}
          </ModalHeader>
          <ModalBody>
            <Table hover>
              <thead>
                <tr>
                  <th className="text-center">کاربر</th>
                  <th>عنوان کامنت</th>
                  <th>نمایش کامنت</th>

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

                          <span className=" ">
                            {item.autor}
                            </span>
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
                            innerClassName="table-tooltip .bg-primary"
                            target={tooltipIdd}
                          >
                            {item.describe}
                          </Tooltip>
                          {item.describe}
                        </td>


                      </tr>
                    </tbody>
                  );
                })}
            </Table>
          </ModalBody>

        </Modal>

        {/* <ReplyComment
          repShow={repComm}
          setRepShow={setRepComm}
          addReplyComment={addReplyCommentt}
        /> */}
      </div>
    </div>
  );
};
export default CommntNewsModal;