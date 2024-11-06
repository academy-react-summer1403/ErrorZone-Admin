import { Field, Formik, useFormik } from "formik";
// import { Button, Col, Label, Row } from "reactstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as Yup from "yup";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  Input,
  Form,
  Button,
  Label,
} from "reactstrap";
import toast from "react-hot-toast";
import { createNews, getListNewsCategory } from "../core/services/Paper";

//
const CreatePapers = () => {
  const [categoryDto, setCategoryDto] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getListNewsCategory();
      if (data) {
        setCategoryDto(
          data.map((item) => ({
            value: item.id,
            label: item.categoryName,
          }))
        );
        formik.setFieldValue("NewsCatregoryId", data[0]?.id || null);
      }
    };
    fetchCategories();
  }, []);

  const initialValues = {
    Title: "",
    GoogleTitle: "",
    GoogleDescribe: "",
    MiniDescribe: "",
    Describe: null,
    Keyword: "",
    NewsCatregoryId: null,
  };

  const validationSchema = Yup.object({
    Title: Yup.string().required("این فیلد الزامی است."),
    GoogleTitle: Yup.string().required("این فیلد الزامی است."),
    GoogleDescribe: Yup.string().required("این فیلد الزامی است."),
    MiniDescribe: Yup.string().required("این فیلد الزامی است."),
    Describe: Yup.string().required("این فیلد الزامی است."),
    Keyword: Yup.string().required("این فیلد الزامی است."),
    NewsCatregoryId: Yup.string().required("این فیلد الزامی است."),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
try {
  const formData = new FormData();

  for (const key in values) {
    formData.append(key, values[key]);
  }
  const response = await createNews(formData);

  setSubmitting(false);
  if (response) {
    toast.success(response.message);

  } 

} catch (error) {
  toast.error(error.message)
}


    },
  });

  console.log('123456' , formik)

  return (
    <Card>
      <CardBody>
        <Form onSubmit={formik.handleSubmit}>
          <Row>
            <Col md="6" sm="12" className="">
              <Label className="form-label" for="Title">
                عنوان خبر
              </Label>
              <Input
                type="text"
                name="Title"
                id="Title"
                placeholder="تیتر"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Title}
                invalid={formik.touched.Title && !!formik.errors.Title}
              />
              {formik.touched.Title && formik.errors.Title ? (
                <div className="text-danger">{formik.errors.Title}</div>
              ) : null}
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="GoogleTitle">
                عنوان گوگل
              </Label>
              <Input
                type="text"
                name="GoogleTitle"
                id="GoogleTitle"
                placeholder="لینک"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.GoogleTitle}
                invalid={
                  formik.touched.GoogleTitle && !!formik.errors.GoogleTitle
                }
              />
              {formik.touched.GoogleTitle && formik.errors.GoogleTitle ? (
                <div className="text-danger">{formik.errors.GoogleTitle}</div>
              ) : null}
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="GoogleDescribe">
                توضیحات گوگل
              </Label>
              <Input
                type="textarea"
                name="GoogleDescribe"
                id="GoogleDescribe"
                placeholder="توضیحات"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.GoogleDescribe}
                invalid={
                  formik.touched.GoogleDescribe &&
                  !!formik.errors.GoogleDescribe
                }
              />
              {formik.touched.GoogleDescribe && formik.errors.GoogleDescribe ? (
                <div className="text-danger">
                  {formik.errors.GoogleDescribe}
                </div>
              ) : null}
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="MiniDescribe">
                توضیح کوتاه
              </Label>
              <Input
                type="textarea"
                name="MiniDescribe"
                id="MiniDescribe"
                placeholder=""
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.MiniDescribe}
                invalid={
                  formik.touched.MiniDescribe && !!formik.errors.MiniDescribe
                }
              />
              {formik.touched.MiniDescribe && formik.errors.MiniDescribe ? (
                <div className="text-danger">{formik.errors.MiniDescribe}</div>
              ) : null}
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="Keyword">
                کلمات کلیدی
              </Label>
              <Input
                type="text"
                name="Keyword"
                id="Keyword"
                placeholder="کلیدی"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Keyword}
                invalid={formik.touched.Keyword && !!formik.errors.Keyword}
              />
              {formik.touched.Keyword && formik.errors.Keyword ? (
                <div className="text-danger">{formik.errors.Keyword}</div>
              ) : null}
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="NewsCatregoryId">
                دسته بندی خبر
              </Label>
              <Input
                type="select"
                name="NewsCatregoryId"
                id="NewsCatregoryId"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.NewsCatregoryId}
                invalid={
                  formik.touched.NewsCatregoryId &&
                  !!formik.errors.NewsCatregoryId
                }
              >
                <option value="">انتخاب کنید</option>
                {categoryDto.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </Input>
              {formik.touched.NewsCatregoryId &&
              formik.errors.NewsCatregoryId ? (
                <div className="text-danger">
                  {formik.errors.NewsCatregoryId}
                </div>
              ) : null}
            </Col>
            <Col sm="12">
              <Label className="form-label" for="Describe">
                توضیحات
              </Label>
              <Input
                type="textarea"
                name="Describe"
                id="Describe"
                placeholder="توضیحات"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Describe}
                invalid={formik.touched.Describe && !!formik.errors.Describe}
              />
              {formik.touched.Describe && formik.errors.Describe ? (
                <div className="text-danger">{formik.errors.Describe}</div>
              ) : null}
            </Col>
            <Col sm="12">
              <div className="d-flex mt-3">
                <Button
                  className="me-1"
                  color="primary"
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  ثبت
                </Button>
                <Button
                  outline
                  color="secondary"
                  type="reset"
                  onClick={formik.handleReset}
                >
                  پاک کردن همه
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
};

export default CreatePapers;
