import { Result } from '@/app/models/result.model';
import { NextResponse, type NextRequest } from 'next/server';
import { WikiRepository } from './repository/wikiRepository';

export type SearchResponse = {
  status: number;
  data?: { results: Result[]; totalHits: number };
  error?: string;
};

export async function POST(
  req: NextRequest
): Promise<NextResponse<SearchResponse>> {
  const body = await req.json();

  if (!body?.query) {
    return NextResponse.json({
      status: 400,
      error: 'query is required',
    });
  }

  try {
    const searchRepository = new WikiRepository();
    const searchResults = await searchRepository.searchResults(body.query);

    if (!searchResults?.results || searchResults.results.length === 0) {
      return NextResponse.json({
        status: 200,
        data: { results: [], totalHits: 0 },
      });
    }

    return NextResponse.json({
      status: 200,
      data: searchResults,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      error: 'Something went wrong',
    });
  }
}
