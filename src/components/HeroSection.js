export default function HeroSection() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10"></div>
      
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1754079133052-cf62bd71776c?q=80&w=2708&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
        }}
      ></div>
      
      <div className="relative z-20 h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Welcome to Our
              <span className="block text-red-500">Amazing Platform</span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 sm:mb-10 max-w-2xl leading-relaxed">
              Discover unlimited possibilities with our cutting-edge technology. 
              Join millions of users who have already transformed their experience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg text-lg transition-colors duration-200">
                Get Started
              </button>
              <button className="bg-gray-600/80 hover:bg-gray-600 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg text-lg transition-colors duration-200 backdrop-blur-sm">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}