import { SearchResponse } from '../route';
import { WikiResponseSchema } from './types';

export const adaptResultsToModel = (
  data: WikiResponseSchema
): SearchResponse['data'] => {
  return {
    results:
      data.query?.search?.map((result) => {
        return {
          title: result.title,
          url: `https://en.wikipedia.org/wiki/${result.title}`,
          htmlDescription: result.snippet,
          id: result.pageid,
          creationDate: result.timestamp,
        };
      }) ?? [],
    totalHits: data.query?.searchinfo?.totalhits ?? 0,
  };
};
