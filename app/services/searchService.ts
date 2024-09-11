import { Result } from '../models/result.model';

const baseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3000/api';

export const PAGE_SIZE = 500;
const PAGE = 0;

export const searchService = (
  query: string
): Promise<{
  data: { results: Result[]; totalHits: number };
  status: number;
}> => {
  return fetch(`${baseUrl}/search`, {
    method: 'POST',
    body: JSON.stringify({
      query,
      // We are not currently handling pagination
      page: PAGE,
      // We are not currently handling pagination
      size: PAGE_SIZE,
    }),
  }).then((result) => result?.json());
};
