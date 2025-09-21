import { Users, Award, Heart, Briefcase, Shield } from "lucide-react"

const benefits = [
    {
        icon: Users,
        title: "Share work with millions worldwide",
        description: "Reach a global audience and showcase your creativity to users across the planet.",
    },
    {
        icon: Award,
        title: "Build your portfolio and gain recognition",
        description: "Establish your reputation as a creator and build a following for your work.",
    },
    {
        icon: Heart,
        title: "Support open creativity",
        description: "Be part of a movement that believes creativity should be accessible to everyone.",
    },
    {
        icon: Briefcase,
        title: "Exposure to clients, brands, and agencies",
        description: "Connect with potential clients who discover your work through our platform.",
    },
    {
        icon: Shield,
        title: "Fair use and respect for creators",
        description: "We ensure proper attribution and respect for your creative rights and contributions.",
    },
]

export default function CommunitySection() {
    return (
        <section>
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Why Join the Resolution Creator Community?
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    Join thousands of talented creators who are sharing their work and building their careers through our
                    platform. Here's what makes our community special:
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {benefits.map((benefit, index) => {
                    const Icon = benefit.icon
                    return (
                        <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                                        <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{benefit.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{benefit.description}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
