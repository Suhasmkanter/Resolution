import MasonryGallery from "../components/MasonryLayout";
import { Search } from "lucide-react";
import React from "react";

function Explore() {
    return <div>
        <div className="flex flex-col gap-2 justify-center items-center w-full min-h-[50vh] bg-white">
            <h2 className="text-2xl font-bold text-gray-900">The best free stock photos, royalty free images & videos</h2>
            <label className="w-full flex justify-center items-center"  >
                <Search className="absolute left-[490px] w-5  h-5   text-gray-600" />
                <input placeholder="         Search for Images and Videos" className="w-full p-4 bg-white max-w-[600px]  border border-gray-300 rounded-[40px]" type="text" />
            </label>
        </div>

        <div className="max-w-full mx-auto px-10 py-12 sm:py-16 lg:py-20">
            <MasonryGallery />
        </div>


    </div >;
}

export default Explore;
