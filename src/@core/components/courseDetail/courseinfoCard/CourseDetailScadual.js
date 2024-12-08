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
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import toast from "react-hot-toast";
import { Bell, Bookmark, Clock, Edit } from "react-feather";
import { useState } from "react";
import CustomModal from "../../CustomModal/CustomModal";
import useMutationPost from "../../../../customHook/useMutationPost";
import useQueryGet from "../../../../customHook/useQueryGet";
//import { AddJobs } from "../../../core/services/Paper";

const CourseDetailScadual = ({
 course,
  show,
  setShow,
}) => {
  

  console.log("coursessssss" , course)

 const {data: groups} = useQueryGet(["groups"] , (`/CourseGroup/GetCourseGroup?TeacherId=${course?.teacherId}&CourseId=${course?.courseId}`))


  console.log("group1234" , groups)

  const [courseGroup, setCourseGroup] = useState();
  const [courseId, setCourseId] = useState();

  const {
    mutate,
    isSuccess: edit,
    isError: edits,
  } = useMutationPost(
    `/Schedual/AddSchedualSingle?currentCurseId=${course?.courseId}`,
    ["adminsScheduals"]
  );
 

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    console.log("222", data);

    const obj = {
      startDate: data?.startDate,
      startTime: data?.startTime,
      endTime: data?.endTime,
      weekNumber: data?.weekNumber,
      rowEffect: 3,
      courseGroupId: courseGroup,
    };

    console.log("obj", obj);

    mutate(obj);
  };
  if (edit) toast.success("برنامه شما اضاف شد");
  if (edits) toast.error(" بد اضاف کردی");

  return (
    <>
      <Edit size={20} onClick={() => setShow(true)} />
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
                  <Label className="courseGroupId" for="courseGroupId">
                    گروه مورد نظر
                  </Label>
                  <Input
                    type="select"
                    name="courseGroupId"
                    onChange={(e) => setCourseGroup(e.target.value)}
                  >
                    {groups?.map((item) => (
                      <option key={item.id} value={item?.groupId}>
                        {item?.groupName}
                      </option>
                    ))}
                  </Input>
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

export default CourseDetailScadual;

