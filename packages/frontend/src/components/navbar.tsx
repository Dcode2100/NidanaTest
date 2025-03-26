"use client"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { LogOut, Music } from "lucide-react"
import Link from "next/link"

export function Navbar() {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border/40 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Music className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold">Simplify</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Button
                variant="ghost"
                className="rounded-full w-10 h-10 bg-secondary hover:bg-secondary/80 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className="font-medium text-base text-white">
                  {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase()}
                </span>
              </Button>

              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-card rounded-lg shadow-lg py-1 border animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-border/40">
                    <p className="font-medium truncate">{user?.name || "User"}</p>
                    <p className="text-sm text-muted-foreground truncate">{user?.email}</p>
                  </div>
                  <button
                    onClick={logout}
                    className="flex w-full items-center px-4 py-2 text-sm hover:text-red-500 transition-colors cursor-pointer"
                  >
                    <LogOut size={16} className="mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}