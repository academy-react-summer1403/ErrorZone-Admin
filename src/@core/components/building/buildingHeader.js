import { Field, Form, Formik } from "formik";
import { Row, Col, Input, Button } from "reactstrap";
import CreateBuilding from "./CreateBuilding";

//** Table Header
const CustomBuildinHeader = ({
  setSearched,
  toggleSidebar,
  handlePerPage,
  rowsPerPage,
  toggle,
  isOpen,
}) => {
  return (
    <div
      style={{ width: "95%", marginRight: "35px" }}
      className="invoice-list-table-header me-1 mt-2 mb-75"
    >
      <Row>
        <Col xl="6" className="d-flex align-items-center p-0">
          <div className="d-flex align-items-center w-100">
            <label htmlFor="rows-per-page">نمایش</label>
            <Input
              className="mx-50"
              type="select"
              id="rows-per-page"
              value={rowsPerPage}
              onChange={handlePerPage}
              style={{ width: "5rem" }}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </Input>
          </div>
        </Col>
        <Col
          xl="6"
          className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
        >
          <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
            <Formik
              initialValues={{ search: "" }}
              onSubmit={(e) => setSearched(e.search)}
            >
              <Form>
                <Field
                  id="search-invoice"
                  name="search"
                  className="me-2 ms-1 border border-light focus-ring focus-ring-light bg-body"
                  type="text"
                  // value={value}

                  placeholder="جستجو"
                />
                <Button color="primary" type="submit">
                  جستجو
                </Button>
              </Form>
            </Formik>
            <Button
              color="primary"
              type="submit"
              style={{ marginRight: "10px" }}
              onClick={(e) => {
                e.preventDefault();
                toggle();
              }}
            >
              اضافه کردن ساختمان
            </Button>
            <CreateBuilding isOpen={isOpen} toggle={toggle} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CustomBuildinHeader;
