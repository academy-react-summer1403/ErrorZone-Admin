import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Label, Input, FormFeedback, Modal, ModalBody, ModalHeader } from 'reactstrap';
import * as Yup from 'yup';
import { useMutation,  useQueryClient } from '@tanstack/react-query';
import { UpdateAssCourse } from '../../../core/services/Paper';
import useQueryGet from '../../../customHook/useQueryGet';
import toast from 'react-hot-toast';

const Createassistance = ({ isOpen, toggle , row }) => {
  const [show, setShow] = useState(false);
  const query = useQueryClient();
  const [Buildding, setBuildding] = useState(1);
  const [userList, setUserList] = useState(1);
  const [searchQuery, setSearchQuery] = useState(''); 
  const [searchQueryUser, setSearchQueryUser] = useState(''); 

  const { data : user } = useQueryGet(["getUser"] , (`/User/UserMannage?PageNumber=1&RowsOfPage=100`))

  const {data:courses } = useQueryGet(["courses"] , (`/Course/CourseList?PageNumber=1&RowsOfPage=100`))

  const filteredCourses = courses?.courseDtos



  console.log("userList" , userList)

  const defaultValue = row
    ? {
        id: row.id || null,
        userId: row.userId,
        courseId: Buildding,
      }
    : {
        userId: userList || 2,
        courseId: Buildding || 1,
      };



  const validationSchema = Yup.object().shape({
    courseId: Yup.string().required('این فیلد الزامی است'),
  });

  const updateBuildding = useMutation({
    mutationFn: (BulldingData) => UpdateAssCourse(BulldingData, row),
    onSuccess: () => {
      
      query.invalidateQueries(['CourseAssistance']);
      toast.success("منتور مورد نظر اضافه شد")
      toggle()
    },
  });

  const handleSubmit = (values) => {
    updateBuildding.mutate(values);
    console.log(values);
  };

  if (updateBuildding.isError) return (toast.error("error"));

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      className="bg-transparent"
      
    >
      <ModalHeader className="bg-transparent" toggle={toggle}>  </ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1"> {row ? 'بروزرسانی منتور ' : 'افزودن  منتور'}</h1>
            <p>اطلاعات منتور را وارد کنید</p>
          </div>
          <Formik
            initialValues={defaultValue}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >

              <Form style={{ display: 'flex', justifyContent: 'center', flexFlow: 'row wrap', gap: '14px' }}>
                <Input
                type="select"
                name="courseId"
                onChange={(e) => setBuildding(e.target.value)}
                value={row?.courseId}
                >
                    <option>لطفا انتخاب کنید</option>
                    {user?.listUser?.map((item) => (
                        <option key={item.id} value={item.id}>{item.fname}</option>
                    ))}
                </Input>

                <Input
                type="select"
                name="courseId"
                onChange={(e) => setBuildding(e.target.value)}
                value={row?.courseId}
                >
                {filteredCourses?.map((item) => (
                    <option key={item.courseId} value={item.courseId}>
                    {item.courseId === row?.courseId ? item.title : item.title}
                    </option>
                ))}
                </Input>
                
                <Button type="submit" color="primary">ارسال</Button>
                <Button type="reset" color="secondary" outline onClick={() => setShow(false)}>انصراف</Button>
              </Form>

          </Formik>
        </ModalBody>
      </Modal>

  );
};

export default Createassistance;
