import React from "react";
import Masonry from "react-masonry-css";

const images = [
    "/images.jpg",
    "/poppy.jpg",
    "/verticalpoppy.jpg",
    "/catflower.jpg",
    "/lynxnature.jpg",
    "/images.jpg",
    "/cheetahstanding.jpg",

];

function MasonryGallery() {
    const breakpointColumnsObj = {
        default: 3, // for big screens
        1100: 3,    // below 1100px → 3 columns
        700: 2,     // below 700px → 2 columns
        500: 2      // below 500px → 1 column
    };

    return (
        <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex gap-4"
            columnClassName="bg-clip-padding"
        >
            {images.map((img, idx) => (
                <img
                    key={idx}
                    src={img}
                    alt={`img-${idx}`}
                    className="w-full mb-4 rounded-lg"
                />
            ))}
        </Masonry>
    );
}

export default MasonryGallery;
