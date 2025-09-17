import { Play, Info } from 'lucide-react';

export default function FeaturedSection() {
  const featuredMovies = [
    {
      id: 1,
      title: "Stranger Things",
      description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
      image: "https://images.unsplash.com/photo-1489599904-e83695e04816?q=80&w=2070",
      genre: ["Sci-Fi", "Horror", "Drama"],
      year: 2024,
      rating: "TV-14"
    },
    {
      id: 2,
      title: "The Witcher",
      description: "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070",
      genre: ["Fantasy", "Adventure", "Drama"],
      year: 2024,
      rating: "TV-MA"
    },
    {
      id: 3,
      title: "Money Heist",
      description: "An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.",
      image: "https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?q=80&w=2125",
      genre: ["Crime", "Thriller", "Drama"],
      year: 2024,
      rating: "TV-MA"
    }
  ];

  return (
    <div className="mb-16">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 px-4 md:px-8">Featured Series</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-8">
        {featuredMovies.map((movie) => (
          <div key={movie.id} className="group relative bg-gray-900 rounded-lg overflow-hidden hover:scale-105 transition-all duration-300">
            <div className="aspect-video relative">
              <img 
                src={movie.image} 
                alt={movie.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
              
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition">
                  <Play className="w-8 h-8 text-white" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-white">{movie.title}</h3>
                <span className="text-xs bg-red-600 px-2 py-1 rounded text-white">{movie.rating}</span>
              </div>
              
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-gray-400 text-sm">{movie.year}</span>
                <span className="text-gray-600">•</span>
                <div className="flex space-x-1">
                  {movie.genre.slice(0, 2).map((g, i) => (
                    <span key={i} className="text-gray-400 text-sm">{g}{i < 1 ? ',' : ''}</span>
                  ))}
                </div>
              </div>
              
              <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                {movie.description}
              </p>
              
              <div className="flex space-x-3">
                <button className="flex-1 bg-white text-black py-2 px-4 rounded font-semibold hover:bg-gray-200 transition flex items-center justify-center">
                  <Play className="w-4 h-4 mr-2" />
                  Play
                </button>
                <button className="bg-gray-700 text-white py-2 px-4 rounded font-semibold hover:bg-gray-600 transition flex items-center justify-center">
                  <Info className="w-4 h-4 mr-2" />
                  Info
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}