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
        return <GitBranch className="h-8 w-8 text-white" />
      case "terminal":
        return <Terminal className="h-8 w-8 text-white" />
      case "code":
        return <Code className="h-8 w-8 text-white" />
      case "database":
        return <Database className="h-8 w-8 text-white" />
      case "box":
        return <Box className="h-8 w-8 text-white" />
      case "layers":
        return <Layers className="h-8 w-8 text-white" />
      case "server":
        return <Server className="h-8 w-8 text-white" />
      case "code-2":
        return <Code2 className="h-8 w-8 text-white" />
      default:
        return <Code className="h-8 w-8 text-white" />
    }
  }

  return (
    <div className="flex flex-col items-center text-center p-4">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-green-400 shadow-lg flex items-center justify-center mb-3 border-2 border-white/20 dark:border-black/20">
        {getIcon()}
      </div>
      <h3 className="text-base font-bold mb-1 text-gradient-green">{name}</h3>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  )
}

