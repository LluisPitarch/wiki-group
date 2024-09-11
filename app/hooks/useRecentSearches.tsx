'use client';

import { useEffect, useState } from 'react';

const RECENT_SEARCHES_LOCAL_STORAGE_KEY = 'groupon-wiki-recent-searches';

export const useRecentSearches = () => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const localStorageRecentSearches =
      localStorage?.getItem(RECENT_SEARCHES_LOCAL_STORAGE_KEY) || '[]';
    setRecentSearches(JSON.parse(localStorageRecentSearches));
  }, []);

  const handleSetRecentSearch = (query: string) => {
    const isTheQueryValid = query?.length > 0;
    const isTheQueryAlreadyOnTheList = recentSearches.includes(query);

    if (isTheQueryValid && !isTheQueryAlreadyOnTheList) {
      const newRecentSearches = [query, ...recentSearches];
      localStorage?.setItem(
        RECENT_SEARCHES_LOCAL_STORAGE_KEY,
        JSON.stringify(newRecentSearches)
      );
      setRecentSearches(newRecentSearches);
    }
  };

  return {
    recentSearches: recentSearches,
    setRecentSearch: handleSetRecentSearch,
  };
};
