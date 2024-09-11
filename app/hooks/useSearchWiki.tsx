import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { searchService } from '../services/searchService';
import { useRecentSearches } from './useRecentSearches';
import { useDebounceQuery } from './useDebounceQuery';

const STALE_TIME = 1000 * 60 * 5;

export const useSearchWiki = () => {
  const { recentSearches, setRecentSearch } = useRecentSearches();
  const { debouncedQuery, query, setQuery } = useDebounceQuery();

  const wikiQuery = useQuery({
    queryKey: ['search', debouncedQuery],
    queryFn: () => searchService(debouncedQuery),
    staleTime: STALE_TIME,
    enabled: debouncedQuery.length > 0,
  });

  useEffect(() => {
    const thereIsNewSuccessfulQuery =
      wikiQuery.isSuccess && wikiQuery.data?.data.results.length > 0;

    if (thereIsNewSuccessfulQuery) {
      setRecentSearch(query);
    }
  }, [query, setRecentSearch, wikiQuery]);

  return {
    recentSearches: recentSearches,
    searchResults: wikiQuery.data?.data ?? { results: [], totalHits: 0 },
    isError: false,
    searchQuery: setQuery,
    thereIsUserSearch: debouncedQuery?.length > 0,
    query,
    isLoading: wikiQuery.isLoading,
  };
};
