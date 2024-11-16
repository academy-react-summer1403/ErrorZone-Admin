// ** Custom Components
import AvatarGroup from '@components/avatar-group'
import react , {useState} from 'react'
// ** Images
// import react from '@src/assets/images/icons/react.svg'
import vuejs from '@src/assets/images/icons/vuejs.svg'
import angular from '@src/assets/images/icons/angular.svg'
import bootstrap from '@src/assets/images/icons/bootstrap.svg'
import avatar1 from './../../assets/images/portrait/small/jpmen.jpg'


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
} from 'reactstrap'
import useQueryGet from '../../../customHook/useQueryGet'
import { CustomPagination } from '../pagination'
import CustomHeader from '../customheader/CustomHeader'
import Select from "react-select";
import { selectThemeColors } from '../../../utility/Utils'
import CommentModal from '../commentManegment/commentModal/commentModal'
import ReplyComment from '../commentManegment/commentReply/commentReply'
import useMutationPost from '../../../customHook/useMutationPost'
import { deleteComments } from '../../../core/services/Paper'
import toast from "react-hot-toast";
import { useQueryClient } from '@tanstack/react-query'


const CommentTable = () => {
  // const [comments, setComments] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState("10")
  const [currentPage, setCurrentPage] = useState("1");
  const [search, setSearch] = useState()
  const [comModal, setComModal] = useState(false);
  const [courseId, setCourseID] = useState(null);
  const [commentId, setCommentId] = useState(null);
  const [repShow, setRepShow] = useState(false);
  const [sortCol, setSortCol] = useState({
    value: null,
    label: "انتخاب کنید...",
  });

  const [accepted, setAccepted] = useState({
    value: null,
    label: "انتخاب کنید...",
  });

  const accept = accepted.value;

  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
  };

  const isAcceptOptions = [
    { value: null, label: "انتخاب کنید..." },
    { value: true, label: "تایید شده" },
    { value: false, label: "تایید نشده" },
  ];
 
  const queryCliets = useQueryClient()

  const { data:getComments } = useQueryGet(["getComments"] , `/Course/CommentManagment?${currentPage ? `PageNumber=${currentPage}` : ""}&${rowsPerPage ? `RowsOfPage=${rowsPerPage}` : ""}&SortingCol=DESC&SortType=InsertDate&${search ? `Query=${search}` : ""}&${accept ? `Accept=${accept}` : ""}&userId=`)
  
  const { mutate:addReplyComments } = useMutationPost( "/Course/AddReplyCourseComment"  , ["addReplyComments"])

  const { mutate:acceptComments } = useMutationPost( `/Course/AcceptCourseComment?CommentCourseId=${commentId}` , ["acceptComments"])
   
  const { mutate:rejectComments } = useMutationPost( `/Course/RejectCourseComment?CommentCourseId=${commentId}` , ["rejectComments"]) 

  const handleDelete = async (e) => {
    const res = await deleteComments(e)
    if(res.success){
      toast.success(` باموفقیت حذف شد کامنت`)
    }
  }

  return (
    <> 
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
                //theme={selectThemeColors}
                //isClearable={false}
                //className="react-select"
                //classNamePrefix="select"
                //options={statusOptions}
                //value={sortCol}
                //onChange={(data) => setSortCol(data)}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
    
    <CustomHeader 
    queryCliets={queryCliets}
    setSearched={setSearch}
    handlePerPage={handlePerPage}
    />
    <Table responsive>

      <thead>
        <tr>
          <th>کاربر</th>
          <th>عنوان کامنت</th>
          <th>نمایش کامنت</th>
          <th>دوره</th>
          <th> وضعیت</th>
          <th> پاسخ ها </th>          
          <th>اقدام</th>
        </tr>
      </thead>
      
      {getComments?.comments?.map((item) => (    
      <tbody>
        <tr>
          <td>
            <img className='me-75' src={avatar1} height='20' width='20' style={{borderRadius: "60px"}} />
            <span className='align-middle fw-bold'>{item?.userFullName} </span>
          </td>
          <td> {item.commentTitle} </td>
          <td>
            {item.describe}
          </td>
          <td>
            {item.courseTitle}
          </td>
          <td>
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
          <td>
            <td style={{cursor: "pointer"}}>
                {item?.replyCount > 0 ? (
                  <Eye size={20}
                  onClick={() => {
                    setComModal(!comModal);
                    setCourseID(item?.courseId)
                    setCommentId(item?.commentId)
                  }}
                  />
                ) 
                : ("")}
            </td>
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
                                  e.preventDefault(e)
                                  acceptComments(item?.commentId);
                                }}
                              >
                                <FileText className="me-50" size={15} />{" "}
                                <span className="align-middle">تایید</span>
                              </DropdownItem>

                              <DropdownItem
                                onClick={e => {
                                  handleDelete(item?.commentId);
                                }}
                              >
                                <Trash className="me-50" size={15} />{" "}
                                <span className="align-middle">حذف</span>
                              </DropdownItem>
                            </DropdownMenu>
                          ) : (
                            <DropdownMenu className="d-flex flex-column p-0 ">
                              <DropdownItem
                                onClick={e => {
                                  rejectComments(item?.commentId);
                                }}
                              >
                                <Edit className="me-50" size={15} />{" "}
                                <span className="align-middle">رد کردن</span>
                              </DropdownItem>
                              <DropdownItem
                                   onClick={e => {
                                    handleDelete(item?.commentId);
                                  }}
                              >
                                <Trash className="me-50" size={15} />{" "}
                                <span className="align-middle">حذف</span>
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => {
                                  setRepShow(!repShow);
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
      ) )}  
    </Table>
   <CustomPagination 
   queryCliets={queryCliets}
   total={getComments?.totalCount}
   rowsPerPage={rowsPerPage}
   current={currentPage}
   setCurrent={setCurrentPage}
  />
   <CommentModal 
    setComModal={setComModal}
    comModal={comModal}
    courseId={courseId}
    commentId={commentId}
    acceptComments={acceptComments}
    handleDelete={handleDelete}
    rejectComments={rejectComments}
    addReplyComments={addReplyComments}
   />
   <ReplyComment
   repShow={repShow}
   setRepShow={setRepShow}
   addReplyComments={addReplyComments}
   courseId={courseId}
   commentId={commentId}
   />
    </>
  )
}

export default CommentTable
