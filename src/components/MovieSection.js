import MovieCard from "@/components/MovieCard";

export default function MovieSection() {
  const title = "Halo";

  const movies = [
    {
      id: "tt26581740",
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
    },
    {
      id: "tt5950044",
      title: "Superman",
      description:
        "Superman must reconcile his alien Kryptonian heritage with his human upbringing as reporter Clark Kent. As the embodiment of truth, justice and the human way he soon finds himself in a world that views these as old-fashioned.",
      image:
        "https://m.media-amazon.com/images/M/MV5BOGMwZGJiM2EtMzEwZC00YTYzLWIxNzYtMmJmZWNlZjgxZTMwXkEyXkFqcGc@._V1_.jpg",
      backdrop:
        "https://m.media-amazon.com/images/M/MV5BOGMwZGJiM2EtMzEwZC00YTYzLWIxNzYtMmJmZWNlZjgxZTMwXkEyXkFqcGc@._V1_.jpg",
      year: 2025,
      rating: "TV-MA",
      duration: "129 min",
      genre: ["Action", "Adventure", "Sci-Fi"],
      vote_average: 7.3,
      type: "movie",
    },
    {
      id: "tt16311594",
      title: "F1: The Movie",
      description:
        "A Formula One driver comes out of retirement to mentor and team up with a younger driver.",
      image:
        "https://m.media-amazon.com/images/M/MV5BZTYwYjJhNzYtY2ZiZS00ZmYxLWJkZjctYjRlNGIxYjI3ZTU0XkEyXkFqcGc@._V1_.jpg",
      backdrop:
        "https://m.media-amazon.com/images/M/MV5BZTYwYjJhNzYtY2ZiZS00ZmYxLWJkZjctYjRlNGIxYjI3ZTU0XkEyXkFqcGc@._V1_.jpg",
      year: 2025,
      rating: "R",
      duration: "155 min",
      genre: ["Action", "Drama", "Sport"],
      vote_average: 7.8,
      type: "movie",
    },
    {
      id: "tt15514498",
      title: "Eenie Meanie",
      description:
        "A reformed teenage getaway driver is dragged back into her unsavory past when a former employer offers her a chance to save the life of her chronically unreliable ex-boyfriend.",
      image:
        "https://m.media-amazon.com/images/M/MV5BMDJiMDM4YzYtOWY3Zi00ODEwLTgxNjAtOTdiMDc2ZDI1MjczXkEyXkFqcGc@._V1_.jpg",
      backdrop:
        "https://m.media-amazon.com/images/M/MV5BMDJiMDM4YzYtOWY3Zi00ODEwLTgxNjAtOTdiMDc2ZDI1MjczXkEyXkFqcGc@._V1_.jpg",
      year: 2025,
      rating: "TV-14",
      duration: "106 min",
      genre: ["Action", "Comedy", "Drama", "Thriller"],
      vote_average: 6,
      type: "movie",
    },
    {
      id: "tt9603208",
      title: "Mission: Impossible - The Final Reckoning",
      description:
        "Hunt and the IMF pursue a dangerous AI called the Entity that's infiltrated global intelligence. With governments and a figure from his past in pursuit, Hunt races to stop it from forever changing the world.",
      image:
        "https://m.media-amazon.com/images/M/MV5BZGQ5NGEyYTItMjNiMi00Y2EwLTkzOWItMjc5YjJiMjMyNTI0XkEyXkFqcGc@._V1_.jpg",
      backdrop:
        "https://m.media-amazon.com/images/M/MV5BZGQ5NGEyYTItMjNiMi00Y2EwLTkzOWItMjc5YjJiMjMyNTI0XkEyXkFqcGc@._V1_.jpg",
      year: 2025,
      rating: "TV-14",
      duration: "169 min",
      genre: ["Action", "Adventure", "Thriller"],
      vote_average: 7.3,
      type: "movie",
    },
    {
      id: "tt14205554",
      title: "KPop Demon Hunters",
      description:
        "A world-renowned K-Pop girl group balance their lives in the spotlight with their secret identities as demon hunters.",
      image:
        "https://m.media-amazon.com/images/M/MV5BNTBiYWJlMjQtOTIyMy00NTY4LWFhOWItOWZhNzc3NGMyMjc2XkEyXkFqcGc@._V1_.jpg",
      backdrop:
        "https://m.media-amazon.com/images/M/MV5BNTBiYWJlMjQtOTIyMy00NTY4LWFhOWItOWZhNzc3NGMyMjc2XkEyXkFqcGc@._V1_.jpg",
      year: 2025,
      rating: "PG",
      duration: "95 min",
      genre: [
        "Animation",
        "Action",
        "Adventure",
        "Comedy",
        "Family",
        "Fantasy",
        "Music",
        "Musical",
      ],
      vote_average: 7.7,
      type: "movie",
    },
    {
      id: "tt31567422",
      title: "Night Always Comes",
      description:
        "Risking everything to secure a future for herself and her brother, Lynette sets out on a dangerous odyssey, confronting her own dark past over the course of one propulsive night.",
      image:
        "https://m.media-amazon.com/images/M/MV5BNjI4NDI1ZDEtN2Q5Zi00ZGU4LWJmNzctNjI1NzdlOWQxMGNkXkEyXkFqcGc@._V1_.jpg",
      backdrop:
        "https://m.media-amazon.com/images/M/MV5BNjI4NDI1ZDEtN2Q5Zi00ZGU4LWJmNzctNjI1NzdlOWQxMGNkXkEyXkFqcGc@._V1_.jpg",
      year: 2025,
      rating: "TV-MA",
      duration: "108 min",
      genre: ["Crime", "Drama", "Thriller"],
      vote_average: 5.9,
      type: "movie",
    },
    {
      id: "tt32543884",
      title: "Fall for Me",
      description:
        "Lilli visits her sister Valeria, surprised to learn she's engaged to a Frenchman, Manu. She spontaneously meets nightclub manager Tom, sparking an instant connection. A dark secret lurks behind the island's events.<",
      image:
        "https://m.media-amazon.com/images/M/MV5BODUyOTc1ZDYtNjc5Ny00MzRkLTg5MDQtYTU3ZjM1MTExY2Y4XkEyXkFqcGc@._V1_.jpg",
      backdrop:
        "https://m.media-amazon.com/images/M/MV5BODUyOTc1ZDYtNjc5Ny00MzRkLTg5MDQtYTU3ZjM1MTExY2Y4XkEyXkFqcGc@._V1_.jpg",
      year: 2025,
      rating: "G",
      duration: "103 min",
      genre: ["Thriller"],
      vote_average: 4.7,
      type: "movie",
    },
    {
      id: "tt30645201",
      title: "Honey Don't!",
      description:
        "A dark comedy about small-town private investigator Honey O'Donahue, who delves into a series of strange deaths tied to a mysterious church.",
      image:
        "https://m.media-amazon.com/images/M/MV5BMmRkNGJmNWUtNjVkMC00NTJhLTk5N2UtYmZlODdmM2UzNTRlXkEyXkFqcGc@._V1_.jpg",
      backdrop:
        "https://m.media-amazon.com/images/M/MV5BMmRkNGJmNWUtNjVkMC00NTJhLTk5N2UtYmZlODdmM2UzNTRlXkEyXkFqcGc@._V1_.jpg",
      year: 2025,
      rating: "R",
      duration: "89 min",
      genre: ["Comedy", "Crime", "Mystery", "Thriller"],
      vote_average: 5.7,
      type: "movie",
    },
    {
      id: "tt31036941",
      title: "Jurassic World: Rebirth",
      description:
        "Five years post-Jurassic World: Dominion (2022), an expedition braves isolated equatorial regions to extract DNA from three massive prehistoric creatures for a groundbreaking medical breakthrough.",
      image:
        "https://m.media-amazon.com/images/M/MV5BMGM3ZmI3NzQtNzU5Yi00ZWI1LTg3YTAtNmNmNWIyMWFjZTBkXkEyXkFqcGc@._V1_.jpg",
      backdrop:
        "https://m.media-amazon.com/images/M/MV5BMGM3ZmI3NzQtNzU5Yi00ZWI1LTg3YTAtNmNmNWIyMWFjZTBkXkEyXkFqcGc@._V1_.jpg",
      year: 2025,
      rating: "TV-14",
      duration: "133 min",
      genre: ["Action", "Adventure", "Sci-Fi", "Thriller"],
      vote_average: 6,
      type: "movie",
    },
    {
      id: "tt3402138",
      title: "The Naked Gun",
      description:
        "Only one man has the particular set of skills - to lead Police Squad and save the world.",
      image:
        "https://m.media-amazon.com/images/M/MV5BNGFlNDhkNzItZjgxNC00OGYzLWFjZDAtZTJmNDY5ZmEyZDc0XkEyXkFqcGc@._V1_.jpg",
      backdrop:
        "https://m.media-amazon.com/images/M/MV5BNGFlNDhkNzItZjgxNC00OGYzLWFjZDAtZTJmNDY5ZmEyZDc0XkEyXkFqcGc@._V1_.jpg",
      year: 2025,
      rating: "TV-MA",
      duration: "85 min",
      genre: ["Action", "Comedy", "Crime"],
      vote_average: 7,
      type: "movie",
    },
    {
      id: "tt33549478",
      title: "The Map That Leads to You",
      description:
        "Heather's European adventure takes a turn when she meets Jack-sparking an unexpected emotional journey neither of them saw coming.",
      image:
        "https://m.media-amazon.com/images/M/MV5BYmViMTI1OTktOGRkZS00YjdmLWFhNGMtMWMwNTRmZWY3MmI4XkEyXkFqcGc@._V1_.jpg",
      backdrop:
        "https://m.media-amazon.com/images/M/MV5BYmViMTI1OTktOGRkZS00YjdmLWFhNGMtMWMwNTRmZWY3MmI4XkEyXkFqcGc@._V1_.jpg",
      year: 2025,
      rating: "G",
      duration: "96 min",
      genre: ["Drama", "Romance"],
      vote_average: 6.2,
      type: "movie",
    },
    {
      id: "tt28996126",
      title: "Nobody 2",
      description:
        "Suburban dad Hutch Mansell, a former lethal assassin, is pulled back into his violent past after thwarting a home invasion, setting off a chain of events that unravels secrets about his wife Becca's past and his own.",
      image:
        "https://m.media-amazon.com/images/M/MV5BOWViZjhjYjQtZDI1MC00MWMyLTlhZTktNmIzY2Y0ZWVkMWFhXkEyXkFqcGc@._V1_.jpg",
      backdrop:
        "https://m.media-amazon.com/images/M/MV5BOWViZjhjYjQtZDI1MC00MWMyLTlhZTktNmIzY2Y0ZWVkMWFhXkEyXkFqcGc@._V1_.jpg",
      year: 2025,
      rating: "R",
      duration: "89 min",
      genre: ["Action", "Comedy", "Crime", "Thriller"],
      vote_average: 6.7,
      type: "movie",
    },
    {
      id: "tt31868189",
      title: "Happy Gilmore 2",
      description:
        "Revisit Happy Gilmore's golf career after his win in the Tour Championship.",
      image:
        "https://m.media-amazon.com/images/M/MV5BYTQyNTRmYjItMDBjYi00YWNhLWEwMmQtNzJhODNiNjEzOWJlXkEyXkFqcGc@._V1_.jpg",
      backdrop:
        "https://m.media-amazon.com/images/M/MV5BYTQyNTRmYjItMDBjYi00YWNhLWEwMmQtNzJhODNiNjEzOWJlXkEyXkFqcGc@._V1_.jpg",
      year: 2025,
      rating: "R",
      duration: "114 min",
      genre: ["Comedy", "Sport"],
      vote_average: 6.1,
      type: "movie",
    },
    {
      id: "tt10676052",
      title: "The Fantastic Four: First Steps",
      description:
        "Forced to balance their roles as heroes with the strength of their family bond, the Fantastic Four must defend Earth from a ravenous space god called Galactus and his enigmatic herald, the Silver Surfer.",
      image:
        "https://m.media-amazon.com/images/M/MV5BOGM5MzA3MDAtYmEwMi00ZDNiLTg4MDgtMTZjOTc0ZGMyNTIwXkEyXkFqcGc@._V1_.jpg",
      backdrop:
        "https://m.media-amazon.com/images/M/MV5BOGM5MzA3MDAtYmEwMi00ZDNiLTg4MDgtMTZjOTc0ZGMyNTIwXkEyXkFqcGc@._V1_.jpg",
      year: 2025,
      rating: "G",
      duration: "114 min",
      genre: ["Action", "Adventure", "Sci-Fi"],
      vote_average: 7.3,
      type: "movie",
    },
    {
      id: "tt31193180",
      title: "Sinners",
      description:
        "Trying to leave their troubled lives behind, twin brothers return to their hometown to start again, only to discover that an even greater evil is waiting to welcome them back.",
      image:
        "https://m.media-amazon.com/images/M/MV5BNjIwZWY4ZDEtMmIxZS00NDA4LTg4ZGMtMzUwZTYyNzgxMzk5XkEyXkFqcGc@._V1_.jpg",
      backdrop:
        "https://m.media-amazon.com/images/M/MV5BNjIwZWY4ZDEtMmIxZS00NDA4LTg4ZGMtMzUwZTYyNzgxMzk5XkEyXkFqcGc@._V1_.jpg",
      year: 2025,
      rating: "G",
      duration: "137 min",
      genre: ["Action", "Drama", "Horror", "Music", "Thriller"],
      vote_average: 7.6,
      type: "movie",
    },
    {
      id: "tt23149780",
      title: "Eden",
      description:
        "Based on a factual account of a group of outsiders who settle on a remote island only to discover their greatest threat isn't the brutal climate or deadly wildlife, but each other.",
      image:
        "https://m.media-amazon.com/images/M/MV5BMmU3YjQ1YzAtMGU4OS00MWJkLTg2NGMtM2NmMmQ3NTM3NjNjXkEyXkFqcGc@._V1_.jpg",
      backdrop:
        "https://m.media-amazon.com/images/M/MV5BMmU3YjQ1YzAtMGU4OS00MWJkLTg2NGMtM2NmMmQ3NTM3NjNjXkEyXkFqcGc@._V1_.jpg",
      year: 2024,
      rating: "R",
      duration: "129 min",
      genre: ["History", "Thriller"],
      vote_average: 6.4,
      type: "movie",
    },
    {
      id: "tt32246771",
      title: "Bring Her Back",
      description:
        "A brother and sister uncover a terrifying ritual at the secluded home of their new foster mother.",
      image:
        "https://m.media-amazon.com/images/M/MV5BZTlhYTk1ZTEtOWY3NC00NWQ5LTlkOTctNjQ3ZDYyZGE5ZWNlXkEyXkFqcGc@._V1_.jpg",
      backdrop:
        "https://m.media-amazon.com/images/M/MV5BZTlhYTk1ZTEtOWY3NC00NWQ5LTlkOTctNjQ3ZDYyZGE5ZWNlXkEyXkFqcGc@._V1_.jpg",
      year: 2025,
      rating: "PG-13",
      duration: "104 min",
      genre: ["Horror", "Mystery"],
      vote_average: 7.2,
      type: "movie",
    },
    {
      id: "tt31176520",
      title: "Eddington",
      description:
        "In May of 2020, a standoff between a small-town sheriff and mayor sparks a powder keg as neighbor is pitted against neighbor in Eddington, New Mexico.",
      image:
        "https://m.media-amazon.com/images/M/MV5BNmM0Yzc1ZjAtZTg4My00NDI3LWEwMzAtY2ZkNzMxMWMwOTFlXkEyXkFqcGc@._V1_.jpg",
      backdrop:
        "https://m.media-amazon.com/images/M/MV5BNmM0Yzc1ZjAtZTg4My00NDI3LWEwMzAtY2ZkNzMxMWMwOTFlXkEyXkFqcGc@._V1_.jpg",
      year: 2025,
      rating: "G",
      duration: "148 min",
      genre: ["Comedy", "Drama", "Western"],
      vote_average: 6.7,
      type: "movie",
    },
    {
      id: "tt31184028",
      title: "Together",
      description:
        "Years into their relationship, Tim and Millie find themselves at a crossroads as they move to the country. With tensions already flaring, an encounter with an unnatural force threatens to corrupt their lives, their love and their flesh.",
      image:
        "https://m.media-amazon.com/images/M/MV5BOWI1Mzg0OWUtNDYxYy00Mzk3LTgxMjMtYWYxZjJhMjI4NDcyXkEyXkFqcGc@._V1_.jpg",
      backdrop:
        "https://m.media-amazon.com/images/M/MV5BOWI1Mzg0OWUtNDYxYy00Mzk3LTgxMjMtYWYxZjJhMjI4NDcyXkEyXkFqcGc@._V1_.jpg",
      year: 2025,
      rating: "R",
      duration: "102 min",
      genre: ["Horror", "Romance"],
      vote_average: 6.9,
      type: "movie",
    },
  ];
  return (
    <div className="relative">
      <div className="flex overflow-x-scroll scrollbar-hide space-x-4 pb-4">
        {movies.slice(0, 10).map((m) => (
          <div key={m.id} className="min-w-[150px] max-w-[150px] md:min-w-[200px] md:max-w-[200px]">
            <MovieCard 
              title={m.title} 
              duration={m.duration} 
              description={m.description} 
              image={m.image} 
              vote_average={m.vote_average} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}
