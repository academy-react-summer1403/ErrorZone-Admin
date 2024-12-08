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
import CustomModal from "../@core/components/CustomModal/CustomModal";
import { useState } from "react";
import useMutationPut from "../customHook/useMutationPut";
//import { AddJobs } from "../../../core/services/Paper";

const GroupeSchedualModalEdit = ({ id, data, currentCourseId, courseGroupId }) => {
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

  const { mutate, isSuccess: editGroupShrdualSuccess, isError: editGroupShrdualError } = useMutationPut(
    `/Schedual/UpdateSchedualSingle?currentCurseId=${currentCourseId}`,
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
      courseGroupId: courseGroupId,
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
  if (editGroupShrdualSuccess) toast.success("برنامه با موفقیت تغییر یافت");
  if (editGroupShrdualError) toast.error("تغییر برنامه دچار مشکل است");

  const [show, setShow] = useState(false);

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
                defaultValue={data.startDate}
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
                defaultValue={data.startTime}
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
                defaultValue={data.endTime}
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
                defaultValue={data.weekNumber}
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
              <Label className="form-label" for="forming">
                تشکیل شدن
              </Label>
              <Controller
                id="forming"
                name="forming"
                defaultValue={data.forming ? true : false}
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
                defaultValue={data.lockToRaise ? true : false}
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

export default GroupeSchedualModalEdit;
