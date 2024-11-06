import ReactPaginate from "react-paginate";
import { useState } from "react";

// ** Custom Pagination

export const CustomPagination = ({
  total,
  current,
  setCurrent,
  rowsPerPage,
}) => {
  const count = Number(Math.ceil(total / rowsPerPage));

  return (
    <ReactPaginate
      previousLabel={""}
      nextLabel={""}
      pageCount={count || 1}
      activeClassName="active"
      forcePage={current !== 0 ? current - 1 : 0}
      onPageChange={(page) => setCurrent(page.selected + 1)}
      pageClassName={"page-item"}
      nextLinkClassName={"page-link"}
      nextClassName={"page-item next"}
      previousClassName={"page-item prev"}
      previousLinkClassName={"page-link"}
      pageLinkClassName={"page-link"}
      containerClassName={
        "pagination react-paginate justify-content-center my-2 pe-1"
      }
    />
  );
};
