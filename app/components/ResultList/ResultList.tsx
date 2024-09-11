import React, { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

import { Result as ResultModel } from '@/app/models/result.model';
import Result from './components/Result';
import ResultSkeleton from './components/ResultSkeleton';

import './result-list.css';

const SKELETON_NUMBER_ELEMENTS = 5;

type Props = {
  results: { results: ResultModel[]; totalHits: number };
  thereIsUserSearch: boolean;
  isLoading: boolean;
};

const ResultList = ({ results, thereIsUserSearch, isLoading }: Props) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: results.results.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 110,
    overscan: 5,
  });

  if (!thereIsUserSearch) {
    return (
      <div className="result-list">
        <div className="result-list__placeholder">
          <div className="result-list__placeholder-icon">👀</div>
          Use the search bar above to get started
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="result-list">
        <h2 className="result-list__title">
          <div className="result-list__loading">🔄</div> Loading
        </h2>
        <ul className="result-list__list">
          {Array.from({ length: SKELETON_NUMBER_ELEMENTS }).map((_, index) => (
            <ResultSkeleton key={index} />
          ))}
        </ul>
      </div>
    );
  }

  if (results.totalHits === 0 && thereIsUserSearch) {
    return (
      <div className="result-list">
        <div className="result-list__placeholder">
          <div className="result-list__placeholder-icon">❌</div>
          There is no results for that query
        </div>
      </div>
    );
  }

  return (
    <div className="result-list">
      <h2 className="result-list__title">{`Results: ${
        results.totalHits > 0 ? `${results.totalHits} results` : ''
      }`}</h2>
      <div
        ref={parentRef}
        style={{
          overflow: 'auto',
        }}
        className="result-list__list">
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}>
          {rowVirtualizer.getVirtualItems().map((virtualItem) => (
            <div
              key={virtualItem.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}>
              {results.results[virtualItem.index] && (
                <Result result={results.results[virtualItem.index]} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultList;
