
import react , {useState , useEffect , Fragment} from 'react'
// ** Icons Imports
import { MoreVertical, Edit, Trash, Eye, FileText } from 'react-feather'

// ** Reactstrap Imports
import {
   Table,
   Row,
   Col,
   Label,
   Badge,
   UncontrolledDropdown,
   DropdownMenu, 
  DropdownItem, 
  DropdownToggle ,  
   CardBody,
  CardTitle,
  CardHeader, 
  Card,
  Tooltip,
} from 'reactstrap'
import useQueryGet from '../../../customHook/useQueryGet'
import { CustomPagination } from '../pagination'
import CustomHeader from '../customheader/CustomHeader'
import Select from "react-select";
import { selectThemeColors } from '../../../utility/Utils'
import CommentModal from '../commentManegment/commentModal/commentModal'
import ReplyComment from '../commentManegment/commentReply/commentReply'
import useMutationPost from '../../../customHook/useMutationPost'
import { accComment, addReply, decComment, delComment, deleteComments, getComment, getRepComnt } from '../../../core/services/Paper'
import toast from "react-hot-toast";
import { useQueryClient } from '@tanstack/react-query'
import Avatar from '../avatar'
import blanckthumbnail from "./../../../@core/assets/images/portrait/small/blank-thumbnail.jpg"


