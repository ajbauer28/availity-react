import React from 'react';
import { render, cleanup } from 'react-testing-library';

import 'jest-dom/extend-expect';

import Pages from '../PaginationControls/Pages';

describe('Pages', () => {
  afterEach(cleanup);
  let mockFn;
  beforeEach(() => {
    mockFn = jest.fn();
  });

  test('renders successfully', () => {
    const { container } = render(<Pages onPageChange={mockFn} pageCount={5} />);
    expect(container).toBeDefined();
  });

  test('renders nav buttons by default', () => {
    const { getByLabelText } = render(
      <Pages onPageChange={mockFn} pageCount={5} />
    );
    ['First', 'Previous', 'Next', 'Last'].forEach(label => {
      const navLink = getByLabelText(label);
      expect(navLink).toBeDefined();
    });
  });

  test('should add correct classes for size,align,unstyled', () => {
    const { container, rerender } = render(
      <Pages onPageChange={mockFn} pageCount={5} />
    );
    expect(container.firstChild).toHaveClass('pagination flex-grow-1');

    [
      {
        prop: 'size',
        options: ['sm', 'md', 'lg', 'random'],
        class: 'pagination-<option>',
      },
      {
        prop: 'align',
        options: ['start', 'center', 'end', 'between'],
        class: 'justify-content-<option>',
      },
      {
        prop: 'unstyled',
        options: [true, false],
        class: {
          [false]: 'pagination-styled',
          [true]: 'pagination-unstyled',
        },
      },
    ].forEach(testCase => {
      testCase.options.forEach(option => {
        const expected =
          typeof testCase.class === 'string'
            ? testCase.class.replace('<option>', option)
            : testCase.class[option];

        const testProps = {
          [testCase.prop]: option,
        };

        rerender(<Pages onPageChange={mockFn} {...testProps} pageCount={5} />);
        expect(container.firstChild).toHaveClass(expected);
      });
    });
  });

  describe('Page buttons', () => {
    test('renders a page button', () => {
      const { getByLabelText } = render(
        <Pages onPageChange={mockFn} pageCount={1} page={1} />
      );
      const pageButton = getByLabelText('Page-1');
      expect(pageButton).toHaveTextContent('1');
    });

    test('does not render pages on simple', () => {
      const { queryByLabelText } = render(
        <Pages onPageChange={mockFn} pageCount={1} page={1} simple />
      );
      const pageButton = queryByLabelText('Page-1');
      expect(pageButton).toBeNull();
    });

    test('should render current page as active', () => {
      const { getByLabelText } = render(
        <Pages onPageChange={mockFn} pageCount={1} page={1} />
      );
      const pageButton = getByLabelText('Page-1');
      expect(pageButton.parentElement).toHaveClass('active');
    });

    test('should render padding values', () => {
      const page = 3;
      const pagePadding = 2;
      const pageCount = 10;

      const { getByLabelText } = render(
        <Pages
          onPageChange={mockFn}
          pageCount={pageCount}
          page={page}
          pagePadding={pagePadding}
        />
      );

      for (let i = page - pagePadding; i <= page + pagePadding; i += 1) {
        const pageButton = getByLabelText(`Page-${i}`);
        expect(pageButton).toHaveTextContent(i);
        if (i === page) {
          expect(pageButton.parentElement).toHaveClass('active');
        }
      }
    });

    test('should only render padding if within the pageCount', () => {
      const page = 3;
      const pagePadding = 2;
      const pageCount = 4;

      const { queryByLabelText } = render(
        <Pages
          onPageChange={mockFn}
          pageCount={pageCount}
          page={page}
          pagePadding={pagePadding}
        />
      );

      for (let i = page - pagePadding; i <= page + pagePadding; i += 1) {
        const pageButton = queryByLabelText(`Page-${i}`);
        if (i <= pageCount) {
          expect(pageButton).toHaveTextContent(i);
          if (i === page) {
            expect(pageButton.parentElement).toHaveClass('active');
          }
        } else {
          expect(pageButton).toBeNull();
        }
      }
    });

    test('padding should shift for ends of range', () => {
      const pagePadding = 2;
      const pageCount = 10;

      const page = 1;

      const { getByLabelText } = render(
        <Pages
          onPageChange={mockFn}
          pageCount={pageCount}
          page={page}
          pagePadding={pagePadding}
        />
      );

      for (let i = 1; i <= 5; i += 1) {
        const pageButton = getByLabelText(`Page-${i}`);
        expect(pageButton).toHaveTextContent(i);
        if (i === page) {
          expect(pageButton.parentElement).toHaveClass('active');
        }
      }
    });
  });
});
