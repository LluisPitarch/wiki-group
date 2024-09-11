'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

import './search-bar.css';

type Props = {
  query: string;
  setQuery: (query: string) => void;
};

const SearchBar = ({ setQuery, query }: Props) => {
  return (
    <form className="search-bar">
      <div className="search-bar__wrapper">
        <Search className="absolute left-2.5 top-2.5 h-4 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="search"
          placeholder="Search on the wiki..."
          className="pl-8 search-bar__input"
        />
      </div>
    </form>
  );
};

export default SearchBar;