const CommentTable = () => {
  // const [comments, setComments] = useState([])
  const [list, setList] = useState([]);
  const [rowsPerPage, setRowPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState("1");
  const [totalcount, setTotalCount] = useState("");
  const [repCom, setRepCom] = useState([]);
  const [tooltipOpen, setTooltipOpen] = useState({});
  //const [search, setSearch] = useState()
  const [comModal, setComModal] = useState(false);
 // const [courseId, setCourseID] = useState(null);
 // const [commentId, setCommentId] = useState(null);
  const [crsid, setCrsid] = useState(null);
  const [cmntid, setCmntid] = useState(null);
  const [refetch, setRefetch] = useState(true);
  const [repShow, setRepShow] = useState(false);
  const [describe, setDescribe] = useState("");
  const [searched, setSearched] = useState("");
  const [sortCol, setSortCol] = useState({
    value: null,
    label: "انتخاب کنید...",
  });

  const [accepted, setAccepted] = useState({
    value: null,
    label: "انتخاب کنید...",
  });
  const sort = sortCol.value;
  const accept = accepted.value;

  // const handlePerPage = (e) => {
  //   const value = parseInt(e.currentTarget.value);
  //   setRowsPerPage(value);
  // };

  const isAcceptOptions = [
    { value: null, label: "انتخاب کنید..." },
    { value: true, label: "تایید شده" },
    { value: false, label: "تایید نشده" },
  ];
 
  const queryCliets = useQueryClient()

 // const { data:getComments } = useQueryGet(["getComments"] , `/Course/CommentManagment?${currentPage ? `PageNumber=${currentPage}` : ""}&${rowsPerPage ? `RowsOfPage=${rowsPerPage}` : ""}&SortingCol=DESC&SortType=InsertDate&${search ? `Query=${search}` : ""}&${accept ? `Accept=${accept}` : ""}&userId=`)
  
  //const { mutate:addReplyComments } = useMutationPost( "/Course/AddReplyCourseComment"  , ["getComments"])

  //const { mutate:acceptComments } = useMutationPost( `/Course/AcceptCourseComment?CommentCourseId=${commentId}` , ["getComments"])
   
  //const { mutate:rejectComments } = useMutationPost( `/Course/RejectCourseComment?CommentCourseId=${commentId}` , ["getComments"]) 

   const allComment = async (search, currentPage, rowsPerPage, accept, sort) => {
     try {
       const getCommentListt = await getComment(
         search,
         currentPage,
         rowsPerPage,
         accept,
         sort
       );
       setList(getCommentListt?.comments);
       setTotalCount(getCommentListt?.totalCount);
     } catch (error) {
       console.error("ERROR: ", error);
     }
   };

  const addReplyComment = async (e) => {
    try {
      const dataa = { ...e, CourseId: crsid, CommentId: cmntid };
      const data = new FormData();
      const keys = Object.keys(dataa);
      keys.forEach((key) => {
        const item = dataa[key];
        data.append(key, item);
      });
      const res = await addReply(data);
      res.success? toast.success(res.message): toast.error(res.message)

    } catch (error) {
      console.error("ERROR: ", error);
    }
  };


  const handleDelete = async (e) => {
    const res = await deleteComments(e)
    if(res.success){
      toast.success(` باموفقیت حذف شد کامنت`)
    }
  }

  const handleAcceptComment = async (e) => {
    try {
      const res = await accComment(e);
      res.success && setRefetch((old) => !old);
    } catch (error) {
      console.error("ERROR: ", error);
    }
  };

  const handleDeclineComment = async (e) => {
    try {
      const res = await decComment(e);
      res.success && setRefetch((old) => !old);
    } catch (error) {
      console.error("ERROR: ", error);
    }
  };

  const handleDeleteComment = async (e) => {
    try {
      const res = await delComment(e);
      res.success && setRefetch((old) => !old);
    } catch (error) {
      console.error("ERROR: ", error);
    }
  };

  const toggleTooltip = (id) => {
    setTooltipOpen({ ...tooltipOpen, [id]: !tooltipOpen[id] });
  };

  useEffect(() => {
    allComment(searched, currentPage, rowsPerPage, accept, sort);
  }, [searched, currentPage, rowsPerPage, accept, sort, refetch]);

  useEffect(() => {
    if (crsid && cmntid) {
      handleReplyComment(crsid, cmntid);
    }
  }, [refetch, crsid, cmntid]);

  const handleReplyComment = async (crsid, cmntid) => {
    try {
      const res = await getRepComnt(crsid, cmntid);
      setRepCom(res);
    } catch (error) {
      console.error("ERROR: ", error);
    }
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const statusOptions = [
    { value: null, label: "انتخاب کنید..." },
    { value: "replyCount", label: "تعداد ریپلی" },
  ];

  const AscDescOptions = [
    { value: null, label: "انتخاب کنید..." },
    { value: "ASC", label: "صعودی" },
    { value: "DESC", label: "نزولی" },
  ];

  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowPerPage(value);
  };


  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">فیلتر</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="4">
              <Label for="status-select">وضعیت</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                value={accepted}
                options={isAcceptOptions}
                onChange={(data) => setAccepted(data)}
              />
            </Col>
            <Col md="4">
              <Label for="status-select">وضعیت</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={statusOptions}
                value={sortCol}
                onChange={(data) => setSortCol(data)}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card>
        <div className="react-dataTable">
          <CustomHeader
            toggleSidebar={toggleSidebar}
            setSearched={setSearched}
            handlePerPage={handlePerPage}
            rowsPerPage={rowsPerPage}
            setRowPerPage={setRowPerPage}
          />
          <Table hover>
            <thead>
              <tr>
                <th>کاربر</th>
                <th>عنوان کامنت</th>
                <th>نمایش کامنت</th>
                <th> دوره</th>
                <th> وضعیت</th>
                <th className="px-0"> پاسخ ها</th>
                <th> اقدام</th>
              </tr>
            </thead>
            {list &&
              list.map((item, index) => {
                const tooltipId = `tooltip-${index}`;
                return (
                  <tbody key={index}>
                    <tr>
                      <td
                        className=" px-0 "
                        style={{
                          maxWidth: "130px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        <span className="mx-1 ">
                          <Avatar img={blanckthumbnail} />
                        </span>
                        <span>{item.userFullName}</span>
                      </td>
                      <td className="pr-0 pl-1" style={{ maxWidth: "150px" }}>
                        {item.commentTitle}
                      </td>
                      <td
                        className="pr-0 pl-1"
                        id={tooltipId}
                        style={{
                          maxWidth: "200px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        <Tooltip
                          placement="top"
                          isOpen={tooltipOpen[tooltipId]}
                          toggle={() => toggleTooltip(tooltipId)}
                          innerClassName="table-tooltip"
                          target={tooltipId}
                        >
                          {item.describe}
                        </Tooltip>
                        {item.describe}
                      </td>
                      <td className="px-0">{item.courseTitle}</td>
                      <td className="px-0 text-center">
                        {item.accept === true ? (
                          <Badge pill color="light-success" className="me-1">
                            تایید شده
                          </Badge>
                        ) : (
                          <Badge pill color="light-warning" className="me-1">
                            تایید نشده
                          </Badge>
                        )}
                      </td>
                      <td
                        className="p-0 text-center"
                        style={{
                          maxWidth: "20px",
                          minWidth: "20px",
                        }}
                      >
                        {item.replyCount > 0 ? (
                          <Eye
                            style={{ width: "18px", height: "16px" }}
                            onClick={() => {
                              setComModal(!comModal);
                              setCrsid(item.courseId);
                              setCmntid(item.commentId);
                              handleReplyComment(item.courseId, item.commentId);
                              setDescribe(item.describe);
                            }}
                          />
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="px-0 text-center">
                        <UncontrolledDropdown direction="start">
                          <DropdownToggle
                            className="icon-btn hide-arrow"
                            color="transparent"
                            size="sm"
                            caret
                          >
                            <MoreVertical size={15} />
                          </DropdownToggle>
                          {item.accept === false ? (
                            <DropdownMenu className="d-flex flex-column p-0  ">
                              <DropdownItem
                                onClick={(e) => {
                                  handleAcceptComment(item.commentId);
                                }}
                              >
                                <FileText className="me-50" size={15} />{" "}
                                <span className="align-middle">تایید</span>
                              </DropdownItem>

                              <DropdownItem
                                onClick={(e) => {
                                  handleDeleteComment(item.commentId);
                                }}
                              >
                                <Trash className="me-50" size={15} />{" "}
                                <span className="align-middle">حذف</span>
                              </DropdownItem>
                            </DropdownMenu>
                          ) : (
                            <DropdownMenu className="d-flex flex-column p-0 ">
                              <DropdownItem
                                onClick={(e) => {
                                  handleDeclineComment(item.commentId);
                                }}
                              >
                                <Edit className="me-50" size={15} />{" "}
                                <span className="align-middle">رد کردن</span>
                              </DropdownItem>
                              <DropdownItem
                                onClick={(e) => {
                                  handleDeleteComment(item.commentId);
                                }}
                              >
                                <Trash className="me-50" size={15} />{" "}
                                <span className="align-middle">حذف</span>
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => {
                                  setRepShow(!repShow);
                                  addReplyComment();
                                  setCrsid(item.courseId);
                                  setCmntid(item.commentId);
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
        </div>
      </Card>
      <CustomPagination
        total={totalcount}
        current={currentPage}
        setCurrent={setCurrentPage}
        rowsPerPage={rowsPerPage}
      />
      <CommentModal
        setComModal={setComModal}
        comModal={comModal}
        repCom={repCom}
        handleAcceptComment={handleAcceptComment}
        handleDeclineComment={handleDeclineComment}
        handleDeleteComment={handleDeleteComment}
        describe={describe}
      />
      <ReplyComment
        repShow={repShow}
        setRepShow={setRepShow}
        addReplyComment={addReplyComment}
      />
    </Fragment>
  )
}

export default CommentTable
