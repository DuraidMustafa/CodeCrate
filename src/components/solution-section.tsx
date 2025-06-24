import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Lightbulb, Target, Zap } from "lucide-react"

export function SolutionSection() {
  return (
    <section className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-900/5 to-transparent" />

      <div className="container mx-auto px-6 relative">
        <div className="mx-auto max-w-4xl text-center mb-20">
          <Badge
            variant="secondary"
            className="mb-6 bg-gradient-to-r from-green-500/20 to-teal-500/20 text-white border border-green-500/30 px-4 py-2 backdrop-blur-sm"
          >
            <Lightbulb className="mr-2 h-4 w-4" />
            The Solution
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            CodeCrate Changes Everything
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed mb-12">
            A personal code snippet manager designed specifically for solo developers who want their code organized
            beautifully.
          </p>

          <Card className="bg-gradient-to-br from-green-900/20 to-teal-900/20 border border-green-500/30 backdrop-blur-sm">
            <CardContent className="p-12">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-teal-500">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Clean & Personal</h3>
                  <p className="text-gray-400 text-sm">Your own snippet vault, organized exactly how you want it</p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-teal-500">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Fast & Simple</h3>
                  <p className="text-gray-400 text-sm">Find any snippet instantly with search and tags</p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-teal-500">
                      <Lightbulb className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Solo Developer</h3>
                  <p className="text-gray-400 text-sm">Built for developers who work alone and want control</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
