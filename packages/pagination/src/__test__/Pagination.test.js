import React from 'react';
import {
  render,
  waitForElement,
  waitForDomChange,
  fireEvent,
} from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import Pagination, { usePagination } from '../Pagination';
import PaginationControls from '../PaginationControls';

// eslint-disable-next-line react/prop-types
const PaginationJson = () => {
  const pagination = usePagination();

  return !pagination.loading ? (
    <span data-testid="pagination-con">{JSON.stringify(pagination)}</span>
  ) : null;
};

describe('Pagination', () => {
  test('should provide a list of items', async () => {
    const items = [
      { value: '1', key: 1 },
      { value: '2', key: 2 },
      { value: '3', key: 3 },
    ];

    const { getByTestId } = render(
      <Pagination items={items}>
        <PaginationJson />
      </Pagination>
    );

    const paginationCon = await waitForElement(() =>
      getByTestId('pagination-con')
    );

    expect(paginationCon).toBeDefined();

    expect(JSON.parse(paginationCon.textContent)).toEqual(
      expect.objectContaining({
        page: {
          number: 1,
          items,
        },
      })
    );
  });

  test('should provide a list given a function', async () => {
    const getItems = () => ({
      totalCount: 3,
      items: [
        { value: '1', key: 1 },
        { value: '2', key: 2 },
        { value: '3', key: 3 },
      ],
    });

    const { getByTestId } = render(
      <Pagination items={getItems}>
        <PaginationJson />
      </Pagination>
    );

    const paginationCon = await waitForElement(() =>
      getByTestId('pagination-con')
    );

    expect(paginationCon).toBeDefined();

    expect(JSON.parse(paginationCon.textContent)).toEqual(
      expect.objectContaining({
        page: {
          number: 1,
          items: getItems().items,
        },
      })
    );
  });

  test('show new page of items when page changes', async () => {
    const items = [
      { value: '1', key: 1 },
      { value: '2', key: 2 },
      { value: '3', key: 3 },
    ];

    const { getByTestId } = render(
      <Pagination items={items} itemsPerPage={1}>
        <PaginationJson />
        <PaginationControls directionLinks />
      </Pagination>
    );

    const paginationCon = await waitForElement(() =>
      getByTestId('pagination-con')
    );

    expect(paginationCon).toBeDefined();

    expect(JSON.parse(paginationCon.textContent)).toEqual(
      expect.objectContaining({
        page: {
          number: 1,
          items: [items[0]],
        },
      })
    );

    fireEvent.click(getByTestId('pagination-control-next-link'));

    waitForDomChange(() => getByTestId('pagination-con'));

    expect(JSON.parse(paginationCon.textContent)).toEqual(
      expect.objectContaining({
        page: {
          number: 2,
          items: [items[1]],
        },
      })
    );
  });
});
