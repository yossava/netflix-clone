"use client";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Star, Clock, Calendar, ArrowLeft, Play } from "lucide-react";
import { useState } from "react";

export default function MovieDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [showTrailer, setShowTrailer] = useState(false);

  // In a real app, you'd fetch this data based on params.id
  // For now, we'll use mock data
  const movie = {
    id: params.id,
    title: "Weapons",
    description:
      "When all but one child from the same class mysteriously vanish on the same night at exactly the same time, a community is left questioning who or what is behind their disappearance.",
    image:
      "https://m.media-amazon.com/images/M/MV5BNTBhNWJjZWItYzY3NS00M2NkLThmOWYtYTlmNzBmN2UxZWFjXkEyXkFqcGc@._V1_.jpg",
    backdrop:
      "https://m.media-amazon.com/images/M/MV5BNTBhNWJjZWItYzY3NS00M2NkLThmOWYtYTlmNzBmN2UxZWFjXkEyXkFqcGc@._V1_.jpg",
    year: 2025,
    rating: "PG-13",
    duration: "128 min",
    genre: ["Horror", "Mystery"],
    vote_average: 7.8,
    type: "movie",
    director: "Zach Cregger",
    cast: ["Josh Brolin", "Julia Garner", "Benedict Wong", "Alden Ehrenreich"],
    plot: "In a small suburban town, an entire elementary school class vanishes without a trace on the same night, at the exact same time. The only child left behind becomes the key to unraveling a terrifying mystery that challenges everything the community thought they knew about their quiet neighborhood. As investigators dig deeper, they discover that the disappearances are connected to something far more sinister than they could have imagined.",
  };

  return (
    <div className="w-full min-h-screen bg-black">
      <Header />

      {/* Backdrop Image with Gradient Overlay */}
      <div className="relative w-full h-[50vh] md:h-[70vh]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${movie.backdrop})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 flex items-center gap-2 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-md transition-all backdrop-blur-sm"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </button>

        {/* Movie Title and Basic Info (Overlaid on Image) */}
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {movie.title}
          </h1>
          <div className="flex flex-wrap gap-4 items-center text-white">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              <span className="text-xl font-semibold">{movie.vote_average}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>{movie.year}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>{movie.duration}</span>
            </div>
            <div className="bg-gray-700 px-3 py-1 rounded">{movie.rating}</div>
          </div>
        </div>
      </div>

      {/* Movie Details Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Poster */}
          <div className="md:col-span-1">
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full rounded-lg shadow-2xl"
            />
            <button
              onClick={() => setShowTrailer(!showTrailer)}
              className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-all"
            >
              <Play className="h-5 w-5" />
              Watch Trailer
            </button>
          </div>

          {/* Right Column - Details */}
          <div className="md:col-span-2 text-white">
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              {movie.plot}
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.genre.map((g) => (
                    <span
                      key={g}
                      className="bg-gray-800 px-4 py-2 rounded-full text-sm"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Director</h3>
                <p className="text-gray-300">{movie.director}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Cast</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.cast.map((actor, index) => (
                    <span
                      key={index}
                      className="bg-gray-800 px-4 py-2 rounded-md text-sm"
                    >
                      {actor}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Trailer Section */}
            {showTrailer && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Trailer</h3>
                <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                  <p className="text-gray-400">
                    Trailer player would be embedded here
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Similar Movies Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            Similar Movies
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-gray-800 h-64 rounded-lg animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
