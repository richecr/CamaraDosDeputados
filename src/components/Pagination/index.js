import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

import './styles.scss';

const Paginacao = ({
  totalPages,
  pageRange,
  onPageChange,
  nextLabel,
  previousLabel,
}) => (
  <ReactPaginate
    pageCount={totalPages}
    pageRangeDisplayed={pageRange}
    marginPagesDisplayed={1}
    onPageChange={onPageChange}
    containerClassName="paginate__container"
    previousClassName="paginate__previous"
    nextClassName="paginate__next"
    activeClassName="paginate__active"
    pageClassName="paginate__numbers"
    nextLabel={nextLabel}
    previousLabel={previousLabel}
  />
);

Paginacao.propTypes = {
  totalPages: PropTypes.number.isRequired,
  pageRange: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
  nextLabel: PropTypes.string,
  previousLabel: PropTypes.string,
};

Paginacao.defaultProps = {
  nextLabel: 'Proximo',
  previousLabel: 'Anterior',
  pageRange: 5,
};

export default Paginacao;
