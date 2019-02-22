import React from 'react';
import PropTypes from 'prop-types';
import { Util } from 'reactstrap';
import BlockUI from 'react-block-ui';
import { usePagination } from './Pagination';

const PaginationContent = ({
  component: Component,
  loadingMessage,
  loading,
}) => {
  const { page } = usePagination();

  return (
    <BlockUI keepInView blocking={loading} message={loadingMessage}>
      {page.items &&
        page.items.map((value, key) => {
          if (!value.key) {
            // eslint-disable-next-line no-console
            console.warn(
              "Warning a Pagination Item doesn't have a key:",
              value
            );
          }

          return <Component key={value.key || key} {...value} />;
        })}
    </BlockUI>
  );
};

PaginationContent.propTypes = {
  component: Util.tagPropType,
  loadingMessage: PropTypes.string,
  loading: PropTypes.bool,
};

export default PaginationContent;
