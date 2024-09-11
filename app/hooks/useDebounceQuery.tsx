import { useState } from 'react';
import { useDebounce } from 'use-debounce';

export const useDebounceQuery = () => {
  const [query, setQuery] = useState<string>('');

  const [debouncedQuery] = useDebounce(query, 500);

  return {
    setQuery,
    query,
    debouncedQuery,
  };
};
