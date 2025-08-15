# Movie API Setup Guide

This Netflix clone supports real movie data from external APIs. Here's how to set up different movie APIs:

## Option 1: The Movie Database (TMDB) API (Recommended)

TMDB is free and has excellent documentation with no authentication required for basic requests.

### Setup Steps:

1. **Get API Key**
   - Visit [https://www.themoviedb.org/](https://www.themoviedb.org/)
   - Create a free account
   - Go to Settings > API
   - Request an API key (free)

2. **Add Environment Variables**
   Create a `.env.local` file in your project root:
   ```env
   TMDB_API_KEY=your_api_key_here
   TMDB_BASE_URL=https://api.themoviedb.org/3
   ```

3. **Update the API Service**
   In `src/lib/movieApi.js`, replace the demo key:
   ```javascript
   const TMDB_API_KEY = process.env.TMDB_API_KEY;
   ```

4. **Uncomment API Calls**
   In the `fetchFromTMDB` method, uncomment these lines:
   ```javascript
   const response = await fetch(`${this.baseUrl}${endpoint}?api_key=${this.apiKey}`);
   if (!response.ok) throw new Error('API request failed');
   return await response.json();
   ```

## Option 2: OMDb API

Alternative movie database with simpler structure.

### Setup Steps:

1. **Get API Key**
   - Visit [http://www.omdbapi.com/apikey.aspx](http://www.omdbapi.com/apikey.aspx)
   - Get a free API key (1000 requests/day)

2. **Environment Variables**
   ```env
   OMDB_API_KEY=your_api_key_here
   OMDB_BASE_URL=http://www.omdbapi.com/
   ```

3. **Update API Service**
   You'll need to modify the `movieApi.js` to work with OMDb's different response format.

## Option 3: IMDb API (imdbapi.dev) - CURRENT SETUP

**This is the currently implemented API in the project.**

### Setup Steps:

1. **Check Documentation**
   - Visit [https://imdbapi.dev/](https://imdbapi.dev/)
   - Review available endpoints and pricing

2. **Get API Access**
   - Sign up for an account
   - Get your API key from the dashboard

3. **Update Environment Variables**
   ```env
   IMDB_API_KEY=your_api_key_here
   IMDB_BASE_URL=https://api.imdbapi.dev
   ```

4. **Enable Real API Calls**
   In `src/lib/movieApi.js`, uncomment the fetch code in the `fetchFromIMDB` method:
   ```javascript
   const response = await fetch(url, {
     headers: {
       'X-API-KEY': this.apiKey
     }
   });
   if (!response.ok) throw new Error(`API request failed: ${response.status}`);
   const data = await response.json();
   return data;
   ```

### IMDB API Endpoints Used:

- `/titles` - Get movies/TV shows with filtering
  - Parameters: `type`, `sort`, `limit`, `genre`, `minRating`
- `/titles/{id}` - Get specific title details
- `/search` - Search titles
  - Parameters: `q` (query), `type`, `limit`

### Data Format:

The IMDB API returns data in this format:
```json
{
  "id": "tt13443470",
  "type": "movie",
  "primaryTitle": "The Batman",
  "primaryImage": {
    "url": "https://image.tmdb.org/t/p/original/74xTEgt..."
  },
  "startYear": 2022,
  "genres": ["Action", "Crime", "Drama"],
  "rating": {
    "aggregateRating": 7.8
  },
  "plot": "When a sadistic serial killer begins murdering...",
  "runtimeMinutes": 176
}
```

## Current Setup (Fallback Data)

The app currently uses fallback data that works without any API keys. This provides:

- ✅ 50+ realistic movie titles
- ✅ Generated posters using Unsplash
- ✅ Realistic metadata (years, ratings, genres)
- ✅ Functional search and filtering
- ✅ All app features working immediately

## Switching to Real API Data

To enable real API data:

1. Choose an API provider (TMDB recommended)
2. Get your API key
3. Add environment variables
4. Update the API service file
5. Test the endpoints

## API Features Supported

Current implementation supports:

### IMDB API Endpoints (Currently Implemented):
- `/titles?type=movie&sort=year,desc` - Trending movies
- `/titles?type=movie&sort=rating,desc` - Popular movies
- `/titles?type=movie&sort=rating,desc&minRating=8.0` - Top rated movies
- `/titles?type=movie&genre={genre}` - Movies by genre
- `/search?q={query}&type=movie` - Search movies
- `/titles/{id}` - Movie details

### Legacy TMDB Endpoints (for reference):
- `/trending/movie/week` - Trending movies
- `/movie/popular` - Popular movies
- `/movie/top_rated` - Top rated movies
- `/discover/movie?with_genres={id}` - Movies by genre
- `/search/movie?query={query}` - Search movies
- `/movie/{id}` - Movie details

### Error Handling:
- ✅ Graceful fallback to generated data
- ✅ Loading states during API calls
- ✅ Error logging for debugging
- ✅ Rate limiting protection
- ✅ Network timeout handling

## Production Considerations

### Security:
- Never commit API keys to Git
- Use environment variables
- Implement rate limiting
- Add request caching

### Performance:
- Cache API responses (Redis/Memory)
- Implement request debouncing
- Use CDN for images
- Add pagination for large datasets

### Example .env.local:
```env
# IMDB API Configuration (Currently Active)
IMDB_API_KEY=your_imdb_api_key_here
IMDB_BASE_URL=https://api.imdbapi.dev

# Optional: Legacy API keys
TMDB_API_KEY=your_tmdb_api_key_here
TMDB_BASE_URL=https://api.themoviedb.org/3
OMDB_API_KEY=your_omdb_key_here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Testing API Integration

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Check Browser Console**
   - Look for API request logs
   - Verify data is loading correctly
   - Check for any error messages

3. **Test Features**
   - Browse movies by category
   - Search functionality
   - Movie detail pages
   - Loading states

## Troubleshooting

### Common Issues:

1. **API Key Not Working**
   - Verify key is correct
   - Check environment variable names
   - Restart development server

2. **CORS Errors**
   - TMDB allows browser requests
   - Some APIs require server-side calls only

3. **Rate Limiting**
   - Implement caching
   - Add request delays
   - Use multiple API keys for scaling

4. **Missing Images**
   - Check image URL construction
   - Verify TMDB image base URLs
   - Implement fallback images

The app is designed to work perfectly with or without real API data, ensuring a great development experience regardless of your API setup!