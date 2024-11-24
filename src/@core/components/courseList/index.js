
// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX } from 'react-feather'

// ** Styles
import '@styles/react/apps/app-users.scss'

const UsersList = ({staticc}) => {
  const active=staticc?.filter((item)=>item.isActive)
  const expire=staticc?.filter((item)=>item.isExpire)
  const deletee=staticc?.filter((item)=>item.isdelete)

  // console.log("searched", deletee);

  return (
    <div className='app-user-list'>
      <Row>
        <Col lg='3' sm='6'>
          <StatsHorizontal
            color='primary'
            statTitle='مجموع دوره ها'
            icon={<User size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'> {staticc?.length} </h3>}
          />
        </Col>
        <Col lg='3' sm='6'>
          <StatsHorizontal
            color='secondary'
            statTitle='دوره های فعال '
            icon={<UserCheck  size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>{active?.length}</h3>}
          />
        </Col>
        <Col lg='3' sm='6'>
          <StatsHorizontal
            color='warning '
            statTitle='دوره های منقضی شده  '
            icon={<UserPlus   size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>{expire?.length}</h3>}
          />
        </Col>
        <Col lg='3' sm='6'>
          <StatsHorizontal
            color='danger'
            statTitle='دوره های حذف شده'
            icon={<UserX size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>{deletee?.length}</h3>}
          />
        </Col>
      </Row>
    </div>
  )
}

export default UsersList
