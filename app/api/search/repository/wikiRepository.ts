import { SearchResponse } from '../route';
import { adaptResultsToModel } from './adapters';
import { WikiResponseSchema } from './types';

export class WikiRepository {
  searchResults = async (query: string): Promise<SearchResponse['data']> => {
    try {
      const response = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&format=json&srlimit=500`
      );
      const data: WikiResponseSchema = await response.json();

      if (!data?.query?.search) {
        throw new Error('Something went wrong');
      }

      return adaptResultsToModel(data);
    } catch (e) {
      throw new Error('Something went wrong');
    }
  };
}
