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

import CustomModal from "../CustomModal/CustomModal";
import useMutationPut from "../../../customHook/useMutationPut";
import useMutationPost from "../../../customHook/useMutationPost";
//import { AddJobs } from "../../../core/services/Paper";

const CreateSchadualModal = ({
  id,
  currentCourseId,
  courseGroupId,
  show,
  setShow,
  courseGroups,
}) => {
  const [active, setActive] = useState("1");

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

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

  const [courseGroup, setCourseGroup] = useState();
  const [courseId, setCourseId] = useState();
  console.log("courseGroup", courseGroup);
  console.log("courseId", courseId);

  const currentid = courseGroups?.courseGroupDtos;

  console.log("11111", currentid);

  const {
    mutate,
    isSuccess: editGroupShrdualSuccess,
    isError: editGroupShrdualError,
  } = useMutationPost(
    `/Schedual/AddSchedualSingle?currentCurseId=${courseId}`,
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
  if (editGroupShrdualSuccess) toast.success("برنامه شما اضاف شد");
  if (editGroupShrdualError) toast.error(" بد اضاف کردی");

  return (
    <>
      <Edit size={20} onClick={() => setShow(true)} />
      <CustomModal show={show} setShow={setShow}>
        <Nav tabs>
        <NavItem>
          <NavLink active={active === "1"} onClick={() => toggleTab("1")}>
          <Clock className="font-medium-3 me-50" />
            <span className="fw-bold">افزودن برنامه دستی</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "2"} onClick={() => toggleTab("2")}>
          <Clock className="font-medium-3 me-50" />
            <span className="fw-bold">افزودن برنامه اتوماتیک </span>
          </NavLink>
        </NavItem>
        </Nav>
        <TabContent activeTab={active}>
          <TabPane tabId="1">
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
                  <Label className="courseId" for="courseId">
                    دوره کورد نظر
                  </Label>
                  <Input
                    type="select"
                    name="courseId"
                    onChange={(e) => setCourseId(e.target.value)}
                  >
                    {courseGroups?.courseGroupDtos?.map((item) => (
                      <option key={item.id} value={item?.courseId}>
                        {item?.courseName}
                      </option>
                    ))}
                  </Input>
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
                    {courseGroups?.courseGroupDtos?.map((item) => (
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
          </TabPane>
          <TabPane tabId="2">
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
                  <Label className="courseId" for="courseId">
                    دوره کورد نظر
                  </Label>
                  <Input
                    type="select"
                    name="courseId"
                    onChange={(e) => setCourseId(e.target.value)}
                  >
                    {courseGroups?.courseGroupDtos?.map((item) => (
                      <option key={item.id} value={item?.courseId}>
                        {item?.courseName}
                      </option>
                    ))}
                  </Input>
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
                    {courseGroups?.courseGroupDtos?.map((item) => (
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
          </TabPane>
        </TabContent>
      </CustomModal>
    </>
  );
};

export default CreateSchadualModal;
