import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { mockPhotos } from "../data/mockPhotos";
import { Button } from "../components/ui/button";
import { HeartIcon, BookmarkIcon, MessageCircleIcon, DownloadIcon, Share2Icon, ChevronDownIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../components/ui/dropdown-menu"
import { mockUserPhotos } from "../data/mockUserPhotos";
import MasonryGallery from "@/components/MasonryLayout";
export default function PhotoPage() {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloadCount, setDownloadCount] = useState(0);
  const [viewCount, setViewCount] = useState(0);
  const [relatedPhotos, setRelatedPhotos] = useState(mockUserPhotos);
  console.log(relatedPhotos)
  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      const foundPhoto = mockPhotos.find(p => p.id === parseInt(id));
      if (foundPhoto) {
        setPhoto(foundPhoto);
        setDownloadCount(foundPhoto.downloads);
        setViewCount(foundPhoto.views + 1); // Increment view count
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  const handleDownload = () => {
    setDownloadCount(prev => prev + 1);
    // In a real app, this would trigger an actual download
    const link = document.createElement('a');
    link.href = photo.imageURL;
    link.download = `${photo.title}.jpg`;
    link.click();
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Loading Photo - MyApp</title>
          <meta name="description" content="Loading photo details..." />
        </Helmet>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading photo...</p>
          </div>
        </div>
      </>
    );
  }

  if (!photo) {
    return (
      <>
        <Helmet>
          <title>Photo Not Found - MyApp</title>
          <meta name="description" content="The photo you're looking for doesn't exist." />
        </Helmet>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Photo Not Found</h1>
            <p className="text-gray-600 mb-6">The photo you're looking for doesn't exist.</p>
            <Link
              to="/"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </>
    );
  }

  // Generate meta description
  const metaDescription = `${photo.title} by ${photo.uploader} - ${photo.category} photography. ${formatNumber(photo.views)} views, ${formatNumber(photo.downloads)} downloads. High-quality image available for download.`;

  // Generate OpenGraph tags
  const ogTitle = `${photo.title} by ${photo.uploader}`;
  const ogDescription = `${photo.title} - ${photo.category} photography with ${formatNumber(photo.views)} views and ${formatNumber(photo.downloads)} downloads.`;
  const ogImage = photo.imageURL;
  const ogUrl = `${window.location.origin}/photo/${photo.id}`;

  return (
    <>
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{`${photo.title} by ${photo.uploader} - MyApp`}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={`${photo.title}, ${photo.category}, photography, ${photo.uploader}, download`} />
        <meta name="author" content={photo.uploader} />

        {/* OpenGraph Meta Tags */}
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={ogUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="MyApp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={photo.title} />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={ogTitle} />
        <meta name="twitter:description" content={ogDescription} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content={photo.title} />

        {/* Additional Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="image" content={ogImage} />
        <meta name="category" content={photo.category} />
        <meta name="uploader" content={photo.uploader} />
        <meta name="views" content={photo.views.toString()} />
        <meta name="downloads" content={photo.downloads.toString()} />

        {/* Canonical URL */}
        <link rel="canonical" href={ogUrl} />

        {/* Structured Data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageObject",
            "name": photo.title,
            "description": metaDescription,
            "image": photo.imageURL,
            "url": ogUrl,
            "author": {
              "@type": "Person",
              "name": photo.uploader
            },
            "contentUrl": photo.imageURL,
            "license": "https://creativecommons.org/licenses/by/4.0/",
            "acquireLicensePage": ogUrl,
            "creditText": photo.uploader,
            "creator": {
              "@type": "Person",
              "name": photo.uploader
            },
            "uploadDate": new Date().toISOString(),
            "interactionStatistic": [
              {
                "@type": "InteractionCounter",
                "interactionType": "https://schema.org/ViewAction",
                "userInteractionCount": photo.views
              },
              {
                "@type": "InteractionCounter",
                "interactionType": "https://schema.org/DownloadAction",
                "userInteractionCount": photo.downloads
              }
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-full mx-auto  sm:px-6 lg:px-8 py-4 sm:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4  sm:gap-8 ">

            {/* Photo Display - Left Column */}
            <div className="col-span-3  sm:space-y-6">
              <div className="w-full p-2 max-w-[950px] lg:h-[500px] h-auto flex justify-center overflow-hidden">
                <img
                  src={photo.imageURL}
                  alt="Photo"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>

              <div>
                <div className=" w-full   rounded-lg shadow-md  sm:p-8 mt-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
                    Related Photos
                  </h3>
                  <div className="grid grid-cols-1 gap-4">


                    <MasonryGallery breakpointsColumnsObj={{ default: 3, 1100: 2, 700: 2, 500: 1 }} photos={relatedPhotos.filter((p) => p.category === photo.category)} />

                  </div>
                </div>
              </div>
            </div>

            {/* Photo Details - Right Column */}
            <div className="sticky  self-start top-4 col-span-1  ">
              <div className="flex  flex-col w-full  text-sm text-black">

                {/* Buttons */}
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <BookmarkIcon /> Save
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="flex-1 bg-blue-700 hover:bg-blue-500 text-white">
                        <DownloadIcon className="h-5 w-5 mr-2" />
                        Download
                        <ChevronDownIcon className="h-4 w-4 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Small (640x960)</DropdownMenuItem>
                      <DropdownMenuItem>Medium (1280x1920)</DropdownMenuItem>
                      <DropdownMenuItem>Large (1920x2880)</DropdownMenuItem>
                      <DropdownMenuItem>Original (3000x4500)</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Likes, Comments, Share */}
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" className="flex-1 h-12 text-lg bg-transparent">
                    <HeartIcon className="h-6 w-6 mr-2" /> 20
                  </Button>
                  <Button variant="outline" size="icon" className="h-12 flex-1 bg-transparent">
                    <MessageCircleIcon className="h-6 w-6" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-12 flex-1 w-12 bg-transparent">
                    <Share2Icon className="h-6 w-6" />
                  </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 items-center gap-4 mt-4">
                  <div className="flex flex-col items-center">
                    <p className="text-muted-foreground">Views</p>
                    <p className="text-lg font-bold">1,152</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-muted-foreground">Downloads</p>
                    <p className="text-lg font-bold">821</p>
                  </div>
                </div>

                <a href="#" className="text-primary text-sm mt-2">
                  Show details
                  <ChevronDownIcon className="h-4 w-4 inline-block ml-1" />
                </a>

                {/* User Info */}
                <div className="border-t pt-4 mt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img
                          src="/userimage.png"
                          alt="User Avatar"
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">AiArtista</p>
                        <p className="text-sm text-muted-foreground">579 followers</p>
                      </div>
                    </div>
                    <Button variant="outline" className="bg-transparent">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 mr-2"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 11v.01" />
                        <path d="M18 11v.01" />
                        <path d="M20 8v.01" />
                      </svg>
                      Follow
                    </Button>
                  </div>

                  {/* Related Photos */}

                </div>
              </div>
            </div>

          </div>
        </div >
      </div >


    </>
  );
} 