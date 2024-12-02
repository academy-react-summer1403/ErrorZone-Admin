import React from 'react'
import { Card } from "reactstrap";
import BreadCrumbs from "../@core/components/breadcrumbs";
import CoursePaymentsTable from '../@core/components/coursePayment/CoursePaymentTable';
import useQueryGet from '../customHook/useQueryGet';


const Payment = () => {

  return (
    <div className="invoice-list-wrapper">
      <BreadCrumbs
        title="گروه های دوره"
        data={[
          { title: "مدیریت دوره ها", link: "/courses" },
          { title: "گروه های دوره" },
        ]}
      />
      <Card className="rounded">
        <CoursePaymentsTable
         // courseGroups={courseGroups}
          //currentPage={currentPage}
          //rowsPerPage={rowsPerPage}
          //searchText={searchText}
          //setCurrentPage={setCurrentPage}
          //setRowsPerPage={setRowsPerPage}
          //setSearchText={setSearchText}
         // setSort={setSort}
         // setSortColumn={setSortColumn}
        />
      </Card>
    </div>
  )
}

export default Payment