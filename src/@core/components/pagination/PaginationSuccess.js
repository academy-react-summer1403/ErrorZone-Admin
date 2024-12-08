import React, { useState } from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import { ChevronLeft, ChevronRight } from 'react-feather'

const PaginationSuccess = () => {
  // Define a state for the active page
  const [activePage, setActivePage] = useState(1)

  // Define the number of pages
  const totalPages = 7

  // Handle the page change
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber)
  }

  // Generate pagination items
  const renderPaginationItems = () => {
    const items = []
    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <PaginationItem key={i} active={activePage === i}>
          <PaginationLink href='#' onClick={(e) => {
            e.preventDefault()
            handlePageChange(i)
          }}>
            {i}
          </PaginationLink>
        </PaginationItem>
      )
    }
    return items
  }

  return (
    <Pagination className='d-flex mt-3' listClassName='pagination-success'>
      <PaginationItem disabled={activePage === 1}>
        <PaginationLink href='#' previous onClick={(e) => {
          e.preventDefault()
          if (activePage > 1) handlePageChange(activePage - 1)
        }}>
          <ChevronLeft size={15} />
        </PaginationLink>
      </PaginationItem>
      {renderPaginationItems()}
      <PaginationItem disabled={activePage === totalPages}>
        <PaginationLink href='#' next onClick={(e) => {
          e.preventDefault()
          if (activePage < totalPages) handlePageChange(activePage + 1)
        }}>
          <ChevronRight size={15} />
        </PaginationLink>
      </PaginationItem>
    </Pagination>
  )
}

export default PaginationSuccess