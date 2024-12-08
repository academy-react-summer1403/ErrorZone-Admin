import { MoreVertical, Edit, X,} from 'react-feather'
import { Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Spinner, Pagination, PaginationItem, PaginationLink, Input, Label, Button, Card, CardTitle } from 'reactstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import toast from 'react-hot-toast'
import AddNewsFileModal from './AddNewsFileModal'
import UpdateNewsFileModal from './UpdateNewsFile'
import useQueryGet from '../../../customHook/useQueryGet'
import { DeleteNewsFile } from '../../../core/services/Paper'
import { convertDateToPersian } from '../../../utility/hooks/date-helper.utils'

const NewsFile = ({ refetchB }) => {

  const {id} = useParams()
  const {data, refetch, error, isLoading, isFetching} = useQueryGet(['GetRepliesNewsComment'] , (`/News/GetNewsFileList?NewsId=${id}`))

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null)

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  const totalPages = Math.ceil(data?.length / itemsPerPage);

  const navigate = useNavigate()
{}
  if (isLoading || isFetching) return <div className='d-flex' style={{ justifyContent: 'center', paddingTop: '250px' }}> <Spinner /> </div>;
  if (error) return <div>خطا در بارگذاری داده‌ها</div>;

  return (
    <>
    <div className='d-flex justify-content-between w-100'>
        <AddNewsFileModal show={show} setShow={setShow} refetch={refetch} refetchB={refetchB} />
        <Card><CardTitle> فایل ها </CardTitle></Card>
        <Button style={{height: '40px', width: '160px'}} color='primary' onClick={() => setShow(true)}> ساخت فایل جدید </Button>
    </div>
    {isLoading || isFetching ? <div className='d-flex' style={{justifyContent: 'center', margin: '50px'}}> <Spinner /> </div> : <> <Table hover responsive>
      <thead>
        <tr>
          <th style={{whiteSpace: 'nowrap'}}> نوع فایل </th>
          <th style={{whiteSpace: 'nowrap'}}> اسم فایل </th>
          <th style={{whiteSpace: 'nowrap'}}> تاریخ ثبت </th>
          <th style={{whiteSpace: 'nowrap'}}> وضعیت </th>
          <th>  </th>
        </tr>
      </thead>
      <tbody>
        {data?.length === 0 ? (
          <tr>
            <td colSpan="6" className="text-center">
              هیچ فایلی ثبت نشده است
            </td>
          </tr>
        ) : (
          data?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((file, index) => (
            <tr key={index}>
              <td style={{whiteSpace: 'nowrap'}}> {file.fileFormat} </td>
              <td style={{whiteSpace: 'nowrap', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis'}}> {file.fileName} </td>
              <td style={{whiteSpace: 'nowrap'}}>  {convertDateToPersian(file.insertDate)}  </td>
              <td style={{whiteSpace: 'nowrap'}}> <Badge color={file.isSlide ? 'light-success' : 'light-danger'}> {file.isSlide ? ' اسلاید ' : ' غیر اسلاید '} </Badge> </td>
              <td>
              <UncontrolledDropdown className='position-static'>
                <DropdownToggle tag='div' className='btn btn-sm'>
                  <MoreVertical size={14} className='cursor-pointer' />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    onClick={async () => {
                      const response = await DeleteNewsFile(file.id)
                      if(response.success === true){
                        toast.success(response.message)
                        refetch()
                      }
                    }} 
                    className=' cursor-pointer w-100'>
                    <X size={14} className='me-50 ' />
                    <span className='align-middle '> حذف فایل </span>
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      setShow2(true)
                      setSelectedItem(file)
                    }} 
                    className=' cursor-pointer w-100'>
                    <Edit size={14} className='me-50 ' />
                    <span className='align-middle '> ویرایش فایل </span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              </td>
            </tr>
          ))
        )}
      </tbody>

    </Table>
    <Pagination>
        {[...Array(totalPages)].map((_, index) => (
          <PaginationItem key={index + 1} active={index + 1 === currentPage}>
            <PaginationLink onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
      </Pagination>
      </>
    }
    <UpdateNewsFileModal setShow={setShow2} show={show2} selectedItem={selectedItem} refetch={refetch} refetchB={refetchB} />
    </>
  )
}

export default NewsFile