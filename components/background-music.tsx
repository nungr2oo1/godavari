"use client";

import * as React from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "ugg:bgm:playing";
const VOLUME = 0.25;

export function BackgroundMusic() {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = React.useState(false);
  const [ready, setReady] = React.useState(false);

  // Lazy-create the audio element on the client so SSR stays clean.
  React.useEffect(() => {
    const audio = new Audio("/audio/nature.mp3");
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = VOLUME;
    audioRef.current = audio;
    setReady(true);

    const wantsPlay = window.localStorage.getItem(STORAGE_KEY) === "1";
    if (wantsPlay) {
      // Browsers may still block this without a recent gesture; if it fails
      // we silently stay paused and the user can hit play themselves.
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }

    const onEnd = () => setPlaying(false);
    audio.addEventListener("pause", onEnd);

    return () => {
      audio.removeEventListener("pause", onEnd);
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  const toggle = React.useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio
        .play()
        .then(() => {
          setPlaying(true);
          window.localStorage.setItem(STORAGE_KEY, "1");
        })
        .catch(() => setPlaying(false));
    } else {
      audio.pause();
      setPlaying(false);
      window.localStorage.setItem(STORAGE_KEY, "0");
    }
  }, []);

  if (!ready) return null;

  return (
    <button
      type="button"
      aria-label={playing ? "Pause background music" : "Play background music"}
      aria-pressed={playing}
      onClick={toggle}
      className={cn(
        "fixed bottom-6 right-20 z-50 grid h-11 w-11 place-items-center rounded-full",
        "glass text-foreground shadow-lift",
        "transition-all duration-300",
        "hover:shadow-glow hover:-translate-y-0.5 hover:text-primary",
        playing && "text-primary"
      )}
      title={playing ? "Pause music" : "Play music"}
    >
      {playing ? (
        <Pause className="h-4 w-4 fill-current" />
      ) : (
        <Play className="h-4 w-4 fill-current translate-x-[1px]" />
      )}
      {playing && (
        <span
          aria-hidden
          className="absolute inset-0 rounded-full ring-2 ring-primary/40 animate-ping"
        />
      )}
    </button>
  );
}
