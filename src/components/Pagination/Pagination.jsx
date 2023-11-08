import React, {useState} from "react"
import {BsArrowLeft, BsArrowRight} from "react-icons/bs"

import "./Pagination.scss"

const Pagination = ({totalCocktails, cocktailsPerPage, setCurrentPage, currentPage}) => {
  const totalPages = Math.ceil(totalCocktails / cocktailsPerPage)
  const [activePage, setActivePage] = useState(currentPage)

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
      setActivePage(newPage)
    }
  }

  return (
    <div
      className='pagination'
      style={{display: totalPages === 0 ? "none" : "flex"}}
    >
      <BsArrowLeft
        id='page-left'
        onClick={() => handlePageChange(currentPage - 1)}
        style={{display: currentPage === 1 ? "none" : "block"}}
      />
      {Array.from({length: totalPages}, (_, index) => index + 1).map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={page === activePage ? "active" : ""}
        >
          {page}
        </button>
      ))}
      <BsArrowRight
        id='page-right'
        onClick={() => handlePageChange(currentPage + 1)}
        style={{display: currentPage === totalPages ? "none" : "block"}}
      />
    </div>
  )
}

export default Pagination
