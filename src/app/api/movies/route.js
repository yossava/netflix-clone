import { NextResponse } from 'next/server';
import { getMovieCategories, getFeaturedMovie, getAllMovies, getMovieById } from '@/data/movies';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const id = searchParams.get('id');

    // Get specific movie by ID
    if (id) {
      const movie = await getMovieById(parseInt(id));
      
      if (!movie) {
        return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
      }
      
      return NextResponse.json(movie);
    }

    // Get movies by category
    if (category) {
      const categories = await getMovieCategories();
      const categoryData = categories.find(cat => 
        cat.title.toLowerCase().replace(/\s+/g, '-') === category.toLowerCase()
      );
      
      if (!categoryData) {
        return NextResponse.json({ error: 'Category not found' }, { status: 404 });
      }
      
      return NextResponse.json(categoryData);
    }

    // Return all categories with featured movie
    const [featured, categories] = await Promise.all([
      getFeaturedMovie(),
      getMovieCategories()
    ]);

    return NextResponse.json({
      featured,
      categories
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}