// ** React Imports
import { useState, Fragment } from 'react'

// ** Reactstrap Imports
import { Row, Col, Card, Form, CardBody, Button, Badge, Modal, Input, Label, ModalBody, ModalHeader, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

// ** Third Party Components
import Swal from 'sweetalert2'
import Select from 'react-select'
import { Check, Briefcase, X, CheckSquare, XSquare } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'
import withReactContent from 'sweetalert2-react-content'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import changeCourseStatus from '../../../core/utils/changeCourseStatus'

// ** mutations part
// const {
//   mutate: changeStatus,
//   isSuccess: changeStatusDone,
//   isError: changeStatusErr,
// } = useMutationPutFormData("/Course/UpdateCourseStatus", ["corses"]);

const roleColors = {
  editor: 'light-info',
  admin: 'light-danger',
  author: 'light-warning',
  maintainer: 'light-success',
  subscriber: 'light-primary'
}

const statusColors = {
  active: 'light-success',
  pending: 'light-warning',
  inactive: 'light-secondary'
}

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'suspended', label: 'Suspended' }
]

const countryOptions = [
  { value: 'uk', label: 'UK' },
  { value: 'usa', label: 'USA' },
  { value: 'france', label: 'France' },
  { value: 'russia', label: 'Russia' },
  { value: 'canada', label: 'Canada' }
]

const languageOptions = [
  { value: 'english', label: 'English' },
  { value: 'spanish', label: 'Spanish' },
  { value: 'french', label: 'French' },
  { value: 'german', label: 'German' },
  { value: 'dutch', label: 'Dutch' }
]

const MySwal = withReactContent(Swal)

