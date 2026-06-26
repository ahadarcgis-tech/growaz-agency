import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { Upload, Save, Image as ImageIcon, RefreshCcw } from "lucide-react"

// Use Vite's BASE_URL for the default image path
const DEFAULT_HERO = import.meta.env.BASE_URL + "hero_illustration.png"

export default function ManageWebsite() {
  const [heroImage, setHeroImage] = useState(DEFAULT_HERO)
  const [savedMessage, setSavedMessage] = useState("")

  useEffect(() => {
    const saved = localStorage.getItem("growaz_hero_image")
    if (saved) {
      setHeroImage(saved)
    }
  }, [])

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setHeroImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    if (heroImage !== DEFAULT_HERO) {
      localStorage.setItem("growaz_hero_image", heroImage)
    } else {
      localStorage.removeItem("growaz_hero_image")
    }
    setSavedMessage("Website changes saved successfully!")
    setTimeout(() => setSavedMessage(""), 3000)
  }

  const handleRevert = () => {
    setHeroImage(DEFAULT_HERO)
  }

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Website Assets</h1>
          <p className="text-gray-500 mt-1">Manage and update the core images used across the live website.</p>
        </div>
        <button 
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer shadow-md shadow-blue-500/20"
        >
          <Save size={18} />
          Save Changes
        </button>
      </div>

      {savedMessage && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-lg flex items-center shadow-sm"
        >
          <span className="font-medium">{savedMessage}</span>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Hero Section Image Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-100 flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Hero Illustration</h3>
              <p className="text-sm text-gray-500 mt-1">The primary visual at the top of the homepage.</p>
            </div>
            {heroImage !== DEFAULT_HERO && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Custom Uploaded
              </span>
            )}
          </div>
          
          {/* Image Display Area */}
          <div className="bg-gray-50 p-6 flex-1 flex flex-col items-center justify-center">
            <div className="w-full max-w-md aspect-square bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm relative group">
              <img 
                src={heroImage} 
                alt="Hero Preview" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              />
              
              {/* Hover Overlay for Changing Image */}
              <div className="absolute inset-0 bg-gray-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 backdrop-blur-[2px]">
                <label className="cursor-pointer bg-white text-gray-900 px-5 py-2.5 rounded-lg font-medium text-sm flex items-center gap-2 shadow-lg hover:bg-gray-50 transition-colors">
                  <Upload size={18} />
                  Upload New Image
                  <input type="file" className="sr-only" accept="image/*" onChange={handleImageUpload} />
                </label>
              </div>
            </div>
          </div>
          
          {/* Action Footer */}
          <div className="p-6 border-t border-gray-100 flex justify-between items-center bg-gray-50/50">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-gray-900">Recommended Size</span>
              <span className="text-xs text-gray-500">800 × 800px (1:1 ratio)</span>
            </div>
            
            <button 
              onClick={handleRevert}
              disabled={heroImage === DEFAULT_HERO}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                heroImage !== DEFAULT_HERO 
                  ? "text-red-600 bg-red-50 hover:bg-red-100 cursor-pointer" 
                  : "text-gray-400 bg-gray-100 cursor-not-allowed"
              }`}
            >
              <RefreshCcw size={14} />
              Revert to Default
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
