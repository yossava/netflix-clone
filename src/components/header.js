export default function Header({ onLoginClick }) {
  return (
    <header className="bg-black p-2">
      <div className="m-4 flex justify-between space-x-12 text-lg text-white">
        <div className="font-bold text-red-600 text-3xl">
          <div>NETFLIX</div>
        </div>
        <div className="flex cursor-pointer space-x-5">
          <div className="transition hover:font-bold hover:text-red-500">
            Home
          </div>
          <div className="transition hover:font-bold hover:text-red-500">
            Movies
          </div>
          <div className="transition hover:font-bold hover:text-red-500">
            TV Show
          </div>
          <div className="transition hover:font-bold hover:text-red-500">
            My List
          </div>
        </div>
        <div>
          <div 
            className="cursor-pointer transition hover:font-bold hover:text-red-500"
            onClick={onLoginClick}
          >
            Login
          </div>
        </div>
      </div>
    </header>
  );
}
