import { ProfileHeader } from "@/components/Profile-header"
import { ProfileStats } from "@/components/Profile-Stats"
import { GalleryGrid } from "@/components/Gallery-Grid"
import { Button } from "@/components/ui/button"
import { Ellipsis, Bell } from "lucide-react"

export default function Profilepage() {
    // Simple mock data to mirror the screenshot while letting you tune numbers
    const username = "u_e3hpiixnyy"
    const followers = 1
    const following = 2
    const language = "English"
    const joined = "Joined May 10, 2023"

    const stats = {
        likes: 2,
        views: 17,
        downloads: 8,
        editorsChoice: 0,
    }

    // Placeholder gallery items (keep the look similar; feel free to replace)
    const items = [
        { src: "/catflower.jpg", alt: "Orange car engine close-up" },
        { src: "/download.jpg", alt: "Landscape aerial view" },
        { src: "/light.jpg", alt: "Couple portrait B&W" },
        { src: "/poppy.jpg", alt: "Abstract placeholder" },
    ]

    return (
        <main className="min-h-dvh">
            <ProfileHeader
                brand="the resolution"
                username={username}
                followers={followers}
                following={following}
                language={language}
                joined={joined}
            />

            <section className="container mx-auto px-4 md:px-8">
                {/* Top row: stats and actions */}
                <div className="flex flex-col gap-6">
                    {/* <ProfileStats {...stats} /> */}

                    <div className="flex items-center justify-between">
                        {/* Left side intentionally empty to keep visual spacing similar to reference */}
                        <div aria-hidden="true" />
                        {/* <div className="flex items-center gap-2">
                            <Button variant="secondary" size="icon" className="rounded-full" aria-label="Notifications">
                                <Bell className="size-4" />
                            </Button>
                            <Button variant="secondary" size="icon" className="rounded-full" aria-label="More options">
                                <Ellipsis className="size-4" />
                            </Button>

                            <Button variant="outline" className="rounded-full bg-transparent">
                                Latest
                            </Button>
                        </div> */}
                    </div>

                    {/* Tabs intentionally omitted per your request */}

                    {/* Gallery */}
                    <GalleryGrid items={items} />
                </div>
            </section>
        </main>
    )
}
