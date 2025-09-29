"use client"
import { Heart, Eye, Download, Star } from "lucide-react"
export function ProfileStats({ likes, views, downloads, editorsChoice }) {
    const items = [
        { label: "Likes", value: likes, icon: Heart },
        { label: "Views", value: views, icon: Eye },
        { label: "Downloads", value: downloads, icon: Download },
        { label: "Editor's Choice", value: editorsChoice, icon: Star },
    ]

    return (
        <div className="grid grid-cols-2 gap-4 md:flex md:flex-row md:items-center">
            {items.map(({ label, value, icon: Icon }) => (
                <div
                    key={label}
                    className="flex items-center gap-2 rounded-lg bg-card px-3 py-2 text-sm shadow-sm ring-1 ring-border"
                >
                    <div className="rounded-full bg-muted p-2 text-muted-foreground">
                        <Icon className="size-4" aria-hidden="true" />
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-base font-semibold text-foreground">{value}</span>
                        <span className="text-muted-foreground">{label}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}
