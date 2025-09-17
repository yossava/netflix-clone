import FeaturedSection from "@/components/FeaturedSection";
import GenreSection from "@/components/GenreSection";
import Footer from "@/components/Footer";
import Header from "@/components/header";
import HeroSection from "@/components/HeroSection";
import LoginModal from "@/components/LoginModal";
import MovieSection from "@/components/MovieSection";
import InteractiveMovieSection from "@/components/InteractiveMovieSection";
import SearchableMovieGrid from "@/components/SearchableMovieGrid";

export default function Home() {
  // Sample movie data for interactive components
  const sampleMovies = [
    {
      id: "tt26581740",
      title: "Weapons",
      description: "When all but one child from the same class mysteriously vanish on the same night at exactly the same time, a community is left questioning who or what is behind their disappearance.",
      image: "https://m.media-amazon.com/images/M/MV5BNTBhNWJjZWItYzY3NS00M2NkLThmOWYtYTlmNzBmN2UxZWFjXkEyXkFqcGc@._V1_.jpg",
      year: 2025,
      duration: "128 min",
      genre: ["Horror", "Mystery"],
      vote_average: 7.8,
    },
    {
      id: "tt5950044",
      title: "Superman",
      description: "Superman must reconcile his alien Kryptonian heritage with his human upbringing as reporter Clark Kent.",
      image: "https://m.media-amazon.com/images/M/MV5BOGMwZGJiM2EtMzEwZC00YTYzLWIxNzYtMmJmZWNlZjgxZTMwXkEyXkFqcGc@._V1_.jpg",
      year: 2025,
      duration: "129 min",
      genre: ["Action", "Adventure", "Sci-Fi"],
      vote_average: 7.3,
    },
    {
      id: "tt16311594",
      title: "F1: The Movie",
      description: "A Formula One driver comes out of retirement to mentor and team up with a younger driver.",
      image: "https://m.media-amazon.com/images/M/MV5BZTYwYjJhNzYtY2ZiZS00ZmYxLWJkZjctYjRlNGIxYjI3ZTU0XkEyXkFqcGc@._V1_.jpg",
      year: 2025,
      duration: "155 min",
      genre: ["Action", "Drama", "Sport"],
      vote_average: 7.8,
    },
    {
      id: "tt15514498",
      title: "Eenie Meanie",
      description: "A reformed teenage getaway driver is dragged back into her unsavory past when a former employer offers her a chance to save the life of her chronically unreliable ex-boyfriend.",
      image: "https://m.media-amazon.com/images/M/MV5BMDJiMDM4YzYtOWY3Zi00ODEwLTgxNjAtOTdiMDc2ZDI1MjczXkEyXkFqcGc@._V1_.jpg",
      year: 2025,
      duration: "106 min",
      genre: ["Action", "Comedy", "Drama", "Thriller"],
      vote_average: 6,
    },
    {
      id: "tt9603208",
      title: "Mission: Impossible - The Final Reckoning",
      description: "Hunt and the IMF pursue a dangerous AI called the Entity that's infiltrated global intelligence.",
      image: "https://m.media-amazon.com/images/M/MV5BZGQ5NGEyYTItMjNiMi00Y2EwLTkzOWItMjc5YjJiMjMyNTI0XkEyXkFqcGc@._V1_.jpg",
      year: 2025,
      duration: "169 min",
      genre: ["Action", "Adventure", "Thriller"],
      vote_average: 7.3,
    },
    {
      id: "tt14205554",
      title: "KPop Demon Hunters",
      description: "A world-renowned K-Pop girl group balance their lives in the spotlight with their secret identities as demon hunters.",
      image: "https://m.media-amazon.com/images/M/MV5BNTBiYWJlMjQtOTIyMy00NTY4LWFhOWItOWZhNzc3NGMyMjc2XkEyXkFqcGc@._V1_.jpg",
      year: 2025,
      duration: "95 min",
      genre: ["Animation", "Action", "Adventure", "Comedy", "Family", "Fantasy", "Music"],
      vote_average: 7.7,
    },
  ];

  return (
    <div className="w-full">
      <Header />
      <div className="pt-20">
        <HeroSection />
      </div>
      <div className="bg-black min-h-screen">
        <div className="px-4 md:px-8 py-8 md:py-12">
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">Trending Now</h2>
            <MovieSection />
          </section>

          <InteractiveMovieSection 
            title="Interactive Favorites" 
            movies={sampleMovies}
          />

        </div>

        <FeaturedSection />
        <SearchableMovieGrid movies={sampleMovies} />
      </div>
      
      <GenreSection />
      <Footer />
      <LoginModal isOpen={false} />
    </div>
  );
}
