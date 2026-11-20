"use client";

import * as React from "react";
import { DockingHeader } from "@/components/home/docking-header";

declare global {
  interface Window {
    Cal?: any;
  }
}

const CAL_LINK = "alim-xjzgyu/30min";
const CAL_NAMESPACE = "30min";

/**
 * Native inline Cal.com booking widget anchored at the bottom of the page.
 * Uses DockingHeader (matching Projects) and transparent glass CSS variables
 * so the calendar sits directly inside a single frosted One UI glass surface.
 */
export function CalBookingSection() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";

    const initCal = () => {
      if (typeof window === "undefined") return;

      if (!window.Cal) {
        (function (C: any, A: string, L: string) {
          const p = function (a: any, ar: any) {
            a.q.push(ar);
          };
          const d = C.document;
          C.Cal =
            C.Cal ||
            function () {
              const cal = C.Cal;
              const ar = arguments;
              if (!cal.loaded) {
                cal.ns = {};
                cal.q = cal.q || [];
                const script = d.createElement("script");
                script.src = A;
                script.async = true;
                d.head.appendChild(script);
                cal.loaded = true;
              }
              if (ar[0] === L) {
                const api: any = function () {
                  p(api, arguments);
                };
                const namespace = ar[1];
                api.q = api.q || [];
                if (typeof namespace === "string") {
                  cal.ns[namespace] = cal.ns[namespace] || api;
                  p(cal.ns[namespace], ar);
                  p(cal, ["initNamespace", namespace]);
                } else {
                  p(cal, ar);
                }
                return;
              }
              p(cal, ar);
            };
        })(window, "https://app.cal.com/embed/embed.js", "init");
      }

      window.Cal("init", CAL_NAMESPACE, { origin: "https://cal.com" });

      const ns = window.Cal.ns?.[CAL_NAMESPACE];
      if (ns) {
        ns("inline", {
          elementOrSelector: "#my-cal-inline-30min",
          config: { layout: "month_view", theme: "dark" },
          calLink: CAL_LINK,
        });

        ns("ui", {
          theme: "dark",
          cssVarsPerTheme: {
            dark: {
              "cal-bg": "transparent",
              "cal-bg-emphasis": "rgba(255, 255, 255, 0.14)",
              "cal-bg-subtle": "rgba(255, 255, 255, 0.04)",
              "cal-bg-muted": "transparent",
              "cal-border": "rgba(255, 255, 255, 0.16)",
              "cal-border-booker": "rgba(255, 255, 255, 0.14)",
              "cal-border-subtle": "rgba(255, 255, 255, 0.12)",
              "cal-border-emphasis": "rgba(255, 255, 255, 0.32)",
              "cal-brand": "#ffffff",
              "cal-brand-emphasis": "rgba(255, 255, 255, 0.92)",
              "cal-brand-text": "#0f172a",
              "cal-text": "#ffffff",
              "cal-text-emphasis": "#ffffff",
              "cal-text-subtle": "rgba(255, 255, 255, 0.90)",
              "cal-text-muted": "rgba(255, 255, 255, 0.74)",
            },
          },
          hideEventTypeDetails: false,
          layout: "month_view",
        });
      }
    };

    initCal();
  }, []);

  return (
    <section id="book-call" className="flex flex-col gap-6 pt-2">
      <DockingHeader
        sectionId="book-call"
        title="Book a Call"
        rightAction={
          <a
            href={`https://cal.com/${CAL_LINK}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-white/60 hover:text-white transition-colors !no-underline"
            style={{ fontFamily: "'Google Sans', sans-serif" }}
          >
            Open in Cal.com →
          </a>
        }
      />

      <div className="w-full rounded-[24px] border border-white/20 bg-slate-950/38 backdrop-blur-2xl overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.22)]">
        <div
          ref={containerRef}
          id="my-cal-inline-30min"
          className="w-full"
          style={{ width: "100%", overflow: "hidden" }}
        />
      </div>
    </section>
  );
}
