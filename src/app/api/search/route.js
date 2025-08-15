import { NextResponse } from 'next/server';
import { searchMovies } from '@/data/movies';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    
    if (!query) {
      return NextResponse.json({ error: 'Search query is required' }, { status: 400 });
    }

    const results = await searchMovies(query);
    
    return NextResponse.json({
      query,
      results,
      count: results.length
    });
  } catch (error) {
    console.error('Search API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}