import React from 'react';
import PropTypes from 'prop-types';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { usePagination } from './Pagination';

const PaginationControls = ({ directionLinks = false, autoHide = true }) => {
  const { pages, page, setPage } = usePagination();

  const { number: current } = page;

  return (
    <React.Fragment>
      {pages.length > 1 || !autoHide ? (
        <Pagination>
          {directionLinks ? (
            <PaginationItem disabled={current === 1}>
              <PaginationLink
                onClick={() => (current === 1 ? null : setPage(current - 1))}
                type="button"
                previous
              />
            </PaginationItem>
          ) : (
            ''
          )}
          {pages.map(pageNumber => (
            <PaginationItem key={pageNumber} active={current === pageNumber}>
              <PaginationLink onClick={() => setPage(pageNumber)} type="button">
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          ))}
          {directionLinks ? (
            <PaginationItem disabled={current === pages.length}>
              <PaginationLink
                onClick={() =>
                  current === pages.length ? null : setPage(current + 1)
                }
                type="button"
                next
              />
            </PaginationItem>
          ) : (
            ''
          )}
        </Pagination>
      ) : (
        ''
      )}
    </React.Fragment>
  );
};

PaginationControls.propTypes = {
  directionLinks: PropTypes.bool,
  autoHide: PropTypes.bool, // If there are no items to show. This component will not show
};
export default PaginationControls;