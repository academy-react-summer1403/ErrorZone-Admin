// ** React Imports
import { useState , useEffect } from "react";

// ** Reactstrap Imports
import { Button, UncontrolledDropdown , DropdownMenu, DropdownItem, DropdownToggle, Spinner } from "reactstrap";

// ** Custom Components
import NewsReplyCommentModal from "./NewsReplyCommentModal";

// ** Image Imports
import blankThumbnail from "../../../@core/assets/images/portrait/small/blank-Thumbnail.jpg";
import { MoreVertical } from "react-feather";
import { Link, useParams } from "react-router-dom";
import { GetNewsApi } from "../../../core/services/Paper";

export const NEWS_COMMENTS_COLUMNS = [
  {
    name: "نام کاربر",
    reorder: true,
    minWidth: "200px",
    cell: (row) => (
      <div className="d-flex align-items-center">
        <img
          src={
            row?.pictureAddress !== "Not-set" && row?.pictureAddress !== null
              ? row?.pictureAddress
              : blankThumbnail
          }
          className="student-course-reserve-picture"
          style={{width: "35px" , height: "35px" , borderRadius: "10px"}}
        />
        <div className="text-truncate ms-1">
          <span>{row.autor}</span>
        </div>
      </div>
    ),
  },
  {
    name: "عنوان نظر",
    reorder: true,
    minWidth: "220px",
    cell: (row) => (
      <div className="text-truncate ms-1">
        <span>{row.title}</span>
      </div>
    ),
  },
  {
    name: "تعداد لایک",
    reorder: true,
    width: "130px",
    cell: (row) => (
      <div className="text-truncate ms-1">
        <span>{row.likeCount}</span>
      </div>
    ),
  },
  {
    name: "عملیات",
    minWidth: "140px",
    cell: (row) => {
      console.log("row1234" , row)
      // ** States
      const [modal, setModal] = useState(null);

      const toggleModal = (id) => {
        if (modal !== id) {
          setModal(id);
        } else {
          setModal(null);
        }
      };

      const handleReplyClick = () => {
        toggleModal(row.newsId);
      };

      const params = useParams()
      const id = params.id
      const GetReplires = async () => {

        const res = await GetNewsApi(row.id)
        console.log('1212212' , res)
      }

      useEffect(() => {
        GetReplires()
      }, [])
      

      return (
        <div className="column-action d-flex align-items-center gap-1">
          <div className="d-flex align-items-center gap-2">
            <UncontrolledDropdown> 
            <DropdownToggle tag='div' className='btn btn-sm'>
                  <MoreVertical size={14} className='cursor-pointer' />
                </DropdownToggle>
                <DropdownMenu>
                <DropdownItem>

            <div  onClick={handleReplyClick} >
              پاسخ
            </div>
            </DropdownItem>
            <DropdownItem>
               <Link  to={`/papers/commentsreply/${row.id} `}>   
               نمایش پاسخ ها
               </Link>
            </DropdownItem>

            </DropdownMenu>
            </UncontrolledDropdown>
            <NewsReplyCommentModal
              commentId={row.id}
              newsId={row.newsId}
              title={row.title}
              describe={row.describe}
              toggleModal={toggleModal}
              modal={modal}
              setModal={setModal}
            />
          </div>
        </div>
      );
    },
  },
];
