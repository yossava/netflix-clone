import { Play, Plus } from 'lucide-react';

export default function MovieCard({
  title = "N/A",
  duration = "",
  description = "",
  image = "",
  vote_average = "",
}) {
  return (
    <div className="aspect-[2/3] rounded-md overflow-hidden relative text-white group transition-all duration-300 hover:scale-105 cursor-pointer">
      <div className="opacity-0 bg-gradient-to-t from-black via-black/50 to-transparent absolute inset-0 z-10 group-hover:opacity-100 transition-all duration-300"></div>
      
      <div className="opacity-0 absolute z-20 bottom-0 left-0 right-0 p-4 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
        <div className="flex justify-between items-start mb-2">
          <h2 className="font-bold text-sm leading-tight">{title}</h2>
          <span className="bg-red-500 px-2 py-1 text-xs rounded font-semibold ml-2 flex-shrink-0">
            {vote_average}
          </span>
        </div>
        <p className="text-gray-300 text-xs mb-2">{duration}</p>
        <p className="text-gray-400 text-xs leading-tight">{description.substring(0, 80)}...</p>
        
        <div className="flex space-x-2 mt-3">
          <button className="bg-white text-black p-2 rounded-full hover:bg-gray-200 transition">
            <Play className="w-4 h-4" />
          </button>
          <button className="bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600 transition">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <img 
        src={image} 
        alt={title}
        className="z-0 object-cover w-full h-full group-hover:scale-110 transition-transform duration-300" 
      />
    </div>
  );
}
