"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Settings, BarChart2, LogOut } from "lucide-react"
import Link from "next/link"

const mockUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  role: "Member",
  joined: "2023-09-01",
  eventsAttended: 7,
  projects: 3,
  avatar: "https://ui-avatars.com/api/?name=John+Doe&background=17a54b&color=fff&size=128"
}

export default function Dashboard() {
  const [user, setUser] = useState(mockUser)
  const [editMode, setEditMode] = useState(false)
  const [form, setForm] = useState({ name: user.name, email: user.email })

  // Placeholder activity data
  const activityData = [3, 5, 2, 8, 6, 7, 4]
  const activityLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  const handleEdit = () => setEditMode(true)
  const handleCancel = () => {
    setEditMode(false)
    setForm({ name: user.name, email: user.email })
  }
  const handleSave = () => {
    setUser({ ...user, ...form })
    setEditMode(false)
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-black via-[#0f1a13] to-[#101c14] dark:from-black dark:via-[#0f1a13] dark:to-[#101c14]">
      {/* Sidebar */}
      <aside
        className="hidden md:flex flex-col w-64 bg-gradient-to-br from-green-600 via-green-500 to-green-700 text-white p-6 space-y-8 shadow-2xl rounded-r-3xl z-10 relative overflow-hidden"
        style={{
          backgroundImage: `
            repeating-linear-gradient(to right, rgba(255,255,255,0.05) 0 1px, transparent 1px 40px),
            repeating-linear-gradient(to bottom, rgba(255,255,255,0.05) 0 1px, transparent 1px 40px)
          `,
          backgroundSize: "40px 40px, 40px 40px"
        }}
      >
        <div className="flex items-center space-x-3 mb-8">
          <img src="/favicon.ico" alt="Logo" className="w-10 h-10 rounded-full shadow-lg" />
          <span className="text-2xl font-bold tracking-tight">FOSS Club</span>
        </div>
        <nav className="flex flex-col space-y-4">
          <Link href="#" className="flex items-center gap-2 font-medium hover:text-green-200 transition"><User className="w-5 h-5" /> Account</Link>
          <Link href="#" className="flex items-center gap-2 font-medium hover:text-green-200 transition"><Settings className="w-5 h-5" /> Settings</Link>
          <Link href="#" className="flex items-center gap-2 font-medium hover:text-green-200 transition"><BarChart2 className="w-5 h-5" /> Activity</Link>
        </nav>
        <div className="mt-auto">
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-green text-white font-semibold shadow hover:opacity-90 transition"><LogOut className="w-4 h-4" /> Logout</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gradient-green">Dashboard</h1>

          {/* User Info Card */}
          <motion.div className="bg-black/60 dark:bg-black/60 rounded-3xl shadow-2xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 mb-10 border border-gray-800"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <img src={user.avatar} alt="Avatar" className="w-28 h-28 rounded-full border-4 border-gradient-green shadow-lg" />
            <div className="flex-1 w-full">
              {editMode ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">Name</label>
                    <input type="text" className="w-full rounded-lg border px-3 py-2 bg-gray-900 dark:bg-gray-900 border-gray-700 dark:border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Email</label>
                    <input type="email" className="w-full rounded-lg border px-3 py-2 bg-gray-900 dark:bg-gray-900 border-gray-700 dark:border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button className="px-4 py-2 rounded-full bg-gradient-green text-white font-semibold shadow hover:opacity-90 transition" onClick={handleSave}>Save</button>
                    <button className="px-4 py-2 rounded-full bg-gray-800 text-gray-200 font-semibold shadow hover:opacity-90 transition" onClick={handleCancel}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl md:text-2xl font-bold text-white">{user.name}</span>
                    <span className="px-2 py-1 rounded-full bg-gradient-green text-xs font-semibold text-white ml-2">{user.role}</span>
                  </div>
                  <div className="text-gray-300">{user.email}</div>
                  <div className="text-gray-400 text-sm">Joined: {user.joined}</div>
                  <div className="flex gap-4 mt-2">
                    <div className="flex flex-col items-center">
                      <span className="text-lg font-bold text-gradient-green">{user.eventsAttended}</span>
                      <span className="text-xs text-gray-400">Events</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-lg font-bold text-gradient-green">{user.projects}</span>
                      <span className="text-xs text-gray-400">Projects</span>
                    </div>
                  </div>
                  <button className="mt-4 px-4 py-2 rounded-full bg-gradient-green text-white font-semibold shadow hover:opacity-90 transition" onClick={handleEdit}>Edit</button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Activity Graph (placeholder) */}
          <div className="bg-black/60 dark:bg-black/60 rounded-3xl shadow-2xl p-6 md:p-10 mb-10 border border-gray-800">
            <h2 className="text-xl font-bold mb-4 text-gradient-green">Activity This Week</h2>
            <div className="w-full h-48 flex items-end gap-2">
              {activityData.map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div className="w-full rounded-t-lg bg-gradient-green" style={{ height: `${val * 18}px` }}></div>
                  <span className="text-xs text-gray-400 mt-1">{activityLabels[i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Settings Section (placeholder) */}
          <div className="bg-black/60 dark:bg-black/60 rounded-3xl shadow-2xl p-6 md:p-10 border border-gray-800">
            <h2 className="text-xl font-bold mb-4 text-gradient-green">Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-200">Email Notifications</span>
                <input type="checkbox" className="form-checkbox h-5 w-5 text-green-500 rounded focus:ring-green-400" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-200">Show Activity Publicly</span>
                <input type="checkbox" className="form-checkbox h-5 w-5 text-green-500 rounded focus:ring-green-400" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-200">Dark Mode</span>
                <input type="checkbox" className="form-checkbox h-5 w-5 text-green-500 rounded focus:ring-green-400" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 