import {Play, UserPlus} from 'lucide-react';


export default function HeroSection() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-red-500">
      <div className="absolute inset-0 bg-center bg-black/80 bg-no-repeat z-10"></div>
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1754079133052-cf62bd71776c?q=80&w=2708&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      ></div>

      <div className="relative h-full z-20 flex items-center">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Welcome to Netflix{" "}
              <span className="text-red-500 block">
                a wonderful streaming platform
              </span>
            </h1>
            <p className="text-base md:text-lg text-gray-200 mt-6 md:mt-8 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-6 md:mt-8">
                <button className="bg-red-500 px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:bg-red-700 transition cursor-pointer text-sm md:text-base">
                    <Play className='h-4 w-4 md:h-5 md:w-5 inline mr-2 md:mr-3' />Watch Now
                </button>
                <button className="bg-gray-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:bg-gray-800 transition cursor-pointer text-sm md:text-base">
                  <UserPlus className='h-4 w-4 md:h-5 md:w-5 inline mr-2 md:mr-3' />Register
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
