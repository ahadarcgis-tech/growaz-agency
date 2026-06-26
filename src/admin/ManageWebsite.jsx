import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { Upload, Save } from "lucide-react"

export default function ManageWebsite() {
  const [heroImage, setHeroImage] = useState("")
  const [savedMessage, setSavedMessage] = useState("")

  useEffect(() => {
    const saved = localStorage.getItem("growaz_hero_image")
    if (saved) setHeroImage(saved)
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
    localStorage.setItem("growaz_hero_image", heroImage)
    setSavedMessage("Website changes saved successfully!")
    setTimeout(() => setSavedMessage(""), 3000)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Website Images</h1>
          <p className="text-muted-foreground mt-1">Update core assets on your live website</p>
        </div>
        <button 
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer shadow-sm"
        >
          <Save size={16} />
          Save Changes
        </button>
      </div>

      {savedMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-6 flex justify-between items-center">
          <p>{savedMessage}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Hero Section Image */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-1">Hero Illustration</h3>
          <p className="text-sm text-gray-500 mb-6">This appears at the top of the homepage.</p>
          
          <div className="relative rounded-lg overflow-hidden border-2 border-gray-100 bg-gray-50 aspect-video flex items-center justify-center mb-4">
            {heroImage ? (
              <img src={heroImage} alt="Hero Preview" className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-400 text-sm">Default Image Active</span>
            )}
            
            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
              <label className="cursor-pointer bg-white text-gray-900 px-4 py-2 rounded-md font-medium text-sm flex items-center gap-2">
                <Upload size={16} />
                Upload Replacement
                <input type="file" className="sr-only" accept="image/*" onChange={handleImageUpload} />
              </label>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">Dimensions: 800x800px recommended</span>
            {heroImage && (
              <button 
                onClick={() => setHeroImage("")}
                className="text-xs text-red-600 hover:text-red-700 font-medium"
              >
                Revert to Default
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
