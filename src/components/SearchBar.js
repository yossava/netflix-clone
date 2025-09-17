import { Search } from 'lucide-react';

export default function SearchBar() {
  return (
    <div className="relative w-full md:w-auto">
      <div className="flex items-center bg-gray-800 rounded-md px-3 py-2 w-full md:w-[300px]">
        <Search className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
        <input
          type="text"
          placeholder="Search movies, TV shows..."
          className="bg-transparent text-white placeholder-gray-400 outline-none w-full text-sm"
        />
      </div>
    </div>
  );
}