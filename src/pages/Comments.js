import React from 'react'
import CommentsTable from '../@core/components/Comments/commentsTable'
import useQueryGet from '../customHook/useQueryGet'
import { Comments_COLUMNS } from '../@core/components/Comments/comment-columns'

import UsersList from '../@core/components/Comments/userList'

const Comments = () => {
 // const { data:getComments } = useQueryGet(["getComments"] , "/Course/CommentManagment?PageNumber=1&RowsOfPage=10&SortingCol=DESC&SortType=InsertDate&Query=&Accept=&userId=")
  //console.log('121212121',  getComments )
  return (
    <div> 
      {/* <CommentsTable  data={getComments} columns={Comments_COLUMNS}/> */}

       <UsersList /> 

     
    </div>
  )
}

export default Comments