import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <div className="bg-blue-100 min-h-screen font-sans">
      {/* Banner Section */}
      <section className="relative h-[50vh]">
        <img
          src="/placeholder.svg?height=540&width=1920"
          alt="Superman Banner"
          className="w-full h-full object-cover"
        />
        <motion.div 
          className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-extrabold text-white text-center"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            My name is <span className="text-red-500">Superman</span>
          </motion.h1>
        </motion.div>
      </section>

      {/* Story Sections */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          {/* Story 1 */}
          <div className="flex flex-col md:flex-row items-center mb-12">
            <motion.div 
              className="md:w-1/2 mb-6 md:mb-0 md:pr-6"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Superman Origin"
                className="rounded-lg shadow-2xl border-4 border-yellow-400"
              />
            </motion.div>
            <motion.div 
              className="md:w-1/2"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-4 text-blue-700">The Beginning</h2>
              <p className="text-xl text-gray-700 leading-relaxed italic border-l-4 border-red-500 pl-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </motion.div>
          </div>

          {/* Story 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center mb-12">
            <motion.div 
              className="md:w-1/2 mb-6 md:mb-0 md:pl-6"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Superman in Action"
                className="rounded-lg shadow-2xl border-4 border-blue-600"
              />
            </motion.div>
            <motion.div 
              className="md:w-1/2"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-4 text-red-600">Rising Hero</h2>
              <p className="text-xl text-gray-700 leading-relaxed italic border-r-4 border-yellow-400 pr-4">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </motion.div>
          </div>

          {/* Story 3 */}
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 mb-6 md:mb-0 md:pr-6"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Superman's Legacy"
                className="rounded-lg shadow-2xl border-4 border-red-500"
              />
            </motion.div>
            <motion.div 
              className="md:w-1/2"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-4 text-yellow-600">The Legend Continues</h2>
              <p className="text-xl text-gray-700 leading-relaxed italic border-l-4 border-blue-500 pl-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}