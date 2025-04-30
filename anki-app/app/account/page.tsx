"use client"

import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { User, Settings, HelpCircle, Download, Upload, Moon, LogOut } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"

export default function AccountPage() {
  const { theme, setTheme } = useTheme()

  return (
    <MainLayout>
      <div className="p-4 space-y-6">
        <h1 className="text-3xl font-bold">Account</h1>

        <div className="flex items-center gap-4 p-4 border border-border rounded-md">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold">
            U
          </div>
          <div>
            <h2 className="text-xl font-medium">User</h2>
            <p className="text-muted-foreground">user@example.com</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 hover:bg-secondary/50 rounded-md">
            <div className="flex items-center gap-3">
              <User size={20} className="text-primary" />
              <span>Profile Settings</span>
            </div>
            <ChevronRight size={18} className="text-muted-foreground" />
          </div>

          <div className="flex items-center justify-between p-3 hover:bg-secondary/50 rounded-md">
            <div className="flex items-center gap-3">
              <Settings size={20} className="text-primary" />
              <span>App Settings</span>
            </div>
            <ChevronRight size={18} className="text-muted-foreground" />
          </div>

          <div className="flex items-center justify-between p-3 hover:bg-secondary/50 rounded-md">
            <div className="flex items-center gap-3">
              <HelpCircle size={20} className="text-primary" />
              <span>Help & Support</span>
            </div>
            <ChevronRight size={18} className="text-muted-foreground" />
          </div>

          <div className="flex items-center justify-between p-3 hover:bg-secondary/50 rounded-md">
            <div className="flex items-center gap-3">
              <Download size={20} className="text-primary" />
              <span>Export All Data</span>
            </div>
            <ChevronRight size={18} className="text-muted-foreground" />
          </div>

          <div className="flex items-center justify-between p-3 hover:bg-secondary/50 rounded-md">
            <div className="flex items-center gap-3">
              <Upload size={20} className="text-primary" />
              <span>Import Data</span>
            </div>
            <ChevronRight size={18} className="text-muted-foreground" />
          </div>

          <div className="flex items-center justify-between p-3 hover:bg-secondary/50 rounded-md">
            <div className="flex items-center gap-3">
              <Moon size={20} className="text-primary" />
              <span>Dark Mode</span>
            </div>
            <Switch checked={theme === "dark"} onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")} />
          </div>
        </div>

        <Button variant="outline" className="w-full text-destructive border-destructive">
          <LogOut size={16} className="mr-2" />
          Sign Out
        </Button>
      </div>
    </MainLayout>
  )
}

// Helper component for the chevron icon
function ChevronRight(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}
