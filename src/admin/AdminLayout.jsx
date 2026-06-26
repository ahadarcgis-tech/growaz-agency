import { Outlet, NavLink, useNavigate } from "react-router-dom"
import { LayoutDashboard, FileText, Image as ImageIcon, LogOut, Bell, Settings, User } from "lucide-react"

export default function AdminLayout({ onLogout }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout()
    navigate("/admin/login")
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-border hidden md:flex flex-col">
        <div className="p-6 border-b border-border flex items-center gap-3">
          <div className="w-8 h-8 bg-accent rounded flex items-center justify-center">
            <span className="text-white font-bold text-lg">G</span>
          </div>
          <span className="font-bold text-xl uppercase tracking-tight">Growaz</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <NavLink 
            to="/admin" 
            end
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                isActive ? "bg-foreground text-white" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`
            }
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>
          
          <NavLink 
            to="/admin/case-studies" 
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                isActive ? "bg-foreground text-white" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`
            }
          >
            <FileText size={18} />
            Case Studies
          </NavLink>

          <NavLink 
            to="/admin/website" 
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                isActive ? "bg-foreground text-white" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`
            }
          >
            <ImageIcon size={18} />
            Website Images
          </NavLink>
        </nav>

        <div className="p-4 border-t border-border">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-md text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* TOPBAR */}
        <header className="h-20 bg-white border-b border-border flex items-center justify-between px-8">
          <h2 className="text-xl font-bold uppercase tracking-tight">Admin Console</h2>
          <div className="flex items-center gap-6">
            <button className="text-muted-foreground hover:text-foreground cursor-pointer">
              <Bell size={20} />
            </button>
            <button className="text-muted-foreground hover:text-foreground cursor-pointer">
              <Settings size={20} />
            </button>
            <div className="flex items-center gap-3 border-l border-border pl-6">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold leading-none">Admin</p>
                <p className="text-xs text-muted-foreground">admin@growaz.agency</p>
              </div>
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                <User size={20} />
              </div>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-auto p-8 bg-[#FAFAFA]">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
