export default function AboutHero() {
    return (
        <section className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">About Us</h1>

            <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                    Resolution is a free stock image platform dedicated to making high-quality, royalty-free visuals available to
                    everyone. We believe that creativity should never be limited by budget constraints or licensing complexities.
                </p>

                <p>
                    Our mission is simple: to democratize access to professional-grade imagery while supporting the creative
                    community that makes it all possible. Every image on our platform is carefully curated and completely free to
                    use for personal and commercial projects.
                </p>

                <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Open Creativity</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                No barriers, no restrictions. Create freely with our extensive library.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">No Paywalls</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Every image is completely free. No hidden costs or subscription fees.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Global Accessibility</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Available worldwide, supporting creators and users across all continents.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
