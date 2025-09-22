import { ArrowUp, Facebook, Instagram, Twitter, Linkedin, Youtube, Camera } from "lucide-react"

export const mockPhotos = [{
  id: 1,
  title: "Mountain Sunset",
  imageURL: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
  uploader: "John Doe",
  views: 15420,
  downloads: 2340,
  category: "Nature"
},
{
  id: 2,
  title: "Forest Path",
  imageURL: "https://pixabay.com/get/gb33dae9af6ae60f476a64ad2684183e2facd8fba0ef6854f3417bd95a5e2c9072408b4a088634d9249759d2e0b3d7a1cd0a55808b3124a2e698404819869df16_1280.jpg",
  uploader: "John Doe",
  views: 15420,
  downloads: 2340,
  category: "Nature"
},
{
  id: 3,
  title: "NewBorn ",
  imageURL: "/newborn.jpg",
  uploader: "John Doe",
  views: 15420,
  downloads: 2340,
  category: "Nature"
}, {
  id: 4,
  title: "Urban Architecture",
  imageURL: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
  uploader: "Jane Smith",
  views: 8920,
  downloads: 1560,
  category: "Architecture"
},
{
  id: 5,
  title: "Ocean Waves",
  imageURL: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
  uploader: "Mike Johnson",
  views: 12340,
  downloads: 2100,
  category: "Nature"
},
{
  id: 6,
  title: "City Lights",
  imageURL: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=400&h=300&fit=crop",
  uploader: "Sarah Wilson",
  views: 18760,
  downloads: 3200,
  category: "Urban"
},
{
  id: 7,
  title: "Forest Path",
  imageURL: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
  uploader: "David Brown",
  views: 9870,
  downloads: 1450,
  category: "Nature"
},
{
  id: 8,
  title: "Modern Interior",
  imageURL: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
  uploader: "Lisa Davis",
  views: 11230,
  downloads: 1890,
  category: "Interior"
},
{
  id: 9,
  title: "Desert Landscape",
  imageURL: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
  uploader: "Tom Anderson",
  views: 7650,
  downloads: 980,
  category: "Nature"
},
{
  id: 10,
  title: "Abstract Art",
  imageURL: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop",
  uploader: "Emma Taylor",
  views: 14560,
  downloads: 2670,
  category: "Art"
}
];

// Separate data for Latest and Trending sections
export const latestPhotos = mockPhotos.slice(0, 4);
export const trendingPhotos = mockPhotos.slice(4, 8);

export const socialLinks = [{
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

export const footerSections = [{
  title: "Company",
  links: [
    { label: "About Us", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "License Summary", href: "/license" },
    { label: "API", href: "/api" },
  ],
},
{
  title: "Legal",
  links: [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Cookies Policy", href: "/cookies" },
    { label: "Digital Services Act", href: "/dsa" },
    { label: "Report Content", href: "/report" },
  ],
},
{
  title: "Community",
  links: [
    { label: "Contributors", href: "/contributors" },
    { label: "Guidelines", href: "/guidelines" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
  ],
},
{
  title: "Support",
  links: [
    { label: "Contact", href: "/contact" },
    { label: "Help Center", href: "/help" },
  ],
},
]