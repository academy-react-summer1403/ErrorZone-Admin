import Avatar from "@components/avatar";
import Avatarrr from "../../../assets/images/new/55.jpg";

// import avatarImg from "src/@core/assets/images/avatar-blank.png";
// import avatarImg from "../../../@core/assets/images/avatar-blank.png";

import { Edit, FileText, MoreVertical, Trash } from "react-feather";
import {
  Badge,
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Table,
  UncontrolledDropdown,
} from "reactstrap";

import Spinner from './../../spinner/Fallback-spinner';

// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Third Party Components
import Select from "react-select";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Label,
  Row,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

import { Link } from "react-router-dom";
import { Field, Form, Formik } from "formik";

import { getPapers } from "../../../../core/services/Paper";
import { CustomPagination } from "../../pagination";

const PaperTable = () => {
  // ** States
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [allnews, setAllnews] = useState([]);
  const [searchee, setSearchee] = useState("");
  const [totalCont, setTotalCont] = useState(null);
  const [pageCon, setPageCon] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState(null);

  // ** Function to fetch papers
  const allPaper = async () => {
    try {
      const getPaper = await getPapers(searchee, pageCon, selectedStatus);
       console.log("getPaper", getPaper);
      setAllnews(getPaper.news);
      setTotalCont(getPaper.totalCount);
    } catch (error) {
      throw new Error("ERROR: ", error);
    }
  };

  useEffect(() => {
    allPaper();
  }, [searchee, pageCon, selectedStatus]);

  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // ** User filter options
  const isActiveOptions = [
    { value: true, label: "فعال" },
    { value: false, label: "غیرفعال" },
  ];

  return (
    <Fragment>
      {allnews ? (
        <>
          <div className="d-flex mb-2 justify-content-between">
            <div className="w-25">
              <Select
                className="react-select rounded-3 "
                classNamePrefix="select"
                defaultValue={isActiveOptions[0]}
                name="clear"
                options={isActiveOptions}
                // isClearable
                placeholder="وضعیت"
                onChange={(option) =>
                  setSelectedStatus(option ? option.value : null)
                }
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row-reverse",
                marginLeft: "80px",
              }}
            >
              <Formik
                initialValues={{}}
                onSubmit={(e) => setSearchee(e.search)}
              >
                <Form className="border rounded d-flex bg-white" style={{ width: "240px" }}>
                  <Field
                    id="search-invoice"
                    name="search"
                    className="me-2 ms-1 border-0 focus-ring focus-ring-light bg-white"
                    type="text"
                    placeholder="جستجو"
                  />
                  <Button color="primary" type="submit">
                    جستجو
                  </Button>
                </Form>
              </Formik>
            </div>
          </div>
          <Card className="overflow-hidden">
            <div className="react-dataTable">
              <Table hover>
                <thead className="text-center">
                  <tr>
                    <th className="px-0"></th>
                    <th className="px-0">نویسنده</th>
                    <th className="px-0">عنوان خبر</th>
                    <th className="px-0">دسته بندی خبر</th>
                    <th className="px-0">توضیحات کوتاه</th>
                    <th className="px-0">وضعیت</th>
                    <th className="px-0">اقدام</th>
                  </tr>
                </thead>
                <tbody>
                  {allnews &&
                    allnews.map((item) => (
                      <tr className="text-center px-0" key={item.id}>
                        <td className="px-0">
                          {item.currentImageAddressTumb == null ||
                          item.currentImageAddressTumb == "undefined" ? (
                            <Avatar img={Avatarrr} />
                          ) : (
                            <Avatar img={item.currentImageAddressTumb} />
                          )}
                        </td>
                        <td className="px-0">
                          <span className="align-middle fw-bold">
                            <Link
                              to={"/papers/view/" + item.id}
                              style={{ color: "#555" }}
                            >
                              {item.addUserFullName}
                            </Link>
                          </span>
                        </td>
                        <td
                          className="px-0"
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "150px",
                          }}
                        >
                          {item.title}
                        </td>
                        <td className="px-0">{item.newsCatregoryName}</td>
                        <td
                          className="px-0"
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "150px",
                          }}
                        >
                          {item.miniDescribe}
                        </td>
                        <td className="px-0">
                          <Badge
                            pill
                            color={
                              item.isActive ? "light-primary" : "light-danger"
                            }
                          >
                            {item.isActive ? "فعال" : "غیرفعال"}
                          </Badge>
                        </td>
                        <td>
                          <UncontrolledDropdown direction="start">
                            <DropdownToggle
                              className="icon-btn hide-arrow"
                              color="transparent"
                              size="sm"
                              caret
                            >
                              <MoreVertical size={15} />
                            </DropdownToggle>
                            <DropdownMenu className="d-flex flex-column p-0">
                              <DropdownItem
                                href="/"
                                onClick={(e) => e.preventDefault()}
                              >
                                <FileText className="me-50" size={15} />{" "}
                                <span className="align-middle">
                                  <Link
                                    to={"/papers/view/" + item.id}
                                    style={{ color: "#555" }}
                                  >
                                    جزئیات
                                  </Link>
                                </span>
                              </DropdownItem>
                              <DropdownItem
                                href="/"
                                onClick={(e) => e.preventDefault()}
                              >
                                <Edit className="me-50" size={15} />{" "}
                                <span className="align-middle">ویرایش</span>
                              </DropdownItem>
                              <DropdownItem
                                href="/"
                                onClick={(e) => {
                                  e.preventDefault();
                                  // handleDeleteUser(item.id);
                                }}
                              >
                                <Trash className="me-50" size={15} />{" "}
                                <span className="align-middle">حذف</span>
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
            <CustomPagination
              total={totalCont}
              current={pageCon}
              setCurrent={setPageCon}
              rowsPerPage={10}
            />
          </Card>
        </>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default PaperTable;
