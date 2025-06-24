import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Tag, Folder, Code2, Zap, User } from "lucide-react"

const features = [
  {
    icon: Search,
    title: "Fast Search + Tagging",
    description:
      "Find any code snippet instantly with powerful search and organize with custom tags across all your projects.",
    gradient: "from-purple-500 to-pink-500",
    badge: "Core",
  },
  {
    icon: Folder,
    title: "Clean Folder Structure",
    description: "Organize your snippets in folders that make sense to you. Create your personal vault structure.",
    gradient: "from-cyan-500 to-blue-500",
    badge: "Organize",
  },
  {
    icon: Zap,
    title: "Instant Recall",
    description: "No more digging through files. Access your code snippets with instant recall when you need them.",
    gradient: "from-yellow-500 to-orange-500",
    badge: "Speed",
  },
  {
    icon: User,
    title: "Solo Developer Focused",
    description: "Built specifically for solo developers who want a clean, personal snippet management solution.",
    gradient: "from-green-500 to-teal-500",
    badge: "Personal",
  },
  {
    icon: Code2,
    title: "Cross-Project Organization",
    description: "Save and organize code snippets across all your projects in one centralized, searchable location.",
    gradient: "from-purple-500 to-indigo-500",
    badge: "Universal",
  },
  {
    icon: Tag,
    title: "Replace Scattered Files",
    description: "Stop using Notion, Gists, or text files. Keep everything organized in your dedicated snippet vault.",
    gradient: "from-pink-500 to-rose-500",
    badge: "Solution",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />

      <div className="container mx-auto px-6 relative">
        <div className="mx-auto max-w-3xl text-center mb-20">
          <Badge
            variant="secondary"
            className="mb-6 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-white border border-purple-500/30 px-4 py-2 backdrop-blur-sm"
          >
            <Zap className="mr-2 h-4 w-4" />
            Features
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            Everything You Need
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed">
            Simple, elegant, and purposeful. Built for developers who want their code organized beautifully.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden bg-gradient-to-br from-white/5 to-white/10 border border-white/10 backdrop-blur-sm hover:from-white/10 hover:to-white/20 transition-all duration-500 hover:scale-105 hover:-translate-y-2"
            >
              <CardContent className="p-8 relative">
                <div className="flex items-start justify-between mb-6">
                  <div className={`p-3 rounded-2xl bg-gradient-to-r ${feature.gradient} shadow-lg`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <Badge variant="secondary" className="bg-white/10 text-gray-300 border-white/20 text-xs">
                    {feature.badge}
                  </Badge>
                </div>

                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
                  {feature.title}
                </h3>

                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
