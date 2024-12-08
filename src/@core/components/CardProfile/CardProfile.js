// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Card, CardBody, CardImg, Badge, CardTitle } from 'reactstrap'
import useQueryGet from '../../../customHook/useQueryGet'
import { convertDateToPersian } from '../../../utility/hooks/date-helper.utils'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'; 
const CardProfile = () => {
  const {data} = useQueryGet( ['GetProfileAdmin'], ("/SharePanel/GetProfileInfo"))

  console.log("data 123444" , data)

  const percentage = data?.profileCompletionPercentage || 0; 

  return (
    <div>
    <Card className='card-profile'>
      <CardTitle style={{background: 'rgb(243, 243, 243)', width: '100%', height: '120px',}} top />
      <CardBody>
        <div className='profile-image-wrapper'>
          <div className='profile-image'>
            <Avatar img={data?.currentPictureAddress} />
          </div>
        </div>
        <h3>{data?.fName} {data?.lName}</h3>
        <h6 className='text-muted'> {data?.userAbout} </h6>
        {/* {roles.map(role => <Badge className='profile-badge' style={{marginRight: '2px'}} color='light-primary'>
            {role}
        </Badge>)} */}
        <hr className='mb-2' />
        <div className='d-flex justify-content-between align-items-center'>
          <div>
            <h6 className='text-muted fw-bolder'> وضعیت حساب </h6>
            {/* <h4 className='mb-0'> {data?.profileCompletionPercentage}% </h4> */}
            <div className='d-flex align-items-center' >
              <div style={{ width: "55px", height: "55px",  }}>
                <CircularProgressbar
                  value={percentage}
                  text={`${percentage}%`}
                  styles={buildStyles({
                    pathColor: `rgba(62, 152, 199, ${percentage / 100})`, 
                    textColor: '#000',
                    trailColor: '#d6d6d6', 
                    backgroundColor: '#85d8ee' 
                  })}
                />
              </div>
              <div className='ms-75'>
                <h4 className='mb-0'>
                  {percentage > 0 ? percentage + '%' : 'این کاربر پروفایل خود را تکمیل نکرده'}
                </h4>
                <small>درصد تکمیل پروفایل</small>
              </div>
            </div>
          </div>
          <div>
            <h6 className='text-muted fw-bolder'> جنسیت </h6>
            <h4 className='mb-0'> {data?.gender ? 'زن' : 'مرد'} </h4>
          </div>
          <div>
            <h6 className='text-muted fw-bolder'> سال تولد </h6>
            <h4 className='mb-0'> {convertDateToPersian(data?.birthDay)} </h4>
          </div>
        </div>
      </CardBody>
    </Card>
    </div>
  )
}

export default CardProfile