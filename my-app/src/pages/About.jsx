import AboutHero from "../components/AboutHero";
import ByTheNumbers from "../components/ByTheNumbers";
import CommunitySection from "../components/CommunitySection";
import CompanyDetails from "../components/CompanyDetails";
import LetsConnect from "../components/LetsConnect";


export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <main className="container mx-auto px-4 py-16 space-y-24">
        <AboutHero />
        <ByTheNumbers />
        <CommunitySection />
        <CompanyDetails />
        <LetsConnect />
      </main>
    </div>
  )
}