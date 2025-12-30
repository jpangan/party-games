"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CountAndSitPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-8 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
          {/* Title */}
          <h1 className="font-headline text-4xl md:text-6xl text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,0.3)] text-center animate-slide-in">
            🪑 COUNT AND SIT
          </h1>

          {/* YouTube Video Embed */}
          <div className="w-full max-w-2xl aspect-[9/16] mb-8">
            <iframe
              src="https://www.youtube.com/embed/kir_IrhKkWw"
              title="Count and Sit Game"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full rounded-lg"
              style={{ border: "none" }}
            />
          </div>

          {/* Back Button */}
          <Link href="/">
            <Button variant="retro" size="xl" className="font-ui">
              Back to Games
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

