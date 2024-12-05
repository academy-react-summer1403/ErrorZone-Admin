import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Label, Input, FormFeedback, Modal, ModalBody, ModalHeader } from 'reactstrap';
import * as Yup from 'yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import '@styles/react/libs/flatpickr/flatpickr.scss'
import useQueryGet from '../../../customHook/useQueryGet';
import { UpdateSocialGroup } from '../../../core/services/Paper';
import toast from 'react-hot-toast';

const CreateGroup = ({ row, title , setShow , show  }) => {
  const query = useQueryClient();
    const [courseAss, setCourseAss] = useState()

    const { data : courseAssData } = useQueryGet( ['getCourseAss']  , '/CourseAssistance');
  const defaultValue = row ? {
    id: row.id || null,
    groupName: row.groupName || '',
    groupLink: row.groupLink || '',
    courseId: row.courseId || '',
  } : {
    groupName: '',
    groupLink: '',
    courseId: courseAss,
};

  const validationSchema = Yup.object().shape({
    groupLink: Yup.string().required('این فیلد الزامی است').min(5,'حداقل 5 کاراکتر'),
    groupName: Yup.string().required('این فیلد الزامی است').min(5,'حداقل 5 کاراکتر'),
  });

  const updateAssWork = useMutation({
    mutationKey: ['updateAssWork'],
    mutationFn: (BulldingData) => UpdateSocialGroup(BulldingData, row),
    onSuccess: () => {
      setShow(false);
      toast.success("عملیات با موفقیت انجام شد")
      query.invalidateQueries('getBulding');
    }
  });

  const handleSubmit = (values) => {
    updateAssWork.mutate(values);
  };

  return (
      <Modal isOpen={show} toggle={() => setShow(!show)} className="modal-dialog-centered modal-lg" backdrop="static" keyboard={false}>
        <ModalHeader toggle={() => setShow(false)}></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">{row ? 'بروزرسانی گروه اجتماعی' : 'افزودن گروه اجتماعی'}</h1>
            <p>اطلاعات گروه را وارد کنید</p>
          </div>
          <Formik
            initialValues={defaultValue}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ handleChange, values, errors, touched, setFieldValue }) => (
              <Form style={{ display: 'flex', justifyContent: 'center', flexFlow: 'row wrap', gap: '14px' }}>
                <div className="mb-1 w-40">
                  <Label for="groupName">نام گروه اجتماعی <span className="text-danger">*</span></Label>
                  <Input
                    id="groupName"
                    name="groupName"
                  style={{ width: '300px' }}
                    value={values.groupName}
                    onChange={handleChange}
                    invalid={touched.groupName && !!errors.groupName}
                  />
                  {touched.groupName && errors.groupName && <FormFeedback>{errors.groupName}</FormFeedback>}
                </div>
                <div className="mb-1 w-40">
                  <Label for="groupLink">لینک گروه اجتماعی <span className="text-danger">*</span></Label>
                  <Input
                    id="groupLink"
                    name="groupLink"
                  style={{ width: '300px' }}
                    value={values.groupLink}
                    onChange={handleChange}
                    invalid={touched.groupLink && !!errors.groupLink}
                  />
                  {touched.groupLink && errors.groupLink && <FormFeedback>{errors.groupLink}</FormFeedback>}
                </div>
                {row == undefined ? (
                <Input
                    type='select' 
                    name='courseId'
                    style={{width:'620px'}}
                    onChange={(e) => setCourseAss(e.target.value)}
                >
                    {courseAssData?.map((item) => (
                        <option key={item.id} value={item.id}>{item.courseName}</option>
                    ))}
                </Input>
                ) : null}
                <Button type="submit" color="primary">ارسال</Button>
                <Button type="reset" color="secondary" outline onClick={() => setShow(false)}>انصراف</Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
  );
};

export default CreateGroup;