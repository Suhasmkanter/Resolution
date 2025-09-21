import { MapPin, Phone, Mail, FileText, Scale, Building } from "lucide-react"

export default function CompanyDetails() {
    return (
        <section>
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Company Details</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                    Legal information and contact details for Resolution.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                {/* Company Information */}
                <div className="ml-44">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                            <Building className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                            Company Information
                        </h3>
                        <div className="space-y-3 text-gray-600 dark:text-gray-300">
                            <p className="font-medium">Resolution, a Creative Media Solutions brand</p>
                            <div className="flex items-start space-x-2">
                                <MapPin className="w-4 h-4 mt-1 text-gray-400" />
                                <div>
                                    <p>1234 Innovation Drive</p>
                                    <p>San Francisco, CA 94105</p>
                                    <p>United States</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Contact</h3>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <Phone className="w-4 h-4 text-gray-400" />
                                <a href="tel:+1-555-123-4567" className="text-blue-600 dark:text-blue-400 hover:underline">
                                    +1 (555) 123-4567
                                </a>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="w-4 h-4 text-gray-400" />
                                <a href="mailto:info@resolution.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                                    info@resolution.com
                                </a>
                            </div>
                            <div className="flex items-center space-x-3">
                                <FileText className="w-4 h-4 text-gray-400" />
                                <a href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">
                                    Contact Form
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Legal Information */}
                <div className="ml-44">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                            <Scale className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                            Legal Information
                        </h3>
                        <div className="space-y-3 text-gray-600 dark:text-gray-300">
                            <div>
                                <p className="font-medium">Register Entry</p>
                                <p>Registergericht: San Francisco County Superior Court</p>
                                <p>Registernummer: CMS-2024-001234</p>
                            </div>
                            <div>
                                <p className="font-medium">VAT Number (§27a UStG)</p>
                                <p>US-VAT-123456789</p>
                            </div>
                            <div>
                                <p className="font-medium">Managing Director</p>
                                <p>Sarah Johnson</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Dispute Resolution</h3>
                        <div className="space-y-3 text-gray-600 dark:text-gray-300">
                            <p className="text-sm leading-relaxed">
                                Resolution is not obligated or willing to participate in arbitration proceedings within the meaning of
                                the VSBG, but we strive to settle disagreements amicably.
                            </p>
                            <div className="space-y-2">
                                <p>
                                    <a
                                        href="https://ec.europa.eu/consumers/odr/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 dark:text-blue-400 hover:underline"
                                    >
                                        EU Online Dispute Resolution Platform
                                    </a>
                                </p>
                                <p>
                                    Email:{" "}
                                    <a href="mailto:info@resolution.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                                        info@resolution.com
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
