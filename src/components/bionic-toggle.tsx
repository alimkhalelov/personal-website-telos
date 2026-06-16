"use client";

import * as React from "react";
import { BookOpen, BookText } from "lucide-react";

export function BionicToggle() {
  const [enabled, setEnabled] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const isEnabled = localStorage.getItem("bionic-reading") === "true";
    setEnabled(isEnabled);
    if (isEnabled) {
      document.body.classList.add("bionic-reading-enabled");
    }
  }, []);

  const toggleBionic = () => {
    const newState = !enabled;
    setEnabled(newState);
    localStorage.setItem("bionic-reading", String(newState));
    if (newState) {
      document.body.classList.add("bionic-reading-enabled");
    } else {
      document.body.classList.remove("bionic-reading-enabled");
    }
  };

  if (!mounted) {
    return <div className="w-9 h-9" />;
  }

  return (
    <button
      onClick={toggleBionic}
      className={`p-2 rounded-md hover:bg-muted/20 transition-colors flex items-center justify-center ${enabled ? 'text-foreground' : 'text-muted-foreground'}`}
      title="Toggle Bionic Reading"
      aria-label="Toggle Bionic Reading"
    >
      {enabled ? <BookText className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
    </button>
  );
}
