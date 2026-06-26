import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { Users, FileText, MousePointerClick, TrendingUp, Download, Filter } from "lucide-react"

export default function DashboardOverview() {
  const [inquiriesCount, setInquiriesCount] = useState(0)
  const [caseStudiesCount, setCaseStudiesCount] = useState(0)
  const [conversionRate, setConversionRate] = useState(0)
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    const inquiries = JSON.parse(localStorage.getItem("growaz_inquiries") || "[]")
    const cases = JSON.parse(localStorage.getItem("growaz_cases") || "[]")

    setInquiriesCount(inquiries.length)
    setCaseStudiesCount(cases.length)

    // Calculate a realistic conversion rate if inquiries exist
    const rate = inquiries.length > 0 ? ((cases.length / inquiries.length) * 100).toFixed(1) : 0
    setConversionRate(rate)

    // Group inquiries by month for the chart
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const currentMonth = new Date().getMonth()
    
    // Create last 6 months data
    const generatedData = []
    for (let i = 5; i >= 0; i--) {
      let d = new Date()
      d.setMonth(d.getMonth() - i)
      const monthStr = months[d.getMonth()]
      
      // Count inquiries for this month
      const count = inquiries.filter(inq => {
        const inqDate = new Date(inq.date)
        return inqDate.getMonth() === d.getMonth() && inqDate.getFullYear() === d.getFullYear()
      }).length

      generatedData.push({ name: monthStr, inquiries: count })
    }
    
    // If all are 0 (fresh install), let's just show an empty realistic chart layout
    setChartData(generatedData)

  }, [])

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Agency Overview</h1>
          <p className="text-gray-500 mt-1">Your current performance summary and activity</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer shadow-sm">
            This Month
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer shadow-sm">
            <Download size={16} />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer shadow-sm">
            <Filter size={16} />
            Filter
          </button>
        </div>
      </div>

      {/* METRICS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Primary Metric Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-6 text-white flex flex-col justify-between shadow-lg shadow-blue-500/20 min-h-[160px]"
          style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' }}
        >
          <div className="flex justify-between items-start mb-4">
            <p className="font-semibold text-blue-100 text-sm">Total Inquiries</p>
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
              <MousePointerClick size={18} />
            </div>
          </div>
          <div className="mt-auto">
            <h3 className="text-5xl font-bold mb-1">{inquiriesCount}</h3>
            <p className="text-blue-100 text-sm">Lifetime leads generated</p>
          </div>
        </motion.div>

        {/* Standard Metric Cards */}
        {[
          { title: "Active Projects", value: caseStudiesCount > 0 ? "1" : "0", subtitle: "Currently in progress", icon: <Users size={18} className="text-gray-700" />, color: "bg-gray-100" },
          { title: "Case Studies", value: caseStudiesCount, subtitle: "Published to portfolio", icon: <FileText size={18} className="text-blue-600" />, color: "bg-blue-50" },
          { title: "Site Visits", value: "Live", subtitle: "Tracking active", icon: <TrendingUp size={18} className="text-emerald-600" />, color: "bg-emerald-50" }
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl p-6 flex flex-col justify-between border border-gray-100 shadow-sm min-h-[160px]"
          >
            <div className="flex justify-between items-start mb-4">
              <p className="font-semibold text-gray-500 text-sm">{stat.title}</p>
              <div className={`w-10 h-10 ${stat.color} rounded-full flex items-center justify-center`}>
                {stat.icon}
              </div>
            </div>
            <div className="mt-auto">
              <h3 className="text-5xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-400 text-sm">{stat.subtitle}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CHARTS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-gray-900">Inquiries Overview</h3>
            <button className="px-3 py-1.5 bg-gray-50 rounded-lg text-sm font-medium text-gray-600 border border-gray-200">
              Last 6 Months
            </button>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9ca3af', fontSize: 13, fontWeight: 500 }} 
                  dy={15}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9ca3af', fontSize: 13, fontWeight: 500 }} 
                  dx={-10}
                  allowDecimals={false}
                />
                <Tooltip 
                  cursor={{ fill: '#f3f4f6' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', padding: '12px' }}
                />
                <Bar dataKey="inquiries" radius={[6, 6, 0, 0]} maxBarSize={60}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === chartData.length - 1 ? '#3b82f6' : '#e5e7eb'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Secondary Chart / Metric */}
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-xl font-bold text-gray-900">Conversion Rate</h3>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center relative">
            <div className="relative w-56 h-28 overflow-hidden mb-6">
              <div className="absolute w-56 h-56 rounded-full border-[28px] border-gray-100 border-b-transparent border-r-transparent transform -rotate-45"></div>
              <div 
                className="absolute w-56 h-56 rounded-full border-[28px] border-blue-500 border-b-transparent border-r-transparent transform -rotate-45 transition-all duration-1000 ease-out" 
                style={{ clipPath: `polygon(0 0, 100% 0, 100% ${conversionRate}%, 0 ${conversionRate}%)` }}
              ></div>
            </div>
            <div className="text-center absolute bottom-4">
              <h2 className="text-5xl font-bold text-gray-900">{conversionRate}%</h2>
              <p className="text-sm font-medium text-gray-500 mt-2">Lead Conversion</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-100">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Total Leads</p>
              <p className="text-2xl font-bold text-gray-900">{inquiriesCount}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Total Closed</p>
              <p className="text-2xl font-bold text-gray-900">{caseStudiesCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
