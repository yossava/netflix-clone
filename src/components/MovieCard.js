export default function MovieCard({ title, image }) {
  return (
    <div className="relative group cursor-pointer overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105">
      <div className="aspect-[2/3] relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4 transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
          
          <h3 className="text-white font-semibold text-lg text-center px-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
}