import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { Plus, Edit, Trash2, Image as ImageIcon } from "lucide-react"

export default function ManageCaseStudies() {
  const [caseStudies, setCaseStudies] = useState([])
  const [isAdding, setIsAdding] = useState(false)
  const [newCase, setNewCase] = useState({ title: "", client: "", year: "", description: "", image: "", websiteUrl: "" })

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("growaz_cases")
    if (saved) {
      setCaseStudies(JSON.parse(saved))
    } else {
      // Mock initial data
      const initial = [
        { id: 1, title: "FinTech Portal", client: "Vermilion Core", year: "2025", description: "A high-contrast platform.", websiteUrl: "https://example.com" }
      ]
      setCaseStudies(initial)
      localStorage.setItem("growaz_cases", JSON.stringify(initial))
    }
  }, [])

  const handleSave = (e) => {
    e.preventDefault()
    const updated = [...caseStudies, { ...newCase, id: Date.now() }]
    setCaseStudies(updated)
    localStorage.setItem("growaz_cases", JSON.stringify(updated))
    setIsAdding(false)
    setNewCase({ title: "", client: "", year: "", description: "", image: "", websiteUrl: "" })
  }

  const handleDelete = (id) => {
    const updated = caseStudies.filter(c => c.id !== id)
    setCaseStudies(updated)
    localStorage.setItem("growaz_cases", JSON.stringify(updated))
  }

  // Handle fake image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewCase({ ...newCase, image: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  if (isAdding) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-8">
        <h2 className="text-2xl font-bold mb-6">Add New Case Study</h2>
        <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
              <input 
                required
                type="text" 
                value={newCase.title}
                onChange={e => setNewCase({...newCase, title: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
              <input 
                required
                type="text" 
                value={newCase.client}
                onChange={e => setNewCase({...newCase, client: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
            <input 
              required
              type="text" 
              value={newCase.year}
              onChange={e => setNewCase({...newCase, year: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Live Website URL</label>
            <input 
              type="url" 
              placeholder="https://"
              value={newCase.websiteUrl || ""}
              onChange={e => setNewCase({...newCase, websiteUrl: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Project Description</label>
            <textarea 
              required
              rows={4}
              value={newCase.description}
              onChange={e => setNewCase({...newCase, description: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              {newCase.image ? (
                <div className="relative inline-block">
                  <img src={newCase.image} alt="Preview" className="h-32 object-cover rounded-md" />
                  <button type="button" onClick={() => setNewCase({...newCase, image: ""})} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"><Trash2 size={14}/></button>
                </div>
              ) : (
                <>
                  <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <div className="flex text-sm text-gray-600 justify-center">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                      <span>Upload a file</span>
                      <input type="file" className="sr-only" accept="image/*" onChange={handleImageUpload} />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF up to 10MB</p>
                </>
              )}
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-gray-100">
            <button type="button" onClick={() => setIsAdding(false)} className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium">
              Save Case Study
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Case Studies</h1>
          <p className="text-muted-foreground mt-1">Manage your portfolio projects</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer"
        >
          <Plus size={16} />
          Add Case Study
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
              <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
              <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
              <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {caseStudies.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-gray-500">No case studies found. Create one!</td>
              </tr>
            ) : (
              caseStudies.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{item.title}</td>
                  <td className="px-6 py-4 text-gray-500">{item.client}</td>
                  <td className="px-6 py-4 text-gray-500">{item.year}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 hover:text-blue-900 mr-4"><Edit size={16}/></button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900"><Trash2 size={16}/></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
