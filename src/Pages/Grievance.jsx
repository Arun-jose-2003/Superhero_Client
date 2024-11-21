import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap } from 'lucide-react';
import { grievanceAPI } from '../Services/allAPI';


const LoadingScreen = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black z-50 flex items-center justify-center"
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: [0, 1.2, 1] }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <Zap className="w-24 h-24 text-[#a78bfa]" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 1, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 0.3,
          repeat: 2
        }}
        className="absolute inset-0 bg-white rounded-full blur-xl"
      />
    </motion.div>
  </motion.div>
);

export default function GrievanceSubmissionForm() {
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    category: '',
    description: '',
    urgency: 'medium'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { name, email, phone, location, category, description, urgency } = formData;
    if (!name || !email ||!phone|| !location || !category || !description || !urgency) {
      alert("Please fill the missing fields");
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await grievanceAPI(formData);
      if (result.status === 200) {
       alert("Grievance submitted successfully!", { autoClose: 3000 });
      } else {
        console.log(result.response.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      <div className="min-h-screen bg-[#1a1f2e] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="w-full max-w-xl relative"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.1, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute inset-0 bg-white blur-3xl"
          />
          
          <div className="flex flex-col items-center mb-8 relative">
            <Shield className="w-12 h-12 text-[#a78bfa] mb-4" />
            <h1 className="text-4xl font-semibold text-[#a78bfa] mb-2">
              Superhero Grievance Portal
            </h1>
            <p className="text-red-400 text-md font-bold">
              Submit your concerns and let our hero handle them
            </p>
          </div>

          <div className="bg-[#1e2536] rounded-lg p-8 shadow-xl relative overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.05, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="absolute inset-0 bg-white"
            />
            
            <form onSubmit={handleSubmit} className="space-y-6 relative">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-[#161b2b] border border-gray-700 rounded-md px-4 py-2 text-gray-200 focus:outline-none focus:border-[#a78bfa] transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-[#161b2b] border border-gray-700 rounded-md px-4 py-2 text-gray-200 focus:outline-none focus:border-[#a78bfa] transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    Phone (optional)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-[#161b2b] border border-gray-700 rounded-md px-4 py-2 text-gray-200 focus:outline-none focus:border-[#a78bfa] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full bg-[#161b2b] border border-gray-700 rounded-md px-4 py-2 text-gray-200 focus:outline-none focus:border-[#a78bfa] transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full bg-[#161b2b] border border-gray-700 rounded-md px-4 py-2 text-gray-200 focus:outline-none focus:border-[#a78bfa] transition-colors appearance-none"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Noise Complaint">Noise Complaint</option>
                  <option value="Property Damage">Property Damage</option>
                  <option value="Public Safety">Public Safety</option>
                  <option value="Utility Issue">Utility Issue</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-[#161b2b] border border-gray-700 rounded-md px-4 py-2 text-gray-200 focus:outline-none focus:border-[#a78bfa] transition-colors h-32 resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Urgency *
                </label>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, urgency: 'Low'})}
                    className={`px-4 py-2 rounded-md text-sm transition-colors ${
                      formData.urgency === 'low'
                        ? 'bg-[#a78bfa] text-white'
                        : 'bg-[#161b2b] text-gray-400 hover:bg-[#202637]'
                    }`}
                  >
                    Low
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, urgency: 'Medium'})}
                    className={`px-4 py-2 rounded-md text-sm transition-colors ${
                      formData.urgency === 'medium'
                        ? 'bg-[#a78bfa] text-white'
                        : 'bg-[#161b2b] text-gray-400 hover:bg-[#202637]'
                    }`}
                  >
                    Medium
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, urgency: 'High'})}
                    className={`px-4 py-2 rounded-md text-sm transition-colors ${
                      formData.urgency === 'high'
                        ? 'bg-[#a78bfa] text-white'
                        : 'bg-[#161b2b] text-gray-400 hover:bg-[#202637]'
                    }`}
                  >
                    High
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#a78bfa] text-white py-3 rounded-md hover:bg-[#9061f9] transition-colors focus:outline-none focus:ring-2 focus:ring-[#a78bfa] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span>Submit Grievance</span>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  );
}