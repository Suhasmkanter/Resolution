import React from "react";
import Masonry from "react-masonry-css";
import { cn } from "@/lib/utils"
const images = [
    "/images.jpg",
    "/poppy.jpg",
    "/verticalpoppy.jpg",
    "/catflower.jpg",
    "/lynxnature.jpg",
    "/images.jpg",
    "/cheetahstanding.jpg",

];

function MasonryGallery({ breakpointsColumnsObj, className }) {

    console.log(className)
    return (
        <Masonry
            breakpointCols={breakpointsColumnsObj}
            className={cn("flex gap-2", className)}
            columnClassName="bg-clip-padding"
        >
            {images.map((img, idx) => (
                <img
                    key={idx}
                    src={img}
                    alt={`img-${idx}`}
                    className="w-full mb-4 rounded-sm"
                />
            ))}
        </Masonry>
    );
}

export default MasonryGallery;
