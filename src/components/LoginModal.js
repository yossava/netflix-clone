export default function LoginModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-md mx-4">
        <div className="bg-black/90 backdrop-blur-md rounded-lg p-8 shadow-2xl border border-gray-800">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Sign In</h2>
            <p className="text-gray-400">Welcome back to Netflix</p>
          </div>

          <form className="space-y-6">
            <div>
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-300">
                <input
                  type="checkbox"
                  className="mr-2 w-4 h-4 bg-gray-800 border-gray-600 rounded focus:ring-red-500 text-red-500"
                />
                Remember me
              </label>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-md transition-colors duration-200"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-400">
              New to Netflix?{" "}
              <a href="#" className="text-white hover:underline">
                Sign up now
              </a>
            </p>
          </div>

          <div className="mt-6 text-xs text-gray-500 text-center">
            <p>
              This page is protected by Google reCAPTCHA to ensure you're not a bot.{" "}
              <a href="#" className="text-blue-400 hover:underline">
                Learn more
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}