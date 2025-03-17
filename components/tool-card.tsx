"use client"
import { Code, Database, GitBranch, Terminal, Box, Layers, Server, Code2 } from "lucide-react"

interface ToolCardProps {
  name: string
  description: string
  icon: string
}

export default function ToolCard({ name, description, icon }: ToolCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "git-branch":
        return <GitBranch className="h-8 w-8 text-red-500 dark:text-red-400" />
      case "terminal":
        return <Terminal className="h-8 w-8 text-red-500 dark:text-red-400" />
      case "code":
        return <Code className="h-8 w-8 text-red-500 dark:text-red-400" />
      case "database":
        return <Database className="h-8 w-8 text-red-500 dark:text-red-400" />
      case "box":
        return <Box className="h-8 w-8 text-red-500 dark:text-red-400" />
      case "layers":
        return <Layers className="h-8 w-8 text-red-500 dark:text-red-400" />
      case "server":
        return <Server className="h-8 w-8 text-red-500 dark:text-red-400" />
      case "code-2":
        return <Code2 className="h-8 w-8 text-red-500 dark:text-red-400" />
      default:
        return <Code className="h-8 w-8 text-red-500 dark:text-red-400" />
    }
  }

  return (
    <div className="flex flex-col items-center text-center p-4">
      <div className="w-20 h-20 rounded-full bg-white dark:bg-gray-900 shadow-lg flex items-center justify-center mb-3">
        {getIcon()}
      </div>
      <h3 className="text-base font-bold mb-1">{name}</h3>
      <p className="text-xs text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  )
}

