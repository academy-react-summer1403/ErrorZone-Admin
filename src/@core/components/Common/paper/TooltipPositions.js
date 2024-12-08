// ** Reactstrap Imports
import { Button, UncontrolledTooltip } from 'reactstrap'
import { Edit, FileText, MoreVertical, Trash } from "react-feather";
import { Link } from 'react-router-dom';

const TooltipPosition = ({id}) => {
  return (
    <div className='demo-inline-spacing ' style={{paddingRight: "215px"}}>
      <Button color='primary' outline id='positionTop'>
        <Link to={"/papers/view/" + id}>   <FileText className="me-50" size={20} />  </Link>
      
      </Button>
      <UncontrolledTooltip placement='top' target='positionTop'>
         جزئیات
      </UncontrolledTooltip>

      <Button color='primary' outline id='positionTop1'>
        <Edit className="me-50" size={20} />
      </Button>
      <UncontrolledTooltip placement='top' target='positionTop1'>
        ادیت
      </UncontrolledTooltip> 
    </div>
  )
}
export default TooltipPosition
