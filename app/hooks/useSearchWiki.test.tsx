import { renderHook, waitFor } from '@testing-library/react';
import { useSearchWiki } from './useSearchWiki';
import Provider from '@/app/_provider';
import { searchService } from '../services/searchService';
import { Result } from '../models/result.model';
import { act } from 'react';

const render = () =>
  renderHook(() => useSearchWiki(), {
    wrapper: ({ children }) => <Provider>{children}</Provider>,
  });

const mockResults: Result[] = [
  {
    creationDate: '2022-01-01T00:00:00.000Z',
    id: 1,
    title: 'Title 1',
    url: 'https://example.com',
    htmlDescription: '<div>Description</div>',
  },
];

jest.mock('../services/searchService');

describe('useSearchWiki', () => {
  it('The result should be 0 if there is no query performed', async () => {
    const { result } = render();

    expect(result.current.searchResults.totalHits).toBe(0);
  });

  it('Should return the results for the query', async () => {
    const mockSearchService = jest.fn(() => ({
      data: { results: mockResults, totalHits: 1 },
      status: 200,
    }));
    (searchService as jest.Mock).mockImplementation(mockSearchService);

    const { result } = render();

    await act(() => {
      result.current.searchQuery('query');
    });

    await waitFor(() => {
      expect(mockSearchService).toHaveBeenCalledWith('query');
    });

    expect(result.current.searchResults.totalHits).toBe(1);
    expect(result.current.searchResults.results).toStrictEqual(mockResults);

    await act(() => {
      result.current.searchQuery('query2');
    });

    expect(result.current.recentSearches).toStrictEqual(['query2', 'query']);
  });
});
