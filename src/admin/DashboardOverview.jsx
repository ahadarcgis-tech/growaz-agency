import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { motion } from "motion/react"
import { Users, FileText, MousePointerClick, TrendingUp, Download, Filter } from "lucide-react"

const performanceData = [
  { name: "May", inquiries: 12 },
  { name: "Jun", inquiries: 19 },
  { name: "Jul", inquiries: 15 },
  { name: "Aug", inquiries: 32 },
  { name: "Sep", inquiries: 25 },
  { name: "Oct", inquiries: 22 },
  { name: "Nov", inquiries: 30 },
  { name: "Dec", inquiries: 38 },
]

export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agency Overview</h1>
          <p className="text-muted-foreground mt-1">Your current performance summary and activity</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-md text-sm font-medium hover:bg-secondary transition-colors cursor-pointer">
            This Month
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-md text-sm font-medium hover:bg-secondary transition-colors cursor-pointer">
            <Download size={16} />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer">
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
          className="bg-blue-500 rounded-2xl p-6 text-white flex flex-col justify-between h-40 shadow-lg shadow-blue-500/20"
          style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' }}
        >
          <div className="flex justify-between items-start">
            <p className="font-medium text-blue-100">Total Inquiries</p>
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
              <MousePointerClick size={20} />
            </div>
          </div>
          <div>
            <h3 className="text-4xl font-bold">148</h3>
            <p className="text-blue-100 text-sm mt-1">Last month: 112</p>
          </div>
        </motion.div>

        {/* Standard Metric Cards */}
        {[
          { title: "Active Projects", value: "12", prev: "9", icon: <Users size={20} className="text-white" />, color: "bg-gray-800" },
          { title: "Case Studies", value: "8", prev: "6", icon: <FileText size={20} className="text-white" />, color: "bg-blue-400" },
          { title: "Site Visits", value: "12.4k", prev: "8.2k", icon: <TrendingUp size={20} className="text-white" />, color: "bg-blue-500" }
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl p-6 flex flex-col justify-between h-40 border border-gray-100 shadow-sm"
          >
            <div className="flex justify-between items-start">
              <p className="font-medium text-gray-500">{stat.title}</p>
              <div className={`w-10 h-10 ${stat.color} rounded-full flex items-center justify-center`}>
                {stat.icon}
              </div>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-gray-400 text-sm mt-1">Last month: {stat.prev}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CHARTS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-gray-900">Performance Overview</h3>
            <button className="px-3 py-1 bg-gray-50 rounded-md text-sm font-medium text-gray-600 border border-gray-100">
              This Year
            </button>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9ca3af', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9ca3af', fontSize: 12 }} 
                />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="inquiries" radius={[4, 4, 0, 0]}>
                  {performanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.name === 'Aug' ? '#3b82f6' : '#f3f4f6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Secondary Chart / Metric */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Conversion Rate</h3>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center relative">
            {/* Simple CSS half-circle gauge to avoid complex Recharts pie setup for just a gauge */}
            <div className="relative w-48 h-24 overflow-hidden mb-4">
              <div className="absolute w-48 h-48 rounded-full border-[24px] border-gray-100 border-b-transparent border-r-transparent transform -rotate-45"></div>
              <div className="absolute w-48 h-48 rounded-full border-[24px] border-blue-500 border-b-transparent border-r-transparent transform -rotate-45" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }}></div>
            </div>
            <div className="text-center absolute bottom-4">
              <h2 className="text-4xl font-bold text-gray-900">12.4%</h2>
              <p className="text-sm text-gray-500 mt-1">Lead Conversion</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-gray-100">
            <div>
              <p className="text-xs text-gray-500 mb-1">Total Leads</p>
              <p className="text-lg font-bold">148</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Total Closed</p>
              <p className="text-lg font-bold">18</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
