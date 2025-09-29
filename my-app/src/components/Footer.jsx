"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { ArrowUp, Facebook, Instagram, Twitter, Linkedin, Youtube, Camera } from "lucide-react"
import { Link } from "react-router-dom"
import { footerSections } from "../data/mockPhotos"


const socialLinks = [
  {
    icon: Facebook,
    href: "https://facebook.com/stockimages",
    label: "Follow us on Facebook",
    hoverColor: "hover:text-blue-600",
  },
  {
    icon: Instagram,
    href: "https://instagram.com/stockimages",
    label: "Follow us on Instagram",
    hoverColor: "hover:text-pink-600",
  },
  {
    icon: Twitter,
    href: "https://twitter.com/stockimages",
    label: "Follow us on Twitter",
    hoverColor: "hover:text-blue-400",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com/company/stockimages",
    label: "Connect with us on LinkedIn",
    hoverColor: "hover:text-blue-700",
  },
  {
    icon: Youtube,
    href: "https://youtube.com/stockimages",
    label: "Subscribe to our YouTube channel",
    hoverColor: "hover:text-red-600",
  },
]

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight])

  useEffect(() => {
    // Update year dynamically
    setCurrentYear(new Date().getFullYear())

    // Handle scroll for back to top button
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer className="bg-gray-50 p-5 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-1">
          {/* Brand Section */}
          <div className="lg:col-span-2 col-span-3">
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Resolution</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Free Stock Images</p>
              </div>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              Discover millions of high-quality, royalty-free stock photos, vectors, and illustrations from talented
              creators worldwide. All completely free for personal and commercial use.
            </p>

            {/* Social Media Links */}
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Follow us:</span>
              <div className="flex space-x-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <Link
                      key={social.href}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className={`text-gray-500 dark:text-gray-400 ${social.hoverColor} transition-colors duration-200`}
                    >
                      <Icon className="w-5 h-5" />
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Navigation Sections */}
          {window.innerWidth > 640 && <div className="flex  w-[55vw] gap-20">
            {
              footerSections.map((section) => (

                <div key={section.title} className="w-[500px] ">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                    {section.title}
                  </h4>
                  <nav>
                    <ul className="space-y-3">
                      {section.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            to={link.href}
                            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded-sm"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              ))
            }
          </div>


          /* {footerSections.map((section) => (

            <div key={section.title} className="lg:col-span-1">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                {section.title}
              </h4>
              <nav>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          ))} */}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <p>
                © {currentYear} Resolution. All rights reserved. |{" "}
                <span className="text-xs">Made with ❤️ for creators worldwide</span>
              </p>
            </div>

            {/* Additional Links */}
            {/* <div className="flex items-center space-x-6 text-xs text-gray-500 dark:text-gray-400">
              <Link href="/sitemap" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                Sitemap
              </Link>
              <Link href="/accessibility" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                Accessibility
              </Link>
              <div className="flex items-center space-x-1">
                <span>🌍</span>
                <select
                  className="bg-transparent text-xs border-none focus:outline-none focus:ring-1 focus:ring-blue-500 rounded"
                  aria-label="Select language"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                </select>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      )}
    </footer>
  )
}
