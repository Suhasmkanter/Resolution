"use client"

import { cn } from "@/lib/utils"
import MasonryGallery from "./MasonryLayout"



export function GalleryGrid({ items, className }) {
    return (
        <section aria-label="User media" className={cn("pb-12", className)}>
            {/* Simple responsive 3-column grid similar to the reference masonry */}
            <div className="grid lg:grid-cols-3 gap-6 ">
                <MasonryGallery className="col-span-3" items={items} breakpointsColumnsObj={{ default: 4, 640: 2, 768: 3, 1120: 4 }} />

            </div>
        </section>
    )
}
