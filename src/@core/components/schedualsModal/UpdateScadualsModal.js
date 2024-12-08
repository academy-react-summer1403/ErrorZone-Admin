import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CardTitle,
  Button,
  Form,
  Label,
  Input,
  FormFeedback,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
} from "reactstrap";
import toast from "react-hot-toast";
import { Edit } from "react-feather";

import { useState } from "react";

import CustomModal from "../CustomModal/CustomModal";
import useMutationPut from "../../../customHook/useMutationPut";
import useMutationPost from "../../../customHook/useMutationPost";
//import { AddJobs } from "../../../core/services/Paper";

const UpdateScadual = ({ id,  currentCourseId, courseGroupId , show , setShow , courseGroups , row }) => {
       
    console.log("5555555" , row)
  //   const SignupSchema = yup.object().shape({
  //     jobTitle: yup
  //       .string()
  //       .required("  نام تکنولوژی را وارد کنید")
  //       .min(4, " تکنولوژی باید حداقل 4 حرف داشته باشد "),
  //     aboutJob: yup
  //       .string()
  //       .required(" توضحیات  را وارد کنید")
  //       .min(5, " توضیحات باید حداقل 5 حرف داشته باشد "),
  //     companyWebSite: yup
  //       .string()
  //       .required("  نام تکنولوژی را وارد کنید")
  //       .min(4, " تکنولوژی باید حداقل 4 حرف داشته باشد "),
  //     companyLinkdin: yup
  //       .string()
  //       .required(" توضحیات  را وارد کنید")
  //       .min(5, " توضیحات باید حداقل 5 حرف داشته باشد "),
  //     workStartDate: yup
  //       .string()
  //       .required("  نام تکنولوژی را وارد کنید")
  //       .min(4, " تکنولوژی باید حداقل 4 حرف داشته باشد "),
  //     workEndDate: yup
  //       .string()
  //       .required(" توضحیات  را وارد کنید")
  //       .min(5, " توضیحات باید حداقل 5 حرف داشته باشد "),
  //     // inWork: yup
  //     //   .string()
  //     //   .required("  نام تکنولوژی را وارد کنید")
  //     //   .min(4, " تکنولوژی باید حداقل 4 حرف داشته باشد "),
  //     companyName: yup
  //       .string()
  //       .required(" توضحیات  را وارد کنید")
  //       .min(5, " توضیحات باید حداقل 5 حرف داشته باشد "),
  //   });

  const [courseGroup, setCourseGroup] = useState()
 const [courseId, setCourseId] = useState()
  console.log("courseGroup" , courseGroup)
   console.log("courseId" , courseId) 
  
  const currentid = courseGroups?.courseGroupDtos

  console.log("11111" , currentid)

  const selectedcourse =  courseGroups?.courseGroupDtos.filter((item) => item.groupId === courseGroup)

  console.log("clear" , selectedcourse)

  const { mutate, isSuccess: editGroupShrdualSuccess, isError: editGroupShrdualError } = useMutationPut(
    `/Schedual/UpdateSchedualSingle?currentCurseId=${row.id}`,
    ["courseGroupDetail"]
  );

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });



  const onSubmit = async (data) => {
    const obj = {
      courseGroupId: courseGroup,
      startDate: data.startDate,
      startTime: data.startTime,
      endTime: data.endTime,
      weekNumber: data.weekNumber,
      rowEffect: 3,
      id: id,
      forming: data.forming,
      lockToRaise: data.lockToRaise,
    };

    mutate(obj);
  };
   if (editGroupShrdualSuccess) toast.success("برنامه شما تغییر شد");
   if (editGroupShrdualError) toast.error("گروه دوره نامعتبر یا دسترسی شما برای ثبت زمانبندی محدود میباشد");





  return (
    <>
      <CustomModal show={show} setShow={setShow}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col lg="12" className="mb-1">
              <Label className="form-label" for="startDate">
                تاریخ شروع
              </Label>
              <Controller
                id="startDate"
                name="startDate"
                defaultValue={row?.startDate}
                control={control}
                render={({ field }) => (
                  <Input
                    type="date"
                    {...field}
                    invalid={errors.startDate && true}
                  />
                )}
              />
              {errors.startDate && (
                <FormFeedback>{errors.startDate.message}</FormFeedback>
              )}
            </Col>
            <Col lg="12" className="mb-1">
              <Label className="form-label" for="startTime">
                زمان شروع
              </Label>
              <Controller
                id="startTime"
                name="startTime"
                defaultValue={row?.startTime}
                control={control}
                render={({ field }) => (
                  <Input
                    type="number"
                    {...field}
                    invalid={errors.startTime && true}
                  />
                )}
              />
              {errors.workEndDate && (
                <FormFeedback>{errors.workEndDate.message}</FormFeedback>
              )}
            </Col>
            <Col lg="12" className="mb-1">
              <Label className="form-label" for="v">
                زمان پایان
              </Label>
              <Controller
                id="endTime"
                name="endTime"
                defaultValue={row.endTime}
                control={control}
                render={({ field }) => (
                  <Input
                    type="number"
                    {...field}
                    invalid={errors.endTime && true}
                  />
                )}
              />
              {errors.endTime && (
                <FormFeedback>{errors.endTime.message}</FormFeedback>
              )}
            </Col>
            <Col lg="12" className="mb-1">
              <Label className="form-label" for="weekNumber">
                تعداد در هفته
              </Label>
              <Controller
                id="weekNumber"
                name="weekNumber"
                defaultValue={row?.weekNumber}
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    invalid={errors.weekNumber && true}
                  />
                )}
              />
              {errors.weekNumber && (
                <FormFeedback>{errors.weekNumber.message}</FormFeedback>
              )}
            </Col>
            <Col lg="12" className="mb-1">
            <Label className="courseId" for="courseId">
                دوره مورد نظر
              </Label>
             <Input
                    type='select' 
                    name='courseId'
                    defaultValue={courseId}
                    onChange={(e) => setCourseId(e.target.value)}
                >
                    {courseGroups?.courseGroupDtos?.map((item) => (
                        <option key={item.id} value={item?.courseId}>{item?.courseName}</option>
                    ))}
                </Input> 
            </Col> 
            <Col lg="12" className="mb-1">
            <Label className="courseGroupId" for="courseGroupId">
                  گروه مورد نظر
              </Label>
             <Input
                    type='select' 
                    name='courseGroupId'
                    defaultValue={courseGroupId}
                    onChange={(e) => setCourseGroup(e.target.value)}
                >
                    {courseGroups?.courseGroupDtos?.map((item) => (
                        <option key={item.id} value={item?.groupId}>{item?.groupName}</option>
                    ))}
                </Input> 
            </Col>
            <Col lg="12" className="mb-1">
              <Label className="form-label" for="forming">
                تشکیل شدن
              </Label>
              <Controller
                id="forming"
                name="forming"
                defaultValue={row?.forming ? true : false}
                control={control}
                render={({ field }) => (
                  <Input
                    type="checkbox"
                    {...field}
                    placeholder="توضیحات"
                    invalid={errors.forming && true}
                  />
                )}
              />
              {errors.forming && (
                <FormFeedback>{errors.forming.message}</FormFeedback>
              )}
            </Col>
            <Col lg="12" className="mb-1">
              <Label className="form-label" for="lockToRaise">
                حضور غیاب
              </Label>
              <Controller
                id="lockToRaise"
                name="lockToRaise"
                defaultValue={row?.lockToRaise ? true : false}
                control={control}
                render={({ field }) => (
                  <Input
                    type="checkbox"
                    {...field}
                    placeholder="توضیحات"
                    invalid={errors.lockToRaise && true}
                  />
                )}
              />
              {errors.lockToRaise && (
                <FormFeedback>{errors.lockToRaise.message}</FormFeedback>
              )}
            </Col> 
            <div className="d-flex">
              <Button className="me-1" color="primary" type="submit">
                تایید
              </Button>
              <Button
                outline
                color="secondary"
                type="reset"
                onClick={() => setShow(false)}
              >
                برگشت
              </Button>
            </div>
          </Row>
        </Form>
      </CustomModal>
    </>
  );
};

export default UpdateScadual;
