'use client';

import RecentSearches from './components/RecentSearches/RecentSearches';
import ResultList from './components/ResultList/ResultList';
import SearchBar from './components/SearchBar/SearchBar';

import './home.css';
import { useSearchWiki } from './hooks/useSearchWiki';

export default function Home() {
  const {
    searchQuery,
    searchResults,
    thereIsUserSearch,
    recentSearches,
    query,
    isLoading,
  } = useSearchWiki();

  return (
    <div className="home">
      <h1 className="">🎟️ Groupon Wiki</h1>
      <main className="home__layout">
        <RecentSearches
          recentSearches={recentSearches}
          searchRecentQuery={searchQuery}
        />
        <div className="home__search">
          <SearchBar setQuery={searchQuery} query={query} />
          <ResultList
            isLoading={isLoading}
            results={searchResults}
            thereIsUserSearch={thereIsUserSearch}
          />
        </div>
      </main>
    </div>
  );
}
