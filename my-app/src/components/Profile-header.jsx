"use client"

import { cn } from "@/lib/utils"



export function ProfileHeader({ brand, username, followers, following, language, joined, className }) {
    return (
        <header className={cn("w-full", className)}>
            <div className="relative w-full bg-muted z-50">
                <img
                    src={"/images.jpg"}
                    alt="Profile banner"
                    className="h-48 w-full object-cover md:h-56 lg:h-64"
                />
                <div className=" md:h-20 h-[13vh]  lg:h-28  w-[100vw] relative -top-9 bg-transparent flex justify-center  ">
                    <div>

                        <img
                            src={"/light.jpg"}
                            alt={`${username} avatar`}
                            className="h-full rounded-md  w-full object-contain"
                        />
                    </div>

                </div>

            </div>
            <div className="w-full h-[10vh]">

            </div>

            <div className="container  flex flex-col justify-center items-center mx-auto  px-4 md:px-8">


                {/* Name, meta */}

            </div>
        </header>
    )
}
