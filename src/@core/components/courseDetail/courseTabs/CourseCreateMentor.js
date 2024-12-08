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

const CourseCreateMentor = ({ show, setShow, refetch }) => {
  const SignupSchema = yup.object().shape({
    jobTitle: yup
      .string()
      .required("  نام تکنولوژی را وارد کنید")
      .min(4, " تکنولوژی باید حداقل 4 حرف داشته باشد "),
    aboutJob: yup
      .string()
      .required(" توضحیات  را وارد کنید")
      .min(5, " توضیحات باید حداقل 5 حرف داشته باشد "),
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(SignupSchema) });

  const onSubmit = async (data) => {
    const dataObj = {
      jobTitle: data.jobTitle,
      aboutJob: data.aboutJob,
    };

    const response = await AddJobs(dataObj);
    if (response.success == true) {
      refetch();
      toast.success(response.message);
      setShow(false);
    }
  };

  return (
    <Modal
      className="iranSans"
      isOpen={show}
      toggle={() => setShow(!show)}
      centered
    >
      <ModalHeader>
        <CardTitle tag="h2" className="my-2">
          {" "}
             افزودن شغل جدید{" "}
        </CardTitle>
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col lg="12" className="mb-1">
                
              {/* <Label className="form-label" for="jobTitle">
                نام شغل
              </Label>
              <Controller
                id="jobTitle"
                name="jobTitle"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="نام تکنولوژی"
                    invalid={errors.jobTitle && true}
                  />
                )}
              />
              {errors.jobTitle && (
                <FormFeedback>{errors.jobTitle.message}</FormFeedback>
              )} */}
            </Col>
            <Col lg="12" className="mb-1">
              <Label className="form-label" for="aboutJob">
                توضیحات
              </Label>
              <Controller
                id="aboutJob"
                name="aboutJob"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="توضیحات"
                    invalid={errors.aboutJob && true}
                  />
                )}
              />
              {errors.aboutJob && (
                <FormFeedback>{errors.aboutJob.message}</FormFeedback>
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
      </ModalBody>
    </Modal>
  );
};

export default CourseCreateMentor;

