import React , {useState , useEffect} from 'react'
import {Button , Table, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle,  } from 'reactstrap'
import { MoreVertical, Edit , FileText , ArrowRight, User } from 'react-feather'
import {Link , useParams } from 'react-router-dom'
import { GetNewsApi } from "../../../core/services/Paper";
import blankthumbnail from '../../../@core/assets/images/portrait/small/blank-thumbnail.jpg'
import { convertDateToPersian } from '../../../utility/hooks/date-helper.utils';
import NewsReplyCommentModal from './NewsReplyCommentModal';

const GetNewsReplyCommentsModal = () => {
  const [getReply, setGetReplye] = useState([])
  const [modal, setModal] = useState(null);

   const params = useParams()
   const id = params.id 

  const GetReplires = async () => {

    const res = await GetNewsApi(id)
    setGetReplye(res)
    console.log('1212212' , res)
  }

  useEffect(() => {
    GetReplires()
  }, [])

  const toggleModal = (id) => {
    if (modal !== id) {
      setModal(id);
    } else {
      setModal(null);
    }
  }

  const handleReplyClick = (id) => {
    toggleModal(id);
  };


  return (
    <div>
          <>
       <Table>
          <thead>
            <tr>
              <th> کاربر </th>
              <th >  کاربر  </th>
              <th >  عنوان کامنت </th>
              <th style={{marginLeft: "80px"}}>  تاریخ  </th>
              <th style={{marginRight: "50px"}}>  اقدام </th>
            </tr>
          </thead>
          <tbody>

             {getReply?.map((reply, index) => (
                <tr key={index}>
                  <td> 
                     <img className='me-75 rounded bg-primary' src={reply?.pictureAddress ? reply?.pictureAddress : blankthumbnail}  alt='' height='30' width='30' />         
                  </td>
                  <td>
                    <div className='d-flex' style={{flexDirection: 'column', maxWidth: '200px', overflow: 'hidden', whiteSpace: 'nowrap'}}>
                      <span  className='align-middle' style={{fontSize: '16px', fontWeight: '700'}}>                   
                        <User />             
                       {reply?.autor}    </span>
                      <span className='align-middle fw-bold'>  </span>
                    </div>
                  </td>
                  <td style={{whiteSpace: 'nowrap'}}>{reply?.describe} </td>
                  <td style={{whiteSpace: 'nowrap'}}>

                    <span className='align-middle fw-bold'> {convertDateToPersian(reply?.inserDate)} </span>
                  </td>
                  <td>
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
               <Link  to={`/papers/commentsreply/${reply?.id} `}>   
               نمایش پاسخ ها
               </Link>
            </DropdownItem>

            </DropdownMenu>
            </UncontrolledDropdown>
            <NewsReplyCommentModal
              commentId={reply?.id}
              newsId={reply?.newsId}
              title={reply?.title}
              describe={reply?.describe}
              toggleModal={toggleModal}
              modal={modal}
              setModal={setModal}
            />
                  </td>
                </tr>
              ))
                      }
          </tbody>
    
        </Table>
          </>
        
 
    </div>
  )
}

export default GetNewsReplyCommentsModal