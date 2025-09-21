"use client"

import { useEffect, useState } from "react"

const stats = [
    {
        number: 1250000,
        suffix: "+",
        label: "Free Stock Images",
        description: "High-quality photos, vectors, and illustrations",
    },
    {
        number: 250000,
        suffix: "+",
        label: "Registered Contributors",
        description: "Talented creators from around the world",
    },
    {
        number: 500,
        suffix: "M+",
        label: "Downloads Worldwide",
        description: "Images downloaded and used in projects globally",
    },
]

function AnimatedCounter({ target, suffix }) {
    const [count, setCount] = useState(0)

    useEffect(() => {
        const duration = 2000 // 2 seconds
        const steps = 60
        const increment = target / steps
        let current = 0

        const timer = setInterval(() => {
            current += increment
            if (current >= target) {
                setCount(target)
                clearInterval(timer)
            } else {
                setCount(Math.floor(current))
            }
        }, duration / steps)

        return () => clearInterval(timer)
    }, [target])

    const formatNumber = (num) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + "M"
        } else if (num >= 1000) {
            return (num / 1000).toFixed(0) + "K"
        }
        return num.toLocaleString()
    }

    return (
        <span className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400">
            {suffix === "M+" ? count + "M+" : formatNumber(count) + suffix}
        </span>
    )
}

export default function ByTheNumbers() {
    return (
        <section className="text-center">
            <div className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">By the Numbers</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Our platform continues to grow thanks to our amazing community of creators and users worldwide.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
                {stats.map((stat, index) => (
                    <div key={index} className="space-y-4">
                        <div className="space-y-2">
                            <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{stat.label}</h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">{stat.description}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}
