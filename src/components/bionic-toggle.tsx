"use client";

import * as React from "react";
import { BookOpen, BookText } from "lucide-react";
import { usePathname } from "next/navigation";

const emptySubscribe = () => () => {};

function getInitialBionicState(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem("bionic-reading") === "true";
  } catch {
    return false;
  }
}

export function BionicToggle() {
  const pathname = usePathname();
  const isClient = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const [enabled, setEnabled] = React.useState<boolean>(getInitialBionicState);

  React.useEffect(() => {
    try {
      if (enabled) {
        document.body.classList.add("bionic-reading-enabled");
      }
    } catch {}
  }, [enabled]);

  const toggleBionic = () => {
    const newState = !enabled;
    setEnabled(newState);
    try {
      localStorage.setItem("bionic-reading", String(newState));
      if (newState) {
        document.body.classList.add("bionic-reading-enabled");
      } else {
        document.body.classList.remove("bionic-reading-enabled");
      }
    } catch {}
  };

  // Only render on open blog article pages (e.g. /blog/some-article-slug)
  if (!isClient || !pathname || !pathname.startsWith("/blog/") || pathname === "/blog") {
    return null;
  }

  return (
    <button
      onClick={toggleBionic}
      className={`p-2 rounded-md hover:bg-muted/20 transition-colors flex items-center justify-center ${
        enabled ? "text-foreground" : "text-muted-foreground"
      }`}
      title="Toggle Bionic Reading"
      aria-label="Toggle Bionic Reading"
    >
      {enabled ? <BookText className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
    </button>
  );
}
