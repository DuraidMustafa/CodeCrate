"use client"

import { useEffect, useState } from "react"

const stats = [
  { number: 50000, suffix: "+", label: "Developers Trust Us" },
  { number: 2, suffix: "M+", label: "Snippets Saved" },
  { number: 99.9, suffix: "%", label: "Uptime Guaranteed" },
  { number: 0, suffix: "ms", label: "Data Collection" },
]

export function StatsSection() {
  const [counts, setCounts] = useState(stats.map(() => 0))

  useEffect(() => {
    const timers = stats.map((stat, index) => {
      const increment = stat.number / 100
      let current = 0

      return setInterval(() => {
        current += increment
        if (current >= stat.number) {
          current = stat.number
          clearInterval(timers[index])
        }
        setCounts((prev) => {
          const newCounts = [...prev]
          newCounts[index] = current
          return newCounts
        })
      }, 20)
    })

    return () => timers.forEach((timer) => clearInterval(timer))
  }, [])

  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-cyan-900/10" />
      <div className="container mx-auto px-6 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="relative">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  {Math.floor(counts[index])}
                  {stat.suffix}
                </div>
                <div className="text-gray-400 text-sm md:text-base group-hover:text-gray-300 transition-colors">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
