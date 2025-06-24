import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Search, FolderOpen, AlertCircle } from "lucide-react"

const problems = [
  {
    icon: Search,
    title: "Digging Through Notion",
    description:
      "Spending precious time searching through endless Notion pages to find that one snippet you saved months ago.",
  },
  {
    icon: FileText,
    title: "Scattered Text Files",
    description:
      "Code snippets spread across random text files on your desktop, impossible to organize or find quickly.",
  },
  {
    icon: FolderOpen,
    title: "Lost in Gists",
    description:
      "GitHub Gists that pile up over time, becoming an unorganized mess without proper tagging or structure.",
  },
]

export function ProblemSection() {
  return (
    <section className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-900/5 to-transparent" />

      <div className="container mx-auto px-6 relative">
        <div className="mx-auto max-w-3xl text-center mb-20">
          <Badge
            variant="secondary"
            className="mb-6 bg-gradient-to-r from-red-500/20 to-orange-500/20 text-white border border-red-500/30 px-4 py-2 backdrop-blur-sm"
          >
            <AlertCircle className="mr-2 h-4 w-4" />
            The Problem
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            Stop Losing Your Code
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed">
            Every developer knows the frustration of losing precious code snippets in the chaos of scattered files and
            tools.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {problems.map((problem, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden bg-gradient-to-br from-red-900/10 to-orange-900/10 border border-red-500/20 backdrop-blur-sm hover:from-red-900/20 hover:to-orange-900/20 transition-all duration-500"
            >
              <CardContent className="p-8 relative">
                <div className="flex items-center justify-center mb-6">
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30">
                    <problem.icon className="h-8 w-8 text-red-400" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-4 text-center">{problem.title}</h3>

                <p className="text-gray-400 leading-relaxed text-center">{problem.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
