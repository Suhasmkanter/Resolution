import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react"

const socialLinks = [
    {
        icon: Facebook,
        href: "https://facebook.com/resolution",
        label: "Follow us on Facebook",
        hoverColor: "hover:text-blue-600 dark:hover:text-blue-400",
    },
    {
        icon: Instagram,
        href: "https://instagram.com/resolution",
        label: "Follow us on Instagram",
        hoverColor: "hover:text-pink-600 dark:hover:text-pink-400",
    },
    {
        icon: Twitter,
        href: "https://twitter.com/resolution",
        label: "Follow us on Twitter",
        hoverColor: "hover:text-blue-400 dark:hover:text-blue-300",
    },
    {
        icon: Linkedin,
        href: "https://linkedin.com/company/resolution",
        label: "Connect with us on LinkedIn",
        hoverColor: "hover:text-blue-700 dark:hover:text-blue-500",
    },
    {
        icon: Youtube,
        href: "https://youtube.com/resolution",
        label: "Subscribe to our YouTube channel",
        hoverColor: "hover:text-red-600 dark:hover:text-red-400",
    },
]

export default function LetsConnect() {
    return (
        <section className="text-center bg-gray-50 dark:bg-gray-800 rounded-2xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Let's Connect</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Stay updated with the latest from Resolution. Follow us on social media for platform updates, featured creators,
                and creative inspiration.
            </p>

            <div className="flex justify-center space-x-6">
                {socialLinks.map((social) => {
                    const Icon = social.icon
                    return (
                        <a
                            key={social.href}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.label}
                            className={`w-12 h-12 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 ${social.hoverColor} transition-colors duration-200 shadow-md hover:shadow-lg`}
                        >
                            <Icon className="w-5 h-5" />
                        </a>
                    )
                })}
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Have questions or feedback? We'd love to hear from you.{" "}
                    <a href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                        Get in touch
                    </a>
                </p>
            </div>
        </section>
    )
}
