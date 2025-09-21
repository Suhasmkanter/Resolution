import MasonryGallery from "../components/MasonryLayout";
import { Search } from "lucide-react";
import React from "react";

function Explore() {
    return <div>
        <div className="flex p-7 flex-col gap-2 justify-center items-center w-full min-h-[50vh] bg-white">
            <h2 className="text-2xl font-bold text-gray-900 text-center">
                The best free stock photos, royalty free images & videos
            </h2>

            <label className="relative w-full max-w-[600px]">
                {/* Search Icon */}
                <Search className="absolute inset-y-0 left-4 w-5 h-5 text-gray-600 m-auto" />

                {/* Input */}
                <input
                    type="text"
                    placeholder="Search for Images and Videos"
                    className="w-full p-4 pl-12 border border-gray-300 rounded-full bg-white focus:outline-none"
                />
            </label>
        </div>

        <div className="max-w-full mx-auto px-3 py-6 sm:py-16 lg:py-20">
            <MasonryGallery />
        </div>


    </div >;
}

export default Explore;
