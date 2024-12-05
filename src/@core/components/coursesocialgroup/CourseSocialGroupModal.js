import React, { useState } from 'react';
import { CardTitle, Button, Form, Label, Input, FormFeedback, Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap'
import toast from 'react-hot-toast'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { AddSocialGroup } from '../../../core/services/Paper';


const CourseSocialGroupModal = ({
  comModal,
  setComModal,
  item,
  id,
  refetch,
  

}) => {
  const SignupSchema = yup.object().shape({
    groupName: yup.string().required('  نام گروه را وارد کنید').min(4, ' گروه باید حداقل 4 حرف داشته باشد '),
    groupLink: yup.string().required(' توضحیات  را وارد کنید').min(5, ' توضیحات باید حداقل 5 حرف داشته باشد '),
  })

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })

  const onSubmit = async data => {
    const dataObj = {
      groupName: data.groupName,
      groupLink: data.groupLink,
      courseId: id
    }

    const response = await AddSocialGroup(dataObj)
    if(response.success == true){
        refetch()
        toast.success(response.message)
        setShow(false)
    }
    }


    // const defaultValue = item ? {
    //     id: item?.id || null,
    //     buildingName: item?.buildingName || '',
    //     floor: item?.floor || 0,
    //     latitude: item?.latitude ? item?.latitude.toString() : '',
    //     longitude: item?.longitude ? item?.longitude.toString() : '',
    //     workDate: item?.workDate || '',  
    //     active: item?.active !== undefined ? item?.active : true
    //   } : {
    //     groupName: '',
    //     groupLink:'',
    //   };
    
    //   const validationSchema = Yup.object().shape({
    //     groupName: Yup.string().required('این فیلد الزامی است'),
    //     groupLink: Yup.number().required('این فیلد الزامی است'),
    //   });
    
    //   const updateBuildding = useMutation({
    //     mutationKey: ['updateBuildding'],
    //     mutationFn: (BulldingData) => UpdateBuildding(BulldingData, item),
    //     onSuccess: () => {
    //       query.invalidateQueries('list');
    //     }
    //   });
    
  

    // const  { mutate : updateBuildding } = useMutationPost("/CourseSocialGroup" , ["coursesocialgroup"])
    
    // const handleSubmit = (values) => {
    //      console.log("values" , values)
    //     updateBuildding(...values , id)
    //    };


  return (
    <div className="demo-inline-spacing">
      <div className="vertically-centered-modal">
        <Modal
          isOpen={comModal}
          toggle={() => setComModal(!comModal)}
          className="modal-dialog-centered "
          style={{ minWidth: "900px" }}
        >
          <ModalHeader toggle={() => setComModal(!comModal)} className="pt-2">

          </ModalHeader>
          <ModalBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col lg='12' className='mb-1'>
                <Label className='form-label' for='groupName'>
                  نام گروه
                </Label>
                <Controller
                  id='groupName'
                  name='groupName'
                  defaultValue=''
                  control={control}
                  render={({ field }) => <Input {...field} placeholder='نام گروه' invalid={errors.groupName && true} />}
                />
                {errors.groupName && <FormFeedback>{errors.groupName.message}</FormFeedback>}
              </Col>
              <Col lg='12' className='mb-1'>
                <Label className='form-label' for='groupLink'>
                  لینک گروه
                </Label>
                <Controller
                  id='groupLink'
                  name='groupLink'
                  defaultValue=''
                  control={control}
                  render={({ field }) => <Input {...field} placeholder='لینک گروه' invalid={errors.groupLink && true} />}
                />
                {errors.groupLink && <FormFeedback>{errors.groupLink.message}</FormFeedback>}
              </Col>
              <div className='d-flex'>
                <Button className='me-1' color='primary' type='submit'>
                  تایید
                </Button>
                <Button outline color='secondary' type='reset' onClick={()=>setShow(false)}>
                  برگشت
                </Button>
              </div>
              </Row>
            </Form>
          </ModalBody>
        </Modal>

      </div>
    </div>
  );
};
export default CourseSocialGroupModal;