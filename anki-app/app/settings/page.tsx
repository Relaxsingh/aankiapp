"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GradientButton } from "@/components/ui/gradient-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Download, HelpCircle, Lock, Moon, Palette, Shield, Sun, Upload, User } from "lucide-react"
import { useTheme } from "next-themes"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [activeTab, setActiveTab] = useState("account")

  return (
    <DashboardLayout>
      <div className="container py-8 max-w-7xl animate-slide-up">
        <div className="flex flex-col gap-2 mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-64 flex-shrink-0">
            <Card className="shadow-card sticky top-6">
              <CardContent className="p-4">
                <div className="space-y-1">
                  <Button
                    variant={activeTab === "account" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("account")}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Account
                  </Button>
                  <Button
                    variant={activeTab === "appearance" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("appearance")}
                  >
                    <Palette className="mr-2 h-4 w-4" />
                    Appearance
                  </Button>
                  <Button
                    variant={activeTab === "notifications" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("notifications")}
                  >
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                  </Button>
                  <Button
                    variant={activeTab === "security" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("security")}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Security
                  </Button>
                  <Button
                    variant={activeTab === "data" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("data")}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Data & Privacy
                  </Button>
                  <Button
                    variant={activeTab === "help" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("help")}
                  >
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Help & Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex-1">
            {activeTab === "account" && (
              <div className="space-y-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your account details and profile information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      <div className="flex flex-col items-center gap-2">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
                          <AvatarFallback className="text-2xl">JD</AvatarFallback>
                        </Avatar>
                        <Button variant="outline" size="sm">
                          Change Avatar
                        </Button>
                      </div>

                      <div className="grid gap-4 flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="first-name">First Name</Label>
                            <Input id="first-name" defaultValue="John" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="last-name">Last Name</Label>
                            <Input id="last-name" defaultValue="Doe" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" defaultValue="john@example.com" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="username">Username</Label>
                          <Input id="username" defaultValue="johndoe" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <GradientButton>Save Changes</GradientButton>
                  </CardFooter>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Language & Region</CardTitle>
                    <CardDescription>Customize your language and regional preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Select defaultValue="en">
                          <SelectTrigger id="language">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                            <SelectItem value="ja">Japanese</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select defaultValue="utc-8">
                          <SelectTrigger id="timezone">
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                            <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                            <SelectItem value="utc+0">UTC</SelectItem>
                            <SelectItem value="utc+1">Central European Time (UTC+1)</SelectItem>
                            <SelectItem value="utc+8">China Standard Time (UTC+8)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Changes</Button>
                  </CardFooter>
                </Card>

                <Card className="shadow-card border-destructive">
                  <CardHeader>
                    <CardTitle className="text-destructive">Danger Zone</CardTitle>
                    <CardDescription>Irreversible actions that affect your account</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 border border-destructive/20 rounded-md">
                      <div>
                        <h3 className="font-medium">Delete Account</h3>
                        <p className="text-sm text-muted-foreground">
                          Permanently delete your account and all associated data
                        </p>
                      </div>
                      <Button variant="destructive">Delete Account</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "appearance" && (
              <div className="space-y-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Theme</CardTitle>
                    <CardDescription>Customize the appearance of the application</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Sun className="h-5 w-5" />
                          <Label htmlFor="theme-light">Light Mode</Label>
                        </div>
                        <Switch
                          id="theme-light"
                          checked={theme === "light"}
                          onCheckedChange={() => setTheme("light")}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Moon className="h-5 w-5" />
                          <Label htmlFor="theme-dark">Dark Mode</Label>
                        </div>
                        <Switch id="theme-dark" checked={theme === "dark"} onCheckedChange={() => setTheme("dark")} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-5 w-5 flex items-center justify-center">
                            <div className="h-4 w-4 rounded-full bg-background border-2 border-foreground" />
                          </div>
                          <Label htmlFor="theme-system">System Preference</Label>
                        </div>
                        <Switch
                          id="theme-system"
                          checked={theme === "system"}
                          onCheckedChange={() => setTheme("system")}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="font-size">Font Size</Label>
                        <Select defaultValue="medium">
                          <SelectTrigger id="font-size">
                            <SelectValue placeholder="Select font size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="small">Small</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="large">Large</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="card-style">Card Style</Label>
                        <Select defaultValue="rounded">
                          <SelectTrigger id="card-style">
                            <SelectValue placeholder="Select card style" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="rounded">Rounded</SelectItem>
                            <SelectItem value="square">Square</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline">Reset to Default</Button>
                    <Button>Save Changes</Button>
                  </CardFooter>
                </Card>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Choose how and when you want to be notified</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Study Reminders</h3>
                          <p className="text-sm text-muted-foreground">
                            Get reminded when you have cards due for review
                          </p>
                        </div>
                        <Switch defaultChecked id="study-reminders" />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Weekly Progress Report</h3>
                          <p className="text-sm text-muted-foreground">
                            Receive a weekly summary of your study progress
                          </p>
                        </div>
                        <Switch defaultChecked id="weekly-report" />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Achievement Notifications</h3>
                          <p className="text-sm text-muted-foreground">
                            Get notified when you earn badges or reach milestones
                          </p>
                        </div>
                        <Switch defaultChecked id="achievements" />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Product Updates</h3>
                          <p className="text-sm text-muted-foreground">
                            Stay informed about new features and improvements
                          </p>
                        </div>
                        <Switch id="product-updates" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Changes</Button>
                  </CardFooter>
                </Card>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>Update your password to keep your account secure</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>Update Password</Button>
                  </CardFooter>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Two-Factor Authentication</CardTitle>
                    <CardDescription>Add an extra layer of security to your account</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Lock className="h-5 w-5" />
                        <div>
                          <h3 className="font-medium">Two-Factor Authentication</h3>
                          <p className="text-sm text-muted-foreground">
                            Protect your account with an additional security layer
                          </p>
                        </div>
                      </div>
                      <Switch id="two-factor" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button>Set Up 2FA</Button>
                  </CardFooter>
                </Card>
              </div>
            )}

            {activeTab === "data" && (
              <div className="space-y-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Data Management</CardTitle>
                    <CardDescription>Export or import your flashcard data</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 border border-border rounded-md">
                      <div className="flex items-start gap-3">
                        <Download className="h-5 w-5 mt-0.5 text-primary" />
                        <div>
                          <h3 className="font-medium">Export All Data</h3>
                          <p className="text-sm text-muted-foreground">
                            Download all your decks, cards, and study history
                          </p>
                        </div>
                      </div>
                      <Button>Export Data</Button>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 border border-border rounded-md">
                      <div className="flex items-start gap-3">
                        <Upload className="h-5 w-5 mt-0.5 text-primary" />
                        <div>
                          <h3 className="font-medium">Import Data</h3>
                          <p className="text-sm text-muted-foreground">Import decks and cards from a file</p>
                        </div>
                      </div>
                      <Button>Import Data</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Privacy Settings</CardTitle>
                    <CardDescription>Control how your data is used and shared</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Usage Analytics</h3>
                        <p className="text-sm text-muted-foreground">Allow anonymous usage data to improve the app</p>
                      </div>
                      <Switch defaultChecked id="analytics" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Public Profile</h3>
                        <p className="text-sm text-muted-foreground">Make your profile visible to other users</p>
                      </div>
                      <Switch id="public-profile" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Changes</Button>
                  </CardFooter>
                </Card>
              </div>
            )}

            {activeTab === "help" && (
              <div className="space-y-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Help & Support</CardTitle>
                    <CardDescription>Get help with using the application</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 border border-border rounded-md">
                      <div>
                        <h3 className="font-medium">Documentation</h3>
                        <p className="text-sm text-muted-foreground">Read guides and tutorials on how to use the app</p>
                      </div>
                      <Button variant="outline">View Docs</Button>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 border border-border rounded-md">
                      <div>
                        <h3 className="font-medium">Contact Support</h3>
                        <p className="text-sm text-muted-foreground">Get help from our support team</p>
                      </div>
                      <Button variant="outline">Contact</Button>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 border border-border rounded-md">
                      <div>
                        <h3 className="font-medium">Feedback</h3>
                        <p className="text-sm text-muted-foreground">Share your thoughts and suggestions</p>
                      </div>
                      <Button variant="outline">Send Feedback</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>About</CardTitle>
                    <CardDescription>Information about the application</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Version</span>
                      <span className="text-muted-foreground">1.0.0</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Last Updated</span>
                      <span className="text-muted-foreground">April 29, 2025</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Terms of Service</span>
                      <Button variant="link" className="p-0 h-auto">
                        View
                      </Button>
                    </div>

                    <div className="flex justify-between">
                      <span>Privacy Policy</span>
                      <Button variant="link" className="p-0 h-auto">
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
