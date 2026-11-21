"use client";

import { useEffect } from "react";
import { executePublicMcpTool, PUBLIC_MCP_TOOLS } from "@/lib/public-mcp";

interface ModelContextLike {
  registerTool?: (tool: {
    name: string;
    description: string;
    inputSchema: Record<string, unknown>;
    execute: (args: Record<string, unknown>) => Promise<unknown> | unknown;
  }) => void;
  unregisterTool?: (name: string) => void;
}

/**
 * Registers strict read-only WebMCP tools in navigator.modelContext when visited
 * by WebMCP-compatible browser agents, leaving zero admin/analytics exposure.
 */
export function WebMcpProvider() {
  useEffect(() => {
    const nav = typeof navigator !== "undefined" ? (navigator as unknown as { modelContext?: ModelContextLike }) : null;
    const mc = nav?.modelContext;
    if (!mc || typeof mc.registerTool !== "function") return;

    const registered: string[] = [];
    for (const def of PUBLIC_MCP_TOOLS) {
      try {
        mc.registerTool({
          name: def.name,
          description: def.description,
          inputSchema: def.inputSchema,
          execute: async (args: Record<string, unknown> = {}) => {
            const out = executePublicMcpTool(def.name, args);
            return out.ok ? out.data : { error: out.error };
          },
        });
        registered.push(def.name);
      } catch {
        /* ignore unsupported WebMCP draft signatures */
      }
    }

    return () => {
      if (typeof mc.unregisterTool === "function") {
        for (const name of registered) {
          try {
            mc.unregisterTool(name);
          } catch {
            /* ignore cleanup error */
          }
        }
      }
    };
  }, []);

  return null;
}
