"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// YouTube API types
interface YouTubePlayer {
  destroy: () => void;
}

interface YouTubeEvent {
  data: number;
}

interface YouTubeWindow extends Window {
  YT?: {
    Player: new (
      elementId: string,
      config: {
        videoId: string;
        playerVars: Record<string, number>;
        events: {
          onStateChange: (event: YouTubeEvent) => void;
        };
      }
    ) => YouTubePlayer;
  };
  onYouTubeIframeAPIReady?: () => void;
}

export default function CountAndSitPage() {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YouTubePlayer | null>(null);

  useEffect(() => {
    // Load YouTube iframe API
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // Initialize player when API is ready
    const win = window as YouTubeWindow;
    win.onYouTubeIframeAPIReady = () => {
      if (win.YT) {
        playerRef.current = new win.YT.Player("youtube-player", {
          videoId: "kir_IrhKkWw",
          playerVars: {
            autoplay: 0,
            controls: 1,
            rel: 0,
          },
          events: {
            onStateChange: (event: YouTubeEvent) => {
              // State 1 = playing
              if (event.data === 1) {
                // Request fullscreen when video starts playing
                const container = videoContainerRef.current;
                if (container) {
                  if (container.requestFullscreen) {
                    container.requestFullscreen();
                  } else {
                    const containerWithVendor = container as HTMLElement & {
                      webkitRequestFullscreen?: () => void;
                      mozRequestFullScreen?: () => void;
                      msRequestFullscreen?: () => void;
                    };
                    if (containerWithVendor.webkitRequestFullscreen) {
                      containerWithVendor.webkitRequestFullscreen();
                    } else if (containerWithVendor.mozRequestFullScreen) {
                      containerWithVendor.mozRequestFullScreen();
                    } else if (containerWithVendor.msRequestFullscreen) {
                      containerWithVendor.msRequestFullscreen();
                    }
                  }
                }
              }
            },
          },
        });
      }
    };

    return () => {
      // Cleanup
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {
          // Ignore cleanup errors
        }
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-8 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
          {/* Title */}
          <h1 className="font-headline text-4xl md:text-6xl text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,0.3)] text-center animate-slide-in">
            🪑 COUNT AND SIT
          </h1>

          {/* YouTube Video Embed */}
          <div
            ref={videoContainerRef}
            className="w-full max-w-2xl aspect-[9/16] mb-8"
          >
            <div id="youtube-player" className="w-full h-full rounded-lg" />
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

