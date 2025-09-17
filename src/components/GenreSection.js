export default function GenreSection() {
  const genres = [
    { name: "Action", image: "https://images.unsplash.com/photo-1489599904-e83695e04816?q=80&w=300&h=400&fit=crop", count: "250+ Movies" },
    { name: "Comedy", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=300&h=400&fit=crop", count: "180+ Movies" },
    { name: "Horror", image: "https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?q=80&w=300&h=400&fit=crop", count: "120+ Movies" },
    { name: "Romance", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300&h=400&fit=crop", count: "200+ Movies" },
    { name: "Sci-Fi", image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?q=80&w=300&h=400&fit=crop", count: "150+ Movies" },
    { name: "Thriller", image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=300&h=400&fit=crop", count: "170+ Movies" },
    { name: "Documentary", image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=300&h=400&fit=crop", count: "90+ Movies" },
    { name: "Animation", image: "https://images.unsplash.com/photo-1578632749014-ca88458d7d26?q=80&w=300&h=400&fit=crop", count: "110+ Movies" }
  ];

  return (
    <div className="py-16 px-4 md:px-8 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
          Browse by Genre
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
          {genres.map((genre, index) => (
            <div 
              key={index} 
              className="group relative aspect-[3/4] rounded-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <img 
                src={genre.image} 
                alt={genre.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300"></div>
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <h3 className="text-white font-bold text-lg md:text-xl mb-1 transform transition-transform duration-300 group-hover:translate-y-[-4px]">
                  {genre.name}
                </h3>
                <p className="text-gray-300 text-sm opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  {genre.count}
                </p>
              </div>
              
              {/* Hover border effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-500 rounded-lg transition-colors duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}