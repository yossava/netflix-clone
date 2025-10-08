import { Play, Plus } from "lucide-react";
import Link from "next/link";

export default function MovieCard({
  id = "",
  title = "N/A",
  duration = "",
  description = "",
  image = "",
  vote_average = "",
}) {
  return (
    <Link href={`/movies/${id}`}>
      <div className="aspect-[2/3] rounded-md overflow-hidden relative text-white group transition-all duration-300 hover:scale-105 cursor-pointer">
      <div className="opacity-0 bg-black absolute inset-0 z-1 group-hover:opacity-80 transition-all duration-300"></div>
      <span className="absolute z-5 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100 top-2 right-2 bg-red-500 p-2 grow-0 h-10 w-10 text-center rounded">
        {vote_average}
      </span>
      <div className="opacity-0 absolute z-10 left-4 bottom-4 group-hover:opacity-100 transition-all duration-300 translate-y-8 group-hover:translate-y-0">
        <div className="flex mb-4 h-20 justify-between">
          <h2 className="font-bold">{title}</h2>
        </div>
        <p className="">{duration}</p>
        <p className="line-clamp-3">{description}</p>
        <div className="flex space-x-2 mt-2">
          <button className="bg-gray-200 rounded-full text-black p-2">
            <Play className="h-4 w-4" />
          </button>
          <button className="bg-gray-200 rounded-full text-black p-2">
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
      <img src={image} className="z-0 object-cover w-full h-full" alt={title} />
    </div>
    </Link>
  );
}
