import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Label, Input, FormFeedback, Modal, ModalBody, ModalHeader } from 'reactstrap';
import * as Yup from 'yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { UpdateClassRome } from '../../../core/services/Paper';
import useQueryGet from '../../../customHook/useQueryGet';
import toast from 'react-hot-toast';


const CreateClassRooem = ({  row , show ,setShow  } ) => {
    const query = useQueryClient();
    const [buldingState, setBuldingState] = useState(row?.buildingId)

    const { data : buldingData } = useQueryGet(['Building'], ('/Building'));



  const defaultValue = row ? {
    id: row.id || null,
    classRoomName: row.classRoomName || '',
    capacity: row.capacity || '',
    buildingId: Number(buldingState) || '',
  } : {
    classRoomName: '',
    capacity: '',
    buildingId: Number(buldingState)
  };

  const validationSchema = Yup.object().shape({
    capacity: Yup.number().required('این فیلد الزامی است'),
    classRoomName: Yup.string().required('این فیلد الزامی است').min(5,'حداقل 5 کاراکتر'),
    buildingId : Yup.number().required('این فیلد الزامی است')
  });

  const updateAssWork = useMutation({
    mutationKey: ['updateClass'],
    mutationFn: (BulldingData) => UpdateClassRome(BulldingData, row),
    onSuccess: () => {
      setShow(!show)
      toast.success("عملیات با موفقیت انجام شد")
      query.invalidateQueries('classroom');
    },
    onError:() => {
      toast.error("ساختمان موجود نمیباشد")
    }
  });

  const handleSubmit = (values) => {
    updateAssWork.mutate(values);
  };

  return (
    <Modal
      isOpen={show}
      toggle={() => setShow(!show)}
      className="bg-transparent"
      
    >
      <ModalHeader className="bg-transparent" toggle={() => setShow(!show)}>  </ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">{row ? 'بروزرسانی کلاس  ' : 'افزودن کلاس'} </h1>
            <p>اطلاعات کلاس را وارد کنید</p>
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
                  <Label for="classRoomName">نام کلاس <span className="text-danger">*</span></Label>
                  <Input
                    id="classRoomName"
                    name="classRoomName"
                  style={{ width: '300px' }}
                    value={values.classRoomName}
                    onChange={handleChange}
                    invalid={touched.classRoomName && !!errors.classRoomName}
                  />
                  {touched.classRoomName && errors.classRoomName && <FormFeedback>{errors.classRoomName}</FormFeedback>}
                </div>
                <div className="mb-1 w-40">
                  <Label for="capacity"> ظرفیت کلاس<span className="text-danger">*</span></Label>
                  <Input
                    id="capacity"
                    name="capacity"
                    type='number'
                    style={{ width: '300px' }}
                    value={values.capacity}
                    onChange={handleChange}
                    invalid={touched.capacity && !!errors.capacity}
                  />
                  {touched.capacity && errors.capacity && <FormFeedback>{errors.capacity}</FormFeedback>}
                </div>


                <Input
                    type='select' 
                    name='buildingId'
                    style={{width:'620px'}}
                    value={buldingState}
                    onChange={(e) => setBuldingState(e.target.value)}
                >
                    <option>لطفا انتخاب کنید</option>
                    {buldingData?.map((item) => (
                        <option key={item.id} value={item.id}>{item.buildingName}</option>
                    ))}
                </Input>

                <Button type="submit" color="primary">ارسال</Button>
                <Button type="reset" color="secondary" outline onClick={() => setShow(!show)}>انصراف</Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>

  );
};

export default CreateClassRooem;
