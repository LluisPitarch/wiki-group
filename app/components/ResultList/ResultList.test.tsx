import React from 'react';
import { render } from '@testing-library/react';
import ResultList from './ResultList';
import { useVirtualizer } from '@tanstack/react-virtual';

jest.mock('@tanstack/react-virtual');

describe('ResultList component', () => {
  it('renders loading state when isLoading is true and thereIsUserSearch is true', () => {
    const { getByText } = render(
      <ResultList
        results={{ results: [], totalHits: 0 }}
        isLoading={true}
        thereIsUserSearch={true}
      />
    );
    expect(getByText('Loading')).toBeDefined();
  });

  it("renders placeholder state the user didn't perform a search", () => {
    const { getByText } = render(
      <ResultList
        results={{ results: [], totalHits: 0 }}
        isLoading={false}
        thereIsUserSearch={false}
      />
    );
    expect(getByText('Use the search bar above to get started')).toBeDefined();
  });

  it('renders results when searchResults are available', () => {
    (useVirtualizer as jest.Mock).mockReturnValue({
      getTotalSize: () => 110 * searchResults.results.length,
      getVirtualItems: () =>
        searchResults.results.map((_result, i) => ({
          index: i,
          size: 110,
          start: i * 110,
        })),
    });

    const searchResults = {
      results: [
        {
          title: 'Result 1',
          url: 'https://example.com/result1',
          htmlDescription: '<div>Description 1</div>',
          id: 1,
          creationDate: '2022-01-01T00:00:00.000Z',
        },
        {
          title: 'Result 2',
          url: 'https://example.com/result2',
          htmlDescription: '<div>Description 1</div>',
          id: 2,
          creationDate: '2022-01-01T00:00:00.000Z',
        },
      ],
      totalHits: 2,
    };
    const { getByText } = render(
      <ResultList
        results={searchResults}
        isLoading={false}
        thereIsUserSearch={true}
      />
    );

    expect(getByText('Results: 2 results')).toBeDefined();
    expect(getByText('Result 2')).toBeDefined();
  });

  it('renders no results message when searchResults are empty', () => {
    const { getByText } = render(
      <ResultList
        results={{ results: [], totalHits: 0 }}
        isLoading={false}
        thereIsUserSearch={true}
      />
    );
    expect(getByText('There is no results for that query')).toBeDefined();
  });
});
