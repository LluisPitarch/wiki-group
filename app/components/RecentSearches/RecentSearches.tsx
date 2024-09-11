import './recent-searches.css';

type Props = {
  recentSearches: string[];
  searchRecentQuery: (query: string) => void;
};

const RecentSearches = ({ recentSearches, searchRecentQuery }: Props) => {
  return (
    <div className="recent-searches">
      <h2 className="recent-searches__title">Recent searches:</h2>
      <ul className="recent-searches__list">
        {recentSearches?.map((query) => (
          <li
            key={query}
            className="recent-searches__element"
            onClick={() => searchRecentQuery(query)}>
            {query}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentSearches;