const UserInfoCard = ({ selecteCourse }) => {
  // ** State
  const [show, setShow] = useState(false)

  // ** Hook
  // const {
  //   reset,
  //   control,
  //   setError,
  //   handleSubmit,
  //   formState: { errors }
  // } = useForm({
  //   defaultValues: {
  //     username: selecteCourse.username,
  //     lastName: selecteCourse.fullName.split(' ')[1],
  //     firstName: selecteCourse.fullName.split(' ')[0]
  //   }
  // })

  // ** render user img
  const renderUserImg = () => {
    if (selecteCourse != null && !!selecteCourse?.imageAddress) {
      return (
        <img
          height='110'
          width='110'
          alt='user-avatar'
          src={selecteCourse?.imageAddress}
          className='img-fluid rounded mt-3 mb-2'
        />
      )
    } else {
      return (
        <Avatar

          color='light-primary'
          className='rounded mt-3 mb-2'
          content={selecteCourse?.title}
          contentStyles={{
            borderRadius: 0,
            fontSize: 'calc(48px)',
            width: '100%',
            height: '100%'
          }}
          style={{
            height: '110px',
            width: '110px'
          }}
        />
      )
    }
  }

  // const onSubmit = data => {
  //   if (Object.values(data).every(field => field.length > 0)) {
  //     setShow(false)
  //   } else {
  //     for (const key in data) {
  //       if (data[key].length === 0) {
  //         setError(key, {
  //           type: 'manual'
  //         })
  //       }
  //     }
  //   }
  // }

  // const handleReset = () => {
  //   reset({
  //     username: selecteCourse.username,
  //     lastName: selecteCourse.fullName.split(' ')[1],
  //     firstName: selecteCourse.fullName.split(' ')[0]
  //   })
  // }

  // const handleSuspendedClick = () => {
  //   return MySwal.fire({
  //     title: 'Are you sure?',
  //     text: "You won't be able to revert user!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes, Suspend user!',
  //     customClass: {
  //       confirmButton: 'btn btn-primary',
  //       cancelButton: 'btn btn-outline-danger ms-1'
  //     },
  //     buttonsStyling: false
  //   }).then(function (result) {
  //     if (result.value) {
  //       MySwal.fire({
  //         icon: 'success',
  //         title: 'Suspended!',
  //         text: 'User has been suspended.',
  //         customClass: {
  //           confirmButton: 'btn btn-success'
  //         }
  //       })
  //     } else if (result.dismiss === MySwal.DismissReason.cancel) {
  //       MySwal.fire({
  //         title: 'Cancelled',
  //         text: 'Cancelled Suspension :)',
  //         icon: 'error',
  //         customClass: {
  //           confirmButton: 'btn btn-success'
  //         }
  //       })
  //     }
  //   })
  // }

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className='user-avatar-section'>
            <div className='d-flex align-items-center flex-column'>
              {renderUserImg()}
              <div className='d-flex flex-column align-items-center text-center'>
                <div className='user-info'>
                  <h4>{selecteCourse !== null ? selecteCourse?.fullName : 'Eleanor Aguilar'}</h4>
                  {selecteCourse?.courseTeches != [] ? (
                    selecteCourse?.courseTeches.map((item, index) => {
                      <Badge key={item} color="primary" className='text-capitalize'>
                        {selecteCourse?.courseTeches[index]}
                      </Badge>
                    })
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className='d-flex justify-content-around my-2 pt-75'>
            <div className='d-flex align-items-start me-2'>
              <Badge color='light-primary' className='rounded p-75'>
                <Check className='font-medium-2' />
              </Badge>
              <div className='ms-75'>
                <h4 className='mb-0'>1.23k</h4>
                <small>Tasks Done</small>
              </div>
            </div>
            <div className='d-flex align-items-start'>
              <Badge color='light-primary' className='rounded p-75'>
                <Briefcase className='font-medium-2' />
              </Badge>
              <div className='ms-75'>
                <h4 className='mb-0'>568</h4>
                <small>Projects Done</small>
              </div>
            </div>
          </div>
          <h4 className='fw-bolder border-bottom pb-50 mb-1'>Details</h4>
          <div className='info-container'>
            {selecteCourse !== null ? (
              <ul className='list-unstyled'>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Username:</span>
                  <span>{selecteCourse?.title}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Billing Email:</span>
                  <span>{selecteCourse?.teacherName}</span>
                </li>

                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Status:</span>
                  {/* <span>{selecteCourse?.teacherName}</span> */}
                  {/* <UncontrolledButtonDropdown>
                      {selecteCourse.statusName == "شروع ثبت نام" ? (
                        <DropdownToggle
                          color="none"
                          className="btn-gradient-info"
                          // className="fw-semibold"
                          size="sm"
                          caret
                          onClick={(e) => e.stopPropagation()}
                        >
                          شروع ثبت نام
                        </DropdownToggle>
                      ) : (
                        false
                      )}
                      {selecteCourse.statusName == "درحال برگزاری" ? (
                        <DropdownToggle
                          color="none"
                          className="btn-gradient-secondary"
                          // className="fw-semibold"
                          size="sm"
                          caret
                          onClick={(e) => e.stopPropagation()}
                        >
                          درحال برگزاری
                        </DropdownToggle>
                      ) : (
                        false
                      )}
                      {selecteCourse.statusName == "منقضی شده" ? (
                        <DropdownToggle
                          color="none"
                          className="btn-gradient-warning"
                          // className="fw-semibold"
                          size="sm"
                          caret
                          onClick={(e) => e.stopPropagation()}
                        >
                          منقضی شده
                        </DropdownToggle>
                      ) : (
                        false
                      )}

                      <DropdownMenu>
                        <DropdownItem
                          href="/"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            changeCourseStatus(
                              selecteCourse,
                              1,
                              changeStatus,
                              changeStatusDone,
                              changeStatusErr,
                              "شروع ثبت نام "
                            );
                          }}
                          className="text-info"
                        >
                          <CheckSquare className="me-50" size={15} />
                          <span className="align-middle"> شروع ثبت نام </span>
                        </DropdownItem>
                        <DropdownItem
                          href="/"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            changeCourseStatus(
                              selecteCourse,
                              2,
                              changeStatus,
                              changeStatusDone,
                              changeStatusErr,
                              "منقضی شده"
                            );
                          }}
                          className="text-warning"
                        >
                          <XSquare className="me-50" size={15} />{" "}
                          <span className="align-middle">منقضی شده</span>
                        </DropdownItem>
                        <DropdownItem
                          href="/"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            changeCourseStatus(
                              selecteCourse,
                              3,
                              changeStatus,
                              changeStatusDone,
                              changeStatusErr,
                              "درحال برگزاری "
                            );
                          }}
                          className="text-secondary"
                        >
                          <XSquare className="me-50" size={15} />{" "}
                          <span className="align-middle"> درحال برگزاری </span>
                        </DropdownItem>
                        <DropdownItem divider></DropdownItem>
                        <DropdownItem
                          href="/"
                          tag="a"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                        >
                          <Link to="/login">صفحه ی تغییرات کورس</Link>
                        </DropdownItem>
                      </DropdownMenu>
                  </UncontrolledButtonDropdown> */}
                  <Badge color="light-primary" className='text-capitalize'>
                    {selecteCourse?.isActive ? "فعال" : "غیر فعال"}
                  </Badge>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Billing cost:</span>
                  <span>{selecteCourse?.cost}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Role:</span>
                  {/* <span className='text-capitalize'>{selecteCourse.role}</span> */}
                  {selecteCourse?.courseTeches.map((item, index) => {
                    <Badge key={item} color="primary" className='text-capitalize'>
                      {selecteCourse?.courseTeches[index]}
                    </Badge>
                  })}
                </li>
                {/* <li className='mb-75'>
                  <span className='fw-bolder me-25'>Tax ID:</span>
                  <span>Tax-{selecteCourse.contact.substr(selecteCourse.contact.length - 4)}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Contact:</span>
                  <span>{selecteCourse.contact}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Language:</span>
                  <span>English</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Country:</span>
                  <span>England</span>
                </li> */}
              </ul>
            ) : null}
          </div>
          <div className='d-flex justify-content-center pt-2'>
            {/* <Button color='primary' onClick={() => setShow(true)}>
              Edit
            </Button>
            <Button className='ms-1' color='danger' outline onClick={handleSuspendedClick}>
              Suspended
            </Button> */}
          </div>
        </CardBody>
      </Card>
      {/* <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-5 pt-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>Edit User Information</h1>
            <p>Updating user details will receive a privacy audit.</p>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className='gy-1 pt-75'>
              <Col md={6} xs={12}>
                <Label className='form-label' for='firstName'>
                  First Name
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='firstName'
                  name='firstName'
                  render={({ field }) => (
                    <Input {...field} id='firstName' placeholder='John' invalid={errors.firstName && true} />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='lastName'>
                  Last Name
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='lastName'
                  name='lastName'
                  render={({ field }) => (
                    <Input {...field} id='lastName' placeholder='Doe' invalid={errors.lastName && true} />
                  )}
                />
              </Col>
              <Col xs={12}>
                <Label className='form-label' for='username'>
                  Username
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='username'
                  name='username'
                  render={({ field }) => (
                    <Input {...field} id='username' placeholder='john.doe.007' invalid={errors.username && true} />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='billing-email'>
                  Billing Email
                </Label>
                <Input
                  type='email'
                  id='billing-email'
                  defaultValue={selecteCourse.email}
                  placeholder='example@domain.com'
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='status'>
                  Status:
                </Label>
                <Select
                  id='status'
                  isClearable={false}
                  className='react-select'
                  classNamePrefix='select'
                  options={statusOptions}
                  theme={selectThemeColors}
                  defaultValue={statusOptions[statusOptions.findIndex(i => i.value === selecteCourse.status)]}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='tax-id'>
                  Tax ID
                </Label>
                <Input
                  id='tax-id'
                  placeholder='Tax-1234'
                  defaultValue={selecteCourse.contact.substr(selecteCourse.contact.length - 4)}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='contact'>
                  Contact
                </Label>
                <Input id='contact' defaultValue={selecteCourse.contact} placeholder='+1 609 933 4422' />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='language'>
                  language
                </Label>
                <Select
                  id='language'
                  isClearable={false}
                  className='react-select'
                  classNamePrefix='select'
                  options={languageOptions}
                  theme={selectThemeColors}
                  defaultValue={languageOptions[0]}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='country'>
                  Country
                </Label>
                <Select
                  id='country'
                  isClearable={false}
                  className='react-select'
                  classNamePrefix='select'
                  options={countryOptions}
                  theme={selectThemeColors}
                  defaultValue={countryOptions[0]}
                />
              </Col>
              <Col xs={12}>
                <div className='d-flex align-items-center mt-1'>
                  <div className='form-switch'>
                    <Input type='switch' defaultChecked id='billing-switch' name='billing-switch' />
                    <Label className='form-check-label' htmlFor='billing-switch'>
                      <span className='switch-icon-left'>
                        <Check size={14} />
                      </span>
                      <span className='switch-icon-right'>
                        <X size={14} />
                      </span>
                    </Label>
                  </div>
                  <Label className='form-check-label fw-bolder' for='billing-switch'>
                    Use as a billing address?
                  </Label>
                </div>
              </Col>
              <Col xs={12} className='text-center mt-2 pt-50'>
                <Button type='submit' className='me-1' color='primary'>
                  Submit
                </Button>
                <Button
                  type='reset'
                  color='secondary'
                  outline
                  onClick={() => {
                    handleReset()
                    setShow(false)
                  }}
                >
                  Discard
                </Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal> */}
    </Fragment>
  )
}

export default UserInfoCard
