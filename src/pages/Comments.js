import React from 'react'
import CommentsTable from '../@core/components/Comments/commentsTable'
import useQueryGet from '../customHook/useQueryGet'
import { Comments_COLUMNS } from '../@core/components/Comments/comment-columns'

import UsersList from '../@core/components/Comments/userList'

const Comments = () => {
  return (
    <div> 
       <UsersList />    
    </div>
  )
}

export default Comments