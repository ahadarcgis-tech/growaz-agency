import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "motion/react"

export default function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    // Hardcoded mock credentials since we don't have Firebase yet
    if (username === "admin" && password === "admin123") {
      onLogin()
    } else {
      setError("Invalid credentials")
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-surface border-2 border-foreground p-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold uppercase tracking-tight mb-2">Growaz Admin</h1>
          <p className="text-sm text-muted-foreground uppercase tracking-widest">Authorized Personnel Only</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-xs font-bold uppercase tracking-widest block mb-2">Username</label>
            <Input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-transparent border border-border rounded-none focus-visible:ring-accent"
              placeholder="admin"
            />
          </div>
          
          <div>
            <label className="text-xs font-bold uppercase tracking-widest block mb-2">Password</label>
            <Input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent border border-border rounded-none focus-visible:ring-accent"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-xs font-bold text-destructive uppercase">{error}</p>}

          <Button type="submit" className="w-full rounded-none bg-foreground text-background uppercase tracking-widest font-bold hover:bg-accent transition-colors">
            Access Dashboard
          </Button>
        </form>
      </motion.div>
    </div>
  )
}
