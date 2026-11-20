"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";

declare global {
  interface Window {
    Cal?: any;
  }
}

const CAL_LINK = "alim-xjzgyu/30min";
const CAL_NAMESPACE = "30min";

/**
 * Native inline Cal.com booking widget anchored at the bottom of the page.
 * Styled to sit cleanly inside the frosted One UI glass layout without heavy card clutter.
 */
export function CalBookingSection() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear previous embed nodes on client-side re-navigation
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
              "cal-brand": "#38bdf8",
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
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-3xl font-bold tracking-tight text-white">
          Book a Call
        </h2>
        <a
          href={`https://cal.com/${CAL_LINK}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-medium text-white/60 hover:text-white transition-colors !no-underline"
          style={{ fontFamily: "'Google Sans', sans-serif" }}
        >
          <span>Open in Cal.com</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="w-full rounded-[24px] border border-white/15 bg-black/25 backdrop-blur-2xl overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]">
        <div
          ref={containerRef}
          id="my-cal-inline-30min"
          className="w-full min-h-[560px]"
          style={{ width: "100%", height: "100%", overflow: "auto" }}
        />
      </div>
    </section>
  );
}
