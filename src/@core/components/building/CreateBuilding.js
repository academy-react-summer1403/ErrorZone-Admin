import React, { useState } from 'react';
import { useFormik } from "formik";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Label, Input, FormFeedback, Modal, ModalBody, ModalHeader, Row, Col } from 'reactstrap';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Map from './map'; 
import '@styles/react/libs/flatpickr/flatpickr.scss'
import Flatpickr from 'react-flatpickr';
import useMutationPut from '../../../customHook/useMutationPut';
import useMutationPost from '../../../customHook/useMutationPost';
import { UpdateBuildding } from '../../../core/services/Paper';
import toast from 'react-hot-toast';

const CreateBuilding = ({show, setShow , item } ) => {


    console.log("item" , item)

    const defaultValue = item ? {
        id: item?.id || null,
        buildingName: item?.buildingName || '',
        floor: item?.floor || 0,
        latitude: item?.latitude ? item?.latitude.toString() : '',
        longitude: item?.longitude ? item?.longitude.toString() : '',
        workDate: item?.workDate || '',  
        active: item?.active !== undefined ? item?.active : true
      } : {
        buildingName: '',
        floor: 0,
        latitude: '',
        longitude: '',
        workDate: '',
        active: true
      };
    
      const validationSchema = Yup.object().shape({
        buildingName: Yup.string().required('این فیلد الزامی است'),
        floor: Yup.number().required('این فیلد الزامی است'),
        workDate: Yup.date().required('تاریخ الزامی است'),
        active: Yup.boolean(),
      });
    
      const updateBuildding = useMutation({
        mutationKey: ['updateBuildding'],
        mutationFn: (BulldingData) => UpdateBuildding(BulldingData, item),
        onSuccess: () => {
          query.invalidateQueries('list');
          toast.success("عملیات با موفقیت انجام شد")          
          toggle()

        }
      });
    
      const handleSubmit = (values) => {
        updateBuildding.mutate(values);
        console.log(values);
      };
  
  return (
    <Modal
      isOpen={show}
      toggle={setShow(!show)}
      className="bg-transparent"
      
    >
      <ModalHeader className="bg-transparent" toggle={setShow(!show)}>  </ModalHeader>
      <ModalBody className="">
          <div className="">
            <h1 className="mb-1">{item ? 'بروزرسانی  ساختمان' : 'افزودن ساختمان '} </h1>
            <p>اطلاعات ساختمان را وارد کنید</p>
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
                  <Label for="buildingName">نام ساختمان <span className="text-danger">*</span></Label>
                  <Input
                    id="buildingName"
                    name="buildingName"
                    value={values.buildingName}
                    onChange={handleChange}
                    invalid={touched.buildingName && !!errors.buildingName}
                  />
                  {touched.buildingName && errors.buildingName && <FormFeedback>{errors.buildingName}</FormFeedback>}
                </div>
                <div className="mb-1 w-40">
                  <Label for="floor"> طبقه <span className="text-danger">*</span></Label>
                  <Input
                    id="floor"
                    name="floor"
                    type="number"
                    value={values.floor}
                    onChange={handleChange}
                    invalid={touched.floor && !!errors.floor}
                  />
                  {touched.floor && errors.floor && <FormFeedback>{errors.floor}</FormFeedback>}
                </div>
                <Flatpickr
                  type="date"
                  name="workDate"
                  id="workDate"
                  style={{ width: '250px' }}
                  placeholder="ساعت کاری را انتخاب کنید"
                  className="form-control"
                  value={values.workDate}
                  onChange={(date) => {
                    setFieldValue('workDate', date[0]);
                  }}
                  options={{
                    mode: 'range',
                    dateFormat: "Y-m-d"
                  }}
                />

                <div className="mb-1 w-40">
                  <Label for="active">فعال کردن دوره؟<span className="text-danger">*</span></Label>
                  <Input
                    id="active"
                    name="active"
                    type="checkbox"
                    checked={values.active}
                    onChange={handleChange}
                    invalid={touched.active && !!errors.active}
                  />
                  {touched.active && errors.active && <FormFeedback>{errors.active}</FormFeedback>}
                </div>
                <Map row={item} />

                <Button type="submit" color="primary">ارسال</Button>
                <Button type="reset" color="secondary" outline toggle={setShow(!show)}>انصراف</Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
    </Modal>
  )
}

export default CreateBuilding