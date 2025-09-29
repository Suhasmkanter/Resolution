import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import DashboardPhotoCard from "../components/DashboardPhotoCard";
import { mockUserPhotos } from "../data/mockUserPhotos";

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [sortBy, setSortBy] = useState("recent");
  const [filterCategory, setFilterCategory] = useState("all");

  // Calculate summary statistics
  const totalPhotos = mockUserPhotos.length;
  const totalViews = mockUserPhotos.reduce((sum, photo) => sum + photo.views, 0);
  const totalDownloads = mockUserPhotos.reduce((sum, photo) => sum + photo.downloads, 0);
  const totalRevenue = mockUserPhotos.reduce((sum, photo) => sum + photo.revenue, 0);

  // Filter and sort photos
  const filteredPhotos = mockUserPhotos
    .filter(photo => filterCategory === "all" || photo.category === filterCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return new Date(b.uploadDate) - new Date(a.uploadDate);
        case "views":
          return b.views - a.views;
        case "downloads":
          return b.downloads - a.downloads;
        case "revenue":
          return b.revenue - a.revenue;
        default:
          return 0;
      }
    });

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const categories = ["all", ...new Set(mockUserPhotos.map(photo => photo.category))];

  return (
    <div className="min-h-full bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">


        {/* Photos Grid */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Your Photos ({filteredPhotos.length})
            </h2>
          </div>

          {filteredPhotos.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 sm:p-12 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No photos found</h3>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">
                {filterCategory === "all"
                  ? "You haven't uploaded any photos yet."
                  : `No photos found in the ${filterCategory} category.`
                }
              </p>
              <Link
                to="/upload"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm sm:text-base"
              >
                Upload Your First Photo
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredPhotos.map((photo) => (
                <DashboardPhotoCard key={photo.id} photo={photo} />
              ))}
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Performance Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-blue-600 mb-1">
                {totalPhotos > 0 ? (totalViews / totalPhotos).toFixed(0) : 0}
              </div>
              <div className="text-sm text-gray-600">Avg. Views per Photo</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-green-600 mb-1">
                {totalPhotos > 0 ? (totalDownloads / totalPhotos).toFixed(0) : 0}
              </div>
              <div className="text-sm text-gray-600">Avg. Downloads per Photo</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-purple-600 mb-1">
                ${totalPhotos > 0 ? (totalRevenue / totalPhotos).toFixed(2) : 0}
              </div>
              <div className="text-sm text-gray-600">Avg. Revenue per Photo</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 