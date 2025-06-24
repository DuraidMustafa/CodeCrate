import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { User, Zap, Heart, Target } from "lucide-react"

const reasons = [
  {
    icon: User,
    title: "Built for Solo Developers",
    description:
      "Designed specifically for developers who work alone and want complete control over their code organization.",
  },
  {
    icon: Target,
    title: "Clean & Purposeful",
    description: "Simple, elegant design that focuses on what matters - organizing your code snippets beautifully.",
  },
  {
    icon: Zap,
    title: "Fast & Efficient",
    description: "No more wasted time digging through scattered files. Find your code snippets with instant recall.",
  },
  {
    icon: Heart,
    title: "Personal Snippet Vault",
    description: "Your own dedicated space for code snippets, organized exactly the way you want it.",
  },
]

export function WhyCodeCrateSection() {
  return (
    <section className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-900/5 to-transparent" />

      <div className="container mx-auto px-6 relative">
        <div className="mx-auto max-w-3xl text-center mb-20">
          <Badge
            variant="secondary"
            className="mb-6 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-white border border-indigo-500/30 px-4 py-2 backdrop-blur-sm"
          >
            <Heart className="mr-2 h-4 w-4" />
            Why CodeCrate
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            Made for Developers
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed">
            CodeCrate understands how solo developers work and what they need from a code snippet manager.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
          {reasons.map((reason, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden bg-gradient-to-br from-white/5 to-white/10 border border-white/10 backdrop-blur-sm hover:from-white/10 hover:to-white/20 transition-all duration-500"
            >
              <CardContent className="p-8 relative">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg">
                      <reason.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                      {reason.title}
                    </h3>

                    <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
